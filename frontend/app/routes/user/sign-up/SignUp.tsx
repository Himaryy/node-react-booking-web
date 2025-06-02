import axios from "axios";
import { useAuth } from "hooks/AuthProvider";
import { signUpSchema, type SignUpInput } from "lib/validations";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { withMinimumLoading } from "utils/MinimumTime";
import AuthForm from "~/components/AuthForm";

const defaultValues: SignUpInput = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: SignUpInput) => {
    setIsLoading(true);

    try {
      await withMinimumLoading(
        async () => {
          await axios.post("http://localhost:8000/user/register", data);

          // auto login
          await login(data.email, data.password);

          navigate("/", { replace: true });
        },
        setIsLoading,
        1000
      );

      return { success: true };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        error: error?.message || "Terjadi kesalahan saat pendaftaran",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        onSubmit={handleSignUp}
        defaultValues={defaultValues}
        loading={isLoading}
      />
    </div>
  );
};

export default SignUp;
