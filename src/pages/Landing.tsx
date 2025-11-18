import { useNavigate } from "react-router-dom";
import Errors404 from "@/components/error404/error404";

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
		</div>  

	);
}

export default Landing;
