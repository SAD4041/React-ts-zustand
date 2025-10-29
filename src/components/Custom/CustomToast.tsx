import { toast } from "sonner";

export default function CustomToast(
	message: string,
	mode?: "success" | "error" | "warning" | "info",
) {
	function ToastMessage(msg: string) {
		return (
			<div>
				<p>{msg}</p>
			</div>
		);
	}

	const commonOptions = {};
	switch (mode) {
		case "success":
			return toast.success(ToastMessage(message), commonOptions);
		case "error":
			return toast.error(ToastMessage(message), commonOptions);
		case "warning":
			return toast.warning(ToastMessage(message), commonOptions);
		case "info":
			return toast.info(ToastMessage(message), commonOptions);
		default:
			return toast(ToastMessage(message));
	}
}
