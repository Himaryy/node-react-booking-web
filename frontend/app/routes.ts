import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // admin
  layout("routes/admin/pages/AdminLoginLayout.tsx", [
    route("/login-admin", "routes/admin/sign-in/SignIn.tsx"),
  ]),

  layout("routes/admin/pages/AdminLayout.tsx", [
    route("/dashboard", "routes/admin/pages/Dashboard.tsx"),
    route("/tambah-ruangan", "routes/admin/pages/TambahRuangan.tsx"),
  ]),

  // User
  layout("routes/user/pages/LoginLayout.tsx", [
    route("/sign-in", "routes/user/sign-in/SignIn.tsx"),
    route("/sign-up", "routes/user/sign-up/SignUp.tsx"),
  ]),

  layout("routes/user/pages/UserLayout.tsx", [
    route("/", "routes/user/pages/HomePage.tsx"),
    route("/daftar-booking", "routes/user/pages/DaftarBooking.tsx"),
  ]),
] satisfies RouteConfig;
