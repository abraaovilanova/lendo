import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, documentId } from 'firebase/firestore';
import {db} from '../../firebase'
import { useEffect, useState } from "react";


const defaultTextStatus = {
    index: 0,
    phrases: []
}


function Display(){
    const navigate = useNavigate();
    const [textDoc, setTextDoc] = useState("")
    const [textStatus, setTextStatus] = useState(defaultTextStatus)
    const {lang , textId } = useParams();

    useEffect(()=>{
        async function fetchData(){
            const docRef = collection(db, "texts")
            const q = query(docRef, where(documentId(), "==", textId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                 const data = doc.data()
                 setTextDoc(data)
                 setTextStatus(prev => ({...prev, phrases: data.text.split('.').filter(elem => elem)}))
               });
        }
        fetchData()

    },[])

    function handlerClickNext($event){
        console.log(textStatus.index , ' - ', textStatus.phrases.length)

        if(textStatus.index < textStatus.phrases.length - 1){
            setTextStatus(prev => ({...prev, index: prev.index + 1}))
        }else {
            navigate("/")
        }
    }

  
    return(

            <div>
                <div>Display Text</div>
                {/* <div>{lang} - {textId}</div> */}

                <div>
                <button>Ouvir</button> {textStatus.phrases[textStatus.index]}

                </div>
                
                <button onClick={handlerClickNext}> Continuar</button>
            </div>
        )
}

export default Display