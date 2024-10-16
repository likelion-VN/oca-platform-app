import _ from "lodash";

type CustomLocalStorage = Storage & {
  [key: string]: any;
};

const localStorage = ((typeof window !== "undefined" &&
  window.localStorage) as CustomLocalStorage) || {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

const auth = {
  saveShareData: (shareData: any) => {
    _.assign(localStorage, { ...shareData });
  },

  setRoles: (roles: number) => {
    localStorage.roles = roles;
  },

  roles: () => localStorage.roles,

  setIsLoginLocal: (isLoginLocal: boolean) => {
    localStorage.isLoginLocal = isLoginLocal;
  },

  isLoginLocal: () => {
    return (
      localStorage.isLoginLocal === true || localStorage.isLoginLocal === "true"
    );
  },

  isLogin: () => {
    localStorage.isLogin = !!localStorage.email;
    return localStorage.isLogin === "true";
  },

  isLoginByGoogle: () => localStorage.isLoginByGoogle === "true",

  isLoginByLinkedin: () => localStorage.isLoginByLinkedin === "true",

  logout: () => {
    localStorage.clear();
  },
};

export default auth;
