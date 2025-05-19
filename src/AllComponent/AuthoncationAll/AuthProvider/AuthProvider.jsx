import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firevase/Firebase.config';

export let AuthContext = createContext()

let AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    let auth = getAuth(app)


    // console.log(user)

    // singUP function 
    let createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // observed user
    useEffect(() => {
        let unSubscribe = onAuthStateChanged(auth, (observedUser => {
            setUser(observedUser)
            setLoading(false)
            // console.log(observedUser)

        }))
        return () => {
            unSubscribe()
        }
    }, [])

    // login user 
    let loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //logOut user
    let logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    //Password reset email
    let PasswordResetAllUser = (emailValue) => {
        setLoading(true)
        return sendPasswordResetEmail(auth,emailValue)
    }

    // ===========================================
    // All Component data valu value send 
    // ===========================================
    // add parcel standard input are unik Id-----------------------------
    let [StandardId, setStandardParcelId] = useState("")

    // Admin user email send Data entry Route fine standard parcel-----------------
    let [UserEmailSendDataEntry, setAdminUserEmailSendDataEntry] = useState("")
    // ===========================================







    //auth Info Provider
    let authInfo = {
        user,
        createUser,
        loginUser,
        logOutUser,
        loading,
        PasswordResetAllUser,


        StandardId,
        setStandardParcelId,
        UserEmailSendDataEntry,
        setAdminUserEmailSendDataEntry

    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;