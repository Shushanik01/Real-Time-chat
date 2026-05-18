import { useState } from 'react'

interface MessageInputProps {
  onSendMessage: (text: string) => void   
  onStartTyping?: () => void              
  onStopTyping?: () => void                
}

export const MessageInput = ({ onSendMessage, onStartTyping, onStopTyping }: MessageInputProps) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage('')
    onStopTyping?.()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => { setMessage(e.target.value); onStartTyping?.() }}
        onBlur={() => onStopTyping?.()}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}