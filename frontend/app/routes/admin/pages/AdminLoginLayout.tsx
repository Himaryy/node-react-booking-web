import { Outlet } from "react-router";

const LoginLayout = () => {
  return (
    <main className="flex justify-center items-center min-h-screen  bg-gray-900">
      <section className="bg-gray-200 shadow-lg p-8 pb-12 w-sm rounded-tl-xl rounded-tr-[80px] rounded-bl-[80px] rounded-br-xl ">
        <Outlet />
      </section>
    </main>
  );
};

export default LoginLayout;
