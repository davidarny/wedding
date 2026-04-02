import { downloadIcs } from "../../utils/generate-ics.js";

export default function CalendarButton() {
  return (
    <button
      onClick={downloadIcs}
      style={{
        border: "1px solid #5C6B4F",
        color: "#5C6B4F",
        borderRadius: "9999px",
        padding: "6px 16px",
        fontSize: "0.875rem",
        fontFamily: '"Cormorant Infant", serif',
        fontWeight: 700,
        background: "transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#5C6B4F";
        e.target.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#5C6B4F";
      }}
    >
      Добавить в календарь
    </button>
  );
}
