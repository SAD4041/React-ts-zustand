import { Button } from "@/components/Custom/Button/Button";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { cn } from "@/lib/utils";
import type { BookingCardProps } from "@/types/bookingCardTypes";
import { formatNumber } from "@/utils/formatNumber";
import { translateNumber } from "@/utils/translateNumber";
import { Calendar, Clock, MapPin } from "lucide-react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import { Form, Formik } from "formik";

export default function BookingCard({
	cardStatus,
	commentStatus,
	side,
	title,
	services,
	cost,
	location,
	date,
	time,
}: BookingCardProps) {
	const isMobile = useMobile();

	const [cancelReservelDialogOpen, setCancelReserveDialogOpen] =
		useState(false);
	const [cancelRequestDialogOpen, setCancelRequestDialogOpen] = useState(false);
	const [commentDialogOpen, setCommenDialogOpen] = useState(false);

	function openCancelRequestDialog() {
		setCancelRequestDialogOpen(true);
	}
	function openCancelReserveDialog() {
		setCancelReserveDialogOpen(true);
	}
	function openCommentDialogOpen() {
		setCommenDialogOpen(true);
	}
	return (
		<>
			<div
				className={cn(
					"relative w-full border-3 sm:border-1 sm:border-black/20 rounded-3xl p-3 bg-white",
					cardStatus == "rejected" ? "border-rejected-red" : "",
					cardStatus == "canceled" ? "border-rejected-red" : "",
					cardStatus == "accepted" ? "border-confirmed-green" : "",
					cardStatus == "done" ? "border-primary" : "",
					cardStatus == "pending" ? "border-waiting-yellow" : "",
				)}
				dir="rtl"
			>
				{isMobile && (
					<div className="absolute left-5 top-0 -translate-y-1/2 flex">
						{cardStatus == "canceled" && (
							<div className="border-0 bg-white rounded-none text-rejected-red px-1">
								لفو شده
							</div>
						)}
						{cardStatus == "rejected" && (
							<div className="border-0 bg-white rounded-none text-rejected-red px-1">
								رد شده
							</div>
						)}
						{cardStatus == "accepted" && (
							<div className="border-0 bg-white rounded-none text-confirmed-green px-1">
								تایید شده
							</div>
						)}
						{cardStatus == "done" && (
							<div className="border-0 bg-white rounded-none text-primary px-1">
								انجام شده
							</div>
						)}
						{cardStatus == "pending" && (
							<div className="border-0 bg-white rounded-none text-waiting-yellow px-1">
								در انتظار تایید
							</div>
						)}
					</div>
				)}
				<div className="relative w-full h-full">
					{!isMobile && (
						<div className="absolute left-0 flex">
							{cardStatus == "canceled" && (
								<div className="border-2 border-rejected-red text-rejected-red rounded-full px-3">
									لفو شده
								</div>
							)}
							{cardStatus == "rejected" && (
								<div className="border-2 border-rejected-red text-rejected-red rounded-full px-3">
									رد شده
								</div>
							)}
							{cardStatus == "accepted" && (
								<div className="border-2 border-confirmed-green text-confirmed-green rounded-full px-3">
									تایید شده
								</div>
							)}
							{cardStatus == "done" && (
								<div className="border-2 border-primary text-primary rounded-full px-3">
									انجام شده
								</div>
							)}
							{cardStatus == "pending" && (
								<div className="border-2 border-waiting-yellow text-waiting-yellow rounded-full px-3">
									در انتظار تایید
								</div>
							)}
						</div>
					)}

					<div className="flex flex-col gap-2 sm:gap-0">
						<div className="flex gap-5">
							<div className="flex flex-col items-center">
								<div className="rounded-full size-20 bg-gray-500"></div>
								{isMobile && <p className="text-2xl">{title}</p>}
							</div>
							<div className="flex-1 flex flex-col gap-2">
								{!isMobile && <p className="text-2xl">{title}</p>}
								{!isMobile && <p className="text-xl">{services}</p>}
								<div className="flex flex-col items-center sm:flex-row">
									<div className="flex flex-col sm:w-full items-start sm:flex-row gap-3 sm:gap-[5%] md:gap-[10%]">
										<p className="flex text-gray-500 gap-1">
											<MapPin />
											{location}
										</p>
										<p className="flex text-gray-500 gap-1">
											<Calendar />
											{translateNumber(date)}
										</p>
										<p className="flex text-gray-500 gap-1">
											<Clock />
											{translateNumber(time)}
										</p>
									</div>
								</div>
								<p className="text-xl w-full text-left sm:text-right">
									مبلغ: {translateNumber(formatNumber(cost))} تومان
								</p>
							</div>
						</div>
						<div className="w-full flex justify-end gap-2">
							{cardStatus == "accepted" && (
								<Button shadow={false} className="shadow-none h-8 py-0">
									چت
								</Button>
							)}
							<Button
								shadow={false}
								variant={"outline"}
								className="shadow-none h-8 py-0"
							>
								مشاهده جزئیات
							</Button>
							{cardStatus == "accepted" && (
								<Button
									variant={"outline"}
									shadow={false}
									className="shadow-none h-8 py-0 text-rejected-red border-rejected-red hover:bg-rejected-red"
									onClick={openCancelReserveDialog}
								>
									لغو رزرو
								</Button>
							)}
							{cardStatus == "pending" && (
								<Button
									variant={"outline"}
									shadow={false}
									className="shadow-none h-8 py-0 text-rejected-red border-rejected-red hover:bg-rejected-red"
									onClick={openCancelRequestDialog}
								>
									لغو درخواست
								</Button>
							)}
							{cardStatus == "done" && !commentStatus && (
								<Button
									shadow={false}
									className="shadow-none h-8 py-0"
									onClick={openCommentDialogOpen}
								>
									ثبت نظر
								</Button>
							)}
							{cardStatus == "done" && commentStatus && (
								<>
									<div className="flex items-center gap-2">
										<p className="text-md">نظر شما:</p>
										<Rating defaultValue={commentStatus} readOnly>
											{Array.from({ length: 5 }).map((_, index) => (
												<RatingButton
													className="text-primary"
													key={index}
													size={10}
												/>
											))}
										</Rating>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<Dialog
				open={cancelRequestDialogOpen}
				onOpenChange={setCancelRequestDialogOpen}
			>
				<DialogContent className="flex flex-col gap-10 p-10 items-center">
					<p className="text-xl">آیا از لغو درخواست خود مطمئن هستید؟</p>
					<div className="flex gap-3">
						<Button
							variant={"outline"}
							shadow={false}
							className="shadow-none h-8 py-5 w-40"
						>
							انصراف
						</Button>
						<Button shadow={false} className="shadow-none h-8 py-5 w-40">
							لغو درخواست
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<Dialog
				open={cancelReservelDialogOpen}
				onOpenChange={setCancelReserveDialogOpen}
			>
				<DialogContent className="flex flex-col gap-10 p-10 items-center">
					<p className="text-xl">آیا از لغو رزرو خود مطمئن هستید؟</p>
					<div className="flex gap-3">
						<Button
							variant={"outline"}
							shadow={false}
							className="shadow-none h-8 py-5 w-40"
						>
							انصراف
						</Button>
						<Button shadow={false} className="shadow-none h-8 py-5 w-40">
							لغو رزرو
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<Dialog open={commentDialogOpen} onOpenChange={setCommenDialogOpen}>
				<Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
					<Form>
						<DialogContent
							className="flex flex-col gap-10 p-10 items-center"
							dir="rtl"
						>
							<p className="text-xl">نظر خود را بنویسید</p>
							<Textarea
								classes={{
									inputClassName: "!font-normal border-0 drop-shadow-lg",
								}}
								placeholder="خودتان بنویسید"
								rows={5}
								name="comment"
							></Textarea>
							<p className="text-xl">از یک تا پنج امتیاز بده</p>
							<Rating defaultValue={commentStatus}>
								{Array.from({ length: 5 }).map((_, index) => (
									<RatingButton
										className="text-primary"
										key={index}
										size={30}
									/>
								))}
							</Rating>
							<div className="flex gap-3">
								<Button shadow={false} className="shadow-none h-8 py-5 w-40">
									ثبت نظر
								</Button>
							</div>
						</DialogContent>
					</Form>
				</Formik>
			</Dialog>
		</>
	);
}
