import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Filters } from './Filters'
import LanguageSwitcher from './LanguageSwitcher'

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
  const [isLoading, setIsLoading] = useState(true) // New state variable
  const { t } = useTranslation()

  useEffect(() => {
    // Check if description text exceeds 3 lines
    const descriptionElement = descriptionRef.current
    if (descriptionElement) {
      const { clientHeight, scrollHeight } = descriptionElement
      if (scrollHeight > clientHeight) {
        setExpandedPostId(null) // Reset expanded post if it exceeds 3 lines
      }
    }
  }, [post])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false) // Set isLoading to false after the delay
    }, 2000)

    return () => {
      clearTimeout(timer) // Clear the timer on unmount (optional)
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
                                  {t('showMore')}
                                </button>
                              )}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ml-0">
                              <div>
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
                                <div>
                                  <strong>{item['Discount Price']}</strong>{' '}
                                  <span className="text-green-600  ">
                                    <br /> &nbsp;({t('save')}{' '}
                                    {calculateDiscountPercentage(item)}%)
                                  </span>
                                </div>
                              </div>
                            </a>
                            <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                              {t('sales')}: {item['Sales180Day']} <br />
                              {t('positiveFeedback')}:{' '}
                              {item['Positive Feedback']}
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
                                  {t('showMore')}
                                </button>
                              )}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ml-0">
                              <div>
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
                                <div>
                                  <strong>{item['Discount Price']}</strong>{' '}
                                  <span className="text-green-600  ">
                                    <br /> &nbsp;({t('save')}{' '}
                                    {calculateDiscountPercentage(item)}%)
                                  </span>
                                </div>
                              </div>
                            </a>
                            <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0">
                              {t('sales')}: {item['Sales180Day']} <br />
                              {t('positiveFeedback')}:{' '}
                              {item['Positive Feedback']}
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
