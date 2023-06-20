import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

const YourComponent = () => {
  const [videos, setVideos] = useState([])
  const [visibleVideos, setVisibleVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
          {
            params: {
              language: 'en',
              category_ids:
                '200133142,200000854,200003494,200000345,201336907,201169002',
              page_size: 50,
              page_no: 1,
              max_sale_price: '3000',
              min_sale_price: '300',
              sort: 'SALE_PRICE_DESC',
            },
            mode: 'no-cors',
          }
        )

        const newData = response.data
        if (response.status === 500) {
          fetchData()
        }

        setVideos((prevVideos) => [...prevVideos, ...newData])
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target
        if (entry.isIntersecting) {
          videoElement.play().catch((error) => {
            console.error('Failed to play video:', error)
          })
        } else {
          videoElement.pause()
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    if (visibleVideos.length > 0) {
      visibleVideos.forEach((video) => {
        const videoElement = document.getElementById(`video-${video.id}`)
        if (videoElement) {
          observer.observe(videoElement)
        }
      })
    }

    return () => {
      if (visibleVideos.length > 0) {
        visibleVideos.forEach((video) => {
          const videoElement = document.getElementById(`video-${video.id}`)
          if (videoElement) {
            observer.unobserve(videoElement)
          }
        })
      }
    }
  }, [visibleVideos])

  useEffect(() => {
    const filteredVideos = videos.filter((video) => video.product_video_url)
    setVisibleVideos(filteredVideos)
  }, [videos])

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const { scrollTop, clientHeight } = container
      const threshold = 0.8

      visibleVideos.forEach((video) => {
        const videoElement = document.getElementById(`video-${video.id}`)
        if (videoElement) {
          const { top, height } = videoElement.getBoundingClientRect()
          const isVisible =
            top + height >= 0 && top - height <= clientHeight * threshold
          if (isVisible && videoElement.paused) {
            videoElement.play().catch((error) => {
              console.error('Failed to play video:', error)
            })
          } else if (!isVisible && !videoElement.paused) {
            videoElement.pause()
          }
        }
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [visibleVideos])

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div ref={containerRef} style={{ height: '800px', overflow: 'scroll' }}>
          {visibleVideos.map((video, index) => (
            <div
              className="video-container"
              style={{ display: 'block', background: 'black' }}
              key={index}
            >
              <div className="video-wrap">
                <video
                  width="560"
                  height="315"
                  poster={video.product_image_url}
                  className="disable-download"
                  controlsList="nodownload"
                  id={`video-${video.id}`}
                  src={video.product_video_url.replace(
                    'http://cloud.video.taobao.com',
                    'https://video.aliexpress-media.com'
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    display: 'block',
                    height: 700,
                  }}
                  autoPlay={false}
                  controls={false}
                  onClick={(e) =>
                    e.target.paused ? e.target.play() : e.target.pause()
                  }
                ></video>
              </div>
              <img
                alt={video.product_title}
                id="poster"
                className="poster"
                src={video.product_image_url}
                style={{ display: 'none' }}
                data-spm-anchor-id="a2g0o.detail.1000017.i0.73684deeF61nkB"
              />
              <a
                href={video.promotion_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="play-icon"
                  data-spm-anchor-id="a2g0o.detail.1000017.i1.73684deeF61nkB"
                  style={{ background: 'none', color: 'white' }}
                >
                  {video.product_title}
                  <br />
                  Click here
                </span>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default YourComponent
