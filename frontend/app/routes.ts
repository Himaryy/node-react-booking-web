import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  //   route("/", "routes/user/pages/HomePage.tsx"),
  layout("routes/user/pages/LoginLayout.tsx", [
    route("/sign-in", "routes/user/sign-in/SignIn.tsx"),
    route("/sign-up", "routes/user/sign-up/SignUp.tsx"),
  ]),

  layout("routes/user/pages/UserLayout.tsx", [
    route("/", "routes/user/pages/HomePage.tsx"),
  ]),
] satisfies RouteConfig;
