// components/ChallengeManagement/edit/DateAndLocationInput.tsx
import React from "react";
import CustomInput from "@/components/Custom/CustomInput";
import { Field, Formik } from "formik";
import CustomButton from "@/components/Custom/CustomButton";
import type { DateAndLocationInputProps } from "@/types/challengeElementsTypes";



const DateAndLocationInput: React.FC<DateAndLocationInputProps> = ({
  challengeDate,
  challengeLocation,
  onDateChange,
  onLocationChange,
}) => {
  return (
    <div className="space-y-4 mt-6 mb-4 text-right w-full max-w-xl">
      {/* Date Field */}
      <div className="flex items-center text-sm text-gray-700 justify-end w-full">
        <CustomButton className="w-min sm:w-min md:w-min max-w-xl mr-2 h-9.5 bg-secondary rounded-[8px]  text-md sm:text-md md:text-md hover:bg-secondary">
          تغییر تاریخ
        </CustomButton>
        <Formik
          initialValues={{ challengeDate }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Field name="challengeDate">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  type="text"
                  value={values.challengeDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    onDateChange(e.target.value);
                  }}
                  label="تاریخ"
                  width="w-full"
                  className="rounded-[8px]"
                />
              )}
            </Field>
          )}
        </Formik>
      </div>

      {/* Location Field */}
      <div className="flex items-center text-sm text-gray-700 justify-end w-full">
        <Formik
          initialValues={{ challengeLocation }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Field name="challengeLocation">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  value={values.challengeLocation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    onLocationChange(e.target.value);
                  }}
                  label="مکان"
                  width="w-full"
                  className="rounded-[8px]"
                />
              )}
            </Field>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DateAndLocationInput;
