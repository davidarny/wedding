import clsx from "clsx";
import { useEffect, useState } from "react";
import { XIcon } from "../ui/x-icon.jsx";

const navItems = [
  { id: "hero", label: "Главная" },
  { id: "date", label: "Дата" },
  { id: "dear-guest", label: "Приглашение" },
  { id: "couple-profiles", label: "О нас" },
  { id: "info", label: "Информация" },
  { id: "dress-code", label: "Дресс-код" },
  { id: "schedule", label: "Расписание" },
  { id: "map", label: "Карта" },
];
export default function MobileNav({ embeddedShell = false }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleButton = document.getElementById("menu-toggle");

    const handleToggleClick = () => {
      setIsOpen(true);
    };

    if (toggleButton) {
      toggleButton.addEventListener("click", handleToggleClick);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener("click", handleToggleClick);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={clsx(
          "fixed inset-0 bg-black/50 z-9998 transition-[opacity,visibility] duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      <div
        className={clsx(
          "fixed top-0 left-0 w-70 h-screen bg-white flex flex-col z-9999 transition-transform duration-300",
          isOpen
            ? "translate-x-0 shadow-[2px_0_8px_rgba(0,0,0,0.1)]"
            : "-translate-x-full",
          embeddedShell && "pt-(--device-safe-top)",
        )}
      >
        <div className={clsx("flex justify-end p-4", embeddedShell && "pt-0")}>
          <button
            onClick={handleClose}
            className="bg-transparent border-none text-2xl cursor-pointer text-text p-2 flex items-center justify-center"
            aria-label="Close menu"
          >
            <XIcon size={24} />
          </button>
        </div>

        <nav className="flex flex-col py-8 px-6 gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="bg-transparent border-none text-left font-heading text-xl text-text cursor-pointer p-0 transition-colors duration-300 hover:text-primary-dark"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
