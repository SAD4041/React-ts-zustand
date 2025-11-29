import UserSidebar from "@/components/Sidebar/UserSidebar";
import BrandSidebar from "@/components/Sidebar/BrandSidebar";
import { BrowserRouter } from "react-router-dom";

function SidebarTest() {

	return (
		<div className="w-full h-screen font-3xl flex flex-col place-self-center justify-center">
			<div className="flex gap-2 rounded-md place-self-center">
				<button
					className="text-white bg-sky-600 rounded-md p-2 cursor-pointer"
					onClick={() => {
                        <BrowserRouter>
                            <BrandSidebar/>
                        </BrowserRouter>
					}}
				>
					Brand
				</button>
			</div>
			<UserSidebar/>
		</div>
	);
}

export default SidebarTest;
