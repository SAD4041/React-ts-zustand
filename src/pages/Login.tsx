import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../schemas/LoginSchemas';
import { checkPhone } from '../services/apiCall';
import CustomModal from '../components/Custom/modal';
import logo from '../assets/logo.png';
import buck from '../assets/buck.png';
import successCat from '../assets/success.png';
import errorCat from '../assets/error.png';

const SUCCESS_CAT = successCat;
const ERROR_CAT = errorCat;

interface LoginFormValues {
  phone: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    buttonText: '',
    onButtonClick: () => {},
    imageSrc: ''
  });

  const initialValues: LoginFormValues = { phone: '' };

  const onFormSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const result = await checkPhone(values.phone);

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
          navigate('/signUp', { state: { phone: values.phone } });
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
        message: 'خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.',
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
        <div className="w-full max-w-xl h-[600px] bg-gray-100 rounded-3xl border-2 border-gray-200 shadow-2xl p-8 relative overflow-hidden">
          <div className="text-center mb-8">
            <img src={logo} alt="CB Buck Gallery" className="mx-auto w-32 h-auto" />
            <h2 className="text-3xl font-bold text-slate-800">عضویت/ورود</h2>
            <p className="text-sm text-slate-600 mt-2">خوش آمدید،</p>
            <p className="text-sm text-slate-600">لطفا شماره موبایل خود را وارد کنید.</p>
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
                    <Field
                      name="phone"
                      type="text"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      disabled={loading || isSubmitting}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed text-center text-sm"
                    />
                    <ErrorMessage name="phone">
                      {(msg) => (
                        <p className="mt-2 text-xs text-red-600 flex items-center gap-1 justify-center">
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
                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full max-w-xs bg-black text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {loading || isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
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
                      'ثبت'
                    )}
                  </button>
                </div>

                <div className="text-center text-xs mt-4">
                  <span className="text-slate-600">ایجاد حساب به معنای پذیرش </span>
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700">قوانین و مقررات</Link>
                  <span className="text-slate-600"> و </span>
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700">حریم‌خصوصی</Link>
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

export default LoginForm;
