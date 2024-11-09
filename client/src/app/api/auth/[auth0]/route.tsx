import { handleAuth, handleLogout, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: process.env.LOGIN_REDIRECT_URL,
  }),
  logout: handleLogout({
    returnTo: process.env.LOGOUT_REDIRECT_URL,
  }),
});
