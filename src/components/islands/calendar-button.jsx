import { downloadIcs } from "../../utils/generate-ics.js";

export default function CalendarButton() {
  return (
    <button
      type="button"
      onClick={downloadIcs}
      className="border-none text-white rounded-full py-2 px-5 text-sm font-heading font-bold bg-primary-dark cursor-pointer whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-dress-1"
    >
      Добавить в календарь
    </button>
  );
}
