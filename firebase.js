
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyAztkdSKpnZ8_iC41R_7mIGO6L6s9OrxEU",
    authDomain: "mi-app-5c581.firebaseapp.com",
    projectId: "mi-app-5c581",
    storageBucket: "mi-app-5c581.appspot.com",
    messagingSenderId: "918832459764",
    appId: "1:918832459764:web:426c4b32f6b3026f0813a1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const save = (empleado) => {
    addDoc(collection(db, 'Empleados'), empleado)
}
export const getAll = (data) => {
    onSnapshot(collection(db, 'Empleados'), data)
}
export const remove = (id) => {

    deleteDoc(doc(db, 'Empleados', id))
}
export const selectOne = (id) => getDoc(doc(db, 'Empleados', id))
export const edit = (id, empleado) => {
    updateDoc(doc(db, 'Empleados', id), empleado)
}