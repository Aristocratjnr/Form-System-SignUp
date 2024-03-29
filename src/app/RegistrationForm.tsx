'use client'
import { useFormState } from "react-dom";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { schema } from "./registrationSchema";

export const RegistrationForm = ({
  onDataAction,
  onFormAction,
}: {
  onDataAction: (data: z.infer<typeof schema>) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipcode: "",
      dob: undefined, // Set dob to undefined
      file: undefined, // Set file to undefined
      description: undefined, // Set description to undefined
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    // Perform form submission action
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zipcode</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your zipcode.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Additional Fields */}
        <FormField
  control={form.control}
  name="dob"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Date of Birth</FormLabel>
      <FormControl>
        {/* Convert the Date object to a string */}
        <Input
          type="date"
          placeholder=""
          // Ensure field.value is a string
          value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
          // Pass the rest of the field properties
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      </FormControl>
      <FormDescription>Your date of birth.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormDescription>Upload your file.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="textarea" {...field} />
              </FormControl>
              <FormDescription>Provide a description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of Additional Fields */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
