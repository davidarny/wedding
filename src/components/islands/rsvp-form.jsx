import clsx from "clsx";
import { useState } from "react";
import { submitRsvp } from "../../services/rsvp-service.js";
import { CheckIcon } from "../ui/check-icon.jsx";

const buttonClasses = {
	idle: "btn-gradient-dark cursor-pointer",
	loading: "bg-primary cursor-wait",
	success: "bg-dress-4 cursor-default",
	error: "btn-gradient-dark cursor-pointer",
};

const buttonContent = {
	idle: <><CheckIcon size={20} className="text-white" /> Подтвердить</>,
	loading: "Отправка...",
	success: <><CheckIcon size={20} className="text-white" /> Подтверждено!</>,
	error: <><CheckIcon size={20} className="text-white" /> Попробовать снова</>,
};

export default function RsvpForm() {
	const [status, setStatus] = useState("idle");
	const [errorMsg, setErrorMsg] = useState("");

	const handleConfirm = async () => {
		if (status === "loading" || status === "success") return;

		setStatus("loading");
		setErrorMsg("");

		try {
			await submitRsvp({ confirmed: true });
			setStatus("success");
		} catch (err) {
			setStatus("error");
			setErrorMsg(err.message || "Произошла ошибка");
		}
	};

	return (
		<div className="text-center py-8 px-6 bg-white/80">
			<button
				type="button"
				onClick={handleConfirm}
				disabled={status === "loading" || status === "success"}
				className={clsx(
					"text-white rounded-full py-4.5 px-12 text-xl font-bold font-heading border-none transition-all duration-200 shadow-btn w-full max-w-[400px]",
					buttonClasses[status],
				)}
			>
				<span className="flex items-center justify-center gap-1.5">
					{buttonContent[status]}
				</span>
			</button>
			{status === "error" && (
				<p className="text-red-600 mt-2 text-sm">{errorMsg}</p>
			)}
		</div>
	);
}
