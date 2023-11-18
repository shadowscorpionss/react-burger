import { useState } from "react";

export const useToggle = (initialValue: boolean | (() => boolean)) => {
  const [isOpened, setIsOpened] = useState<boolean>(() => {
    if (typeof initialValue === "function") {
      return initialValue();
    }

    return initialValue;
  });

  const toggle = () => {
    setIsOpened((prev) => !prev);
  };

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };


  return { isOpened, toggle, open, close };
};