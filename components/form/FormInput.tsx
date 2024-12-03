import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
};

import React from "react";

function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  step,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          required
          step={step}
          onChange={onChange} // Pass onChange to Input
        />
      </div>
    </div>
  );
}

export default FormInput;
