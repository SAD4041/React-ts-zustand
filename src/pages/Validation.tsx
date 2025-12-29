import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { validationSchema } from '../schemas/ValidationSchemas';
import { verifyCode, checkPhone } from '../services/loginService';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { translateNumber } from '@/utils/translateNumber';
import type ValidationFormValues from '@/types/loginTypes';
import BackToLogin from '@/components/ui/toLeftSvg';
import SubmitSpinner from '@/components/login/submitSpinner';
import ToRight from '@/components/ui/toRightSvg';
import useUserStore from '@/store/userStore/userStore';

const Validation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const setToken = useUserStore((state) => state.setToken);
  const setAuth = useUserStore((state) => state.setAuth);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    buttonText: '',
    onButtonClick: () => {},
    imageSrc: '',
  });

  useEffect(() => {
    const { phone: receivedPhone } = (location.state || {}) as { phone?: string };
    if (receivedPhone) {
      setPhone(receivedPhone);
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  const handleVerify = async (values: ValidationFormValues) => {
    setLoading(true);
    try {
      const result = await verifyCode(phone, values.code);

      if (result.success) {
        if (result.data?.userExist === true) {
          setModalConfig({
            isOpen: true,
            title: 'ورود موفق',
            message: result.data?.message || 'کد تأیید صحیح است. خوش آمدید!',
            buttonText: 'ادامه',
            imageSrc: successCat,
            onButtonClick: () => {
              if (result.data?.token) {
                // ذخیره توکن در Zustand store
                setToken(result.data.token);
                
                // اگر اطلاعات user هم در response بود، اونا رو هم ذخیره کن
                // فعلاً فقط یک user ساده می‌سازیم
                const tempUser = {
                  id: '', // فعلاً خالی، بعداً از توکن یا API میاد
                  mobile: phone,
                  role: 'user' as const,
                };
                
                // ذخیره اطلاعات کامل
                setAuth(result.data.token, tempUser);
              }
              
              setModalConfig((prev) => ({ ...prev, isOpen: false }));
              
              // ارسال state که از validation اومدیم
              navigate('/', { state: { fromValidation: true } });
            },
          });
        } else {
          setModalConfig({
            isOpen: true,
            title: 'کد نامعتبر',
            message: 'کد تایید وارد شده نامعتبر است. لطفاً دوباره تلاش کنید.',
            buttonText: 'تلاش مجدد',
            imageSrc: errorCat,
            onButtonClick: () => {
              setModalConfig((prev) => ({ ...prev, isOpen: false }));
            },
          });
        }
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'خطایی سرور. لطفاً دوباره تلاش کنید.',
          buttonText: 'باشه',
          imageSrc: errorCat,
          onButtonClick: () => {
            setModalConfig((prev) => ({ ...prev, isOpen: false }));
          },
        });
      }
    } catch (err) {
      console.error('خطا در تایید کد:', err);
      setModalConfig({
        isOpen: true,
        title: 'خطا',
        message: 'خطایی غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
        buttonText: 'باشه',
        imageSrc: errorCat,
        onButtonClick: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        },
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
            setModalConfig((prev) => ({ ...prev, isOpen: false }));
          },
        });
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا',
          message: result.message || 'ارسال مجدد با خطا مواجه شد.',
          buttonText: 'باشه',
          imageSrc: errorCat,
          onButtonClick: () => {
            setModalConfig((prev) => ({ ...prev, isOpen: false }));
          },
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
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        },
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
    <div className="flex min-h-screen" dir="rtl">
      <div className="w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl h-5/6 bg-login-card-bg rounded-4xl border-3 border-primary-border shadow-2xl p-8 relative overflow-hidden">
          <a
            href="/login"
            className="absolute top-4 right-4 bg-bg-section1 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
          >
            <ToRight />
          </a>

          <div className="text-center mb-8">
            <img src={logo} alt="CB Buck Gallery" className="mx-auto w-32 h-auto" />
            <h2 className="text-3xl font-bold text-titr">عضویت/ورود</h2>
            {phone && (
              <p className="text-sm text-text mt-4">
                لطفا کد ارسال شده برای شماره{' '}
                <span className="font-bold">{translateNumber(phone)}</span>
                را وارد کنید.
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
                      className="w-12 h-12 text-center text-lg bg-white border border-transparent rounded-lg focus:border-primary-border focus:border-2 focus:ring-0 text-center text-l transition-all duration-200 outline-none disabled:bg-card disabled:cursor-not-allowed"
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting || otp.join('').length !== 6}
                    className="w-82 bg-bg-section2 text-white text-md rounded-md disabled:opacity-50 hover:bg-bg-section1 cursor-pointer"
                  >
                    {loading || isSubmitting ? <SubmitSpinner /> : 'ورود'}
                  </Button>
                </div>

                <div className="text-center text-sm mt-4">
                  <span className="text-text">کد را دریافت نکردید؟ </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading || isSubmitting}
                    className="text-bg-section2 font-medium disabled:text-text cursor-pointer"
                  >
                    ارسال مجدد
                  </button>
                </div>
              </form>
            )}
          </Formik>

          <div className="absolute bottom-0 left-0 w-48 h-55 opacity-80 pointer-events-none">
            <img src={buck} alt="Hand Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <Dialog
        open={modalConfig.isOpen}
        onOpenChange={(open) => !open && setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      >
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <img
                src={modalConfig.imageSrc}
                alt={modalConfig.title}
                className="w-45 h-45 object-contain"
              />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              {modalConfig.title}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {modalConfig.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              type="button"
              variant="dialog"
              onClick={modalConfig.onButtonClick}
              className="w-full sm:w-auto min-w-[220px] cursor-pointer"
            >
              {modalConfig.buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Validation;