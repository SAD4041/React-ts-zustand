import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../Select/Select";

import customStyles from "./Province.module.css";

import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { LocationContext } from "@/types/locationSelectorTypes";
import { fetchProvincesService } from "@/services/provinceService";
import type { ProvinceResponse } from "@/types/addressInfoTypes";
import { PROVINCES_QUERY_KEY } from "@/keys/locationKeys";

export function Province({
	className,
	name,
}: {
	className?: string;
	name?: string;
}) {
	const context = useContext(LocationContext);
	if (!context)
		throw new Error("Province must be used within a LocationSelector");

	const { province, setProvince } = context;

	const ref = useRef<HTMLButtonElement>(null);
	const [width, setWidth] = useState(0);

	const { data } = useQuery<ProvinceResponse>({
		queryKey: PROVINCES_QUERY_KEY,
		queryFn: fetchProvincesService,
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60,
	});
	useEffect(() => {
		if (ref.current) {
			setWidth(ref.current.clientWidth); // gets the width in pixels
		}
	}, []);
	useEffect(() => {
		console.log(width);
	}, [width]);

	function calculateFontSize(length: number) {
		const fontSize = (width - 20) / (length * 0.8);
		const maxFontSize = 15;
		return fontSize > maxFontSize ? maxFontSize : fontSize;
	}

	return (
		<Select name={name || "Province"} onValueChange={setProvince}>
			<SelectTrigger
				ref={ref}
				style={
					{
						"--fs": `${calculateFontSize(province.length || 5)}px`,
					} as React.CSSProperties
				}
				className={cn(
					"w-30 border-1 border-gray-400/20",
					className,
					customStyles.dynamicSize,
				)}
			>
				<SelectValue placeholder="استان" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Array.from(data?.data ?? []).map((city) => {
						return (
							<SelectItem
								style={{ fontSize: calculateFontSize(city.name.length) }}
								value={city.num.toString()}
							>
								{city.name}
							</SelectItem>
						);
					})}
					<SelectItem className="text-sm" value="asdf">
						بهترین ها
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
