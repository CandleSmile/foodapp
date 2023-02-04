import { CHECK_LOGIN_ACTION } from "@/store/storeConstants";
export default async function loginTokensCheck({ to, next, store, router }) {
  if (store.state.auth.status.loggedIn) {
    await store.dispatch(`auth/${[CHECK_LOGIN_ACTION]}`);
    if (!store.state.auth.status.loggedIn) {
      return router.push({ name: "login", query: { redirect: to.fullPath } });
    }
  }
  return next();
}
