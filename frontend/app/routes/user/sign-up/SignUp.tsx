import { signUpSchema } from "lib/validations";
import React from "react";
import AuthForm from "~/components/AuthForm";

const SignUp = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
          fullName: "",
          email: "",
          password: "",
        }}
      />
    </div>
  );
};

export default SignUp;
