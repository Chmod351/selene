import { useState, useEffect } from "react";

function useAdminHook() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendFormData = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleSubmitForm = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await sendFormData(data);
      console.log(result, "asdasd");
      if (result && result.message === "task done susscessfully") {
        console.log("adminDetails", result.session);
        localStorage.setItem("adminDetails", JSON.stringify(result.session));
        // redirigir a adminForm
        window.location.href = "/adminForm";

        setIsLoading(false);
        setIsAdmin(true);
        return result;
      } else {
        setIsLoading(false);

        console.log({ result });

        return result;
      }
    } catch (e) {
      /* handle error */
      console.log(e);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const adminData = localStorage.getItem("adminDetails");
    if (!adminData) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const adminDetails = localStorage.getItem("adminDetails");
    if (adminDetails) {
      setIsAdmin(true);
    }
  }, [isAdmin]);

  return { isAdmin, handleSubmitForm, isLoading };
}

export default useAdminHook;
