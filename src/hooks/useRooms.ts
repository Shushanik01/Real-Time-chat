import { useEffect, useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
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

    const createRoom = async (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        await addDoc(collection(db, "rooms"), {
            name: trimmed,
            createdAt: serverTimestamp(),
        });
    };

    return { rooms, loading, activeRoomId, setActiveRoomId, createRoom };
}
