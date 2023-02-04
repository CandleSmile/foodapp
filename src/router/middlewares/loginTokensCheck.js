import { CHECK_LOGIN_ACTION } from "@/store/storeConstants";
export default async function loginTokensCheck({ to, next, store }) {
  if (store.state.auth.status.loggedIn) {
    await store.dispatch(`auth/${[CHECK_LOGIN_ACTION]}`);
    if (!store.state.auth.status.loggedIn) {
      return next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    }
  }
  return next();
}
