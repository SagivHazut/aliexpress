import React, { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'

const CookiesPopup = ({ handleAutoplayPermission }) => {
  const [showPopup, setShowPopup] = useState(false)
  const cookies = new Cookies()

  useEffect(() => {
    const autoplayPermission = cookies.get('autoplayPermission')

    if (autoplayPermission === undefined) {
      setShowPopup(true)
    }
  }, [])

  const handleAllowAutoplay = () => {
    cookies.set('autoplayPermission', true)
    setShowPopup(false)
    handleAutoplayPermission(true)
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed bottom-0 left-0 right-0 flex justify-center items-center z-50"
          style={{
            animation: 'slide-up 0.5s ease-out',
            animationFillMode: 'forwards',
            transform: 'translateY(50%)',
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs mx-auto">
            <p className="mb-4">
              This website requires your permission to autoplay videos.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleAllowAutoplay}
            >
              Allow Autoplay
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CookiesPopup
