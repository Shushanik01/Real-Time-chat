import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const sendMessage = async (
  roomId: string,
  message: any
) => {
  return await addDoc(
    collection(db, "rooms", roomId, "messages"),
    {
      ...message,
      createdAt: serverTimestamp(),
    }
  );
};
