import { useState, useEffect } from "react";

import { UseIsMobileResult } from "@/hooks/types";

function useIsMobile(): UseIsMobileResult {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Establecer el estado inicial cuando el componente se monta
    handleResize();

    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isModalOpen, setIsModalOpen };
}

export default useIsMobile;
