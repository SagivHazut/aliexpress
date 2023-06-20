import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

const VideoScroll = () => {
  const [videos, setVideos] = useState([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
          {
            params: {
              language: 'en',
              category_ids: '320,3,100001205',
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
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target
          videoElement.play()
          setCurrentVideoIndex(
            parseInt(videoElement.getAttribute('data-index'))
          )
        } else {
          const videoElement = entry.target
          videoElement.pause()
          videoElement.currentTime = 0
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold as needed
    }

    const observer = new IntersectionObserver(handleScroll, options)

    const videosElements = document.querySelectorAll('.video-element')
    videosElements.forEach((videoElement) => {
      observer.observe(videoElement)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const filteredVideos = videos.filter((video) => {
    const url = video.product_video_url
    return url
  })

  return (
    <div>
      {filteredVideos.length > 0 ? (
        <div ref={containerRef} style={{ height: '100vh', overflow: 'hidden' }}>
          {filteredVideos.map((video, index) => (
            <a
              href={video.promotion_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <video
                id={`video-${index}`}
                key={video.id}
                src={video.product_video_url}
                autoPlay
                loop
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  marginTop: -30,
                  marginBottom: 20,
                }}
                className="video-element"
                data-index={index}
                muted
              />
            </a>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}

export default VideoScroll
