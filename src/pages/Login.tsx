import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../schemas/LoginSchemas';
import { checkPhone } from '../services/apiLogin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';
import { translateNumber } from '../utils/translateNumber';
import type LoginFormValues from '@/types/loginTypes';
import SubmitSpinner from '@/components/login/submitSpinner';

const SUCCESS_CAT = successCat;
const ERROR_CAT = errorCat;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    buttonText: '',
    onButtonClick: () => { },
    imageSrc: ''
  });

  const initialValues: LoginFormValues = { phone: '' };

  const onFormSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const result = await checkPhone(values.phone);

      console.log(result)  // delete this

      if (result.success) {
        if (result.data.registered === true) {
          setModalConfig({
            isOpen: true,
            title: 'ورود موفق!',
            message: 'کد تأیید به شماره شما ارسال شد.',
            buttonText: 'ادامه',
            onButtonClick: () => {
              setModalConfig(prev => ({ ...prev, isOpen: false }));
              navigate('/validation', { state: { phone: values.phone } });
            },
            imageSrc: SUCCESS_CAT
          });
        } else {
          navigate('/verify', { state: { phone: values.phone } });
        }
      } else {
        setModalConfig({
          isOpen: true,
          title: 'خطا!',
          message: result.message || 'لطفاً دوباره تلاش کنید.',
          buttonText: 'بازگشت',
          onButtonClick: () => {
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          },
          imageSrc: ERROR_CAT
        });
      }
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      setModalConfig({
        isOpen: true,
        title: 'خطا!',
        message: 'خطایی غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
        buttonText: 'بازگشت',
        onButtonClick: () => {
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        },
        imageSrc: ERROR_CAT
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      <div className="w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl h-5/6 bg-light rounded-3xl border-2 border-gray-2 shadow-2xl p-8 relative overflow-hidden">
          <div className="text-center mb-8">
            <img src={logo} alt="CB Buck Gallery" className="mx-auto w-32 h-auto" />
            <h2 className="text-3xl font-bold text-gray-8">عضویت/ورود</h2>
            <p className="text-sm text-gray-7 mt-2">خوش آمدید!</p>
            <p className="text-sm text-gray-7">لطفا شماره موبایل خود را وارد کنید.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 px-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-xs">
                    <Field name="phone">
                      {({ field, form }: any) => (
                        <input
                          type="text"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          disabled={loading}
                          inputMode="numeric"
                          className="w-full px-4 py-2.5 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-light disabled:cursor-not-allowed text-center text-sm"
                          value={translateNumber(field.value || '')}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const persianToEnglish = inputValue.replace(/[۰-۹]/g, (d) =>
                              '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()
                            );
                            const englishValue = persianToEnglish
                              .replace(/[^0-9]/g, '')
                              .slice(0, 11);
                            form.setFieldValue('phone', englishValue);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="phone">
                      {(msg) => (
                        <p className="mt-2 text-xs text-destructive flex items-center gap-1 justify-center">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full max-w-xs bg-black text-white text-md py-2.5 px-4 rounded-lg hover:bg-gray-8 transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:bg-gray-4 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {loading || isSubmitting ? (
                      <SubmitSpinner />
                    ) : (
                      'ثبت'
                    )}
                  </Button>
                </div>

                <div className="text-center text-xs mt-4">
                  <span className="text-slate-600">ایجاد حساب به معنای پذیرش </span>
                  <Link to="/terms" className="text-link">قوانین و مقررات</Link>
                  <span className="text-slate-600"> و </span>
                  <Link to="/privacy" className="text-link">حریم‌خصوصی</Link>
                  <span className="text-slate-600"> است.</span>
                </div>
              </Form>
            )}
          </Formik>

          <div className="absolute bottom-0 left-0 w-48 h-55 opacity-80 pointer-events-none">
            <img src={buck} alt="Hand Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <Dialog open={modalConfig.isOpen} onOpenChange={(open) => !open && setModalConfig(prev => ({ ...prev, isOpen: false }))}>
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
              onClick={modalConfig.onButtonClick}
              className="w-full sm:w-auto min-w-[120px] cursor-pointer"
            >
              {modalConfig.buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginForm;