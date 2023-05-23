import React from 'react'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto p-8">
        <section className="mb-8">
          <NavLink to="/" className="nav-link">
            <h2 className="text-2xl font-bold mb-4 underline">Hot Deals</h2>
          </NavLink>
          <p className="text-lg text-gray-700">
            Welcome to our website, your ultimate destination for hot deals! We
            bring you the latest and most exciting offers from AliExpress. Our
            team tirelessly scours through thousands of products to find the
            best deals, ensuring that you save big on your online shopping.
            Whether you're looking for electronics, fashion, home decor, or
            beauty products, our Hot Deals section has got you covered. Don't
            miss out on these incredible discounts - start browsing now!
          </p>
        </section>

        <section className="mb-8">
          <NavLink to="/HigherCommission" className="nav-link">
            <h2 className="text-2xl font-bold mb-4 underline">
              Higher Commission
            </h2>
          </NavLink>
          <p className="text-lg text-gray-700">
            We believe in rewarding our valued customers, and that's why we
            offer higher commission rates on select products. When you purchase
            through our affiliate links, not only do you get access to amazing
            deals, but you also earn a higher commission on eligible products.
            Take advantage of this opportunity to maximize your earnings while
            promoting quality products to your audience. Join us today and start
            enjoying the benefits of our higher commission rates.
          </p>
        </section>

        <section className="mb-8">
          <NavLink to="/Featured" className="nav-link">
            <h2 className="text-2xl font-bold mb-4 underline">
              Featured Products
            </h2>
          </NavLink>
          <p className="text-lg text-gray-700">
            Discover the best of AliExpress with our handpicked selection of
            featured products. We curate a collection of top-rated items across
            various categories to provide you with a hassle-free shopping
            experience. From trendy fashion accessories to innovative gadgets,
            each featured product has been carefully chosen based on its
            quality, popularity, and positive customer reviews. Explore our
            Featured Products section to stay up to date with the latest trends
            and find inspiration for your next purchase.
          </p>
        </section>

        <section className="mb-8">
          <NavLink to="/Recommendation" className="nav-link">
            <h2 className="text-2xl font-bold mb-4 underline">
              Our Recommendation
            </h2>
          </NavLink>
          <p className="text-lg text-gray-700">
            Finding the right product can be overwhelming, especially with the
            vast selection available on AliExpress. That's why we're here to
            help! Our team of experts has tested and reviewed countless products
            to bring you our top recommendations. We consider factors such as
            quality, value for money, and customer satisfaction to ensure that
            you make an informed choice. Trust our recommendations and shop with
            confidence, knowing that you're getting the best products AliExpress
            has to offer.
          </p>
        </section>

        {/* Add additional sections or components as needed */}
      </div>

      <section className="absolute mb-8">
        <div className="flex mt-32">
          <a
            href="https://s.click.aliexpress.com/e/_DeV91Tr?bz=725*90"
            target="_parent"
            className="absolute right-0 mt-80"
            style={{
              transform: 'rotate(90deg)',
              width: '850px', // Adjust the width as desired
              height: 'auto', // Maintain aspect ratio
              position: 'fixed', // Make it static
              right: '-200px', // Position it on the right side
              top: '170px', // Adjust the top position as desired
              zIndex: '9999', // Ensure it's on top of other elements
            }}
          >
            <img
              className="w-full h-auto"
              src="https://ae01.alicdn.com/kf/Sc89a3fb4d1cb466d99e99153acc9d9e4b.png"
              alt="Banner"
            />
          </a>
        </div>
      </section>

      <section className="absolute mb-8">
        <div className="flex mt-32">
          <a
            href="https://s.click.aliexpress.com/e/_DDcWu7b?bz=300*250"
            target="_parent"
            className="absolute right-0 mt-80"
            style={{
              width: '22%', // Adjust the width as desired
              height: '300px', // Maintain aspect ratio
              position: 'fixed', // Make it static
              left: '40px', // Position it on the right side
              top: '70px', // Adjust the top position as desired
              zIndex: '9999', // Ensure it's on top of other elements
            }}
          >
            <img
              className="w-full h-auto"
              src="https://ae01.alicdn.com/kf/S3619e57974f148d087c950fe497cdf55q/300x250.jpg"
              alt="Banner"
            />
          </a>
        </div>
      </section>

      <style jsx>
        {`
          @media (max-width: 767px) {
            .absolute {
              position: relative !important;
              width: 100% !important;
              height: auto !important;
              left: 0 !important;
              top: auto !important;
              transform: none !important;
              margin-top: 0 !important;
            }
          }
        `}
      </style>
    </>
  )
}
