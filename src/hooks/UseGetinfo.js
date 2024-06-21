export const UseGetinfo = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData) {
      return { name: '', profile: '', userId: '', isauth: false };
    }
    const { name, profile, userId, isauth } = authData;
    return { name, profile, userId, isauth };
  };
  