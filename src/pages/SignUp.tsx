import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';

export const SignupForm: React.FC = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const schema = yup.object().shape({
        username: yup.string().required("فیلد نام اجباری است."),
        email: yup.string().email("ایمیل نامعتبر است.").required("ایمیل اجباری است."),
        age: yup.number().positive("سن شما باید یک عدد مثبت باشد.").min(18, "سن شما باید حداقل ۱۸ باشد.").max(100, "سن شما باید حداکثر ۱۰۰ باشد.").required("سن اجباری است."),
        password: yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر داشته باشد.").max(20, "حداکثر ۲۰ کاراکتر!!").matches(/[a-z]+/, "باید حداقل شامل یک حرف کوچک باشد")
            .matches(/[A-Z]+/, "باید حداقل شامل یک حرف بزرگ باشد").matches(/\d+/, "باید حداقل شامل یک عدد باشد.").required("رمز اجباری است."),
        confirmPass: yup.string().oneOf([yup.ref('password')], "پسوورد مشابه نیست").required("تایید رمز اجباری است.")
    })

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) })

    const onFormSubmit = (data) => {
        console.log('form is submited', data);
        navigate(`/profile/${data.username}`, { state: { data } });
    }

    return (
        <div className="flex min-h-screen bg-white" dir="rtl">
            <div className="w-full flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl h-full bg-gray-100 rounded-3xl border-2 border-gray-200 shadow-2xl px-12 py-8 bx-12 relative overflow-hidden">
                    <img
                        src={logo}
                        alt="CB Buck Gallery"
                        className="mx-auto w-32 h-auto"
                    />
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">ساخت حساب جدید</h2>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                نام کاربری
                            </label>
                            <input
                                type="text"
                                placeholder="نام کاربری خود را وارد کنید"
                                {...register("username")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                سن
                            </label>
                            <input
                                type="number"
                                placeholder="سن خود را وارد کنید"
                                {...register("age")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.age && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                {...register("email")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="رمز عبور خود را وارد کنید"
                                    {...register("password")}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.19.39-2.295 1.125-3.229M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 9 7 0 .845-.13 1.665-.372 2.438M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 01-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    )}
                                </svg>
                            </div>

                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">تکرار رمز عبور</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="رمز عبور را دوباره وارد کنید"
                                    {...register("confirmPass")}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.19.39-2.295 1.125-3.229M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 9 7 0 .845-.13 1.665-.372 2.438M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 01-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    )}
                                </svg>
                            </div>

                            {errors.confirmPass && <p className="mt-2 text-sm text-red-600">{errors.confirmPass.message}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-customBlack text-white py-3 px-4 rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                        >
                            ثبت نام
                        </button>

                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-slate-600 mb-2">قبلا ثبت نام کردید؟</p>
                            <Link
                                to='/login'
                                className="text-customBlack hover:text-customGray font-medium transition-colors duration-200"
                            >
                                ورود به حساب
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};