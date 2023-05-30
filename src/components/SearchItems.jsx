import React, { useState, useRef, useEffect } from 'react'

export const SearchItems = ({ post }) => {
  const [showAllItems, setShowAllItems] = useState(false)
  const displayItems = showAllItems ? post : post.slice(0, 12)
  const [expandedPostId, setExpandedPostId] = useState(null)
  const descriptionRef = useRef(null)

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

  return (
    <>
      {post && (
        <div className="lg:col-span-">
          <div>
            <div className="mx-auto max-w-7xl px-10 lg:px-2">
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                {displayItems.map((item) => (
                  <article
                    key={item.ProductId}
                    className="flex flex-col items-start justify-between"
                  >
                    <a href={item['Promotion Url']} target="_blank">
                      <div className="relative w-full">
                        <img
                          src={item['Image Url']}
                          alt=""
                          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </a>

                    <div className="max-w-xl mr-3">
                      <div className="group relative mr-4">
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
                              Show More
                            </button>
                          )}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-red-600 hover:bg-gray-100 ml-0">
                          <div className="w-20">
                            <div>
                              <strong>{item['Discount Price']}</strong>{' '}
                              <span className="text-green-600">
                                &nbsp;(Save {calculateDiscountPercentage(item)}
                                %)
                              </span>
                            </div>

                            <div>
                              <span style={{ textDecoration: 'line-through' }}>
                                {item['Origin Price']} <br />
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="relative z-10 rounded-full bg-gray-50 px-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-0 w-20">
                          Sales: <strong>{item['Sales180Day']} </strong> <br />
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
      {!showAllItems && post.length > 10 && (
        <button
          onClick={() => setShowAllItems(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Show more
        </button>
      )}
      {showAllItems && post.length > 10 && (
        <button
          onClick={() => setShowAllItems(false)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Show less
        </button>
      )}
      <hr className="border-2 border-gray-300 my-8" />
    </>
  )
}
