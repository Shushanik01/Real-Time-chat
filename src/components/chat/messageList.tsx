import { useEffect, useRef } from 'react'
import { MessageItem, type Message } from './messageItem'

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        <p>No messages yet. Say hello!</p>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isMine={message.userId === currentUserId}
        />
      ))}
      <div ref={bottomRef} />  
    </div>
  )
}