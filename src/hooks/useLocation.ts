export function useLocation() {
  const pathname = window.location.pathname;
  return { pathname };
}