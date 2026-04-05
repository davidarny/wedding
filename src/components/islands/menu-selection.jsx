import clsx from "clsx";
import { Check } from "lucide-react";
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
  const selectedCount = selected ? 1 : 0;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-text text-xl md:text-2xl font-cursive font-normal">{title}</h3>
        <span
          className={clsx(
            "font-body text-sm rounded-full px-3 py-1 border transition-colors duration-200",
            selectedCount === 1
              ? "border-primary/40 bg-primary/10 text-primary-dark"
              : "border-text/15 bg-white/70 text-text-muted",
          )}
        >
          {selectedCount}/1
        </span>
      </div>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <div key={option} className="relative">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(option)}
                disabled={disabled}
                className={clsx(
                  "group relative w-full font-body text-lg text-left px-1 py-2 transition-all duration-200",
                  disabled ? "cursor-default opacity-70" : "cursor-pointer",
                  isSelected ? "rounded-xl bg-primary/9" : "rounded-xl hover:bg-white/45",
                )}
              >
                <div className="relative z-[1] flex items-start gap-3 px-2 py-1 pr-32">
                  <span
                    className={clsx(
                      "mt-1 size-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-150",
                      isSelected ? "border-primary bg-primary/15" : "border-text/30 bg-white",
                    )}
                  >
                    {isSelected && <span className="size-2 rounded-full bg-primary" />}
                  </span>

                  <span className="min-w-0 leading-[1.16] tracking-[0.01em]">{option}</span>
                </div>

                {isSelected && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 -rotate-3 inline-flex items-center border-2 border-primary-dark/45 bg-white/40 px-2.5 py-1 font-heading text-[12px] font-bold uppercase tracking-[0.14em] text-primary-dark/85 [box-shadow:inset_0_0_0_1px_rgba(78,95,66,0.2)]">
                    ВЫБРАНО
                  </span>
                )}

                <span
                  className={clsx(
                    "pointer-events-none absolute left-11 right-2 bottom-0 h-px bg-gradient-to-r",
                    isSelected
                      ? "from-primary/30 via-primary/25 to-transparent"
                      : "from-text/15 via-text/12 to-transparent",
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
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

  const selectedCount = Number(Boolean(salad)) + Number(Boolean(hotCourse));
  const canSubmit = selectedCount === 2;

  const handleSubmit = async () => {
    if (status === "loading" || status === "success") return;
    if (!canSubmit) return;

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
    <div className="max-w-md mx-auto space-y-6">
      <p className="font-body text-base leading-relaxed text-center text-text-muted text-pretty">
        Выберите по 1 блюду в каждом разделе
      </p>

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
          <span className="inline-flex items-center gap-1.5">
            <Check size={20} /> Ваш выбор сохранён, спасибо!
          </span>
        </p>
      ) : (
        <div className="text-center space-y-2 px-1">
          <div className="space-y-2">
            <p className="font-body text-sm text-text-muted">Выбрано {selectedCount} из 2</p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading" || !canSubmit}
              className={clsx(
                "text-white rounded-full py-3.5 px-10 text-lg font-semibold font-heading border-none transition-all duration-200 shadow-btn w-full",
                buttonClasses[status],
                !canSubmit && "opacity-60 cursor-not-allowed",
              )}
            >
              {status === "loading" ? "Отправка..." : "Продолжить"}
            </button>
            {!canSubmit && (
              <p className="font-body text-sm text-text-muted">Сначала выберите салат и горячее</p>
            )}
          </div>
          {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}
        </div>
      )}
    </div>
  );
}
