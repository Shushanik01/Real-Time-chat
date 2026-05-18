import { useEffect, useState, useCallback, useRef } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useTyping = (roomId: string, currentUserId: string) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!roomId) return

    const roomRef = doc(db, 'rooms', roomId)
    
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      const data = doc.data()
      if (data?.typingUsers) {
        setTypingUsers(data.typingUsers)
      }
    })

    return unsubscribe
  }, [roomId])

  const startTyping = useCallback(async () => {
    if (isTyping) return
    
    setIsTyping(true)
    
    const roomRef = doc(db, 'rooms', roomId)
    await updateDoc(roomRef, {
      typingUsers: arrayUnion(currentUserId)
    })

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      stopTyping()
    }, 3000)
    
  }, [roomId, currentUserId, isTyping])

  const stopTyping = useCallback(async () => {
    if (!isTyping) return
    
    setIsTyping(false)
    
    const roomRef = doc(db, 'rooms', roomId)
    await updateDoc(roomRef, {
      typingUsers: arrayRemove(currentUserId)
    })
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [roomId, currentUserId, isTyping])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (isTyping) {
        stopTyping()
      }
    }
  }, [stopTyping, isTyping])

  return {
    typingUsers,      
    startTyping,
    stopTyping
  }
}