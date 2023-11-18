import { useState } from "react";

interface IAnswer {
  [name: string]: string;
}

export const useForm = <T extends IAnswer>(inputValues: T) => {

  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}