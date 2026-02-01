const navItems = [
  {
    id: 'saved',
    label: 'Guardadas',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: 'shopping',
    label: 'Lista de la compra',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M5 9h14l-1.2 10.5a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 9z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 9a4 4 0 0 1 8 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    id: 'home',
    label: 'Inicio',
    isPrimary: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: 'chats',
    label: 'Chats',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M5 6h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4 20c2.4-3.2 5.2-4.8 8-4.8s5.6 1.6 8 4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }
]

const BottomNav = ({ activeTab, onChange }) => {
  return (
    <nav className="bottom-nav" aria-label="Navegacion">
      {navItems.map((item) => {
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            type="button"
            className={`nav-button${item.isPrimary ? ' is-primary' : ''}${
              isActive ? ' is-active' : ''
            }`}
            onClick={() => onChange(item.id)}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
