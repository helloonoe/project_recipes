const PlaceholderPage = ({ title, description, actionLabel }) => {
  return (
    <section className="placeholder">
      <div className="placeholder-card">
        <p className="placeholder-eyebrow">En progreso</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {actionLabel ? (
          <button className="primary-button" type="button">
            {actionLabel}
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default PlaceholderPage
