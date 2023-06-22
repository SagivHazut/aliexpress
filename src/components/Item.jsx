import React, { useState, useRef, useEffect } from 'react'
import { Filters } from './Filters'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from './LoadingSpinner'

export const Item = ({
  post,
  setItemsPerPage,
  itemsPerPage,
  parsedData,
  originalData,
  country,
  setShowFilter,
  showFilter,
  setCountry,
  isLoading,
  setMaxPrice1,
  isLoadingMore,
  handleInputChange,
  items,
  searchQuery,
  handleSuggestionSelect,
  searchRes,
  setSearchRes,
  name,
}) => {
  const [expandedPostId, setExpandedPostId] = useState(null)
  const descriptionRef = useRef(null)
  const [uniquePosts, setUniquePosts] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setIsVisible(scrollTop > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const descriptionElement = descriptionRef.current
    if (descriptionElement) {
      const { clientHeight, scrollHeight } = descriptionElement
      if (scrollHeight > clientHeight) {
        setExpandedPostId(null)
      }
    }
  }, [post])

  const handleShowMoreClick = (key) => {
    setExpandedPostId(key)
  }

  const handleShareClick = (url) => {
    if (navigator.share) {
      navigator
        .share({
          url: url,
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

  const handleCopyUrlClick = (url, post) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedItemId(url)
        setTimeout(() => {
          setCopiedItemId(null)
        }, 5000) // 5 seconds
      })
      .catch((error) => {
        console.error('Error copying URL:', error)
      })
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

  return (
    <>
      {window.location.pathname !== '/Recommendation' && (
        <div>
          <Filters
            setItemsPerPage={setItemsPerPage}
            itemsPerPage={itemsPerPage}
            parsedData={parsedData}
            parsedDataFilter={post}
            originalData={originalData}
            country={country}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setCountry={setCountry}
            setMaxPrice1={setMaxPrice1}
            handleInputChange={handleInputChange}
            items={items}
            searchQuery={searchQuery}
            handleSuggestionSelect={handleSuggestionSelect}
            name={country === 'IL' ? ' ...חיפוש מבצעים החמים שלנו' : name}
            searchRes={searchRes}
            setSearchRes={setSearchRes}
          />
        </div>
      )}
      <>
        <button
          onClick={scrollToTop}
          id="scrollButton"
          title="Go to top"
          style={{ display: isVisible ? 'block' : 'none' }}
          className="fixed bottom-8 right-4 z-10 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition-all"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>
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
                              // className="absolute top-0 left-0 w-12 h-12 z-20 transform -rotate-45 bg-white bg-opacity-70 "
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
                              <div>
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
                              >
                                {/* SVG path */}
                              </svg>
                              {copiedItemId === item.promotion_link ? (
                                <p>
                                  Copied{' '}
                                  <span role="img" aria-label="Thumbs Up">
                                    👍
                                  </span>
                                </p>
                              ) : (
                                <div>
                                  {isDesktop ? (
                                    <div
                                      style={{
                                        marginLeft: 60,
                                      }}
                                    >
                                      Copy Links
                                      <hr />
                                    </div>
                                  ) : (
                                    <div>
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
                              className={`mt-5 ${
                                expandedPostId === item.product_id
                                  ? 'text-sm'
                                  : 'line-clamp-2'
                              } leading-6 text-gray-600`}
                              style={{
                                userSelect: 'none',
                                fontFamily: 'Rubik',
                              }} // Add this style property
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
                                      <strong>{item.sale_price}$</strong>{' '}
                                      <span className="text-green-600">
                                        <br /> &nbsp;({'save'} {item.discount})
                                      </span>
                                    </div>
                                    <div>
                                      <span
                                        className="items-start"
                                        style={{
                                          textDecoration: 'line-through',
                                        }}
                                      >
                                        {item.original_price} $
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    <strong>{item.sale_price} $</strong>{' '}
                                  </div>
                                )}
                              </div>
                            </a>
                            <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                              {'sales'}: <strong>{item.lastest_volume}</strong>{' '}
                              <br />
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
        {isLoading && <Loading />}
      </>
    </>
  )
}

export default Item
