import { useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from "./firebase/config";

function TestApp() {
    const handleLogin = async () => {

        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user.email);
            
        }catch(err){
            throw err
        }
    };

    const handleLogOut = async()=>{
       await signOut(auth)
       console.log('user logged out');
       
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log('User:' ,user.email);
                
            } else {
                console.log('no user');   
            }
        });
        return unsubscribe
    },[]);
     return (
    <div style={{ padding: '2rem' }}>
      <h1>Real-Time Chat</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}
export default TestApp