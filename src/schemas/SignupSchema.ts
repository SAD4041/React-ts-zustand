import * as Yup from "yup";

const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;

const validationSchema = Yup.object({
	firstname: Yup.string()
		.trim()
		.matches(nameRegex, "نام معتبر نیست")
		.min(2, "نام معتبر نیست.")
		.max(50, "نام معتبر نیست")
		.required("نام اجباری است"),
	lastname: Yup.string()
		.trim()
		.matches(nameRegex, "نام معتبر نیست")
		.min(2, "نام معتبر نیست.")
		.max(50, "نام معتبر نیست")
		.required("نام اجباری است"),
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(8, "پسورد باید حداقل 8 کاراکتر باشد")
		.matches(/[A-Z]/, "پسورد باید حداقل یک حرف بزرگ داشته باشد")
		.matches(/[a-z]/, "پسورد باید حداقل یک حرف کوچک داشته باشد")
		.matches(/\d/, "پسورد باید حداقل یک عدد داشته باشد")
		.matches(/[^A-Za-z0-9]/, "پسورد باید حداقل یک کاراکتر ویژه داشته باشد")
		.required("رمز عبور اجباری است"),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref("password")], "رمز عبور مطابقت ندارد")
		.required("تکرار رمز عبور اجباری است"),
});

const initialValues = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const SignupSchema = {
	initialValues,
	validationSchema,
};


export default SignupSchema;
