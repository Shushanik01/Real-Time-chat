import { useAuth } from '../../hooks/useAuth'

interface TypingIndicatorProps {
  typingUsers: string[]  
}

export const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  const { user: currentUser } = useAuth()
  
  const otherTypingUsers = typingUsers.filter(id => id !== currentUser?.uid)
  
  if (otherTypingUsers.length === 0) return null
  

  
  if (otherTypingUsers.length === 1) {
    return (
      <div className="typing-indicator">
        <span className="typing-dot">•</span>
        Someone is typing...
      </div>
    )
  }
  
  if (otherTypingUsers.length === 2) {
    return (
      <div className="typing-indicator">
        <span className="typing-dot">••</span>
        2 people are typing...
      </div>
    )
  }
  
  return (
    <div className="typing-indicator">
      <span className="typing-dot">•••</span>
      Several people are typing...
    </div>
  )
}