import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

export const SearchItems = () => {
  const { page } = useParams()
  const [expandedPostId, setExpandedPostId] = useState(null)
  const descriptionRef = useRef(null)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [reachedBottom, setReachedBottom] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const dispatch = useDispatch()
  const storedCountry = localStorage.getItem('country')
  const [exchangeRate, setExchangeRate] = useState(null)
  const searchRes = useSelector((state) => state.searchRes)
  const visible = useSelector((state) => state.visible)

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

  useEffect(() => {
    if (searchRes === null) {
      navigate('/top-products')
    }
  }, [searchRes])

  useEffect(() => {
    const descriptionElement = descriptionRef.current
    if (descriptionElement) {
      const { clientHeight, scrollHeight } = descriptionElement
      if (scrollHeight > clientHeight) {
        setExpandedPostId(null)
      }
    }
  }, [searchRes])

  const handleShowMoreClick = (postId) => {
    setExpandedPostId(postId)
  }

  const [isDesktop, setIsDesktop] = useState(true)

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
  const handleShareClick = async (url) => {
    const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const copyUrl = res.data.result.full_short_link
    if (navigator.share) {
      navigator
        .share({
          url: copyUrl,
        })
        .then(() => {
          console.log('URL shared successfully')
        })
        .catch((error) => {
          console.error('Error sharing URL:', error)
        })
    } else {
      console.log('Web Share API is not supported')
    }
  }

  const [copiedItemId, setCopiedItemId] = useState(null)
  const [verfidUrl, setVerfidUrl] = useState(null)

  const handleCopyUrlClick = async (url, post) => {
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`)
      const copyUrl = res.data.result.full_short_link
      navigator.clipboard.writeText(copyUrl).then(() => {
        setCopiedItemId(url)
        setVerfidUrl(copyUrl)
        setTimeout(() => {
          setCopiedItemId(null)
        }, 5000)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchProductDetails(page) {
    const value = localStorage.getItem('value')

    const storedCountry = localStorage.getItem('country')

    try {
      setIsLoadingMore(true)

      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: '',
            page_size: 50,
            page_no: page ? page : 1,
            max_sale_price: '1000',
            min_sale_price: '',
            sort: 'SALE_PRICE_ASC',
            keywords: value,
          },
          mode: 'no-cors',
        }
      )
      const newData = response.data.map((item) => ({
        ...item,
        name: 'aliexpress',
      }))
      if (response.status !== 200) {
        fetchProductDetails()
      } else if (response.status === 200) {
        setIsLoading(false)
        setIsLoadingMore(false)
        dispatch({
          type: 'UPDATE_SEARCH_RES',
          payload: { searchRes: [...searchRes, ...newData] },
        })
        return response.data
      } else {
        setIsLoading(true)
        setIsLoadingMore(true)
        setError(
          !storedCountry === 'IL'
            ? 'No results found, please try again'
            : `לא נמצאו תוצאות נסה שנית`
        )
      }
    } catch (error) {
      setError(
        storedCountry === 'IL'
          ? `לא נמצאו תוצאות נסה שנית`
          : 'No results found, please try again'
      )
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    if (scrollTop + clientHeight >= scrollHeight && !reachedBottom) {
      setReachedBottom(true)
      if (searchRes) {
        setCurrentPage((prevPage) => {
          const nextPage = prevPage + 1
          fetchProductDetails(nextPage)
          return nextPage
        })
      }
      setReachedBottom(false)
    }
  }
  const throttledHandleScroll = _.throttle(handleScroll, 3000)

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }
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

  return (
    <>
      {isDesktop ? (
        <>
          {searchOpen && (
            <>
              <div
                className="fixed inset-0 flex justify-center items-center z-50"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <div className="bg-white border border-gray-300 rounded shadow-lg p-4 relative">
                  <div className="flex justify-between items-center mb-4">
                    <SearchBar />
                    <button
                      className="text-gray-600 hover:text-gray-800 absolute top-0 right-0"
                      onClick={toggleSearch}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {searchRes && (
            <div className="lg:col-span-3 ">
              <div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {searchRes.map((item, index) => (
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
                              <img
                                src={item.product_main_image_url}
                                alt=""
                                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                              />
                              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
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
                            </div>
                          </a>

                          <div className="mt-3 flex items-center justify-between">
                            {!isDesktop && (
                              <button
                                className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                                onClick={() =>
                                  handleShareClick(item.promotion_link)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                  />
                                </svg>
                                <div className="text-font-bold">
                                  Share
                                  <hr />
                                </div>
                              </button>
                            )}
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
                                  className="w-6 h-6"
                                ></svg>
                                {copiedItemId === item.promotion_link ? (
                                  <p className="text-font-bold">
                                    Copied{' '}
                                    <span role="img" aria-label="Thumbs Up">
                                      👍
                                    </span>
                                  </p>
                                ) : (
                                  <div>
                                    {isDesktop ? (
                                      <div
                                        className="text-font-bold"
                                        style={{
                                          marginLeft: 60,
                                        }}
                                      >
                                        Copy Links
                                        <hr />
                                      </div>
                                    ) : (
                                      <div className="text-font-bold">
                                        Copy Link
                                        <hr />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </button>
                            </div>
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
                                                  item.sale_price * exchangeRate
                                                ).toFixed(2) + ' ₪'
                                              }`
                                            : `${'$' + item.sale_price}`}
                                        </strong>
                                        <span className="text-green-600">
                                          <br /> &nbsp;{'save'}
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
                              <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                                {'sales'}:{' '}
                                <strong>{item.lastest_volume}</strong> <br />
                                {'positive Feedback'}:{' '}
                                <strong>{item.evaluate_rate}</strong>
                              </a>
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
          {' '}
          <>
            {searchRes && (
              <div className="lg:col-span-3">
                <div>
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                      {searchRes.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex flex-col justify-between p-4 border rounded-lg"
                        >
                          {item.name === 'aliexpress' && (
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
                            {!isDesktop && (
                              <button
                                className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                                onClick={() =>
                                  handleShareClick(item.promotion_link)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                  />
                                </svg>
                                <span className="ml-2">Share</span>
                              </button>
                            )}
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
        </>
      )}
      {isLoading && <Loading />}
    </>
  )
}
