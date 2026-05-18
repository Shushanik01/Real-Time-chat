import { collection, onSnapshot } from "firebase/firestore";
import {db} from '../firebase/config'

export const subToRooms = (callback: Function)=>{
    return onSnapshot(collection(db, 'rooms'), (snapshot)=>{
        const rooms = snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data
        }));
        callback(snapshot)
    })
}