import React, { useState } from 'react'

function useSpeach(props) {
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    let recognition = new SpeechRecognition();

    recognition.lang = "fr";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    const renderSpeech = () => {
        return new Promise((resolve, reject) => {
          recognition.start();
          recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            resolve(transcript);
          };
          recognition.onerror = (event) => {
            reject(event.error);
          };
        });
      };

    function handleListening(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = synth
            .getVoices()
            .filter((elem) => elem.lang === "fr-FR")[0];
        utterance.voice = selectedVoice;
        utterance.lang = "fr-FR";
        synth.speak(utterance);
    }


    return [renderSpeech, handleListening]
}

export default useSpeach