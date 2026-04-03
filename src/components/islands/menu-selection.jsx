import clsx from "clsx";
import { useState } from "react";
import { submitMenu } from "../../services/rsvp-service.js";

const saladOptions = [
  "Салат с сёмгой в тайском стиле",
  "Салат «Оливье» с ростбифом",
  "Салат «Цезарь» с куриным филе",
];

const hotCourseOptions = [
  "Свиная вырезка с апельсиновым соусом",
  "Полента с рваной говядиной",
  "Судак под итальянским маринадом",
  "Индейка со сливочно-шпинатным соусом",
];

function DishList({ title, options, selected, onSelect, disabled }) {
  return (
    <div>
      <h3 className="text-center text-text text-balance text-xl md:text-2xl font-cursive font-normal mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-2 text-center">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={clsx(
              "font-body text-lg py-2.5 px-5 rounded-full border-2 transition-all duration-200",
              disabled
                ? "cursor-default"
                : "cursor-pointer",
              selected === option
                ? "border-accent/60 bg-accent/8 font-medium"
                : "border-transparent hover:bg-accent/5",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

const buttonClasses = {
  idle: "btn-gradient cursor-pointer",
  loading: "bg-primary cursor-wait",
  error: "btn-gradient cursor-pointer",
};

export default function MenuSelection() {
  const [salad, setSalad] = useState("");
  const [hotCourse, setHotCourse] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const hasSelection = salad || hotCourse;

  const handleSubmit = async () => {
    if (status === "loading" || status === "success") return;
    if (!hasSelection) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await submitMenu({ salad, hotCourse });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Произошла ошибка");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <DishList
        title="Салаты"
        options={saladOptions}
        selected={salad}
        onSelect={setSalad}
        disabled={status === "success"}
      />
      <DishList
        title="Горячее"
        options={hotCourseOptions}
        selected={hotCourse}
        onSelect={setHotCourse}
        disabled={status === "success"}
      />

      {status === "success" ? (
        <p className="font-body text-base leading-relaxed text-center text-primary-dark text-pretty">
          ✓ Ваш выбор сохранён, спасибо!
        </p>
      ) : (
        <div className="text-center space-y-4">
          <p className="font-body text-base leading-relaxed text-text-muted text-pretty">
            Нажмите на блюдо, чтобы выбрать
          </p>
          {hasSelection && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
              className={clsx(
                "text-white rounded-full py-3.5 px-10 text-lg font-semibold font-heading border-none transition-all duration-200 shadow-btn",
                buttonClasses[status],
              )}
            >
              {status === "loading" ? "Отправка..." : "Сохранить выбор"}
            </button>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}
