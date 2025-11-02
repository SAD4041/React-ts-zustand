import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect, useRef } from 'react'
import { verifyCode } from '../services/api'
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';

export const Validation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [phone, setPhone] = useState('09123456789')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    if (location.state?.phone) {
      setPhone(location.state.phone)
    }
    // شرط navigate رو موقتاً کامنت کردم
    // else {
    //     navigate('/login')
    // }
  }, [location])

  const schema = yup.object().shape({
    code: yup.string()
      .required("کد تایید اجباری است.")
      .matches(/^[0-9]{6}$/, "کد تایید باید 6 رقم باشد.")
  })

  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { code: '' }
  })

  const handleChange = (index, value) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)

    setOtp(newOtp)
    setValue('code', newOtp.join(''))

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char
    })

    setOtp(newOtp)
    setValue('code', newOtp.join(''))

    const lastFilledIndex = Math.min(pastedData.length, 5)
    inputRefs.current[lastFilledIndex]?.focus()
  }

  const onFormSubmit = async (data) => {
    setLoading(true)
    setErrorMessage('')

    try {
      const result = await verifyCode(phone, data.code)

      if (result.success) {
        if (result.data.valid === true) {
          console.log('کد تایید صحیح است - ورود موفق')

          if (result.data.token) {
            localStorage.setItem('authToken', result.data.token)
          }

          navigate("/")
        } else {
          setErrorMessage('کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.')
          setOtp(['', '', '', '', '', ''])
          inputRefs.current[0]?.focus()
        }
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error('خطا در تایید کد:', error)
      setErrorMessage('خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    setErrorMessage('')
    setLoading(true)

    try {
      const { checkPhone } = await import('../services/api')
      const result = await checkPhone(phone)

      if (result.success) {
        setErrorMessage('')
        alert('کد تایید مجدداً ارسال شد.')
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage('خطا در ارسال مجدد کد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      <div className="w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl h-[600px] bg-gray-100 rounded-3xl border-2 border-gray-200 shadow-2xl p-8 relative overflow-hidden">

          <a
            href="/login"
            className="absolute top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>

          <div className="text-center mb-8">
            <img
              src= {logo}
              alt="CB Buck Gallery"
              className="mx-auto w-32 h-auto"
            />
            <h2 className="text-3xl font-bold text-slate-800">عضویت/ورود</h2>
            {phone && (
              <p className="text-sm text-slate-600 mt-4">
                لطفا کد ارسال شده برای شماره <span className="font-bold">{phone}</span> را وارد کنید.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 px-6">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <div className='pt-4'>
              <div className="flex justify-center gap-3 mb-4" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading}
                    data-index={index}
                    className="w-10 h-10 text-center text-lg font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>

              {errors.code && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="w-[320px] h-10 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    در حال بررسی...
                  </>
                ) : (
                  "ورود"
                )}
              </button>
            </div>

            <div className="text-center text-sm mt-4">
              <span className="text-slate-600">کد را دریافت نکردید؟ </span>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:text-slate-400"
              >
                ارسال مجدد
              </button>
            </div>
          </form>

          <div className="absolute bottom-0 left-1 w-48 h-55 opacity-80 pointer-events-none">
            <img
              src={buck}
              alt="Hand Illustration"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  )
}