import { useMemo, useState } from 'react'

const ChatsPage = ({ chats, recommendedGroups = [], onNavigateHome }) => {
  const [query, setQuery] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const filteredChats = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) {
      return chats
    }
    return chats.filter((chat) => chat.name.toLowerCase().includes(value))
  }, [chats, query])

  return (
    <section className={`page chats-page${showRecommendations ? ' is-exploring' : ''}`}>
      <header className="page-header">
        <div>
          <h2>Chats</h2>
          <p>Conversaciones, grupos y dudas resueltas.</p>
        </div>
        <button className="primary-button" type="button">
          Crear grupo
        </button>
      </header>

      <div className="chat-search">
        <input
          className="text-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar grupos o personas"
        />
        <button
          className={`ghost-button chat-toggle${showRecommendations ? ' is-active' : ''}`}
          type="button"
          onClick={() => setShowRecommendations((prev) => !prev)}
        >
          {showRecommendations ? 'Ver chats' : 'Explorar grupos'}
        </button>
      </div>

      {showRecommendations ? (
        <div className="chat-recommendations">
          <h3 className="section-title">Grupos que pueden gustarte</h3>
          <div className="recommendation-grid">
            {recommendedGroups.length > 0 ? (
              recommendedGroups.map((group) => (
                <div key={group.id} className="recommendation-card">
                  <div>
                    <h4>{group.name}</h4>
                    <p className="recommendation-reason">{group.reason}</p>
                    <p className="chat-members">{group.members} miembros</p>
                  </div>
                  <button className="primary-button" type="button">
                    Unirme
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-illustration">
                  <span className="empty-bubble bubble-1" />
                  <span className="empty-bubble bubble-2" />
                  <span className="empty-bubble bubble-3" />
                </div>
                <p>Guarda recetas para recibir sugerencias mas precisas.</p>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => onNavigateHome?.()}
                >
                  Explorar recetas
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {filteredChats.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <span className="empty-bubble bubble-1" />
                <span className="empty-bubble bubble-2" />
                <span className="empty-bubble bubble-3" />
              </div>
              <p>No encontramos chats con ese nombre.</p>
              <button
                className="ghost-button"
                type="button"
                onClick={() => onNavigateHome?.()}
              >
                Ver recetas
              </button>
            </div>
          ) : (
            <div className="chat-list">
              {filteredChats.map((chat) => (
                <div key={chat.id} className="chat-card">
                  <div className="chat-avatar">{chat.type === 'group' ? 'GR' : 'DM'}</div>
                  <div className="chat-info">
                    <div className="chat-top">
                      <h4>{chat.name}</h4>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                    <p>{chat.lastMessage}</p>
                    <div className="chat-meta">
                      <span className="tag">{chat.type === 'group' ? 'Grupo' : 'Directo'}</span>
                      {chat.type === 'group' ? (
                        <span className="chat-members">{chat.members} miembros</span>
                      ) : null}
                      {chat.unread > 0 ? <span className="chat-unread">{chat.unread}</span> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ChatsPage
