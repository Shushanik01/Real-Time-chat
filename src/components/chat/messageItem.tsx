export interface Message {
  id: string
  text: string
  userId: string
  userName: string
  userPhoto: string
  createdAt: { toDate: () => Date }  
}

interface MessageItemProps {
  message: Message
  isMine: boolean       
}

export const MessageItem = ({ message, isMine }: MessageItemProps) => {
  const formatTime = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate()
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`message-item ${isMine ? 'mine' : 'other'}`}>
      {!isMine && (
        message.userPhoto ? (
          <img
            src={message.userPhoto}
            alt={message.userName}
            className="avatar"
            referrerPolicy="no-referrer"
            onError={e => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null
      )}
      {!isMine && (
        <div className={`avatar avatar-fallback${message.userPhoto ? ' hidden' : ''}`}>
          {(message.userName || '?')[0].toUpperCase()}
        </div>
      )}
      
      <div className="message-content">
        {!isMine && <div className="sender-name">{message.userName}</div>}
        <div className="message-bubble">
          <p>{message.text}</p>
          <span className="timestamp">{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}