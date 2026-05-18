import { useEffect, useState } from "react"
import { subToRooms } from "./subToRooms";

export const useRooms = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeRoomId, setActiveRoomId] = useState('');

    useEffect(() => {
        const unsub = subToRooms((data: any[]) => {
            setRooms(data);
            setLoading(false);
        });
        return unsub;
    }, []);

    return { rooms, loading, activeRoomId, setActiveRoomId };
}
