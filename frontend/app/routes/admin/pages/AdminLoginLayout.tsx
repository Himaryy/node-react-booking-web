import { useAuth } from "hooks/AuthProvider";
import { Navigate, Outlet } from "react-router";

const LoginLayout = () => {
  const { admin } = useAuth();

  // Tahan render sampai admin selesai di-fetch dan delay selesai
  // if (isDelayDone) {
  //   return null; // atau bisa ganti dengan spinner
  // }

  // // Setelah loading selesai + delay selesai, baru cek auth
  if (admin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-900">
      <section className="bg-gray-200 shadow-lg p-8 pb-12 w-sm rounded-tl-xl rounded-tr-[80px] rounded-bl-[80px] rounded-br-xl">
        <Outlet />
      </section>
    </main>
  );
};

export default LoginLayout;
