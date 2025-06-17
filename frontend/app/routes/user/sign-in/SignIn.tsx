import { useAuth } from "hooks/AuthProvider";
import { signInSchema } from "lib/validations";
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthForm from "~/components/AuthForm";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // if (isLoading) {
  //   return null;
  // }

  // if (user) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  const onSubmit = async (data: typeof defaultValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      await delay(1000);

      navigate("/");
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
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default SignIn;
