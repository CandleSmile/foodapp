const loadLayoutMiddleware = async (route) => {
  const { layout } = route.meta;
  const layoutName = layout || "MainLayout"; //  may bring layouts to constants
  const component = await import(`@/layouts/${layoutName}.vue`);
  route.meta.layoutComponent = component.default;
};

export { loadLayoutMiddleware };
