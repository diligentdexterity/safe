/**
 * @file setting-form.tsx
 * @description This component is used to create or update a setting entry.
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
import { SettingSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password, Settings } from "@prisma/client";
import createSettings from "@/actions/createSettings";
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
import { Session } from "next-auth";

type SettingFormValue = z.infer<typeof SettingSchema>;

const SettingForm: FC<{
  initialValues: Settings | null;
  session: Session;
}> = ({ initialValues, session }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<SettingFormValue>({
    resolver: zodResolver(SettingSchema),
  });

  // Reset form when initialValues or formState changes
  useEffect(() => {
    form.reset({
      applyMasterPasswordOnAll: initialValues ? initialValues.applyMasterPasswordOnAll : false,
      showWebsiteIcon: initialValues ? initialValues.showWebsiteIcon : true,
      vaultTimeOut: initialValues ? initialValues.vaultTimeOut : 15,
    });
  }, [form, session, initialValues]);

  const onSubmit = (values: SettingFormValue) => {
    startTransition(async () => {
      const newSetting = await createSettings(values, initialValues?.id || "", session);
      if (newSetting) {
        await update({ ...session, user: { ...session.user, vaultTimeOut: JSON.stringify(values.vaultTimeOut) } });
        toast("Success !!", {
          description: "Congrulation your setting is updated",
        });
        router.refresh();
      } else {
        toast("Error !!", {
          description: "Can't create setting",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-14 gap-y-10">
        <div className="border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="applyMasterPasswordOnAll"
            render={({ field }) => (
              <FormItem className="bg-primary/15 px-5 py-5 rounded-xl flex justify-between items-center">
                <div>
                  <FormLabel className="text-gray-300 font-bold text-lg">Secure with Master Password</FormLabel>
                  <FormDescription>Protect all of your password, identities, cards and notes with your Master Password</FormDescription>
                </div>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="showWebsiteIcon"
            render={({ field }) => (
              <FormItem className="bg-primary/15 px-5 py-5 rounded-xl flex justify-between items-center">
                <div>
                  <FormLabel className="text-gray-300 font-bold text-lg">Show Website Icon</FormLabel>
                  <FormDescription>Beautify SAFE by enabling website icon or default icon on each items</FormDescription>
                </div>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1 border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="vaultTimeOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Vault Time Out</FormLabel>
                <FormDescription>After this minutes you will have to re-enter your masterpassword to unlock your safe</FormDescription>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      defaultValue={field.value}
                      onChange={(e) => form.setValue("vaultTimeOut", parseInt(e.target.value))}
                      className={"bg-transparent"}
                      disabled={isPending}
                      placeholder="Enter your username"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end items-end">
          <Button type="submit" disabled={isPending} className="gap-x-2 w-fit">
            Save Settings <Save size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SettingForm;
