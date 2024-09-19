import { useState, useEffect } from "react";

function useAdminHook() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("adminDetails")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return { isAdmin };
}

export default useAdminHook;
