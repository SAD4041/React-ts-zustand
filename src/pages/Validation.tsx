import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { validationSchema } from '../schemas/ValidationSchemas';
import { verifyCode, checkPhone } from '../services/apiLogin';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import { ModalImage, ModalButton, ModalActions } from "@/components/Custom/modal";
import type { ValidationFormValues, ModalConfig } from '../types/authTypes';
import type { ReactNode } from 'react';

const Validation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');

  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    title: undefined,
    message: undefined,
    image: undefined,
    buttonText: undefined,
    onButtonClick: undefined,
  });

  useEffect(() => {
    const st = (location as any).state;
    if (st?.phone) {
      setPhone(st.phone);
    }
  }, [location]);

  const showModal = (opts: {
    title?: ReactNode;
    message?: ReactNode;
    image?: string | ReactNode;
    buttonText?: ReactNode;
    onConfirm?: () => void;
  }) => {
    setModalConfig({
      isOpen: true,
      title: opts.title,
      message: opts.message,
      image: opts.image,
      buttonText: opts.buttonText ?? 'باشه',
      onButtonClick: opts.onConfirm,
    });
  };

  const handleVerify = async (values: ValidationFormValues) => {
    setLoading(true);
    try {
      const result = await verifyCode(phone, values.code);

      if (result.success) {
        if (result.data?.valid === true) {
          showModal({
            title: 'ورود موفق',
            message: 'کد تأیید صحیح است. خوش آمدید!',
            image: successCat,
            buttonText: 'ادامه',
            onConfirm: () => {
              if (result.data?.token) localStorage.setItem('authToken', result.data.token);
              setModalConfig(prev => ({ ...prev, isOpen: false }));
              navigate('/');
            }
          });
        } else {
          showModal({
            title: 'کد نامعتبر',
            message: 'کد تایید وارد شده نامعتبر است. لطفاً دوباره تلاش کنید.',
            image: errorCat,
            buttonText: 'تلاش مجدد',
            onConfirm: () => {
              setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
          });
        }
      } else {
        showModal({
          title: 'خطا',
          message: result.message || 'خطای سرور. لطفاً دوباره تلاش کنید.',
          image: errorCat,
        });
      }
    } catch (err) {
      console.error('خطا در تایید کد:', err);
      showModal({
        title: 'خطا',
        message: 'خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
        image: errorCat,
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
        showModal({
          title: 'ارسال مجدد',
          message: 'کد تأیید مجدداً ارسال شد.',
          image: successCat,
        });
      } else {
        showModal({
          title: 'خطا',
          message: result.message || 'ارسال مجدد با خطا مواجه شد.',
          image: errorCat
        });
      }
    } catch (err) {
      console.error('خطا در ارسال مجدد:', err);
      showModal({
        title: 'خطا',
        message: 'خطا در ارسال مجدد کد. لطفاً بعداً تلاش کنید.',
        image: errorCat
      });
    } finally {
      setLoading(false);
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
            ←
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
              <form onSubmit={handleSubmit} className="space-y-6 px-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">کد تأیید</label>
                  <input
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    placeholder="کد ۶ رقمی"
                    maxLength={6}
                    inputMode="numeric"
                    disabled={loading || isSubmitting}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {touched.code && errors.code && (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading || isSubmitting || values.code.length !== 6}
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

      {/* Modal ساده بدون shadcn */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 text-center">
            {modalConfig.image && typeof modalConfig.image === 'string' && (
              <ModalImage src={modalConfig.image} />
            )}

            <h3 className="text-lg font-bold mt-4">
              {modalConfig.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {modalConfig.message}
            </p>

            <ModalActions>
              <ModalButton
                onClick={() => {
                  if (typeof modalConfig.onButtonClick === 'function') {
                    modalConfig.onButtonClick();
                  } else {
                    setModalConfig(prev => ({ ...prev, isOpen: false }));
                  }
                }}
                className="w-3/4"
              >
                {modalConfig.buttonText ?? 'باشه'}
              </ModalButton>
            </ModalActions>
          </div>
        </div>
      )}
    </div>
  );
};

export default Validation;
