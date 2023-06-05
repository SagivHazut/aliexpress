import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Popup from './Popup'

export const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <Popup />
      <div className={`bg-${darkMode ? 'gray-900' : 'gray-100'} min-h-screen`}>
        <div className="container mx-auto py-10">
          <div
            className={`max-w-3xl mx-auto p-8 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            <section className="mb-8 border border-gray-300 rounded-lg p-6">
              <NavLink
                to="/"
                className="nav-link hover:text-blue-700 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-4 underline">Hot Deals</h2>
              </NavLink>
              <p className="text-lg">
                Welcome to our website, your ultimate destination for hot deals!
                We bring you the latest and most exciting offers from
                AliExpress. Our team tirelessly scours through thousands of
                products to find the best deals, ensuring that you save big on
                your online shopping. Whether you're looking for electronics,
                fashion, home decor, or beauty products, our Hot Deals section
                has got you covered. Don't miss out on these incredible
                discounts - start browsing now!
              </p>
            </section>

            <section className="mb-8 border border-gray-300 rounded-lg p-6">
              <NavLink
                to="/HigherCommission"
                className="nav-link hover:text-blue-700 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-4 underline">
                  Higher Commission
                </h2>
              </NavLink>
              <p className="text-lg">
                We believe in rewarding our valued customers, and that's why we
                offer higher commission rates on select products. When you
                purchase through our affiliate links, not only do you get access
                to amazing deals, but you also earn a higher commission on
                eligible products. Take advantage of this opportunity to
                maximize your earnings while promoting quality products to your
                audience. Join us today and start enjoying the benefits of our
                higher commission rates.
              </p>
            </section>

            <section className="mb-8 border border-gray-300 rounded-lg p-6">
              <NavLink
                to="/Featured"
                className="nav-link hover:text-blue-700 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-4 underline">
                  Featured Products
                </h2>
              </NavLink>
              <p className="text-lg">
                Discover the best of AliExpress with our handpicked selection of
                featured products. We curate a collection of top-rated items
                across various categories to provide you with a hassle-free
                shopping experience. From trendy fashion accessories to
                innovative gadgets, each featured product has been carefully
                chosen based on its quality, popularity, and positive customer
                reviews. Explore our Featured Products section to stay up to
                date with the latest trends and find inspiration for your next
                purchase.
              </p>
            </section>

            <section className="mb-8 border border-gray-300 rounded-lg p-6">
              <NavLink
                to="/Recommendation"
                className="nav-link hover:text-blue-700 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-4 underline">
                  Our Recommendation
                </h2>
              </NavLink>
              <p className="text-lg">
                Finding the right product can be overwhelming, especially with
                the vast selection available on AliExpress. That's why we're
                here to help! Our team of experts has tested and reviewed
                countless products to bring you our top recommendations. We
                consider factors such as quality, value for money, and customer
                satisfaction to ensure that you make an informed choice. Trust
                our recommendations and shop with confidence, knowing that
                you're getting the best products AliExpress has to offer.
              </p>
            </section>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <button
            className={`p-2 rounded-full focus:outline-none ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
