import CustomButton from "@/components/Custom/CustomButton";
import CustomInput from "@/components/Custom/CustomInput";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object({
	email: Yup.string()
		.email('ایمیل نامعتبر است')
		.required('ایمیل الزامی است'),
});


function Landing() {
	const Navigate = useNavigate();

	return (
		<div className="w-full h-screen font-3xl flex flex-col place-self-center justify-center">
			<div className="flex gap-2 rounded-md place-self-center">
				<button
					className="text-white bg-sky-600 rounded-md p-2 cursor-pointer"
					onClick={() => {
						Navigate("/temp");
					}}
				>
					Temp route
				</button>
			</div>
			<p className="text-5xl text-center ">This is your landing</p>

			{/* use the customButton like this: */}
			<div className="flex justify-center items-center">
				<CustomButton
					type="button"
					className="flex-none text-center bg-secondary border border-gray-600"
				>salam</CustomButton>

			</div>
			<div className="p-8 bg-white">
				<Formik
					initialValues={{ email: '' }}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log('Form submitted:', values);
					}}
				>
					{() => (
						<Form>
							<CustomInput
								name="email"
								label="ایمیل شما"
								type="email"
								placeholder="example@email.com"
								width="w-full"
								className="!border-[#BFBFBF]" 
								// you can change this items
							/>

							<CustomButton
								type="submit"
								className="m-10" // add your custom style
							>ارسال</CustomButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Landing;
