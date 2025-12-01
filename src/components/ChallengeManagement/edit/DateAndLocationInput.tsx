// components/ChallengeManagement/edit/DateAndLocationInput.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import type { DateAndLocationInputProps } from "@/types/challengeCreateTypes";
import { validationDateSchema } from "@/schemas/challengeSchema";

const DateAndLocationInput: React.FC<DateAndLocationInputProps> = ({
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  onLocationChange,
}) => {
  const initialValues = {
    startDate: startDate || "",
    startTime: startTime || "",
    endDate: endDate || "",
    endTime: endTime || "",
    location: location || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationDateSchema}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, setTouched, setFieldValue }) => {
        React.useEffect(() => {
          onStartDateChange(values.startDate);
          onStartTimeChange(values.startTime);
          onEndDateChange(values.endDate);
          onEndTimeChange(values.endTime);
          onLocationChange(values.location);
        }, [values, onStartDateChange, onStartTimeChange, onEndDateChange, onEndTimeChange, onLocationChange]);

        React.useEffect(() => {
          // @ts-ignore
          window.forceValidateDateLocation = () => {
            setTouched({
              startDate: true,
              startTime: true,
              endDate: true,
              endTime: true,
            });
          };
        }, []);

        return (
          <Form className="space-y-10"> {/* فاصله اصلی بین بخش‌ها */}
            {/* شروع چالش */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6"> {/* gap منظم */}
                <Field name="startDate">
                  {({ field }: any) => (
                    <CustomInput
                      {...field}
                      type="date"
                      label="تاریخ شروع"
                      error={touched.startDate && errors.startDate}
                    />
                  )}
                </Field>

                <Field name="startTime">
                  {({ field }: any) => (
                    <CustomInput
                      {...field}
                      type="time"
                      label="زمان شروع"
                      error={touched.startTime && errors.startTime}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* پایان چالش */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Field name="endDate">
                  {({ field }: any) => (
                    <CustomInput
                      {...field}
                      type="date"
                      label="تاریخ پایان"
                      error={touched.endDate && errors.endDate}
                    />
                  )}
                </Field>

                <Field name="endTime">
                  {({ field }: any) => (
                    <CustomInput
                      {...field}
                      type="time"
                      label="زمان پایان"
                      error={touched.endTime && errors.endTime}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* مکان برگزاری */}
            <div className="space-y-6">
              <Field name="location">
                {({ field }: any) => (
                  <CustomInput
                    {...field}
                    type="text"
                    label="مکان برگزاری"
                    placeholder="اختیاری"
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