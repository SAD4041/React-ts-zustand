import * as Yup from "yup";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد")
		.required("رمز عبور اجباری است"),
});

const initialValues = {
	email: "",
	password: "",
	rememberMe: false,
};

const LoginSchema = {
	initialValues,
	validationSchema,
};

export default LoginSchema;
