"use client";

import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FIELD_NAMES, FIELD_TYPES } from "constant";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { toast } from "sonner";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
  loading?: boolean;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
  loading = false,
}: //   onSubmit,
Props<T>) => {
  // const router = useRoute
  const isSignIn = type === "SIGN_IN";

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = async (data: T) => {
    setSubmitError(null);
    const result = await onSubmit(data);

    if (!result.success) {
      setSubmitError(result.error || "An error occurred. Please try again.");
      toast.error(
        isSignIn
          ? "Email atau Password Salah"
          : "Gagal mendaftar. Silakan coba lagi.",
        {
          richColors: true,
          style: { backgroundColor: "#dc2626", color: "white" },
        }
      );
    }

    if (result.success) {
      toast.success(
        isSignIn ? "Berhasil Login" : "Pendaftaran berhasil! Selamat datang.",
        {
          richColors: true,
          style: { backgroundColor: "#16a34a", color: "white" },
        }
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl font-semibold">
          {isSignIn ? "Welcome Back, Mate!" : "Create Your Account"}
        </h1>
      </div>

      <Form {...form}>
        <form
          className="space-y-2 w-full h-max-[1300px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-md">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>

                  <FormControl>
                    <Input
                      required
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      placeholder={
                        FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                      }
                      className="w-full min-h-[50px] text-lg placeholder:font-normal placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:shadow-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-8 w-full items-center justify-center rounded-md font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              {isSignIn ? "Sign In" : "Sign Up"}
              {loading && (
                <OrbitProgress style={{ fontSize: "4px" }} color="white" />
              )}
            </span>
          </Button>
        </form>

        <p className="text-sm font-semibold text-center p-2">
          {isSignIn ? "New User ? " : "Already have an Account ? "}
          <Link
            to={isSignIn ? "/sign-up" : "/sign-in"}
            className="  text-green-700"
          >
            {isSignIn ? "Create an Account" : "Sign In"}
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default AuthForm;
