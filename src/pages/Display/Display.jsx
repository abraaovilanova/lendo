import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, documentId } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useState } from "react";

import { FaVolumeUp, FaMicrophone, FaTimes, FaHeart } from "react-icons/fa"

import useSpeach from "../../hookes/useSpeach";

import { similarityCheck } from "../../utils/textFunctions"
import { useUsers } from '../../providers/UserProvider'

import Progressbar from "../../components/Progressbar";

import './Display.css'

const defaultTextStatus = {
    index: 0,
    correctAnswers: 0,
    phrases: []
}


function Display() {
    const [hearts, setHearts] = useState(5)
    const navigate = useNavigate();
    const [textDoc, setTextDoc] = useState("")
    const [textStatus, setTextStatus] = useState(defaultTextStatus)
    const { lang, textId } = useParams();
    const [renderSpeech, handleListening] = useSpeach()
    const [transcript, setTranscript] = useState("")
    const [score, setScore] = useState(0)
    const { addReadText } = useUsers()


    useEffect(() => {
        async function fetchData() {
            const docRef = collection(db, "french")
            const q = query(docRef, where(documentId(), "==", textId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                setTextDoc(data)
                setTextStatus(prev => ({ ...prev, phrases: data.text.split('.').filter(elem => elem) }))
            });
        }
        fetchData()

    }, [])

    function handlerClickNext($event) {

        if (textStatus.index < textStatus.phrases.length - 1) {
            setTextStatus(prev => ({ ...prev, index: prev.index + 1 }))
        } else {
            addReadText(textId, textStatus.index, textStatus.correctAnswers, textStatus.phrases.length)
            navigate("/fr/123/result", { state: textStatus })
        }
        setScore(0)
        setTranscript("")
    }


    function handleClickContinue($event) {
        if (textStatus.index < textStatus.phrases.length - 1) {
            setTextStatus(prev => ({ ...prev, index: prev.index + 1, correctAnswers: prev.correctAnswers + 1 }))
        } else {
            addReadText(textId, textStatus.index, textStatus.correctAnswers + 1, textStatus.phrases.length)
            navigate("/fr/123/result", { state: textStatus })
        }
        setScore(0)
        setTranscript("")
    }

    const handleFalar = async () => {
        const transcript = await renderSpeech();
        setTranscript(transcript);
        const score = similarityCheck(textStatus.phrases[textStatus.index], transcript)
        
        setScore(similarityCheck(textStatus.phrases[textStatus.index], transcript))
        console.log(score)
        if(score < 75){
            setHearts(prev => prev - 1)
        }
    }

    function ButtonGroup() {
        console.log(score)
        if (score < 75 & hearts > 0) {
            return (
                <>
                    <button className="main-btn" onClick={() => handleFalar()}><FaMicrophone /></button>
                    {/* <button onClick={handlerClickNext}> Pular</button> */}
                </>
            )
        }

        if(hearts == 0){
            addReadText(textId, textStatus.index, textStatus.correctAnswers, textStatus.phrases.length)
            navigate('/')
        }

        if (score >= 75) {
            return <button className="continue-btn" onClick={handleClickContinue}> Continuar</button>
        }
    }

    function DisplayTranscript({ transcript, text }) {
        if (transcript.length > 0) {
            return text.split(' ').map(word => {
                let formatedWord = word.toLowerCase().replace(",", "").trim()
                if (transcript.includes(formatedWord)) {
                    return <span style={{ color: "green" }}>{word} </span>
                }

                return word + ' '
            })
        }

        return text

    }

    function handleVoltar() {
        navigate("/")
    }


    return (

        <div>
            <div className="status-bar">
                <button className="secundary-btn" onClick={handleVoltar}><FaTimes /></button>
                <Progressbar value={(textStatus.index ) / (textStatus.phrases.length)} />
                <div><FaHeart color="#fe6384" /> {hearts}</div>
            </div>

            <div>
                <p>
                    <button 
                        className="secundary-btn"
                        onClick={() => handleListening(textStatus.phrases[textStatus.index])}
                    >
                        <FaVolumeUp color="#32a0eb" />
                    </button>
                    <DisplayTranscript transcript={transcript} text={textStatus.phrases[textStatus.index]} />
                </p>
            </div>

            <ButtonGroup />

        </div>
    )
}

export default Display