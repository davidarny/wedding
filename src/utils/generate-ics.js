export function generateIcs() {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//Daniil&Anastasia//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "DTSTART:20260606T120000Z",
    "DTEND:20260606T180000Z",
    "SUMMARY:Свадьба Даниила и Анастасии",
    "DESCRIPTION:Торжественная регистрация в 13:00\\, ЗАГС п. Оршанка. Фуршет в 15:00. Банкет в 15:30 — ресторан Savory House\\, г.Йошкар-Ола.",
    "LOCATION:ресторан Savory House\\, г.Йошкар-Ола\\, ул. 70-летия Вооруженных сил СССР\\, д.20",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return event;
}

export function downloadIcs() {
  const icsContent = generateIcs();
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-daniil-anastasia.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
