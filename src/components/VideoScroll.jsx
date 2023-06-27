import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import { PauseCircleIcon } from '@heroicons/react/24/outline'
import CookiesPopup from './CookiesPopup'
import { Cookies } from 'react-cookie'
import LanguageDropdown from './CustomOption'

const VideoScroll = ({ setCountry, country }) => {
  const [videos, setVideos] = useState([])
  const [visibleVideos, setVisibleVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null)
  const [pageCounting, setPageCounting] = useState(1)
  const videoElementsRef = useRef([])
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [applyCountry, setApplyCountry] = useState(country)

  const isAutoplayBlocked = () => {
    const testVideo = document.createElement('video')
    const promise = testVideo.play()

    if (promise !== undefined) {
      promise
        .then(() => {
          testVideo.pause()
          setAutoplayBlocked(false)
          cookies.set('autoplayPermission', true)
        })
        .catch(() => {
          setAutoplayBlocked(true)
          cookies.set('autoplayPermission', false)
        })
    }
  }
  useEffect(() => {
    const autoplayPermission = cookies.get('autoplayPermission')

    if (autoplayPermission === undefined) {
      // Cookie doesn't exist, check for autoplay permission
      isAutoplayBlocked()
    } else {
      // Use the existing cookie value
      setAutoplayBlocked(!autoplayPermission)
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const storedCountry = localStorage.getItem('country')
      try {
        const response = await axios.get(
          'https://mfg0iu8gj3.execute-api.us-east-1.amazonaws.com/default/aliexpress-products',
          {
            params: {
              language: storedCountry === 'IL' ? 'he' : 'en',
              category_ids: '320,3,200133142,200131145,200003494,',
              page_size: 50,
              page_no: pageCounting,
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
        setIsPageLoaded(true)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
    if (applyCountry !== country) {
      setCountry(applyCountry)
      localStorage.setItem('country', applyCountry)
      window.location.reload()
    }
  }, [pageCounting, applyCountry])

  useEffect(() => {
    const filteredVideos = videos.filter((video) => video.product_video_url)
    setVisibleVideos(filteredVideos)
    const isAutoplayBlocked = () => {
      const testVideo = document.createElement('video')
      const promise = testVideo.play()

      if (promise !== undefined) {
        promise
          .then(() => {
            // Autoplay is not blocked
            testVideo.pause()
          })
          .catch(() => {
            // Autoplay is blocked
            setAutoplayBlocked(true)
          })
      }
    }

    isAutoplayBlocked()
  }, [videos])

  const handleVideoEnded = (videoElement, index) => {
    if (index < visibleVideos.length - 1) {
      const nextVideoElement = videoElementsRef.current[index + 1].current
      handleVideoClick(nextVideoElement, index + 1)
      const container = containerRef.current
      const { scrollTop, clientHeight } = container
      const containerRect = container.getBoundingClientRect()
      const nextVideoRect = nextVideoElement.getBoundingClientRect()
      const nextVideoIndex = Math.ceil(
        (nextVideoRect.top - containerRect.top) / clientHeight
      )
      const scrollTo = scrollTop + clientHeight * nextVideoIndex
      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    visibleVideos.forEach((video, index) => {
      const videoElementRef = videoElementsRef.current[index]
      if (videoElementRef) {
        const videoElement = videoElementRef.current
        videoElement.addEventListener('ended', () => {
          handleVideoEnded(videoElement, index)
        })
      }
    })

    return () => {
      visibleVideos.forEach((video, index) => {
        const videoElementRef = videoElementsRef.current[index]
        if (videoElementRef) {
          const videoElement = videoElementRef.current
          videoElement.removeEventListener('ended', () => {
            handleVideoEnded(videoElement, index)
          })
        }
      })
    }
  }, [visibleVideos])

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2

        if (isVisible) {
          videoElement.play().catch((error) => {
            console.error('Failed to play video:', error)
          })
          setCurrentVideo(videoElement)
          setCurrentVideoIndex(videoElement.dataset.index)
        } else {
          videoElement.pause()
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    if (visibleVideos.length > 0) {
      visibleVideos.forEach((video) => {
        const videoElement = document.getElementById(`video-${video.id}`)
        if (videoElement) {
          observer.observe(videoElement, { passive: false }) // Set passive: false
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
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const { scrollTop, clientHeight, scrollHeight } = container
      const threshold = 0.2

      if (scrollTop + clientHeight >= scrollHeight && pageCounting < 10) {
        setPageCounting((prevPageCounting) => prevPageCounting + 1)
      }

      if (isPageLoaded) {
        // Add conditional check for isPageLoaded
        visibleVideos.forEach((video, index) => {
          const videoElementRef = videoElementsRef.current[index]
          if (videoElementRef) {
            const videoElement = videoElementRef.current
            const { top, height } = videoElement.getBoundingClientRect()
            const isVisible =
              top + height >= 0 && top - height <= clientHeight * threshold
            if (isVisible && videoElement.paused) {
              videoElement.play().catch((error) => {
                console.error('Failed to play video:', error)
              })
              setCurrentVideo(videoElement)
              setCurrentVideoIndex(videoElement.dataset.index)
            } else if (!isVisible && !videoElement.paused) {
              videoElement.pause()
            }

            if (
              isVisible &&
              videoElement.currentTime >= videoElement.duration - 1
            ) {
              handleVideoEnded(
                videoElement,
                parseInt(videoElement.dataset.index)
              )
            }
          }
        })
      }
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
  }, [visibleVideos, pageCounting])

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((prevPercentage) => (prevPercentage + 1) % 101)
    }, 10)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleVideoClick = (videoElement, index) => {
    if (videoElement.paused) {
      videoElement.play().catch((error) => {
        console.error('Failed to play video:', error)
      })
      setCurrentVideo(videoElement)
      setCurrentVideoIndex(index)
      setPlayingVideoIndex(index)
    } else {
      videoElement.pause()
      setCurrentVideo(null)
      setCurrentVideoIndex(null)
      setPlayingVideoIndex(null)
    }
  }

  const [uniquePosts, setUniquePosts] = useState([])

  useEffect(() => {
    const filterUniquePosts = (visibleVideos) => {
      const uniqueIds = new Set()
      const filteredPosts = []

      visibleVideos.forEach((item) => {
        if (!uniqueIds.has(item.product_id)) {
          uniqueIds.add(item.product_id)
          filteredPosts.push(item)
        }
      })

      return filteredPosts
    }

    setUniquePosts(filterUniquePosts(visibleVideos))
  }, [visibleVideos])
  const cookies = new Cookies()

  const handleAutoplayPermission = (permission) => {
    setAutoplayBlocked(!permission)
    cookies.set('autoplayPermission', permission)
  }

  return (
    <>
      <div
        className="fixed flex justify-center items-center z-50"
        style={{
          height: '0vh',
          right: 15,
          top: 40,
        }}
      >
        {' '}
        <LanguageDropdown
          setCountry={setCountry}
          country={country}
          setApplyCountry={setApplyCountry}
          applyCountry={applyCountry}
        />
      </div>
      {autoplayBlocked && (
        <CookiesPopup handleAutoplayPermission={handleAutoplayPermission} />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          ref={containerRef}
          style={{ height: '857px', overflow: 'scroll' }}
          onTouchStart={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {uniquePosts.map((video, index) => {
            const videoElementRef =
              videoElementsRef.current[index] || React.createRef()
            videoElementsRef.current[index] = videoElementRef

            return (
              <div
                className="video-container"
                style={{ background: 'black', position: 'relative' }}
                key={index}
              >
                <div className="video-wrap">
                  <video
                    width="560"
                    height="315"
                    data-index={index}
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
                      height: 700,
                    }}
                    muted
                    autoPlay=""
                    controls={false}
                    playsInline
                    onClick={() =>
                      handleVideoClick(videoElementRef.current, index)
                    }
                    ref={videoElementRef}
                  ></video>
                  {!currentVideo && currentVideoIndex !== index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        fontSize: '48px',
                        color: 'white',
                      }}
                    >
                      <PauseCircleIcon className="h-12 w-12 text-white-500" />
                    </div>
                  )}
                </div>

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
                    <span
                      style={{
                        background: `linear-gradient(to left, #ff0000 0%, #ff7f00 16.6%, #ffff00 33.3%, #00ff00 50%, #0000ff 66.6%, #8b00ff 83.3%, #ff0000 100%)`,
                        backgroundSize: '600% 100%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `animated-gradient 3s linear infinite`,
                        fontSize: 22,
                      }}
                    >
                      {country === 'IL' ? 'לחץ כאן' : 'Click here'}
                    </span>
                  </span>
                </a>
                <a
                  href={video.seller_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="seller-link"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    fontSize: '12px',
                    color: 'white',
                  }}
                >
                  {video.seller_name}
                </a>
                <div
                  className="duration-bar"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: `${percentage}%`,
                    height: '2px',
                    backgroundColor: 'red',
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default VideoScroll
