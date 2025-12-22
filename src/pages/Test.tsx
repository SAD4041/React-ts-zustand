import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import { Textarea } from "@/components/Custom/Textarea/Textarea";

import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import { useDesktop, useMobile, useTablet } from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Custom/Select/Select";

import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { PetDatePicker } from "@/components/Custom/PetDatePicker/PetDatePicker";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import Stepper, { Step } from "@/components/Custom/PetRegister/PetMultiStage";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { NonFormikInput } from "@/components/Custom/Input/NonFormikInput";
import PawIcon from "@/components/Custom/PetRegister/PawIcon";
import { BabyIcon, Bird, Cat, Dog } from "lucide-react";

import IsAdultToggleGroup from "@/components/PetRegister/IsAdultToggleGroup";
import PetKindToggleGroup from "@/components/PetRegister/PetKindToggleGroup";

import Toggle from "@/components/Custom/Toggle/Toggle";
import { useState } from "react";

import { DropdownMenu } from "@/components/Custom/Dropdonw-Menu/DropdownMenu";

import {
	getPetSpeciesService,
	registerPetService,
} from "@/services/petRegisterService";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/Custom/Tabs/Tabs";

import Address from "@/components/Custom/Address/Address";
import { LocationSelector } from "@/components/Custom/Province/LocationSelector";
import { Province } from "@/components/Custom/Province/Province";
import { City } from "@/components/Custom/Province/City";

import PetToggleGroup from "@/components/Booking/PetOwner/PetToggleGroup";
import ServiceToggleGroup from "@/components/Booking/PetOwner/ServiceToggleGroup";
import ToggleGroupField from "@/components/Booking/PetOwner/ToggleGroupField";

import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";
import PetRegisterForm from "@/components/PetRegister/PetRegisterForm";

import DashboardPetCard from "@/components/Pet/DashboardPetCard";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
		.required("رمز عبور اجباری است"),
	akhoond: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
		.required("رمز عبور اجباری است"),
});

function Test() {
	const isDesktop = useDesktop();
	const isMobile = useMobile();
	const isTablet = useTablet();
	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);

	return (
		<div className="flex flex-col items-center">
			<Formik
				initialValues={{
					email: "",
					akhoond: "2",
					password: "he",
					love: false,
				}}
				onSubmit={(values) => {
					console.log("Form values:", values);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="mt-6 border rounded flex flex-col gap-4 items-center w-200">
						<Select name="akhoond">
							<SelectTrigger className="w-30">
								<SelectValue placeholder="روز" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{["1", "2", "3", "4", "5", "6", "7"].map((n) => (
										<SelectItem value={n} key={n}>
											{n}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						<PetToggleGroup
							name="doost"
							values={["nigga", "what"]}
							titles={["oh wow", "crazy"]}
						/>
						<ServiceToggleGroup
							name="doost2"
							values={["nigga", "what"]}
							titles={["oh wow", "crazy"]}
						/>

						<div className="mt-5 w-50">
							<Input
								name="email"
								shadow={true}
								classes={{
									className: "h-20",
									inputClassName: "!text-[20px]",
									errorClassName: "px-5",
								}}
								type="email"
								placeholder="ایمیل"
							/>
						</div>

						<div className="w-35">
							<DatePicker className="h-15 !text-[35px]" name="akhoond2" />
						</div>

						<div className="mt-5 w-50">
							<Input
								name="password"
								shadow={true}
								classes={{
									className: "h-20",
									errorClassName: "px-5",
									inputClassName: "!text-[45px]",
								}}
								onChangeWrappers={[adjustInputDirection]}
								type="password"
								placeholder="ایمیل"
							/>
						</div>

						<LocationSelector>
							<Province />
							<City />
						</LocationSelector>

						<Address />

						<PetDatePicker
							from={10}
							to={8}
							relative={true}
							name="niceone"
							smallFontSize="20px"
							bigFontSize="30px"
						/>

						<Checkbox
							name="love"
							classes={{ textClassName: "text-[17px]" }}
							text={"آقا عشق"}
						/>

						<Checkbox
							name="love2"
							classes={{ textClassName: "text-[17px]" }}
							text={"آقا عشق"}
						/>

						<Checkbox
							name="love3"
							classes={{
								className: "mt-5",
								backGroundClassName: "!border-5",
								textClassName: "text-[17px]",
							}}
							size="30px"
							text={"آقا عشق"}
						/>

						<Checkbox
							name="love4"
							classes={{
								className: "mt-5 bg-red-500",
								backGroundClassName: "!border-5",
								textClassName: "text-[17px] font-bold",
							}}
							size="15px"
							text={"آقا عشق"}
						/>

						<div className="px-5 w-full">
							<Textarea
								rows={6}
								scrollbarBorderRadius="10px"
								className="relative drop-shadow-lg py-3"
								name="betterakhoond"
							/>
						</div>

						<Button
							type="submit"
							size={"giant"}
							variant={"outline"}
							shadow={false}
							boxShadow={true}
							bold={true}
							isLoading={isSubmitting}
							className="mb-3"
						>
							ورود
						</Button>
					</Form>
				)}
			</Formik>

			{isDesktop && <p> desktop mode</p>}
			{isMobile && <p> mobile mode</p>}
			{isTablet && <p> tablet mode</p>}

			<Dialog>
				<DialogTrigger asChild>
					{!isMobile && <Button>کلیک کن</Button>}
				</DialogTrigger>
				<DialogContent className="w-200 h-[90%]" dir="rtl">
					<PetRegisterForm />
				</DialogContent>
			</Dialog>

			{isMobile && (
				<Button onClick={() => navigate("/RegisterPet")}>سلام</Button>
			)}

			<PawIcon step={2} />

			<div className="flex w-200 flex-col gap-6 mt-10">
				<Tabs defaultValue="account">
					<TabsList>
						<TabsTrigger value="account" number={3}>
							رزرو های فعال
						</TabsTrigger>
						<TabsTrigger value="password" number={1}>
							رزرو های گذشته
						</TabsTrigger>
						<TabsTrigger value="salam">رزرو های گذشته</TabsTrigger>
					</TabsList>

					<TabsContent value="account">salam</TabsContent>
					<TabsContent value="password">naaaaa</TabsContent>
					<TabsContent value="salam">naaaaa</TabsContent>
				</Tabs>
			</div>

			<div className="flex gap-2 mt-10">
				{/* <DashboardPetCard */}
				{/* 	name="فندق" */}
				{/* 	kind="سگ" */}
				{/* 	species="ژرمن" */}
				{/* 	age="۱۲" */}
				{/* 	isAdult={false} */}
				{/* 	gender="male" */}
				{/* 	id={1} */}
				{/* /> */}
				{/* <DashboardPetCard */}
				{/* 	name="فندق" */}
				{/* 	kind="سگ" */}
				{/* 	species="ژرمن" */}
				{/* 	age="۱۲" */}
				{/* 	isAdult={false} */}
				{/* 	gender="male" */}
				{/* 	id={1} */}
				{/* /> */}
			</div>
		</div>
	);
}

export default Test;
