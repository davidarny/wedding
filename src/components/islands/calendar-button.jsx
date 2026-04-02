import { downloadIcs } from "../../utils/generate-ics.js";

export default function CalendarButton() {
  return (
    <button
      type="button"
      onClick={downloadIcs}
      style={{
        border: "none",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "8px 20px",
        fontSize: "0.875rem",
        fontFamily: '"Cormorant Infant", serif',
        fontWeight: 700,
        backgroundColor: "#5C6B4F",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#3D5A3A";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#5C6B4F";
      }}
    >
      Добавить в календарь
    </button>
  );
}
