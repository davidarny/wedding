import { useState } from "react";
import { submitRsvp } from "../../services/rsvp-service.js";

const buttonClasses = {
  idle: "btn-gradient-dark cursor-pointer",
  loading: "bg-primary cursor-wait",
  success: "bg-dress-4 cursor-default",
  error: "btn-gradient-dark cursor-pointer",
};

const buttonText = {
  idle: "✓ Подтвердить",
  loading: "Отправка...",
  success: "✓ Подтверждено!",
  error: "✓ Попробовать снова",
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
    <div className="text-center py-8 px-6">
      <button
        type="button"
        onClick={handleConfirm}
        disabled={status === "loading" || status === "success"}
        className={`text-white rounded-full py-4.5 px-12 text-xl font-bold font-heading border-none transition-all duration-200 shadow-btn w-full max-w-[400px] ${buttonClasses[status]}`}
      >
        {buttonText[status]}
      </button>
      {status === "error" && <p className="text-red-600 mt-2 text-sm">{errorMsg}</p>}
    </div>
  );
}
