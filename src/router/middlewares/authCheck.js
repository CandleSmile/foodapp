export default function authCheck({ to, next, store }) {
  if (!store.state.auth.status.loggedIn) {
    return next({
      name: "login",
      query: { redirect: to.fullPath },
    });
  }
  return next();
}
