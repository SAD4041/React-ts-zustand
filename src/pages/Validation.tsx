import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyCode, checkPhone } from '../services/apiCall';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import CustomModal from '../components/Custom/modal';
import { validationSchema } from '../schemas/ValidationSchemas';

type FormValues = {
  code: string;
};

export const Validation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    buttonText: '',
    onButtonClick: () => {},
    imageSrc: ''
  });

  useEffect(() => {
    if ((location as any).state?.phone) {
      setPhone((location as any).state.phone);
    }
    // else navigate('/login')
  }, [location]);

  const { handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: { code: '' },
  });

  const handleChange = (index: number, value: string) => {
    if (value && isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setValue('code', newOtp.join(''));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        setValue('code', newOtp.join(''));
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });

    setOtp(newOtp);
    setValue('code', newOtp.join(''));

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const onFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const result = await verifyCode(phone, data.code);

      if (result.success) {
        if (result.data.valid === true) {
          setModalConfig({
            isOpen: true,
            title: 'ورود موفق',
            message: 'کد تأیید صحیح است. خوش آمدید!',
            buttonText: 'ادامه',
            onButtonClick: () => {
              setModalConfig(prev => ({ ...prev, isOpen: false }));
              if (result.data.token) {
                localStorage.setItem('authToken', result.data.token);
              }
              navigate('/');
            },
            imageSrc: successCat
          });
        } else {
          setModalConfig({
            isOpen: true,
            title: 'کد نامعتبر',
            message: 'کد تایید وارد شده نامعتبر است. لطفاً دوباره تلاش کنید.',
            buttonText: 'تلاش مجدد',
            onButtonClick: () => {
              setModalConfig(prev => ({ ...prev, isOpen: false }));
              setOtp(['', '', '', '', '', '']);
              inputRefs.current[0]?.focus();
            },
            imageSrc: errorCat
          });
        }
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'خطای سرور. لطفاً دوباره تلاش کنید.',
          buttonText: 'باشه',
          onButtonClick: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
          imageSrc: errorCat
        });
      }
    } catch (err) {
      console.error('خطا در تایید کد:', err);
      setModalConfig({
        isOpen: true,
        title: 'خطا',
        message: 'خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
        buttonText: 'باشه',
        onButtonClick: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
        imageSrc: errorCat
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);

    try {
      const result = await checkPhone(phone);

      if (result.success) {
        setModalConfig({
          isOpen: true,
          title: 'ارسال مجدد',
          message: 'کد تأیید مجدداً ارسال شد.',
          buttonText: 'باشه',
          onButtonClick: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
          imageSrc: successCat
        });
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'ارسال مجدد با خطا مواجه شد.',
          buttonText: 'باشه',
          onButtonClick: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
          imageSrc: errorCat
        });
      }
    } catch (err) {
      console.error('خطا در ارسال مجدد:', err);
      setModalConfig({
        isOpen: true,
        title: 'خطا',
        message: 'خطا در ارسال مجدد کد. لطفاً بعداً تلاش کنید.',
        buttonText: 'باشه',
        onButtonClick: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
        imageSrc: errorCat
      });
    } finally {
      setLoading(false);
    }
  };

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
            <img src={logo} alt="CB Buck Gallery" className="mx-auto w-32 h-auto" />
            <h2 className="text-3xl font-bold text-slate-800">عضویت/ورود</h2>
            {phone && (
              <p className="text-sm text-slate-600 mt-4">
                لطفا کد ارسال شده برای شماره <span className="font-bold">{phone}</span> را وارد کنید.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 px-6">
            <div className="pt-4">
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

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال بررسی...
                  </>
                ) : (
                  'ورود'
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
            <img src={buck} alt="Hand Illustration" className="w-full h-full object-contain" />
          </div>

        </div>
      </div>

      <CustomModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
        buttonText={modalConfig.buttonText}
        onButtonClick={modalConfig.onButtonClick}
        imageSrc={modalConfig.imageSrc}
      />
    </div>
  );
};