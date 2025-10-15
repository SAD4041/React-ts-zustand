import { Input } from "@/components/ui/input";
import { useField } from "formik";
import type { InputHTMLAttributes } from "react";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement>;

function CustomInput(props: CustomInputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <Input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "input-error"
            : "" +
              " " +
              "placeholder: font-bold placeholder:text-[#6C96E6] h-[40px] border-[2px] border-[#000] text-[30px] p-[10px] bg-[transparent] rounded-[15px] text-right shadow-(--shadow-button)"
        }
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
}

export default CustomInput;
