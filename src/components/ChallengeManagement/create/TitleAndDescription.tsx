// components/ChallengeManagement/edit/ChallengeTitleAndDescriptionInput.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import type { ChallengeTitleAndDescriptionInputProps } from "@/types/challengeElementsTypes";
import { validationSchema } from "@/schemas/challengeSchema";

const ChallengeTitleAndDescriptionInput: React.FC<
  ChallengeTitleAndDescriptionInputProps
> = ({ title, description, onTitleChange, onDescriptionChange }) => {
  return (
    <div className="space-y-6 text-right mb-6 max-w-2xl w-full" dir="rtl">
      <Formik
        initialValues={{
          challengeTitle: title || "",
          challengeDescription: description || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={() => {}}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* عنوان چالش */}
            <h1 className="text-2xl font-semibold text-black mb-12">
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
                    className="rounded-[8px]"
                  />
                )}
              </Field>
            </h1>

            {/* توضیحات چالش */}
            <Field name="challengeDescription">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  value={values.challengeDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    handleChange(e);
                    onDescriptionChange(e.target.value);
                  }}
                  label="توضیحات چالش"
                  width="w-full"
                  className="rounded-primary-radius resize-none"
                  as="textarea"
                  rows={5}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChallengeTitleAndDescriptionInput;
