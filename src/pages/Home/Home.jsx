import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

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
import Card from '../../components/Card'

function Home() {
    const [texts, setTexts] = useState([])
    const { user, setUserName } = useUsers()
    const navigate = useNavigate();


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
            <div>
                <p>Olá, <span style={{color: "#4bc0c0", fontWeight: 800}}>{user.name}!</span> Escolha um texto para ler</p>
            </div>
            <ul className="card-list">
                {texts?.map((elem) => {
                    const currTextStatus = [...user.readTexts?.filter(e => e.textId == elem.id)]
                    return (
                        <Card
                            title={elem.title}
                            level={elem.level}
                            progress={currTextStatus.length ? (currTextStatus[0].correctAnswers) / (currTextStatus[0].textLength) : 0}
                            key={elem.id}
                            handleOnClick={() => navigate(`/fr/${elem.id}`)}
                        />
                    )
                }

                )}
            </ul>
        </div>
    )

}

export default Home