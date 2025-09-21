import { useEffect, useState } from "react";

type ScreenSize = "sm" | "lg";

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  function getScreenSize(): ScreenSize {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 640 ? "lg" : "sm";
    }
    // Return a default value if running in a non-browser environment
    return "sm";
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = (): void => {
        setScreenSize(getScreenSize());
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return {
    screenSize,
    isSm: screenSize === "sm",
    isLg: screenSize === "lg",
  };
}
