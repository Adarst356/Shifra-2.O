
import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext=createContext()

function UserContext ({children}){
let [speaking,setSpeaking]=useState(false)
let [recognitionText,setRecognitionText]=useState("listening....")
let [response,setResponse]=useState(false)



  function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.valume=1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
  }
  async function aiResponse(prompt){
     let text=await run(prompt)
     let newText=text.split("**")&&text.split("*")&&text.replace("google","Adarsh Tiwari")&&text.replace("Google","Adarsh Tiwari")
     setRecognitionText(newText)
     speak(newText)
     setResponse(true)
     setTimeout(()=>{
    setSpeaking(false)
     },30000)
    

  }
  let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition 
  let recognition=new speechRecognition()
  recognition.onresult=(e)=>{
    let currentIndex=e.resultIndex
    let transcript=e.results[currentIndex][0].transcript
    setRecognitionText(transcript)
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("opening Youtube")
      setRecognitionText("opening Youtube.....")
      setTimeout(()=>{
        setSpeaking(false)
         },5000)
    }else if(command.includes("open") && command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speak("opening google")
      setRecognitionText("opening Google.....")
      setTimeout(()=>{
        setSpeaking(false)
         },5000)
    }else if (command.includes("time")){
      let time=new Date().toLocaleString(undefined,{
        hour:"numeric",minute:"numeric"})
        speak(time)
        setRecognitionText(time)
        setTimeout(()=>{
          setSpeaking(false)
           },5000)
        
      }
      else if (command.includes("date")){
        let time=new Date().toLocaleString(undefined,{
          day:"numeric",month:"short"})
          speak(Date)
          setRecognitionText(Date)
          setTimeout(()=>{
            setSpeaking(false)
             },5000)
        }
      
    else{
      aiResponse(command)
    }
  }


  let value={
    recognition,
    speaking,
    setSpeaking,
    recognitionText,
    setRecognitionText,
    response,
    setResponse
  }
  return (
    <div>
      <datacontext.Provider value={value}>
      {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext
