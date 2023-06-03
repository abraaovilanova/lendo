import { useState } from 'react'
import {  useParams, useNavigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function Home(){
    const [texts, setTexts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const textCollectionRef = collection(db, "texts")
            const querySnapshot =  await getDocs(textCollectionRef)
            const texts = querySnapshot.docs.map(doc => {
                const data = doc.data()

                return {...data, id: doc.id}
            })
            setTexts(texts)
        }
        fetchData();
        },[])


    return (
        <div>
            <div>
                <p>Olá, [USER]!</p>
                <p>Escolha um texto para ler</p> 
            </div>
            <ul>
        {texts?.map((elem) => <li onClick={() => navigate(`/fr/${elem.id}`)} >{elem.title}</li>)}
      </ul>
        </div>
    )

}

export default Home