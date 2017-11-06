export function isConnected(flux) {
  return function ({ location: { pathname } }, replace) {
    const { sessionid } = flux.getStore('session').getState();
    if (!sessionid) replace(null, `/login?redirect=${pathname}`);
  };
}
