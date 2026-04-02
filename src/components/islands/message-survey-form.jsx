import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitMessage, submitSurvey } from "../../services/rsvp-service.js";

const formSchema = z.object({
  message: z.string().optional(),
  moneyGift: z.boolean().default(false),
  transfer: z.string().optional(),
  alcohol: z.string().optional(),
});

export default function MessageSurveyForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      moneyGift: false,
      transfer: "",
      alcohol: "",
    },
  });

  const onSubmit = async (data) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const promises = [];

      if (data.message || data.moneyGift) {
        promises.push(submitMessage({ message: data.message, moneyGift: data.moneyGift }));
      }

      if (data.transfer || data.alcohol) {
        promises.push(submitSurvey({ transfer: data.transfer, alcohol: data.alcohol }));
      }

      if (promises.length === 0) {
        setStatus("idle");
        return;
      }

      await Promise.all(promises);
      setStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#E8F0EC",
          borderRadius: "8px",
          color: "#5C6B4F",
        }}
      >
        <h3
          style={{
            fontFamily: '"Cormorant Infant", serif',
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          Спасибо!
        </h3>
        <p>Ваши ответы успешно отправлены.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        fontFamily: '"Cormorant Infant", serif',
        color: "#2D2D2D",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          💬 Добавить сообщение для жениха и невесты
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Ваше сообщение..."
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #D4DFC7",
            borderRadius: "4px",
            fontFamily: "inherit",
            fontSize: "1rem",
            resize: "vertical",
            outlineColor: "#8B9D77",
            boxSizing: "border-box",
          }}
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          <input
            type="checkbox"
            {...register("moneyGift")}
            style={{ width: "1.2rem", height: "1.2rem", accentColor: "#8B9D77", cursor: "pointer" }}
          />
          денежный подарок
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            backgroundColor: "#E8F0EC",
            borderLeft: "4px solid #C4A97D",
            padding: "1rem",
            borderRadius: "0 4px 4px 0",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          Пожалуйста, ответьте на вопросы, которые для вас подготовили <strong>Жених</strong> и{" "}
          <strong>Невеста</strong>:
        </div>

        <div
          style={{
            backgroundColor: "#E8F0EC",
            padding: "1.5rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontWeight: "600", fontSize: "1.2rem", margin: 0 }}>
              Потребуется ли вам трансфер?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Нет", "Только до торжества", "Только после торжества", "До и после торжества"].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      minHeight: "44px",
                      fontSize: "1.1rem",
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register("transfer")}
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        accentColor: "#8B9D77",
                        cursor: "pointer",
                        margin: 0,
                      }}
                    />
                    {option}
                  </label>
                ),
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontWeight: "600", fontSize: "1.2rem", margin: 0 }}>
              Какой алкоголь вы предпочитаете?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Красное вино",
                "Белое вино",
                "Шампанское",
                "Виски/коньяк",
                "Не буду пить алкоголь",
                "Самогон",
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    minHeight: "44px",
                    fontSize: "1.1rem",
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("alcohol")}
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      accentColor: "#8B9D77",
                      cursor: "pointer",
                      margin: 0,
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div style={{ color: "#d32f2f", textAlign: "center", fontSize: "1.1rem" }}>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          backgroundColor: "#8B9D77",
          color: "white",
          border: "none",
          padding: "1rem",
          borderRadius: "4px",
          fontSize: "1.2rem",
          fontWeight: "600",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "background-color 0.2s",
          opacity: status === "loading" ? 0.7 : 1,
          width: "100%",
          marginTop: "1rem",
        }}
      >
        {status === "loading" ? "Отправка..." : "✈ Отправить"}
      </button>
    </form>
  );
}
