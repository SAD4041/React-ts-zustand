import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, type FieldProps } from "formik";

interface CustomCheckboxProps {
  name: string;
  labelText?: string;
  textTransparentOnChecked?: boolean;
  classNames?: {
    label?: string;
    checkbox?: string;
  }; 
  viewOnly?: {
    isViewOnly?: boolean;
    checked?: boolean;
  };
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  labelText = "متن",
  textTransparentOnChecked = false,
  classNames = {},
  viewOnly = { isViewOnly: false, checked: false },
}) => {
  if (!viewOnly.isViewOnly) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const hasError = meta.touched && meta.error;
        const isChecked = field.value || false;

        const handleChange = (checked: boolean) => {
          form.setFieldValue(name, checked);
        };

        return (
          <div className="w-full flex justify-end">
            <label className="flex items-center cursor-pointer">
              <span
                className={`text-lg text-black mr-2 
                          ${
                            textTransparentOnChecked &&
                            isChecked &&
                            "opacity-30"
                          }
                           ${classNames?.label}`}
              >
                {labelText}
              </span>
              <Checkbox
                name={field.name}
                checked={isChecked}
                onCheckedChange={handleChange}
                onBlur={field.onBlur}
                className={`
                  rounded-[4px] 
                  border-[2px]
                  border-[#000] 
                  bg-white
                  data-[state=checked]:text-black
                  data-[state=checked]:bg-primary
                  ${classNames?.checkbox}
                `}
              />
            </label>
            {hasError && (
              <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
}
  return (<Checkbox
                checked={viewOnly.checked}
                className={`
                  rounded-[4px] 
                  border-[2px]
                  border-[#000] 
                  bg-white
                  data-[state=checked]:text-black
                  data-[state=checked]:bg-primary
                  ${classNames?.checkbox}
                `}
              />);
};

export default CustomCheckbox;
