import {languagesList} from './languages-list.js'

function Languages(){
  return (
    languagesList.map(lang=>{
      return <option key={lang.code} value={lang.code}>{lang.country}</option>
    })
  )
}

export default Languages