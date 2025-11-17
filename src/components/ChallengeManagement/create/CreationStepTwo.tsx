import React from "react";
import { Search } from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput";
import CustomSelect from "@/components/ChallengeManagement/create/CustomDropList";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import { Field } from "formik";
import type { FieldProps } from "formik";

interface Props {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categorySearch: string;
  setCategorySearch: React.Dispatch<React.SetStateAction<string>>;
  filteredCategories: string[];
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

const Step2Details: React.FC<Props> = ({
  selectedCategories,
  setSelectedCategories,
  categorySearch,
  setCategorySearch,
  filteredCategories,
  values,
  setFieldValue,
}) => {
  return (
    <div className="w-full max-w-xl mt-7 mb-5">
      {/* ── Category selector ── */}
      <div className="mt-4">
        <div className="relative">
          <CustomInput
            name="category"
            type="text"
            label="دسته"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full p-3 pr-10 border rounded-md focus:ring-2 outline-none text-right"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>

        {categorySearch && filteredCategories.length > 0 && (
          <div className="mt-2 border rounded-md bg-white shadow-lg max-h-48 overflow-y-auto z-10">
            {filteredCategories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setSelectedCategories((p) => [...p, cat]);
                  setCategorySearch("");
                }}
                className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-sm text-right"
              >
                {cat}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
            >
              {cat}
              <button
                type="button"
                onClick={() =>
                  setSelectedCategories((p) => p.filter((c) => c !== cat))
                }
                className="hover:bg-orange-200 rounded-full p-0.5"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ── Date & Location ── */}
      <div className="flex flex-col space-y-4 mt-10">
        <Field name="challengeDate">
          {({ field }: FieldProps) => (
            <CustomInput
              {...field}
              label="تاریخ"
              type="date"
              className="w-full p-3 border rounded-md"
            />
          )}
        </Field>

        <Field name="challengeLocation">
          {({ field }: FieldProps) => (
            <CustomInput
              {...field}
              label="مکان"
              className="w-full p-3 border rounded-md"
            />
          )}
        </Field>
      </div>

      {/* ── Challenge type ── */}
      <div className="mt-10">
        <CustomSelect
          name="challengeType"
          label="نوع چالش"
          options={[
            { value: "عمومی", label: "عمومی" },
            { value: "شخصی", label: "شخصی" },
          ]}
          width="mt-10"
        />
      </div>

      {/* ── Comments toggle ── */}
      <div className="mt-10">
        <CustomCheckbox
          name="isCommentsEnabled"
          labelText="فعال بودن کامنت ها"
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
