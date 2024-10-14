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

  setAuthorizedToken: (authorizedToken: string) => {
    localStorage.authorizedToken = authorizedToken;
  },

  authorizedToken: () => localStorage.authorizedToken,

  setUserData: (me: any) => {
    localStorage.isSuccess = !_.isEmpty(me);
    localStorage.userId = me?.id;
    localStorage.username = me?.username;
    localStorage.firstName = me?.firstName;
    localStorage.lastName = me?.lastName;
    localStorage.email = me?.email;
    localStorage.phone1 = me?.contact?.phone1;
    localStorage.country = me?.contact?.country;
    localStorage.roles = JSON.stringify(me?.roles);
    localStorage.freshChatRestoreId = me?.freshChatRestoreId;
    localStorage.willViewTutorialLater = me?.willViewTutorialLater;
    localStorage.willShowWhatNewPopup = me?.willViewTutorialLater;
    localStorage.canUseAiViewer = me?.canUseAiViewer;
    localStorage.isTestAccount = me?.isTestAccount;
    localStorage.isEmailVerified = me?.isEmailVerified;
  },

  setAccessToken: (accessToken: string) => {
    localStorage.accessToken = accessToken;
  },

  accessToken: () => localStorage.accessToken,

  setUserId: (userId: string) => {
    localStorage.userId = userId;
  },

  userId: () =>
    // store.getState().me?.id ||
    localStorage?.userId,

  setRoles: (roles: string) => {
    localStorage.roles = JSON.stringify(roles);
  },

  roles: () => (localStorage.roles ? JSON.parse(localStorage.roles) : []),

  isLoginByGoogle: () =>
    localStorage.isLoginByGoogle === "true",

  isLoginByLinkedin: () =>
    localStorage.isLoginByLinkedin === "true",

  logout: () => {
    localStorage.clear();
  },

  logoutExceptUsername: () => {
    const { firstName, lastName } = localStorage;
    localStorage.clear();
    localStorage.firstName = firstName;
    localStorage.lastName = lastName;
  },
};

export default auth;
