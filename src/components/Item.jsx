import React, { useState, useRef, useEffect } from 'react'
import { Filters } from './Filters'
import LoadingSpinner from './LoadingSpinner'
import axios from 'axios'
import { RWebShare } from 'react-web-share'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../store/actions'

export const Item = ({
  post,
  setShowFilter,
  showFilter,
  isLoading,
  setMaxPrice1,
  isLoadingMore,
}) => {
  const [expandedPostId, setExpandedPostId] = useState(null)
  const descriptionRef = useRef(null)
  const [uniquePosts, setUniquePosts] = useState([])
  const storedCountry = localStorage.getItem('country')
  const [exchangeRate, setExchangeRate] = useState(null)
  const [copiedItemId, setCopiedItemId] = useState(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const [shortUrl, setShortUrl] = useState('')
  const dispatch = useDispatch()
  const selectedItemsLeft = useSelector((state) => state.selectedItemsLeft)
  const selectedItemsRight = useSelector((state) => state.selectedItemsRight)

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates.ILS
        setExchangeRate(rate)
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error)
      })
  }, [])

  const handleShowMoreClick = (key) => {
    setExpandedPostId(key)
  }
  const handleClick = async (url) => {
    try {
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      setShortUrl(response.data.result.full_short_link)
    } catch (error) {
      console.error('Error generating short URL:', error)
    }
  }
  const generateShareData = (item) => {
    if (shortUrl) {
      return {
        text: `Check out this awesome deal! \nJust ${item.sale_price}$ \n`,
        url: shortUrl,
        title: item.product_title,
      }
    } else {
      return {
        text: `Check out this awesome deal!\njust ${item.sale_price}`,
        url: item.promotion_link,
        title: item.product_title,
      }
    }
  }

  const handleCopyUrlClick = async (url) => {
    try {
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      const copyUrl = response.data.result.full_short_link
      const copyText = document.createElement('textarea')
      copyText.value = copyUrl
      document.body.appendChild(copyText)
      copyText.select()
      document.execCommand('copy')
      document.body.removeChild(copyText)

      setCopiedItemId(url)
      setTimeout(() => {
        setCopiedItemId(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const filterUniquePosts = (posts) => {
      const uniqueIds = new Set()
      const filteredPosts = []

      posts.forEach((item) => {
        if (!uniqueIds.has(item.product_id)) {
          uniqueIds.add(item.product_id)
          filteredPosts.push(item)
        }
      })

      return filteredPosts
    }

    setUniquePosts(filterUniquePosts(post))
  }, [post])

  const Loading = () => {
    return (
      <div className="lg:col-span-3">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-100 rounded-2xl h-64"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  const handleItemSelect = (item) => {
    if (
      !selectedItemsLeft.find(
        (selectedItem) => selectedItem.product_id === item.product_id
      ) &&
      !selectedItemsRight.find(
        (selectedItem) => selectedItem.product_id === item.product_id
      )
    ) {
      dispatch(addItem(item, 'selectedItemsLeft'))
    }
  }

  return (
    <>
      <div>
        <Filters
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          setMaxPrice1={setMaxPrice1}
        />
      </div>

      <>
        {isDesktop ? (
          <>
            {uniquePosts && (
              <div className="lg:col-span-3">
                <div>
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                      {uniquePosts.map((item) => (
                        <>
                          <article
                            key={item.product_id}
                            className="flex-col items-start justify-between"
                          >
                            <a
                              href={item.promotion_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="relative w-full">
                                {item.name === 'aliexpress' ? (
                                  <img
                                    src={
                                      'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-ar21.svg'
                                    }
                                    alt="AliExpress Logo"
                                    style={{
                                      display: 'flex',
                                      position: 'absolute',
                                      top: -10,
                                      left: -40,
                                      transform: 'rotate(310deg)  ',
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      'https://cdn.admitad.com/campaign/images/2020/9/30/13623-b58edd098a89c836.png'
                                    }
                                    alt="Banggood"
                                    style={{
                                      width: 100,
                                      display: 'flex',
                                      position: 'absolute',
                                      top: -10,
                                      left: -40,
                                      transform: 'rotate(310deg)  ',
                                    }}
                                  />
                                )}

                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                <img
                                  src={item.product_main_image_url}
                                  alt=""
                                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                              </div>
                            </a>

                            <div className="mt-3 flex items-center justify-between">
                              <div>
                                <RWebShare
                                  onClick={() =>
                                    handleClick(item.promotion_link)
                                  }
                                  data={generateShareData}
                                >
                                  <button>🔗 Share </button>
                                </RWebShare>
                              </div>

                              <div>
                                <button
                                  className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                                  onClick={() =>
                                    handleCopyUrlClick(item.promotion_link)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-font-bold"
                                  ></svg>

                                  {copiedItemId === item.promotion_link ? (
                                    <p className="text-font-bold">
                                      Copied
                                      <span role="img" aria-label="Thumbs Up">
                                        👍
                                      </span>
                                    </p>
                                  ) : (
                                    <div className="text-font-bold">
                                      Copy Link
                                      <hr />
                                    </div>
                                  )}
                                </button>
                              </div>
                              <button onClick={() => handleItemSelect(item)}>
                                <p className="text-font"> Compare</p>
                              </button>
                            </div>

                            <div className="max-w-xl">
                              <div className="group relative">
                                <p
                                  ref={descriptionRef}
                                  className={`mt-5 text-font ${
                                    expandedPostId === item.product_id
                                      ? 'text-sm'
                                      : 'line-clamp-2'
                                  } leading-6 text-gray-600`}
                                  style={{
                                    userSelect: 'none',
                                  }}
                                >
                                  {item.product_title}
                                </p>

                                <button
                                  className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    handleShowMoreClick(item.product_id)
                                  }
                                >
                                  {expandedPostId !== item.product_id
                                    ? 'showMore'
                                    : ''}
                                </button>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-xs">
                                <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ml-0">
                                  <div>
                                    {item.sale_price !== item.original_price ? (
                                      <>
                                        <div>
                                          <strong>
                                            {storedCountry === 'IL'
                                              ? `${
                                                  (
                                                    item.sale_price *
                                                    exchangeRate
                                                  ).toFixed(2) + ' ₪'
                                                }`
                                              : `${'$' + item.sale_price}`}
                                          </strong>
                                          <span className="text-green-600">
                                            <br /> &nbsp;{'save '}
                                            {item.discount}
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className="items-start"
                                            style={{
                                              textDecoration: 'line-through',
                                            }}
                                          >
                                            {storedCountry === 'IL'
                                              ? `${
                                                  (
                                                    item.original_price *
                                                    exchangeRate
                                                  ).toFixed(2) + ' ₪'
                                                }`
                                              : `${'$' + item.original_price}`}
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <div>
                                        <strong>
                                          {storedCountry === 'IL'
                                            ? `${
                                                (
                                                  item.sale_price * exchangeRate
                                                ).toFixed(2) + ' ₪'
                                              }`
                                            : `${'$' + item.sale_price}`}
                                        </strong>
                                      </div>
                                    )}
                                  </div>
                                </a>
                                {item.name === 'aliexpress' && (
                                  <a className="relative rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                                    {'sales'}:{' '}
                                    <strong>{item.lastest_volume}</strong>
                                    <br />
                                    {'positive Feedback'}:
                                    <strong>{item.evaluate_rate}</strong>
                                  </a>
                                )}
                              </div>
                            </div>
                          </article>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                {isLoadingMore && <LoadingSpinner />}
              </div>
            )}
          </>
        ) : (
          <>
            {uniquePosts && (
              <div className="lg:col-span-3">
                <div>
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                      {uniquePosts.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex flex-col justify-between p-4 border rounded-lg"
                        >
                          {item.name === 'aliexpress' ? (
                            <div className="ribbon-bow-container">
                              <div className="ribbon-bow">
                                <img
                                  alt=""
                                  src={
                                    'https://www.vectorlogo.zone/logos/aliexpress/aliexpress-ar21.svg'
                                  }
                                  className=" absolute w-32 h-6  z-20  "
                                />
                                <div className="ribbon"></div>
                                <div className="knot"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="ribbon-bow-container">
                              <div className="ribbon-bow">
                                <img
                                  alt=""
                                  src={
                                    'https://cdn.admitad.com/campaign/images/2020/9/30/13623-b58edd098a89c836.png'
                                  }
                                  className=" absolute w-32 h-6  z-20  "
                                />
                                <div className="ribbon"></div>
                                <div className="knot"></div>
                              </div>
                            </div>
                          )}

                          <div className="relative aspect-w-4 aspect-h-2 mb-4">
                            <div className="flex justify-end">
                              <p
                                ref={descriptionRef}
                                className="leading-6 text-gray-600 mr-3"
                              >
                                {item.product_title}
                              </p>
                              <a
                                href={item.promotion_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={item.product_main_image_url}
                                  alt="AliExpress Logo"
                                  className="relative z-10 w-96 h-32 border-2 border-black rounded-lg"
                                />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <RWebShare
                                onClick={() => handleClick(item.promotion_link)}
                                data={generateShareData(item)}
                              >
                                <button>🔗 Share </button>
                              </RWebShare>
                            </div>
                            <button
                              className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                              onClick={() =>
                                handleCopyUrlClick(item.promotion_link)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-font-bold"
                              ></svg>
                              {copiedItemId === item.promotion_link ? (
                                <p className="text-font-bold">
                                  Copied
                                  <span role="img" aria-label="Thumbs Up">
                                    👍
                                  </span>
                                </p>
                              ) : (
                                <span className="ml-2">Copy Link</span>
                              )}
                            </button>
                            <button onClick={() => handleItemSelect(item)}>
                              <p className="text-font"> Compare</p>
                            </button>
                          </div>

                          <div className="flex justify-between text-s mt-4">
                            <div className="flex items-center">
                              <div className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                {item.sale_price !== item.original_price ? (
                                  <>
                                    <div>
                                      <strong>
                                        {storedCountry === 'IL'
                                          ? `${(
                                              item.sale_price * exchangeRate
                                            ).toFixed(2)} ₪`
                                          : `$${item.sale_price}`}
                                      </strong>
                                      <span className="text-green-600">
                                        <br /> &nbsp;{'save'}
                                        {item.discount}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="line-through">
                                        {storedCountry === 'IL'
                                          ? `${(
                                              item.original_price * exchangeRate
                                            ).toFixed(2)} ₪`
                                          : `$${item.original_price}`}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    <strong>
                                      {storedCountry === 'IL'
                                        ? `${(
                                            item.sale_price * exchangeRate
                                          ).toFixed(2)} ₪`
                                        : `$${item.sale_price}`}
                                    </strong>
                                  </div>
                                )}
                              </div>
                            </div>
                            {item.name === 'aliexpress' && (
                              <div className="flex items-center">
                                <div className="rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                  <div className="mr-2">
                                    {'sales'}:{' '}
                                    <strong>{item.lastest_volume}</strong>
                                  </div>
                                  <div>
                                    {'positive Feedback'}:
                                    <strong>{item.evaluate_rate}</strong>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {isLoadingMore && <LoadingSpinner />}
              </div>
            )}
          </>
        )}
        {isLoading && <Loading />}
      </>
    </>
  )
}

export default Item
