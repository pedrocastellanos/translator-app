import { useState } from 'react'
import './App.css'
import Languages from './Languages'

function App() {
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translation, setTranslation] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en-GB")
  const [toLanguage, setToLanguage] = useState("es-ES")
  const [button, setButton] = useState("Translate Text")
  

  const handleTextToTranslate = (e)=> setTextToTranslate(e.target.value)
  const handleExchange = ()=>{
    setFromLanguage(toLanguage)
    setToLanguage(fromLanguage)
    setTranslation(textToTranslate)
    setTextToTranslate(translation)
  }

  const handleSound = (text, language)=>{
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    speechSynthesis.speak(utterance)
  }

  const handleCopy = (language)=>{
    navigator.clipboard.writeText(language)
  }

  const handleTranslate = () =>{
    const apiURL = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${fromLanguage}|${toLanguage}`
    setButton("Translating...")
    fetch(apiURL)
      .then(res=>res.json())
      .then(res=>{
        setTranslation(res.responseData.translatedText)
        setButton("Translate Text")
      })
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea placeholder="Enter Text" className="from-text" value={textToTranslate} onChange={handleTextToTranslate}></textarea>
          <textarea placeholder="Translation" className="to-text" value={translation} readOnly></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i className="fas fa-volume-up" onClick={()=>handleSound(textToTranslate, fromLanguage)}></i>
              <i className="fas fa-copy" onClick={()=>handleCopy(textToTranslate)}></i>
            </div>
            <select onChange={(e)=>setFromLanguage(e.target.value)} value={fromLanguage}>
              <Languages/>
            </select>
          </li>
          <li className="exchange" onClick={handleExchange}>
            <i className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <select onChange={(e)=>setToLanguage(e.target.value)} value={toLanguage}>
              <Languages/>
            </select>
            <div className="icons">
              <i className="fas fa-volume-up" onClick={()=>handleSound(translation, toLanguage)}></i>
              <i className="fas fa-copy" onClick={()=>handleCopy(translation)}></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={handleTranslate}>{button}</button>
    </div>
  )
}

export default App


