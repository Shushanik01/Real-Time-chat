import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setIsLoading(false)
        })
        return currentUser
    }, []);

    return { user, isLoading }

}