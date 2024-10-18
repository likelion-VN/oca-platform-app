import { NavigateFunction, NavigateOptions } from "react-router-dom";

let navigate: NavigateFunction | null = null;

export const setNavigate = (navFunction: NavigateFunction) => {
  navigate = navFunction;
};

export const safeNavigate = (path: string, options?: NavigateOptions) => {
  if (navigate) {
    navigate(path, options);
  } else {
    console.error("Navigation function is not set.");
  }
};

export const getNavigate = (): NavigateFunction | null => navigate;
