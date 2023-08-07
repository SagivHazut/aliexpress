import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../components/Item'

export const AffiliateLink = () => {
  const [productUrl, setProductUrl] = useState('')
  const [error, setError] = useState(null)
  const [parsedData, setParsedData] = useState([])
  const [productDetails, setProductDetails] = useState([])
  const storedCountry = localStorage.getItem('country')
  const [showFilter, setShowFilter] = useState(false)
  const [maxPrice1, setMaxPrice1] = useState('')

  async function fetchData() {
    const storedCountry = localStorage.getItem('country')
    try {
      const response = await axios.get(
        'https://kpbfg7n3db.execute-api.us-east-1.amazonaws.com/promo-link-shop',
        {
          params: {
            link: productUrl,
          },
          mode: 'no-cors',
        }
      )

      const newData = response.data

      setParsedData(newData)
    } catch (error) {
      setError(
        storedCountry === 'IL'
          ? 'לפעמים צריך רק רענון קטן בשביל שזה יעבוד '
          : " Often, a slight refresh is all that's needed to optimize its performance"
      )
    }
  }
  async function fetchProductDetalis() {
    const storedCountry = localStorage.getItem('country')
    try {
      const response = await axios.get(
        'https://fze51q5b19.execute-api.us-east-1.amazonaws.com/get_products_details',
        {
          params: {
            productDetails: productUrl,
          },
          mode: 'no-cors',
        }
      )

      const newData = response.data.map((item) => ({
        ...item,
        name: 'aliexpress',
      }))
      setProductDetails(newData)
    } catch (error) {
      setError(
        storedCountry === 'IL'
          ? 'לפעמים צריך רק רענון קטן בשביל שזה יעבוד '
          : " Often, a slight refresh is all that's needed to optimize its performance"
      )
    }
  }

  useEffect(() => {
    if (parsedData) {
      fetchProductDetalis()
    }
  }, [parsedData])

  return (
    <div className="container mx-auto py-20">
      {storedCountry === 'IL' ? (
        <>
          <h1 className="text-4xl font-bold mb-5">בדיקת הנחה</h1>
          <div className="mb-3 AffiliateLink">
            <p>:כדי לבדוק אם יש הנחה כלשהי באלי אקפרס, בצע את השלבים הבאים</p>
            <ol className="list-decimal list-inside ml-6 space-y-2">
              <li>פתח את דפדפן האינטרנט שלך ועבור לאתר של אלי אקפרס</li>
              <li>
                חפש את המוצר בו אתה מעוניין על ידי הזנת מילות מפתח רלוונטיות
                בשורת החיפוש באתר עליאקספרס. עיין בתוצאות החיפוש ומצא את המוצר
                הספציפי שאתה רוצה לבדוק אם יש הנחות.
              </li>
              <li>
                לאחר שתמצא את המוצר שברצונך לבדוק, לחץ על הכותרת או התמונה של
                המוצר כדי לגשת לדף המוצר המפורט שלו.
              </li>
              <li>
                כעת, אתה אמור לראות את כתובת האתר של המוצר בשורת הכתובת של דפדפן
                האינטרנט שלך. בחר את כל כתובת האתר והעתק אותה.
              </li>
              <li>
                לאחר העתקת כתובת האתר של המוצר, חזור לדף זה והדבק את כתובת האתר
                למטה.
              </li>
              <li>
                לחץ על כפתור "בדוק" כדי להתחיל לבדוק אם יש הנחות זמינות למוצר.
              </li>
            </ol>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-5">Check for Discount</h1>
          <div className="mb-3 AffiliateLink">
            <p>
              To check if there's any discount for an AliExpress item, follow
              these steps:
            </p>
            <ol className="list-decimal list-inside ml-6 space-y-2">
              <li>
                Open your web browser and go to the AliExpress website
                (www.aliexpress.com).
              </li>
              <li>
                Search for the product you are interested in by entering
                relevant keywords in the search bar on the AliExpress website.
                Browse through the search results and find the specific product
                you want to check for discounts.
              </li>
              <li>
                Once you find the product you want to check, click on the
                product's title or image to access its detailed product page.
              </li>
              <li>
                Now, you should see the product's URL in the address bar of your
                web browser. Select the entire URL and copy it to your
                clipboard.
              </li>
              <li>
                After copying the product URL, come back to this page and paste
                the URL into the input box below.
              </li>
              <li>
                Click on the "Check" button to start checking if there are any
                discounts available for the product.
              </li>
            </ol>
          </div>
        </>
      )}

      <input
        type="text"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
        placeholder="Paste product URL here"
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={fetchData}
        className="px-6 py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        {storedCountry === 'IL' ? 'בדוק' : 'Check'}
      </button>

      {parsedData && (
        <div className="mt-4">
          <p className="text-blue-500 font-bold">Discount Link:</p>
          <a
            href={parsedData}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {parsedData}
          </a>
        </div>
      )}
      <Item
        post={productDetails}
        setShowFilter={setShowFilter}
        setMaxPrice1={setMaxPrice1}
      />
    </div>
  )
}
