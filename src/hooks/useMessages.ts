import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useMessages = (roomId: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!roomId) return;

        setLoading(true);

        const q = query(
            collection(db, 'rooms', roomId, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );
            setLoading(false);
        });

        return () => unsub();
    }, [roomId]);

    const sendMessage = async (message: any) => {
        if (!roomId) return;
        await addDoc(collection(db, 'rooms', roomId, 'messages'), {
            ...message,
            createdAt: serverTimestamp(),
        });
    };

    return { messages, sendMessage, loading };
}
