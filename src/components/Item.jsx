import React, { useState, useRef, useEffect } from 'react'
import { Filters } from './Filters'

export const Item = ({
  post,
  setItemsPerPage,
  itemsPerPage,
  parsedData,
  setParsedDataFilter,
  originalData,
}) => {
  const [expandedPostId, setExpandedPostId] = useState(null)
  const descriptionRef = useRef(null)
  const [layout, setLayout] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const descriptionElement = descriptionRef.current
    if (descriptionElement) {
      const { clientHeight, scrollHeight } = descriptionElement
      if (scrollHeight > clientHeight) {
        setExpandedPostId(null)
      }
    }
  }, [post])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleShowMoreClick = (postId) => {
    setExpandedPostId(postId)
  }

  const calculateDiscountPercentage = (item) => {
    const discount =
      parseFloat(item['Origin Price'].replace(/[^\d.-]/g, '')) -
      parseFloat(item['Discount Price'].replace(/[^\d.-]/g, ''))
    const discountPercentage =
      (discount / parseFloat(item['Origin Price'].replace(/[^\d.-]/g, ''))) *
      100
    return Math.round(discountPercentage)
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

  const handleCopyUrlClick = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copied to clipboard')
      })
      .catch((error) => {
        console.error('Error copying URL:', error)
      })
  }

  if (isLoading) {
    return (
      <div className="lg:col-span-3">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {/* Placeholder layout without pictures and data */}
            {Array.from({ length: 12 }).map((_, index) => (
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
      <div>
        <Filters
          setLayout={setLayout}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          parsedData={parsedData}
          setParsedDataFilter={setParsedDataFilter}
          parsedDataFilter={post}
          originalData={originalData}
        />
      </div>

      {layout ? (
        <>
          {post && (
            <div className="lg:col-span-3">
              <div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {post.map((item) => (
                      <article
                        key={item.ProductId}
                        className="flex-col items-start justify-between"
                      >
                        <a
                          href={item['Promotion Url']}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="relative w-full">
                            <img
                              src={item['Image Url']}
                              alt=""
                              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                          </div>
                        </a>

                        <div className="mt-3 flex items-center justify-between">
                          <button
                            className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                            onClick={() =>
                              handleShareClick(item['Promotion Url'])
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
                            Share
                          </button>
                          <button
                            className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500"
                            onClick={() =>
                              handleCopyUrlClick(item['Promotion Url'])
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
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                              />
                            </svg>
                            Copy
                          </button>
                        </div>
                        <div className="max-w-xl">
                          <div className="group relative">
                            <p
                              ref={descriptionRef}
                              className={`mt-5 ${
                                expandedPostId === item.ProductId
                                  ? 'text-sm'
                                  : 'line-clamp-2'
                              } leading-6 text-gray-600`}
                              style={{ userSelect: 'none' }} // Add this style property
                            >
                              {item['Product Desc']}
                            </p>
                            {expandedPostId !== item.ProductId &&
                              descriptionRef.current &&
                              descriptionRef.current.scrollHeight >
                                descriptionRef.current.clientHeight && (
                                <button
                                  className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    handleShowMoreClick(item.ProductId)
                                  }
                                >
                                  {'showMore'}
                                </button>
                              )}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ml-0">
                              <div>
                                <div>
                                  <strong>{item['Discount Price']}</strong>{' '}
                                  <span className="text-green-600">
                                    <br /> &nbsp;({'save'}{' '}
                                    {calculateDiscountPercentage(item)}%)
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className="items-start"
                                    style={{
                                      textDecoration: 'line-through',
                                    }}
                                  >
                                    {item['Origin Price']}
                                  </span>
                                </div>
                              </div>
                            </a>
                            <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                              {'sales'}: <strong>{item['Sales180Day']}</strong>{' '}
                              <br />
                              {'positive Feedback'}:{' '}
                              <strong>{item['Positive Feedback']}</strong>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {post && (
            <div className="lg:col-span-">
              <div>
                <div className="mx-auto max-w-7xl px-10 lg:px-2">
                  <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                    {post.map((item) => (
                      <article
                        key={item.ProductId}
                        className="flex flex-col items-start justify-between"
                      >
                        <a href={item['Promotion Url']} target="_blank">
                          <div className="relative w-full">
                            <img
                              src={item['Image Url']}
                              alt=""
                              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                          </div>
                        </a>
                        <div
                          className="mt-3 flex items-center justify-between "
                          style={{ marginLeft: -13 }}
                        >
                          <button
                            className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500 w-15 "
                            onClick={() =>
                              handleShareClick(item['Promotion Url'])
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
                            Share
                          </button>
                          <button
                            className="flex items-center px-3 py-2 font-medium text-gray-600 hover:text-indigo-500 w-15"
                            onClick={() =>
                              handleCopyUrlClick(item['Promotion Url'])
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
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                              />
                            </svg>
                            Copy
                          </button>
                        </div>
                        <div className="max-w-xl">
                          <div className="group relative">
                            <p
                              ref={descriptionRef}
                              className={`mt-5 ${
                                expandedPostId === item.ProductId
                                  ? 'text-sm'
                                  : 'line-clamp-2'
                              } leading-6 text-gray-600`}
                              style={{ userSelect: 'none' }} // Add this style property
                            >
                              {item['Product Desc']}
                            </p>
                            {expandedPostId !== item.ProductId &&
                              descriptionRef.current &&
                              descriptionRef.current.scrollHeight >
                                descriptionRef.current.clientHeight && (
                                <button
                                  className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    handleShowMoreClick(item.ProductId)
                                  }
                                >
                                  {'showMore'}
                                </button>
                              )}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ml-0 w-15">
                              <div>
                                <a className="">
                                  {'sales'}:{' '}
                                  <strong>{item['Sales180Day']} </strong> <br />
                                  {'positive Feedback'}:{' '}
                                  <strong>{item['Positive Feedback']}</strong>
                                </a>
                                <br />
                                <hr className="h-2 mt-2" />
                                <div>
                                  <strong>{item['Discount Price']}</strong>{' '}
                                  <span className="text-green-600  ">
                                    <br /> &nbsp;({'save'}
                                    {calculateDiscountPercentage(item)}%)
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className="items-start  "
                                    style={{
                                      textDecoration: 'line-through',
                                    }}
                                  >
                                    {item['Origin Price']}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Item
