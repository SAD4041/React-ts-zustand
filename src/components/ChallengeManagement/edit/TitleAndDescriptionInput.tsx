// components/ChallengeManagement/edit/ChallengeTitleAndDescriptionInput.tsx
import React from "react";
import { Field, Formik } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea";
import type { ChallengeTitleAndDescriptionInputProps } from "@/types/challengeElementsTypes";


const TitleAndDescriptionInput: React.FC<
  ChallengeTitleAndDescriptionInputProps
> = ({ title, description, onTitleChange, onDescriptionChange }) => {
  return (
    <div
      className="space-y-6 text-right mb-6
     mt-6 max-w-2xl w-full"
      dir="rtl"
    >
      {/* Title Field */}
      <h1 className="text-2xl font-semibold text-black mb-4">
        <Formik
          initialValues={{ challengeTitle: title }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Field name="challengeTitle">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  value={values.challengeTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    onTitleChange(e.target.value);
                  }}
                  label="عنوان چالش"
                  width="w-full"
                  className="rounded-[8px] mb-4"
                />
              )}
            </Field>
          )}
        </Formik>
      </h1>

      {/* Description Field */}
      <Formik
        initialValues={{ challengeDescription: description }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Field name="challengeDescription">
            {({ field }: any) => (
              <CustomInput
                {...field}
                value={values.challengeDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                  onDescriptionChange(e.target.value);
                }}
                width="w-full"
                label="توضیحات چالش"
                className="rounded-[8px] resize-none"
                as = "textarea"
                rows={5}
              />
            )}
          </Field>
        )}
      </Formik>
    </div>
  );
};

export default TitleAndDescriptionInput;
