"use client";

import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { useRouter } from "next/navigation";
import { LoginSchema, ProfileCreationSchema } from "@/schemas";
import { Textarea } from "../ui/textarea";
  



export const ProviderProfileCreation = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof ProfileCreationSchema>>({
    resolver: zodResolver(ProfileCreationSchema),
    defaultValues: {
      provider_name: "",
      provider_location: "",
      provider_description: "",
      provider_services: "",
    },
  });
  const onSubmit = (values:  z.infer<typeof ProfileCreationSchema> ) => {
    setError("");
    //needs to be edited
      

        router.push("/auth/login");
      

   
  };
  return (
    <div>

  <CardWrapper
      headerLabel="Set your profile"
      backButtonLabel="Not your role?"
      backButtonHref="/auth/role"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="provider_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your provider name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provider_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provider_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Basta yun"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provider_services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services Offered</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What services do you offer?"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
      </CardWrapper>
    </div>
  );
};
