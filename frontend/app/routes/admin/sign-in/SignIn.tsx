import { useAuth } from "hooks/AuthProvider";
import { signInSchema } from "lib/validations";
import { useState } from "react";
import { useNavigate } from "react-router";
import { withMinimumLoading } from "utils/MinimumTime";
import AuthForm from "~/components/AuthForm";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: typeof defaultValues) => {
    setIsLoading(true);

    try {
      await withMinimumLoading(
        async () => {
          await loginAdmin(data.email, data.password);

          navigate("/dashboard");
        },
        setIsLoading,
        1000
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <AuthForm
        type="SIGN_ADMIN"
        schema={signInSchema}
        defaultValues={defaultValues}
        onSubmit={handleLogin}
        loading={isLoading}
      />
    </div>
  );
};

export default SignIn;
