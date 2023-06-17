import { useState } from 'react'
import { useUsers } from '../../providers/UserProvider'


// Import the functions you need from the SDKs you need
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// STYLE
import './Home.css'


// COMPONENTS
import CardList from '../../components/CardList';

function Home() {
    const [texts, setTexts] = useState([])
    const { user } = useUsers()


    useEffect(() => {
        async function fetchData() {
            const textCollectionRef = collection(db, "french")
            const querySnapshot = await getDocs(textCollectionRef)
            const texts = querySnapshot.docs.map(doc => {
                const data = doc.data()

                return { ...data, id: doc.id }
            })
            setTexts(texts)
        }
        fetchData();
    }, [])


    return (
        <div>
            <header className="main-text">
                <p>Olá, <span style={{color: "#4bc0c0", fontWeight: 800}}>{user.name}</span>! <br/>Escolha um texto para ler</p>
            </header>
            {texts.length > 0 && <CardList data={texts} /> }
        </div>
    )

}

export default Home