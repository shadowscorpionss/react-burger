import { useState } from "react";

interface IInputValue {
  [name: string]: string;
}

export const useForm = <T extends IInputValue>(inputValues: T) => {

  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}