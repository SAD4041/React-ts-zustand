import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, type FieldProps } from "formik";

interface CustomCheckboxProps {
  name: string;
  labelText?: string;
  textTransparentOnChecked?: boolean; 
  classNames?: {
    label?: string;
    checkbox?: string;
  }; 
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  labelText = 'متن',
  textTransparentOnChecked = false,  
  classNames = {},
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const hasError = meta.touched && meta.error;
        const isChecked = field.value || false;
        
        const handleChange = (checked: boolean) => {
          form.setFieldValue(name, checked);
        };
        
        
        return (
          <div className="w-full">
            <label className="flex items-center cursor-pointer">
              <span
                className={`text-lg text-black mr-2 
                          ${textTransparentOnChecked && isChecked ? 'opacity-30' : ''}
                           ${classNames.label || ''}`}
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
                  bg-white
                  data-[state=checked]:text-black
                  data-[state=checked]:bg-[var(--orange-primary-color)]
                  ${classNames.checkbox || ''}
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
};

export default CustomCheckbox;
