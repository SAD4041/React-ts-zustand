// components/ChallengeManagement/create/CreationStepTwo.tsx
import React from "react";
import CustomInput from "@/components/Custom/CustomInput";
import CustomSelect from "@/components/Custom/CustomDropList";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import { Field } from "formik";
import type { FieldProps } from "formik";
import type { Step2DetailsProps } from "@/types/challengeCreateTypes";

const Step2Details: React.FC<Step2DetailsProps> = ({
  categories,
  loadingCategories = false,
  values,
  setFieldValue,
  errors,
  touched,
}) => {
  if (loadingCategories) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-text">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent align-[-0.125em]" 
             role="status" 
             aria-label="در حال بارگذاری">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <p className="mt-4">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-12 text-error">
        دسته‌بندی موجود نیست
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mt-7 mb-5 space-y-10">
      {/* دسته‌بندی چالش */}
      <div className="space-y-3">
        <CustomSelect
          name="selectedCategory"
          label="دسته بندی چالش"
          options={categories.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          error={touched.selectedCategory && errors.selectedCategory} // ← خطا رو به کامپوننت پاس می‌دیم
        />
      </div>

      {/* تاریخ و ساعت شروع و پایان */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="startDate">
          {({ field, meta }: FieldProps) => (
            <CustomInput
              {...field}
              label="تاریخ شروع"
              type="date"
              error={meta.touched && meta.error}
            />
          )}
        </Field>

        <Field name="startTime">
          {({ field, meta }: FieldProps) => (
            <CustomInput
              {...field}
              label="ساعت شروع"
              type="time"
              error={meta.touched && meta.error}
            />
          )}
        </Field>

        <Field name="endDate">
          {({ field, meta }: FieldProps) => (
            <CustomInput
              {...field}
              label="تاریخ پایان"
              type="date"
              error={meta.touched && meta.error}
            />
          )}
        </Field>

        <Field name="endTime">
          {({ field, meta }: FieldProps) => (
            <CustomInput
              {...field}
              label="ساعت پایان"
              type="time"
              error={meta.touched && meta.error}
            />
          )}
        </Field>
      </div>

      {/* مکان چالش */}
      <Field name="challengeLocation">
        {({ field, meta }: FieldProps) => (
          <CustomInput
            {...field}
            label="مکان چالش"
            error={meta.touched && meta.error}
          />
        )}
      </Field>

      {/* نوع چالش */}
      <div className="mt-6">
        <CustomSelect
          name="challengeType"
          label="نوع چالش"
          options={[
            { value: "عمومی", label: "عمومی" },
            { value: "شخصی", label: "شخصی" },
          ]}
        />
      </div>

      {/* چک‌باکس کامنت‌ها */}
      <div className="mt-6 flex justify-end">
        <CustomCheckbox
          name="isCommentsEnabled"
          labelText="اجازه دادن به کامنت‌ها"
          checked={values.isCommentsEnabled}
          onChange={() =>
            setFieldValue("isCommentsEnabled", !values.isCommentsEnabled)
          }
        />
      </div>
    </div>
  );
};

export default Step2Details;