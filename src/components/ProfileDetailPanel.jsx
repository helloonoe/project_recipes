const ProfileDetailPanel = ({ profile, open, onClose, recipes }) => {
  if (!profile) {
    return null
  }

  const authorRecipes = recipes.filter((recipe) => recipe.author?.name === profile.name)
  const initial = profile.name?.slice(0, 1) || '?'
  const handle =
    profile.handle || `@${profile.name?.toLowerCase().replace(/\s+/g, '.') || 'perfil'}`

  return (
    <aside
      className={`detail-panel${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${profile.name}`}
    >
      <div className="detail-content">
        <header className="detail-header">
          <button
            className="icon-button detail-back"
            type="button"
            onClick={onClose}
            aria-label="Volver al feed"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <p className="detail-eyebrow">Perfil</p>
            <h2>{profile.name}</h2>
            <p className="detail-subtitle">{handle}</p>
          </div>
        </header>
        <div className="detail-body">
          <div className="profile-detail-card">
            <div className="profile-detail-top">
              <div className="profile-detail-identity">
                {profile.avatar ? (
                  <img className="profile-detail-avatar" src={profile.avatar} alt={profile.name} />
                ) : (
                  <div className="profile-detail-avatar is-placeholder">{initial}</div>
                )}
                <div className="profile-detail-meta">
                  <h3 className="profile-detail-name">{profile.name}</h3>
                  <p className="profile-detail-handle">{handle}</p>
                </div>
              </div>
              <div className="profile-detail-stats">
                <div>
                  <h3>{authorRecipes.length}</h3>
                  <p>Recetas</p>
                </div>
                <div>
                  <h3>{profile.followers ?? 0}</h3>
                  <p>Seguidores</p>
                </div>
                <div>
                  <h3>{profile.following ?? 0}</h3>
                  <p>Siguiendo</p>
                </div>
              </div>
            </div>
            <p className="profile-detail-bio">{profile.bio}</p>
            <div className="profile-detail-actions">
              <button className="primary-button" type="button">
                Seguir
              </button>
              <button className="ghost-button" type="button">
                Mensaje
              </button>
            </div>
          </div>

          <section className="detail-section">
            <h3>Recetas de {profile.name}</h3>
            {authorRecipes.length > 0 ? (
              <div className="profile-grid">
                {authorRecipes.map((recipe) => (
                  <div key={recipe.id} className="profile-tile">
                    <img
                      src={recipe.mediaType === 'video' ? recipe.poster : recipe.mediaSrc}
                      alt={recipe.title}
                    />
                    <div className="profile-tile-overlay">
                      <span>{recipe.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Aun no hay recetas publicadas.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </aside>
  )
}

export default ProfileDetailPanel
