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
    const result = await sendFormData(data);
    console.log(result, "asdasd");
    if (result.message === "task done susscessfully") {
      localStorage.setItem("adminDetails", JSON.stringify(result.session));
      setIsAdmin(true);
      return result;
    } else {
      console.log({ result });
      return result;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminDetails")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return { isAdmin, handleSubmitForm, isLoading };
}

export default useAdminHook;
