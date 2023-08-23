import { useState, useEffect } from 'react'
import csvData from '../csv/event_promotion.csv'
import Papa from 'papaparse'

function Popup() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupIndex, setPopupIndex] = useState(null)
  const [originalData, setOriginalData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData)
        const csv = await response.text()
        const parsedCsv = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        })
        const filteredData = parsedCsv.data.filter((item) =>
          Object.values(item).some((value) => value !== '')
        )

        // Extract image and link properties
        const extractedData = filteredData.map((item) => ({
          image: item.picture,
          link: item.link,
        }))

        setOriginalData(extractedData)
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const today = new Date().toLocaleDateString()
    const hasShownPopupToday = localStorage.getItem('popupShownOn') === today

    if (!hasShownPopupToday && originalData.length > 0) {
      const randomIndex = Math.floor(Math.random() * originalData.length)
      setPopupIndex(randomIndex)
      setShowPopup(true)
      localStorage.setItem('popupShownOn', today)
    }
  }, [originalData])

  const closePopup = () => {
    setShowPopup(false)
  }

  if (!showPopup || popupIndex === null) {
    return null
  }

  const currentPopup = originalData[popupIndex]

  return (
    <section className="fixed bottom-14 inset-x-0 flex items-center justify-center opacity-80 z-50">
      <div
        className="w-2/3 p-8 rounded-lg relative"
        style={{
          animation: showPopup ? 'slide-up 1s ease' : '',
        }}
      >
        <a
          href={currentPopup.link}
          target="_blank"
          className="relative inline-block"
        >
          <img
            className="w-full h-auto"
            src={currentPopup.image}
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
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Popup
