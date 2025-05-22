"use client";

import { signInSchema } from "lib/validations";
import AuthForm from "~/components/AuthForm";

const SignIn = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
      />
    </div>
  );
};

export default SignIn;
