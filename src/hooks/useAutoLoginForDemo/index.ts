import { useCallback, useEffect, useState } from "react";
import { authProvider } from "../../providers";

/**
 * This hook is used to automatically login the user.
 * We use this hook to skip the login page and demonstrate the application more quickly.
 */
export const useAutoLoginForDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shouldLogin = localStorage.getItem("auto_login") !== "false";
    if (!shouldLogin) {
      setIsLoading(false);
      return;
    }
  }, []);

  return { loading: isLoading };
};

/**
 *  Enable auto login feature.
 *  This is used to skip the login page and demonstrate the application more quickly.
 */
export const enableAutoLogin = () => {
  localStorage.setItem("auto_login", "true");
};

/**
 *  Disable auto login feature.
 *  This is used to skip the login page and demonstrate the application more quickly.
 */
export const disableAutoLogin = () => {
  localStorage.setItem("auto_login", "false");
};
