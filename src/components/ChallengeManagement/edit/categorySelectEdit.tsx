// components/ChallengeManagement/edit/CategorySelectEdit.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomSelect from "@/components/Custom/CustomDropList";
import type { CategorySelectEditProps } from "@/types/challengeElementsTypes";
import { selectSchema } from "@/schemas/challengeSchema";

const CategorySelectEdit: React.FC<CategorySelectEditProps> = ({
  categories,
  loading = false,
  selectedCategory = "",
  onCategoryChange,
}) => {
  return (
    <Formik
      initialValues={{ selectedCategory }}
      validationSchema={selectSchema}
      enableReinitialize={true}
      onSubmit={() => {}}
    >
      {({ values }) => {
        React.useEffect(() => {
          onCategoryChange(values.selectedCategory);
        }, [values.selectedCategory]);

        if (loading) {
          return (
            <div className="flex flex-col items-center justify-center py-6 text-gray-text">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent align-[-0.125em]"
                role="status"
                aria-label="در حال بارگذاری"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-4">در حال بارگذاری...</p>
            </div>
          );
        }

        if (!categories.length) {
          return (
            <div className="text-center py-6 text-error">
              دسته‌بندی موجود نیست
            </div>
          );
        }

        return (
          <Form className="space-y-3" dir="rtl">
            <Field name="selectedCategory">
              {({ field }: any) => (
                <CustomSelect
                  name="selectedCategory"
                  label="دسته‌بندی چالش"
                  options={categories.map((cat) => ({
                    value: cat.name,
                    label: cat.name,
                  }))}
                  showError={false}
                />
              )}
            </Field>

            <ErrorMessage name="selectedCategory">
              {(msg) => (
                <div className="text-error text-sm mt-1 text-right pr-1">
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategorySelectEdit;
