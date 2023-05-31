import { useState, useEffect } from 'react'

function Popup() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const today = new Date().toLocaleDateString()
    const hasShownPopupToday = localStorage.getItem('popupShownOn') === today

    // if (!hasShownPopupToday) {
    setShowPopup(true)
    //   localStorage.setItem('popupShownOn', today)
    // }
  }, [])

  const closePopup = () => {
    setShowPopup(false)
  }

  if (!showPopup) {
    return null
  }

  return (
    <section className="fixed bottom-14 inset-x-0 flex items-center justify-center opacity-80 z-50">
      <div
        className="w-2/3 p-8 rounded-lg relative"
        style={{
          animation: showPopup ? 'slide-up 1s ease' : '',
        }}
      >
        <a
          href="https://s.click.aliexpress.com/e/_DeV91Tr?bz=725*90"
          target="_blank"
          className="relative inline-block"
        >
          <img
            className="w-full h-auto"
            src="https://ae01.alicdn.com/kf/Sc89a3fb4d1cb466d99e99153acc9d9e4b.png"
            alt="Banner"
          />
        </a>
        <button
          className="absolute top-3 right-50% text-black"
          onClick={closePopup}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-7 h-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{' '}
        </button>
      </div>
    </section>
  )
}

export default Popup
