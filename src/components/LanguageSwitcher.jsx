import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    console.log('Changing language to:', lng)
    i18n.changeLanguage(lng)
  }

  console.log('Current language:', i18n.language)

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('he')}>עברית</button>
    </div>
  )
}

export default LanguageSwitcher
