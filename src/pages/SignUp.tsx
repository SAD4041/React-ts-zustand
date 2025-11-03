import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupSchema } from '../schemas/SignupSchemas';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';

interface SignupFormValues {
  username: string;
  email: string;
  age: string;
  password: string;
  confirmPass: string;
}

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues: SignupFormValues = {
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPass: '',
  };

  const onFormSubmit = (values: SignupFormValues) => {
    // اگر نیاز به تبدیل age به عدد داری:
    const data = {
      ...values,
      age: Number(values.age),
    };
    console.log('form is submitted', data);
    // همان رفتاری که قبلاً داشتی:
    navigate(`/profile/${values.username}`, { state: { data } });
  };

  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      <div className="w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl h-full bg-gray-100 rounded-3xl border-2 border-gray-200 shadow-2xl px-12 py-8 bx-12 relative overflow-hidden">
          <img src={logo} alt="CB Buck Gallery" className="mx-auto w-32 h-auto" />
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">ساخت حساب جدید</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={onFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">نام کاربری</label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                  <ErrorMessage name="username">
                    {(msg) => (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">سن</label>
                  <Field
                    name="age"
                    type="number"
                    placeholder="سن خود را وارد کنید"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                  <ErrorMessage name="age">
                    {(msg) => (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="رمز عبور خود را وارد کنید"
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <svg
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-5 h-5 absolute left-3 top-3 cursor-pointer text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.19.39-2.295 1.125-3.229M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 9 7 0 .845-.13 1.665-.372 2.438M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => <p className="mt-2 text-sm text-red-600">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">تکرار رمز عبور</label>
                  <div className="relative">
                    <Field
                      name="confirmPass"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="رمز عبور را دوباره وارد کنید"
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <svg
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="w-5 h-5 absolute left-3 top-3 cursor-pointer text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showConfirm ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.19.39-2.295 1.125-3.229M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 9 7 0 .845-.13 1.665-.372 2.438M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </div>
                  <ErrorMessage name="confirmPass">
                    {(msg) => <p className="mt-2 text-sm text-red-600">{msg}</p>}
                  </ErrorMessage>
                </div>

                <button type="submit" class="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
                  ثبت نام
                </button>

                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600 mb-2">قبلا ثبت نام کردید؟</p>
                  <Link to="/login" className="text-customBlack hover:text-customGray font-medium transition-colors duration-200">
                    ورود به حساب
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          <div className="absolute bottom-0 left-0 w-48 h-55 opacity-80 pointer-events-none">
            <img src={buck} alt="Hand Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

