import { useAuth } from "hooks/AuthProvider";
import { Navigate, Outlet } from "react-router";

const LoginLayout = () => {
  const { user } = useAuth();

  // Tampilkan loader atau null saat masih loading admin info
  // if (isLoading) return null;

  // Jika sudah login sebagai admin, redirect ke dashboard
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <main className="flex justify-center items-center min-h-screen  bg-gray-200">
      <section className="bg-white shadow-lg p-8 w-sm rounded-tl-xl rounded-tr-[80px] rounded-bl-[80px] rounded-br-xl ">
        <Outlet />
      </section>
    </main>
  );
};

export default LoginLayout;
