export default function authCheck({ to, next, store, router }) {
  if (!store.state.auth.status.loggedIn) {
    return router.push({ name: "login", query: { redirect: to.fullPath } });
  }
  return next();
}
