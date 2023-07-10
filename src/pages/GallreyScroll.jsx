import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BottomNavBar from '../components/BottomNavBar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const GallreyScroll = ({ setCountry, country }) => {
  const { page } = useParams()
  const [images, setImages] = useState([])
  const [visibleVideos, setVisibleVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1)
  const [reachedBottom, setReachedBottom] = useState(false)
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false)
  const [applyCountry, setApplyCountry] = useState(country)

  useEffect(() => {
    if (!initialFetchCompleted) {
      fetchData(currentPage)
      setInitialFetchCompleted(true)
    }
  }, [currentPage, initialFetchCompleted])

  useEffect(() => {
    if (visibleVideos && visibleVideos.length <= 100 && currentPage <= 3) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1
        fetchData(nextPage)
        return nextPage
      })
    }
  }, [visibleVideos])

  useEffect(() => {
    if (applyCountry !== country) {
      setCountry(applyCountry)
      localStorage.setItem('country', applyCountry)
      window.location.reload()
    }
  }, [applyCountry, country, setCountry])

  useEffect(() => {
    const filteredVideos = images.filter((video) => video.product_video_url)
    setVisibleVideos(filteredVideos)
  }, [images])

  const fetchData = async (page) => {
    setIsLoading(true)
    const storedCountry = localStorage.getItem('country')
    const categoryIds = [
      '200133142',
      '200131145',
      '200003494',
      '15',
      '100000041',
    ]

    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)]

    try {
      const response = await axios.get(
        'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
        {
          params: {
            language: storedCountry === 'IL' ? 'he' : 'en',
            category_ids: randomCategoryId,
            page_size: 50,
            page_no: page ? page : 1,
            max_sale_price: '3000',
            min_sale_price: '300',
            sort: 'LAST_VOLUME_DESC',
          },
        }
      )

      const newData = response.data

      if (response.status === 500) {
        fetchData()
      }
      setImages((prevVideos) => [...prevVideos, ...newData])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
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
    }
  }

  const throttledHandleScroll = _.throttle(handleScroll, 2000)

  useEffect(() => {
    if (reachedBottom === true) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1
        fetchData(nextPage)
        return nextPage
      })
      setReachedBottom(false)
    }
  }, [reachedBottom])

  return (
    <>
      <div className="grid grid-cols-4 gap-1 bg-black">
        {visibleVideos.map((item, index) => (
          <div
            key={index}
            className={`relative ${
              index === 0 || (index + 1) % 7 === 0
                ? 'col-span-2 row-span-2'
                : 'col-span-1 row-span-1'
            }`}
          >
            {index === 0 || (index + 1) % 7 === 0 ? (
              <>
                <a
                  href={item.promotion_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <video
                    data-index={index}
                    poster={item.product_image_url}
                    id={`item-${item.id}`}
                    src={item.product_video_url.replace(
                      'http://cloud.video.taobao.com',
                      'https://video.aliexpress-media.com'
                    )}
                    alt={item.product_video_url}
                    width="560"
                    height="315"
                    className="w-full h-full object-cover"
                    muted
                    autoPlay={true}
                    controls={false}
                    playsInline
                    onEnded={(event) => {
                      event.target.currentTime = 0
                      event.target.play()
                    }}
                  />
                </a>
              </>
            ) : (
              <>
                <a
                  href={item.promotion_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={`image-${index}`}
                    src={images[index].product_main_image_url}
                    alt={images[index].product_image_url}
                    className="w-full h-full object-cover"
                  />
                </a>
              </>
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <div style={{ top: 60, position: 'relative' }}>
          <LoadingSpinner />
        </div>
      )}

      <div style={{ marginTop: 56 }}>
        <BottomNavBar />
      </div>
    </>
  )
}

export default GallreyScroll
