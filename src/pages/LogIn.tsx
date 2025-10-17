import { Form, Formik, type FormikHelpers } from "formik";

import walkingMan from "@/assets/Img/Walking-man-2.png";
import CustomInput from "@/components/Custom/CustomInput";
import CustomBtn from "@/components/Custom/CustomBtn";
import { basicSchema } from "@/schemas";

export default function Login() {
  interface FormValues {
    email: string;
    password: string;
  }
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className=" w-screen h-screen bg-[url(@/assets/Img/Desktop-background-2.png)] flex justify-center items-center ">
      <div className="flex rounded-3xl bg-white">
        <div className="flex items-end pl-[30px] h-[410px]">
          <img className="w-[233px] h-[320px]" src={walkingMan} alt="" />
        </div>

        <div className="flex flex-col justify-around w-[420px] h-[410px] p-[6px] py-[20px]">
          <h1 className="text-center font-bold text-[30px] mt-[20px] text-[#000]">
            خوش اومدی
          </h1>
          <Formik
            initialValues={{ password: "", email: "" }}
            validationSchema={basicSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-80 space-y-8  mx-auto">
                  <CustomInput name="email" label="ایمیل" />

                  <CustomInput
                    name="password"
                    type="password"
                    label="رمز ورود"
                  />
                  <CustomBtn
                    disabled={isSubmitting}
                    color="#fff"
                    lassName="w-72 bg-[#ff7700] text-[#000] mt-auto"
                    type="submit"
                  >
                    ورود
                  </CustomBtn>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
//  <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="w-80 space-y-8  mx-auto"
//         >
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl className="text-right ">
//                   <CustomInput
//                     {...field}
//                     type="email"
//                     placeholder="ایمیل"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl className="text-right ">
//                   <CustomInput
//                     {...field}
//                     type="password"
//                     placeholder="رمز ورود"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <CustomBtn
//             className="w-full bg-[#ff7700] text-[#000] mt-auto"
//             type="submit"
//           >
//             ورود
//           </CustomBtn>
//         </form>
//       </Form>
