import CustomButton from "@/components/Custom/CustomButton";
import {Button} from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
		</div>
	);
}

export default Landing;
