import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Plus } from "lucide-react";
import { Form, Formik, useFormikContext } from "formik";

import * as Yup from "yup";
import { NonFormikInput, type InputClass } from "../Input/NonFormikInput";
import { City } from "../Province/City";
import { Province } from "../Province/Province";
import {
	type CityResponse,
	type ProvinceResponse,
} from "@/types/addressInfoTypes";
import { LocationSelector } from "../Province/LocationSelector";
import {
	fetchCitiesService,
	fetchProvincesService,
} from "@/services/provinceService";
import { PROVINCES_QUERY_KEY, citiesQueryKey } from "@/keys/locationKeys";

export default function Address({ classes }: { classes?: InputClass }) {
	const [open, setOpen] = useState(false);
	const { values, setFieldValue } = useFormikContext<any>();

	const { data: provincesData } = useQuery<ProvinceResponse>({
		queryKey: PROVINCES_QUERY_KEY,
		queryFn: fetchProvincesService,
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60,
	});
	const provinceNumber = Number.parseInt(values.Province, 10);
	const canFetchCities = Number.isFinite(provinceNumber);
	const { data: citiesData } = useQuery<CityResponse>({
		queryKey: citiesQueryKey(provinceNumber),
		queryFn: () => fetchCitiesService(provinceNumber),
		enabled: canFetchCities,
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60,
	});

	const provinces = provincesData?.data ?? [];
	const cities = citiesData?.data ?? [];

	function openDiaglog() {
		setOpen(true);
	}
	function closeDiaglog() {
		setOpen(false);
	}

	function getNameByNum<T extends { num: number; name: string }>(
		arr: T[],
		num: number,
	): string | undefined {
		return arr.find((item) => item.num === num)?.name;
	}

	const validationSchema = Yup.object({
		Province: Yup.string().required("اجباری است"),
		City: Yup.string().required("اجباری است"),
		Vahed: Yup.string().required("اجباری است"),
		Pelak: Yup.string().required("اجباری است"),
		Address: Yup.string().required("اجباری است"),
	});

	const fullAddress = `${getNameByNum(provinces, parseInt(values.Province))}، ${getNameByNum(cities, parseInt(values.City))}، ${values.Pelak}، ${values.Vahed}، ${values.Address}`;
	return (
		<>
			<div className="flex gap-3">
				<Button className="" onClick={openDiaglog} type="button">
					<Plus />
				</Button>
				<NonFormikInput
					classes={classes}
					disabled
					shadow
					value={values.Province ? fullAddress : ""}
				/>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent dir="rtl">
					<DialogTitle className="mt-5">انتخاب آدرس</DialogTitle>

					<Formik
						initialValues={{
							Province: "",
							City: "",
							Pelak: "",
							Vahed: "",
							Address: "",
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							setFieldValue("City", values.City);
							setFieldValue("Province", values.Province);
							setFieldValue("Pelak", values.Pelak);
							setFieldValue("Vahed", values.Vahed);
							setFieldValue("Address", values.Address);
							closeDiaglog();
						}}
					>
						<Form>
							<div className="flex flex-col gap-4">
								<div className="flex w-full">
									<LocationSelector>
										<div className="flex w-1/4"></div>
										<div className="flex w-3/4 gap-2">
											<Province className="w-full" />
											<City className="w-full" />
										</div>
									</LocationSelector>
								</div>
								<div className="flex items-center w-full text-xl gap-4">
									<div className="flex w-full items-center">
										<div className="flex w-1/4">
											<p>پلاک</p>
										</div>
										<div className="flex w-3/4">
											<Input
												name="Pelak"
												shadow
												classes={{
													className: "w-full",
													inputClassName: "h-13 border-0",
												}}
											></Input>
										</div>
									</div>
								</div>
								<div className="flex items-center w-full text-xl gap-4">
									<div className="flex w-full items-center">
										<div className="flex w-1/4">
											<p>واحد</p>
										</div>
										<div className="flex w-3/4">
											<Input
												name="Vahed"
												shadow
												classes={{
													className: "w-full",
													inputClassName: "h-13 border-0",
												}}
											></Input>
										</div>
									</div>
								</div>
								<div className="flex items-center w-full text-xl gap-4">
									<div className="flex w-full items-center">
										<div className="flex w-1/4">
											<p>آدرس</p>
										</div>
										<div className="flex w-3/4">
											<Textarea
												name="Address"
												rows={5}
												classes={{ inputClassName: "drop-shadow-lg border-0" }}
											/>
										</div>
									</div>
								</div>
								<Button type="submit" className="text-lg">
									ثبت
								</Button>
							</div>
						</Form>
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
}
