/**
 * @file card-form.tsx
 * @description This component is used to create or update a card entry.
 * @usage It is used in variant-form.tsx.
 */

"use client";

import * as OTPAuth from "otpauth";
import * as z from "zod";

import React, { FC, useEffect, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Check, Copy, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Card } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CopyToClipboard from "../copy";
import createCard from "@/actions/createCard";
import { UserDataType } from "@/types";
import { useSession } from "next-auth/react";
import { decrypt } from "@/lib/encryption";
import Error from "../error";

type CardFormValue = z.infer<typeof CardSchema>;

const CardForm: FC<{
  formState: string;
  initialValues: Card | null;
  userInfo: UserDataType;
}> = ({ formState, initialValues, userInfo }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<CardFormValue>({
    resolver: zodResolver(CardSchema),
  });

  // Reset form when initialValues or formState changes
  useEffect(() => {
    const userMasterpass = session?.user.masterPassword || "";
    form.reset({
      label: initialValues ? initialValues.label : "",
      holderName: initialValues ? initialValues.holderName : "",
      brand: initialValues ? initialValues.brand : "",
      expirationMonth: initialValues ? initialValues.expirationMonth : "",
      expirationYear: initialValues ? initialValues.expirationYear : "",
      categoryId: initialValues?.categoryId ? initialValues.categoryId : "",
      cardNumber: initialValues ? decrypt(initialValues.cardNumber, userMasterpass) || "" : "",
      cvv: initialValues ? decrypt(initialValues.cvv, userMasterpass) || "" : "",
      note: initialValues?.note ? decrypt(initialValues.cvv, userMasterpass) || "" : "",
      requireMasterPassword: initialValues ? initialValues.requireMasterPassword : false,
    });
  }, [initialValues, formState, form, session]);

  useEffect(() => {
    if (formState === "new") {
      form.reset({
        label: "",
        holderName: "",
        brand: "",
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        categoryId: undefined,
        cvv: "",
        note: "",
        requireMasterPassword: false,
      });
    }
  }, [formState, form]);

  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);

  useEffect(() => {
    setShowCardNumber(false);
  }, [initialValues]);

  const onSubmit = (values: CardFormValue) => {
    startTransition(async () => {
      if (session) {
        const newCard = await createCard(values, initialValues?.id || "", session);
        if (newCard) {
          toast("Success !!", {
            description: "Congrulation your card is created",
          });
          router.refresh();
        } else {
          toast("Error !!", {
            description: "Can't create card",
          });
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 mt-14 grid gap-x-10 grid-cols-2">
        <div className="border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Card Label</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    className={cn(formState === "read" && "bg-transparent")}
                    disabled={isPending}
                    placeholder="Label your card"
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
                      <SelectValue placeholder="Organize your crads" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="-">Uncategorized</SelectItem>
                    {userInfo.categories.map((category, index) => (
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
            name="holderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Card Holdername</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your holderName"
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
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Brand</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your brand"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1 border-primary/20 border-b py-5 w-full">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Card Number</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-5">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Enter your card number"
                      type={showCardNumber ? "text" : "password"}
                      {...field}
                    />
                    {formState === "read" && (
                      <>
                        <div
                          onClick={() => setShowCardNumber((prev) => !prev)}
                          className="hover:bg-muted cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center"
                        >
                          {showCardNumber ? <EyeOff /> : <Eye />}
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
        <div className="space-y-1 border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Security code (CVV)</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="CVV of your crad"
                      type={showCardNumber ? "text" : "password"}
                      {...field}
                    />
                    {formState === "read" && (
                      <>
                        <div
                          onClick={() => setShowCardNumber((prev) => !prev)}
                          className="hover:bg-muted cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center"
                        >
                          {showCardNumber ? <EyeOff /> : <Eye />}
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
        <div className="space-y-1 border-primary/20 border-b py-5">
          <FormField
            control={form.control}
            name="expirationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Expiration year</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Expiration year of your card"
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
            name="expirationMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Expiration month</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Expiration month of your card"
                      {...field}
                    />
                  </div>
                </FormControl>
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
                <FormLabel className="text-gray-300 font-semibold tracking-wide">Notes</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Textarea
                      defaultValue={field.value}
                      className={cn(formState === "read" && "bg-transparent")}
                      disabled={isPending}
                      placeholder="Note for your Card"
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
                  <FormLabel>Requires masterpassword everytime to check Card info</FormLabel>
                  <FormDescription>Check it so that every Card info requires masterpassword to view/copy password *recommended*</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-end">
          <Button type="submit" disabled={isPending} className="gap-x-2 w-fit">
            Save Card <Save size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CardForm;
