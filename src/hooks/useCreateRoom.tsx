import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase/config';

export const useCreateRoom = async(name:string)=>{
    return await addDoc(collection(db, 'rooms'),{
        name,
        createdAt: Date.now()
    })
}