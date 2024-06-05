import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const profileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser);
            if (currentUser) {
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        });
        return () =>{
            return unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user, 
        loading,
        createUser,
        signIn,
        logOut,
        profileUpdate,
        googleLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;