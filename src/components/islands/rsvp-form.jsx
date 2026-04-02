import { useState } from "react";
import { submitRsvp } from "../../services/rsvp-service.js";

export default function RsvpForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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

  const buttonStyles = {
    idle: {
      backgroundColor: "#5C6B4F",
      color: "#ffffff",
    },
    loading: {
      backgroundColor: "#8B9D77",
      color: "#ffffff",
      cursor: "wait",
    },
    success: {
      backgroundColor: "#B5C4A3",
      color: "#ffffff",
      cursor: "default",
    },
    error: {
      backgroundColor: "#5C6B4F",
      color: "#ffffff",
    },
  };

  const buttonText = {
    idle: "✓ Подтвердить",
    loading: "Отправка...",
    success: "✓ Подтверждено!",
    error: "✓ Попробовать снова",
  };

  return (
    <div className="text-center py-8 px-6" style={{ fontFamily: '"Cormorant Infant", serif' }}>
      <button
        type="button"
        onClick={handleConfirm}
        disabled={status === "loading" || status === "success"}
        style={{
          ...buttonStyles[status],
          background:
            status === "idle" || status === "error"
              ? "linear-gradient(180deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.03) 46%, rgba(0,0,0,.12) 100%), #5C6B4F"
              : undefined,
          borderRadius: "9999px",
          padding: "18px 48px",
          fontSize: "1.25rem",
          fontWeight: 700,
          fontFamily: '"Cormorant Infant", serif',
          border: "none",
          cursor: status === "loading" || status === "success" ? "default" : "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(92, 107, 79, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {buttonText[status]}
      </button>
      {status === "error" && (
        <p style={{ color: "#dc2626", marginTop: "8px", fontSize: "0.875rem" }}>{errorMsg}</p>
      )}
    </div>
  );
}
