const ProfilePage = ({ profile, recipes }) => {
  const published = profile.publishedIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean)

  return (
    <section className="page profile-page">
      <header className="profile-header">
        <div className="profile-top">
          <img className="profile-avatar" src={profile.avatar} alt={profile.name} />
          <div className="profile-follow">
            <div>
              <h3>{profile.stats.followers}</h3>
              <p>Seguidores</p>
            </div>
            <div>
              <h3>{profile.stats.following}</h3>
              <p>Siguiendo</p>
            </div>
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="profile-handle">{profile.handle}</p>
            <p className="profile-bio">{profile.bio}</p>
            <button className="ghost-button" type="button">
              Editar perfil
            </button>
          </div>
        </div>
      </header>
      <div className="profile-counts">
        <div>
          <h3>{profile.stats.published}</h3>
          <p>Recetas</p>
        </div>
        <div>
          <h3>{profile.stats.cooked}</h3>
          <p>Realizadas</p>
        </div>
      </div>

      <div className="page-section">
        <h3 className="section-title">Recetas publicadas</h3>
        <div className="profile-grid">
          {published.map((recipe) => (
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
      </div>
    </section>
  )
}

export default ProfilePage
