import CustomToast from "@/components/Custom/CustomToast";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Custom/Select/Select";
import { translateNumber } from "@/utils/translateNumber";
import { useState } from "react";

export default function Temp() {
	const [email, setEmail] = useState<string>("");
	const [count, setCounter] = useState<number>(0);
	const [password, setPassword] = useState<string>("");
	const [loading] = useState<boolean>(false);
	const showToast = () => {
		CustomToast("This is a toast");
	};
	const increaseCounter = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div className="w-full h-screen font-3xl flex flex-col place-self-center justify-center gap-4">
			<div className="flex gap-2 rounded-md place-self-center">
				<button
					className="bg-red-600 text-white rounded-md p-2 cursor-pointer"
					onClick={() => showToast()}
				>
					toast
				</button>
				<button className="cursor-pointer bg-accent rounded-md p-2">
					{loading ? <p>Logging in....</p> : <p>Login</p>}
				</button>
			</div>

			<Select name="akhoond">
				<SelectTrigger className="w-45">
					<SelectValue placeholder="روز" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value={"1"}>1</SelectItem>
						<SelectItem value={"2"}>2</SelectItem>
						<SelectItem value={"3"}>3</SelectItem>
						<SelectItem value={"4"}>4</SelectItem>
						<SelectItem value={"5"}>5</SelectItem>
						<SelectItem value={"6"}>6</SelectItem>
						<SelectItem value={"7"}>7</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="bg-neutral-400 w-fit p-4 rounded-md flex flex-col place-self-center gap-4">
				<input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					placeholder="username"
					className="border-1 border-neutral-800"
				/>
				<input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					placeholder="password"
					className="border-1 border-neutral-800"
				/>
			</div>
			<p className="text-5xl text-center ">This is a temp page</p>
			<div className="flex flex-col place-items-center gap-2">
				<button
					className="bg-red-600 text-white rounded-md p-4 cursor-pointer"
					onClick={increaseCounter}
				>
					Increase count
				</button>
				<div className="text-red-600 flex vazir">
					Count: {translateNumber(count)}
				</div>
			</div>
		</div>
	);
}
