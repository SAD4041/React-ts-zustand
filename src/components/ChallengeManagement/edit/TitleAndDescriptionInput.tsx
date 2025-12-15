// components/ChallengeManagement/edit/TitleAndDescriptionInput.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import type { FormikProps } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import type { ChallengeTitleAndDescriptionInputProps } from "@/types/challengeElementsTypes";
import {
  editChallengeSchema,
} from "@/schemas/challengeSchema";
import { titleAndDescriptionDefaultValues } from "@/services/challengeService";
import type { TitleAndDescriptionFormValues } from "@/types/challengeElementsTypes";



const TitleAndDescriptionInput: React.FC<ChallengeTitleAndDescriptionInputProps> = ({
  title = "",
  description = "",
  onTitleChange,
  onDescriptionChange,
}) => {
  const initialValues: TitleAndDescriptionFormValues = {
    ...titleAndDescriptionDefaultValues,
    challengeTitle: title,
    challengeDescription: description,
  };

  return (
    <Formik<TitleAndDescriptionFormValues>
      initialValues={initialValues}
      validationSchema={editChallengeSchema}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={() => {}}
    >
      {(formik: FormikProps<TitleAndDescriptionFormValues>) => {
        const { values } = formik;

        React.useEffect(() => {
          onTitleChange(values.challengeTitle);
          onDescriptionChange(values.challengeDescription);
        }, [
          values.challengeTitle,
          values.challengeDescription,
        ]);

        return (
          <Form
            className="space-y-6 text-right mt-6 max-w-2xl w-full"
            dir="rtl"
          >
            {/* عنوان چالش */}
            <div>
              <Field name="challengeTitle">
                {({ field }: { field: any }) => (
                  <CustomInput
                    {...field}
                    label="عنوان چالش"
                    width="w-full"
                    className="rounded-primary-radius"
                    showError={false}
                  />
                )}
              </Field>
            </div>

            {/* توضیحات چالش */}
            <div>
              <Field name="challengeDescription">
                {({ field }: { field: any }) => (
                  <CustomInput
                    {...field}
                    as="textarea"
                    rows={5}
                    label="توضیحات چالش"
                    width="w-full"
                    className="rounded-primary-radius resize-none"
                    showError={false}
                  />
                )}
              </Field>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TitleAndDescriptionInput;