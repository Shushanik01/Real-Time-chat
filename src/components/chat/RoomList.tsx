interface Room {
  id: string
  name: string
  lastMessage?: string
}

interface RoomListProps {
  rooms: Room[]
  activeRoomId: string | null
  onSelectRoom: (roomId: string) => void
}

export const RoomList = ({ rooms, activeRoomId, onSelectRoom }: RoomListProps) => {
  return (
    <div className="room-list">
      <div className="room-list-header">
        <h3>Channels</h3>
      </div>
      
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