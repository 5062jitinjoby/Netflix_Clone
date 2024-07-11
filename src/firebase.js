import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBKg9vaXn-6cGS2msNn0A0SqFn9UrnWQ9A",
  authDomain: "netflix-clone-8ec4e.firebaseapp.com",
  projectId: "netflix-clone-8ec4e",
  storageBucket: "netflix-clone-8ec4e.appspot.com",
  messagingSenderId: "624756425710",
  appId: "1:624756425710:web:ec5f92be9230c9e29f84ff"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-'.join(" ")))
    }
}

const login = async (email,password)=>{
    try {
        signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-'.join(" ")))
    }
}

const logout = async () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout}