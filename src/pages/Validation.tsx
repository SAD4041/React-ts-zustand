import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { validationSchema } from '../schemas/ValidationSchemas';
import { verifyCode, checkPhone } from '../services/apiLogin';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModalImage, ModalButton, ModalActions } from "@/components/Custom/modal";
import { ValidationFormValues, ModalConfig } from '../types/authTypes';
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
            {({ values, handleSubmit, isSubmitting }) => (
              <FormikForm onSubmit={handleSubmit} className="space-y-6 px-6">
                <Form>
                  <FormField name="code" render={({ field }) => (
                    <FormItem>
                      <FormLabel>کد تأیید</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="کد ۶ رقمی"
                          maxLength={6}
                          inputMode="numeric"
                          disabled={loading || isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={loading || isSubmitting || values.code.length !== 6}
                      className="w-[320px] h-10"
                    >
                      {(loading || isSubmitting) ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 inline-block ml-2"
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
                    </Button>
                  </div>

                  <div className="text-center text-sm mt-4">
                    <span className="text-slate-600">کد را دریافت نکردید؟ </span>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={loading || isSubmitting}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:text-slate-400"
                    >
                      ارسال مجدد
                    </button>
                  </div>
                </Form>
              </FormikForm>
            )}
          </Formik>

          <div className="absolute bottom-0 left-1 w-48 h-55 opacity-80 pointer-events-none">
            <img src={buck} alt="Hand Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <Dialog open={!!modalConfig.isOpen} onOpenChange={(open) => setModalConfig(prev => ({ ...prev, isOpen: open }))}>
        <DialogContent className="sm:max-w-sm w-[90%]">
          <DialogHeader>
            {modalConfig.image ? (
              typeof modalConfig.image === 'string' ? (
                <ModalImage src={modalConfig.image} />
              ) : (
                <div className="flex justify-center mb-4">{modalConfig.image}</div>
              )
            ) : null}

            <DialogTitle className="text-center">
              {modalConfig.title}
            </DialogTitle>
            <DialogDescription className="text-center">
              {modalConfig.message}
            </DialogDescription>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Validation;
