import * as Yup from "yup";

export const validationSchema = Yup.object({
    challengeTitle: Yup.string()
      .required("عنوان چالش الزامی است")
      .min(5, "عنوان باید حداقل ۵ کاراکتر باشد"),
    challengeDescription: Yup.string()
      .required("توضیحات الزامی است")
      .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  });



export const step1Schema = Yup.object({
    title: Yup.string()
      .required("عنوان چالش الزامی است")
      .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
      .max(100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
    description: Yup.string()
      .required("توضیحات الزامی است")
      .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  });
  
 export const step2Schema = Yup.object({
    selectedCategories: Yup.array()
      .of(Yup.string())
      .min(1, "حداقل یک دسته‌بندی انتخاب کنید")
      .required("دسته‌بندی الزامی است"),
    startDate: Yup.string().required("تاریخ شروع الزامی است"),
    startTime: Yup.string().required("ساعت شروع الزامی است"),
    endDate: Yup.string().required("تاریخ پایان الزامی است"),
    endTime: Yup.string().required("ساعت پایان الزامی است"),
    challengeLocation: Yup.string().required("مکان برگزاری الزامی است"),
    challengeType: Yup.string().required("نوع چالش الزامی است"),
  });
  
 export const step3Schema = Yup.object({
    memberCount: Yup.string()
      .matches(/^\d*$/, "فقط عدد مجاز است")
      .test("min", "حداقل ۲ نفر", (val) => !val || parseInt(val || "0") >= 2),
  });

 export const editChallengeSchema = Yup.object({
    title: Yup.string()
      .required("عنوان چالش الزامی است")
      .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
      .max(100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
    description: Yup.string()
      .required("توضیحات الزامی است")
      .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
    startDate: Yup.string().required("تاریخ شروع الزامی است"),
    startTime: Yup.string().required("ساعت شروع الزامی است"),
    endDate: Yup.string().required("تاریخ پایان الزامی است"),
    endTime: Yup.string().required("ساعت پایان الزامی است"),
  });

  
export const validationDateSchema = Yup.object({
  startDate: Yup.string().required("تاریخ شروع الزامی است"),
  startTime: Yup.string().required("زمان شروع الزامی است"),
  endDate: Yup.string().required("تاریخ پایان الزامی است"),
  endTime: Yup.string().required("زمان پایان الزامی است"),
});