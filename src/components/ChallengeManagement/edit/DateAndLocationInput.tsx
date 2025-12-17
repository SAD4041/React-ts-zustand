// components/ChallengeManagement/edit/DateAndLocationInput.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import type { FormikProps } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import type { DateAndLocationInputProps } from "@/types/challengeCreateTypes";
import { validationDateSchema } from "@/schemas/challengeSchema";
import { dateLocationDefaultValues } from "@/services/challengeService";
import type { FormValues } from "@/types/challengeElementsTypes";



const DateAndLocationInput: React.FC<DateAndLocationInputProps> = ({
  startDate = "",
  startTime = "",
  endDate = "",
  endTime = "",
  location = "",
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  onLocationChange,
}) => {
  const initialValues: FormValues = {
    ...dateLocationDefaultValues,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationDateSchema}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={() => {}}
    >
      {(formik: FormikProps<FormValues>) => {
        const { values, setTouched } = formik;

        React.useEffect(() => {
          onStartDateChange(values.startDate);
          onStartTimeChange(values.startTime);
          onEndDateChange(values.endDate);
          onEndTimeChange(values.endTime);
          onLocationChange(values.location);
        }, [
          values.startDate,
          values.startTime,
          values.endDate,
          values.endTime,
          values.location,
        ]);

        React.useEffect(() => {
          (window as any).forceValidateDateLocation = () => {
            setTouched({
              startDate: true,
              startTime: true,
              endDate: true,
              endTime: true,
              location: true,
            });
          };

          return () => {
            delete (window as any).forceValidateDateLocation;
          };
        }, [setTouched]);

        return (
          <Form className="space-y-10" dir="rtl">
            {/* Your existing form fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Field name="startDate">
                    {({ field }: { field: any }) => (
                      <CustomInput
                        {...field}
                        type="date"
                        label="تاریخ شروع"
                        showError={false}
                      />
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="startTime">
                    {({ field }: { field: any }) => (
                      <CustomInput
                        {...field}
                        type="time"
                        label="زمان شروع"
                        showError={false}
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Field name="endDate">
                    {({ field }: { field: any }) => (
                      <CustomInput
                        {...field}
                        type="date"
                        label="تاریخ پایان"
                        showError={false}
                      />
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="endTime">
                    {({ field }: { field: any }) => (
                      <CustomInput
                        {...field}
                        type="time"
                        label="زمان پایان"
                        showError={false}
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Field name="location">
                {({ field }: { field: any }) => (
                  <CustomInput
                    {...field}
                    type="text"
                    label="مکان برگزاری"
                    placeholder="اختیاری"
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

export default DateAndLocationInput;
