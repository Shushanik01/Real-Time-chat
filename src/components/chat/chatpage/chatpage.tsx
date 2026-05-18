import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRooms } from '@/hooks/useRooms'
import { useMessages } from '@/hooks/useMessages'
import { useTyping } from '@/hooks/useTyping'
import { RoomList } from '@/components/chat/RoomList'
import { MessageList } from '@/components/chat/messageList'
import { MessageInput } from '@/components/chat/messageInput'
import { TypingIndicator } from '@/components/typingIndicator/typingIndicator'
import { auth } from '@/firebase/config'
import './ChatPage.css'

const ChatPage = () => {
  const { user, isLoading: authLoading } = useAuth()
  
  const { rooms, loading: roomsLoading, activeRoomId, setActiveRoomId } = useRooms()
  
  const { messages, sendMessage, loading: messagesLoading } = useMessages(activeRoomId)
  
  const { typingUsers, startTyping, stopTyping } = useTyping(activeRoomId, user?.uid || '')
  
  const [showSidebar, setShowSidebar] = useState(true)

  if (authLoading || roomsLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading chat...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (rooms.length === 0) {
    return (
      <div className="empty-rooms-container">
        <p>No rooms available. Please contact administrator.</p>
      </div>
    )
  }

  return (
    <div className="chat-page">
      <button 
        className="sidebar-toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? '←' : '→'}
      </button>

      <div className={`sidebar ${showSidebar ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Chat Rooms</h2>
          <div className="user-info">
            <img 
              src={user.photoURL || '/default-avatar.png'} 
              alt={user.displayName || 'User'}
              className="user-avatar"
            />
            <span className="user-name">{user.displayName}</span>
          </div>
        </div>
        
        <RoomList
          rooms={rooms}
          activeRoomId={activeRoomId}
          onSelectRoom={(roomId) => {
            setActiveRoomId(roomId)
            setShowSidebar(false) 
          }}
        />
        
        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={() => auth.signOut()}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <div className="room-info">
            <h3>
              # {rooms.find(r => r.id === activeRoomId)?.name || 'Select a room'}
            </h3>
            <span className="room-members-count">
              {typingUsers.length > 0 && '💬'}
            </span>
          </div>
        </div>

        <div className="messages-container">
          {messagesLoading && messages.length === 0 ? (
            <div className="messages-loading">
              <p>Loading messages...</p>
            </div>
          ) : (
            <>
              <MessageList 
                messages={messages} 
                currentUserId={user.uid}
              />
              
              {typingUsers.length > 0 && (
                <TypingIndicator
                  typingUsers={typingUsers}
                />
              )}
            </>
          )}
        </div>

        <div className="input-container">
          <MessageInput
            onSendMessage={sendMessage}
            onStartTyping={startTyping}
            onStopTyping={stopTyping}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatPage