/**
 * @file password-form.tsx
 * @description This component is used to create or update a password entry.
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
import { PasswordSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@prisma/client";
import createPassword from "@/actions/createPassword";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CopyToClipboard from "../copy";
import { UserDataType } from "@/types";
import { decrypt } from "@/lib/encryption";
import { useSession } from "next-auth/react";
import Error from "../error";

type PasswordFormValue = z.infer<typeof PasswordSchema>;

const PasswordForm: FC<{
  formState: string;
  initialValues: Password | null;
  userInfo: UserDataType;
}> = ({ formState, initialValues, userInfo }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<PasswordFormValue>({
    resolver: zodResolver(PasswordSchema),
  });

  // Reset form when initialValues or formState changes
  useEffect(() => {
    const userMasterpass = session?.user.masterPassword || "";
    form.reset({
      label: initialValues ? initialValues.label : "",
      userName: initialValues ? initialValues.userName : "",
      password: initialValues ? decrypt(initialValues.password, userMasterpass) || "" : "",
      categoryId: initialValues ? initialValues.categoryId || undefined : "",
      totpKey: initialValues ? decrypt(initialValues.totpKey, userMasterpass) || undefined : "",
      website: initialValues ? initialValues.website || undefined : "",
      note: initialValues ? decrypt(initialValues.note, userMasterpass) || undefined : "",
      requireMasterPassword: initialValues ? initialValues.requireMasterPassword : false,
    });
  }, [form, session, initialValues, formState]);

  useEffect(() => {
    if (formState === "new") {
      form.reset({
        label: "",
        userName: "",
        password: "",
        categoryId: undefined,
        totpKey: undefined,
        website: undefined,
        note: undefined,
        requireMasterPassword: false,
      });
    }
  }, [form, formState]);

  const onSubmit = (values: PasswordFormValue) => {
    startTransition(async () => {
      const newPassword = await createPassword(values, initialValues?.id || "", session);
      if (newPassword) {
        toast("Success !!", {
          description: "Congrulation your password is created",
        });
        router.refresh();
      } else {
        toast("Error !!", {
          description: "Can't create password",
        });
      }
    });
  };

  const totp = useMemo(() => {
    const userMasterpass = session?.user.masterPassword;
    if (initialValues && initialValues.totpKey && userMasterpass) {
      const totpKey = decrypt(initialValues.totpKey, userMasterpass);
      if (totpKey) {
        return new OTPAuth.TOTP({
          label: initialValues.label,
          secret: totpKey,
          period: 30,
        });
      } else return null;
    }
    return null;
  }, [session, initialValues]);

  const [otp, setOtp] = useState<string | null>(null);
  const [period, setPeriod] = useState<number | null>(null);

  useEffect(() => {
    setOtp(totp && totp.generate());
  }, [totp, period]);

  useEffect(() => {
    if (totp) {
      const intervalId = setInterval(() => {
        const remaining = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
        setPeriod(remaining);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [totp]);

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Organize your passwords" />
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
        <div className="space-y-1 border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Username</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your username"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Password</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    {formState === "read" && (
                      <>
                        <div
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="hover:bg-muted cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </div>
                        <CopyToClipboard text={field.value} />
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1 border-primary/20 border-b py-5 w-full col-span-2">
          <FormField
            control={form.control}
            name="totpKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Authenticator - TOTP</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-5">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent w-fit")}
                      disabled={isPending}
                      placeholder="Paste Your TOTP Key"
                      type="password"
                      {...field}
                    />
                    {formState === "read" && (
                      <div className="gap-x-1 flex items-center">
                        <div className="hover:bg-muted cursor-pointer px-3 py-2 rounded-xl flex items-center justify-center">{otp}</div>
                        <div className="hover:bg-muted rounded-xl border bg-white/10 cursor-pointer px-3 py-2 flex items-center justify-center">
                          {period}
                        </div>
                        <CopyToClipboard text={otp} />
                      </div>
                    )}
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Website Url</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Url for autocomplete"
                      {...field}
                    />
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
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Note</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Textarea
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Note for your password"
                      {...field}
                    />
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
        <div className="flex justify-end items-end">
          <Button type="submit" disabled={isPending} className="gap-x-2 w-fit">
            Save Password <Save size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
