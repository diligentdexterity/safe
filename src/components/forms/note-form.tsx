/**
 * @file note-form.tsx
 * @description This component is used to create or update a note entry.
 * @usage It is used in variant-form.tsx.
 */

"use client";

import * as OTPAuth from "otpauth";
import * as z from "zod";

import React, { FC, useEffect, useMemo, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { NoteSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CopyToClipboard from "../copy";
import { NoteWithFieldsType, UserDataType } from "@/types";
import { decrypt } from "@/lib/encryption";
import { useSession } from "next-auth/react";
import createNote from "@/actions/createNote";

type NoteFormValue = z.infer<typeof NoteSchema>;

const NoteForm: FC<{
  formState: string;
  initialValues: NoteWithFieldsType | null;
  userInfo: UserDataType;
}> = ({ formState, initialValues, userInfo }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<NoteFormValue>({
    resolver: zodResolver(NoteSchema),
  });

  // Reset form when initialValues or formState changes
  useEffect(() => {
    const userMasterpass = session?.user.masterPassword || "";
    form.reset({
      label: initialValues ? initialValues.label || "" : "",
      note: initialValues ? decrypt(initialValues.note, userMasterpass) || "" : "",
      categoryId: initialValues ? initialValues.categoryId || undefined : "",
      requireMasterPassword: initialValues ? initialValues.requireMasterPassword : false,
    });
  }, [form, session, initialValues, formState]);

  useEffect(() => {
    if (formState === "new") {
      form.reset({
        label: "",
        note: "",
        categoryId: undefined,
        requireMasterPassword: false,
      });
    }
  }, [form, formState]);

  const onSubmit = (values: NoteFormValue) => {
    startTransition(async () => {
      const newNote = await createNote(values, initialValues?.id || "", session);
      if (newNote) {
        toast("Success !!", {
          description: "Congrulation your note is created",
        });
        router.refresh();
      } else {
        toast("Error !!", {
          description: "Can't create note",
        });
      }
    });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setShowPassword(false);
  }, [initialValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 mt-14 grid gap-x-10 grid-cols-2">
        <div className="border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Password Label</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    className={cn(formState === "read" && "bg-transparent")}
                    disabled={isPending}
                    placeholder="Label your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Choose Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "-"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Organize your notes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="-">Uncategorized</SelectItem>
                    {userInfo?.categories.map((category, index) => (
                      <SelectItem key={category.id + index} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1 border-primary/20 border-b py-5 col-span-2">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Note</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your note"
                      {...field}
                    />
                    {formState === "read" && <CopyToClipboard text={field.value} />}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1 border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="requireMasterPassword"
            render={({ field }) => (
              <FormItem className="flex flex-row bg-primary/15 hover:bg-primary/20 items-start space-x-3 space-y-0 rounded-md border border-primary/20 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Requires masterpassword everytime to check password</FormLabel>
                  <FormDescription>Check it so that every password requires masterpassword to view/copy password *recommended*</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-end mt-10 w-full">
          <Button type="submit" disabled={isPending} className="gap-x-2 w-fit">
            Save Password <Save size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NoteForm;
