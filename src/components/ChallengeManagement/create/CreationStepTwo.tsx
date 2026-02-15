// components/ChallengeManagement/create/CreationStepTwo.tsx
import React from "react";
import { Search } from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput";
import CustomSelect from "@/components/Custom/CustomDropList";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import AllSelectedCategoryTag from "@/components/Custom/selectedCategoryTags";
import { Field } from "formik";
import type { FieldProps } from "formik";
import type { StepTwoProps } from "@/types/challengeCreateTypes";

interface Step2DetailsProps extends StepTwoProps {
  onCategoriesChange: (categories: string[]) => void;
  errors?: {
    selectedCategories?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    challengeLocation?: string;
  };
  touched?: {
    selectedCategories?: boolean;
    startDate?: boolean;
    startTime?: boolean;
    endDate?: boolean;
    endTime?: boolean;
    challengeLocation?: boolean;
  };
}

const Step2Details: React.FC<Step2DetailsProps> = ({
  selectedCategories,
  onCategoriesChange,
  categorySearch,
  setCategorySearch,
  filteredCategories,
  values,
  setFieldValue,
  errors,
  touched,
}) => {
  const handleRemoveCategory = (categoryToRemove: string) => {
    onCategoriesChange(selectedCategories.filter((c) => c !== categoryToRemove));
  };

  return (
    <div className="w-full max-w-xl mt-7 mb-5 space-y-8">
      {/* دسته‌بندی */}
      <div>
        <div className="relative">
          <CustomInput
            name="category"
            type="text"
            label="دسته"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full p-3 pr-10 border rounded-primary-radius focus:ring-2 outline-none text-right"
          />
          <Search className="absolute right-3 top-10 -translate-y-1/2 text-gray-text w-5 h-5 pointer-events-none" />
        </div>

        {categorySearch && filteredCategories.length > 0 && (
          <div className="mt-2 border rounded-md bg-white shadow-lg max-h-48 overflow-y-auto z-10">
            {filteredCategories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  onCategoriesChange([...selectedCategories, cat]);
                  setCategorySearch("");
                }}
                className="px-4 py-2 cursor-pointer text-sm text-right"
              >
                {cat}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCategories.map((cat) => (
            <AllSelectedCategoryTag
              key={cat}
              category={cat}
              onRemove={handleRemoveCategory}
            />
          ))}
        </div>

        {/* فقط یک بار خطا نمایش بده — اینجا! */}
        {touched?.selectedCategories && errors?.selectedCategories && (
          <p className="mt-2 text-sm text-error text-right">
            {errors.selectedCategories}
          </p>
        )}
      </div>

      {/* تاریخ و ساعت */}
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

      {/* مکان */}
      <Field name="challengeLocation">
        {({ field, meta }: FieldProps) => (
          <CustomInput
            {...field}
            label="مکان "
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

      {/* کامنت‌ها */}
      <div className="mt-6">
        <CustomCheckbox
          name="isCommentsEnabled"
          labelText="اجازه دادن به کامنت‌ها"
          checked={values.isCommentsEnabled}
          onChange={() => setFieldValue("isCommentsEnabled", !values.isCommentsEnabled)}
        />
      </div>
    </div>
  );
};

export default Step2Details;