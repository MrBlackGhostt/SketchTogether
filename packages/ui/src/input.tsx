import React, { Dispatch, SetStateAction } from "react";

const Input = ({
  type,
  placeholder,
  setFun,
}: {
  type: string;
  placeholder: string;
  setFun: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => setFun(e.target.value)}
    />
  );
};

export default Input;
