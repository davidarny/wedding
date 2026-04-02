import { useState, useEffect } from 'react';

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

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const toggleButton = document.getElementById('menu-toggle');
    
    const handleToggleClick = () => {
      setIsOpen(true);
    };

    if (toggleButton) {
      toggleButton.addEventListener('click', handleToggleClick);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', handleToggleClick);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>

      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 300ms ease, visibility 300ms ease',
          zIndex: 9998,
        }}
      />


      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: '#ffffff',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms ease',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isOpen ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#2D2D2D',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>


        <nav style={{ display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '1.5rem' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: '"Cormorant Infant", serif',
                fontSize: '1.25rem',
                color: hoveredId === item.id ? '#5C6B4F' : '#2D2D2D',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 300ms ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
