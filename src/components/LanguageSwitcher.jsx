import React, { useState } from 'react'
import { GoogleTranslateElement } from 'react-google-translate'
import googleTranslateElementInit from 'react-google-translate/lib/googleTranslateElementInit'

export const LanguageSwitcher = () => {
  const [translateVisible, setTranslateVisible] = useState(false)

  const toggleTranslate = () => {
    setTranslateVisible(!translateVisible)
  }

  return (
    <div>
      <button onClick={toggleTranslate}>Toggle Translation</button>
      {translateVisible && (
        <GoogleTranslateElement
          googleTranslateElementInit={googleTranslateElementInit}
        />
      )}
    </div>
  )
}
