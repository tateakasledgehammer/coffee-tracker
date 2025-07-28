// context is a React hook
// React involves lots of props, state hierarchy (parent can pass to child easily - harder to go the other way)
// context gives a global state across the application, top-level overview
// Firebase = PAS = Platform as a service
// ^^ back end service
// Firebase is a back end service that is ready to go w/ authentication & database you can just plug in w/out needing to set up a server etc.
// free until application gets very big

import { useState, useEffect, useContext, createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext) // creates a custom hook from which we can destructure any of the values in the AuthContext
}

export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // authentication handlers
    function signup(email, password) {
        // to get firebase to set up all we need is:
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData(null)
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    const value = { 
        globalUser, setGlobalUser, 
        globalData, setGlobalData, 
        isLoading, setIsLoading,
        signup, login, logout, resetPassword
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // auth gives us all the info (id etc)
            // if no user, empty user state & return from this authentication listener
            console.log('Current user: ', user)
            setGlobalUser(user)
            if (!user) { 
                console.log('No active user')
                return 
            }

            // if there is a user, then check if they have any data in the database and fetch that if needed - update global state
            try {
                setIsLoading(true)

                // from firebase package
                // first we create a reference for the document (labelled JSON object)
                // then get teh doc and snapshot it to see if anything is there
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {} // start as empty object
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                    console.log('Found user data', firebaseData);
                }
                setGlobalData(firebaseData)

            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }, []) // first is callback function, second is dependency array for when to run
    // empty dependency as wanting this to go immediately on load

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// this gets rendered in main.jsx