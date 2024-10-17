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

  setCompanyUser: (companyUser: boolean) => {
    localStorage.isCompanyUser = companyUser
  },

  isCompanyUser: () => localStorage.isCompanyUser,

  setCandidateUser: (candidateUser: boolean) => {
    localStorage.isCandidateUser = candidateUser
  },

  isCandidateUser: () => localStorage.isCandidateUser,

  setIsLoginLocal: (isLoginLocal: boolean) => {
    localStorage.isLoginLocal = isLoginLocal;
  },

  isLoginLocal: () => {
    return (
      localStorage.isLoginLocal === true || localStorage.isLoginLocal === "true"
    );
  },

  setIsLogin: (isLogin: boolean) => {
    localStorage.isLogin = isLogin;
  },

  isLogin: () => localStorage.isLogin,
  
  isLoginByGoogle: () => localStorage.isLoginByGoogle === "true",

  isLoginByLinkedin: () => localStorage.isLoginByLinkedin === "true",

  clearLocalStorage: () => localStorage.clear(),

  logout: () => {
    localStorage.clear();
  },
};

export default auth;
