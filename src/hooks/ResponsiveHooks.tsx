import { useMediaQuery } from "react-responsive";
export function useDesktop() {
  return useMediaQuery({
    minWidth: 1024,
  });
}
export function useTablet() {
  return useMediaQuery({
    minWidth: 640,
    maxWidth: 1023,
  });
}
export function useMobile() {
  return useMediaQuery({
    maxWidth: 639,
  });
}
export function useMobileTablet() {
  return useMediaQuery({
    maxWidth: 639,
  });
}
export function useTabletDesktop() {
  return useMediaQuery({
    minWidth: 640,
  });
}
