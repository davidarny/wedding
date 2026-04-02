import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitMessage, submitSurvey } from "../../services/rsvp-service.js";
import RadioGroup from "./radio-group.jsx";

const formSchema = z.object({
  message: z.string().optional(),
  moneyGift: z.boolean().default(false),
  transfer: z.string().optional(),
  alcohol: z.string().optional(),
});

const transferOptions = [
  "Нет",
  "Только до торжества",
  "Только после торжества",
  "До и после торжества",
];

const alcoholOptions = [
  "Красное вино",
  "Белое вино",
  "Шампанское",
  "Виски/коньяк",
  "Не буду пить алкоголь",
  "Самогон",
];

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
    } catch {
      setStatus("error");
      setErrorMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center p-8 bg-survey-bg rounded-lg text-primary-dark">
        <h3 className="font-heading text-2xl mb-4">Спасибо!</h3>
        <p>Ваши ответы успешно отправлены.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 text-text">
      <div className="flex flex-col gap-4">
        <label htmlFor="message" className="text-xl font-medium">
          💬 Добавить сообщение для жениха и невесты
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          placeholder="Ваше сообщение..."
          className="w-full p-3 border border-primary-light rounded font-[inherit] text-base resize-y outline-none focus:ring-2 focus:ring-primary box-border"
        />
        <label className="flex items-center gap-2 cursor-pointer text-lg">
          <input
            type="checkbox"
            {...register("moneyGift")}
            className="size-5 accent-primary cursor-pointer"
          />
          денежный подарок
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-survey-bg border-l-4 border-accent p-4 rounded-r text-center text-lg">
          Пожалуйста, ответьте на вопросы, которые для вас подготовили <strong>Жених</strong> и{" "}
          <strong>Невеста</strong>:
        </div>

        <div className="bg-survey-bg p-6 rounded-lg flex flex-col gap-6">
          <RadioGroup
            label="Потребуется ли вам трансфер?"
            options={transferOptions}
            register={register("transfer")}
          />
          <RadioGroup
            label="Какой алкоголь вы предпочитаете?"
            options={alcoholOptions}
            register={register("alcohol")}
          />
        </div>
      </div>

      {status === "error" && <div className="text-red-600 text-center text-lg">{errorMessage}</div>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gradient text-white border-none py-4.5 rounded-full text-xl font-semibold cursor-pointer font-[inherit] transition-all duration-200 shadow-btn w-full mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправка..." : "✈ Отправить"}
      </button>
    </form>
  );
}
