import { useState } from 'react'

interface Room {
  id: string
  name: string
  lastMessage?: string
}

interface RoomListProps {
  rooms: Room[]
  activeRoomId: string | null
  onSelectRoom: (roomId: string) => void
  onCreateRoom: (name: string) => Promise<void>
}

export const RoomList = ({ rooms, activeRoomId, onSelectRoom, onCreateRoom }: RoomListProps) => {
  const [creating, setCreating] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')

  const handleCreate = async () => {
    if (!newRoomName.trim()) return
    await onCreateRoom(newRoomName)
    setNewRoomName('')
    setCreating(false)
  }

  return (
    <div className="room-list">
      <div className="room-list-header">
        <h3>Channels</h3>
        <button className="add-room-btn" onClick={() => setCreating(v => !v)} title="New channel">+</button>
      </div>

      {creating && (
        <div className="new-room-input">
          <input
            autoFocus
            placeholder="channel-name"
            value={newRoomName}
            onChange={e => setNewRoomName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleCreate()
              if (e.key === 'Escape') { setCreating(false); setNewRoomName('') }
            }}
          />
          <button onClick={handleCreate}>Add</button>
        </div>
      )}

      <div className="rooms">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-item ${activeRoomId === room.id ? 'active' : ''}`}
            onClick={() => onSelectRoom(room.id)}
          >
            <span className="room-icon">#</span>
            <span className="room-name">{room.name}</span>
            {room.lastMessage && (
              <span className="last-message">{room.lastMessage}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
