import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { validationSchema } from '../schemas/ValidationSchemas';
import { verifyCode, checkPhone } from '../services/apiLogin';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import CustomModal from '../components/Custom/modal';
import { translateNumber } from '@/utils/translateNumber'
import type ValidationFormValues from '@/types/loginTypes';

const Validation: React.FC = () => {
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
    onButtonClick: () => { },
    imageSrc: ''
  });

  useEffect(() => {
    const st = (location as any).state;
    if (st?.phone) {
      setPhone(st.phone);
    }
  }, [location]);

  const handleVerify = async (values: ValidationFormValues) => {
    setLoading(true);
    try {
      const result = await verifyCode(phone, values.code);

      if (result.success) {
        if (result.data?.valid === true) {
          setModalConfig({
            isOpen: true,
            title: 'ورود موفق',
            message: 'کد تأیید صحیح است. خوش آمدید!',
            buttonText: 'ادامه',
            imageSrc: successCat,
            onButtonClick: () => {
              if (result.data?.token) {
                localStorage.setItem('authToken', result.data.token);
              }
              setModalConfig(prev => ({ ...prev, isOpen: false }));
              navigate('/');
            }
          });
        } else {
          setModalConfig({
            isOpen: true,
            title: 'کد نامعتبر',
            message: 'کد تایید وارد شده نامعتبر است. لطفاً دوباره تلاش کنید.',
            buttonText: 'تلاش مجدد',
            imageSrc: errorCat,
            onButtonClick: () => {
              setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
          });
        }
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'خطای سرور. لطفاً دوباره تلاش کنید.',
          buttonText: 'باشه',
          imageSrc: errorCat,
          onButtonClick: () => {
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
      }
    } catch (err) {
      console.error('خطا در تایید کد:', err);
      setModalConfig({
        isOpen: true,
        title: 'خطا',
        message: 'خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
        buttonText: 'باشه',
        imageSrc: errorCat,
        onButtonClick: () => {
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        }
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
          imageSrc: successCat,
          onButtonClick: () => {
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'ارسال مجدد با خطا مواجه شد.',
          buttonText: 'باشه',
          imageSrc: errorCat,
          onButtonClick: () => {
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
      }
    } catch (err) {
      console.error('خطا در ارسال مجدد:', err);
      setModalConfig({
        isOpen: true,
        title: 'خطا',
        message: 'خطا در ارسال مجدد کد. لطفاً بعداً تلاش کنید.',
        buttonText: 'باشه',
        imageSrc: errorCat,
        onButtonClick: () => {
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  const initialValues: ValidationFormValues = { code: '' };

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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleVerify}
          >
            {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerify({ code: otp.join('') });
                }}
                className="space-y-6 px-6"
              >
                <div className="flex gap-2 justify-center" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={translateNumber(digit)}
                      onChange={(e) => {
                        const persianToEnglish = e.target.value.replace(/[۰-۹]/g, (d) =>
                          '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()
                        );
                        const englishValue = persianToEnglish.replace(/[^0-9]/g, '');
                        handleOtpChange(englishValue, index);
                      }}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading || isSubmitting || otp.join('').length !== 6}
                    className="w-[320px] h-10 bg-black text-white rounded-md disabled:opacity-50"
                  >
                    {(loading || isSubmitting) ? 'در حال بررسی...' : 'ورود'}
                  </button>
                </div>

                <div className="text-center text-sm mt-4">
                  <span className="text-slate-600">کد را دریافت نکردید؟ </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading || isSubmitting}
                    className="text-blue-600 hover:text-blue-700 font-medium disabled:text-slate-400"
                  >
                    ارسال مجدد
                  </button>
                </div>
              </form>
            )}
          </Formik>

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

export default Validation;
