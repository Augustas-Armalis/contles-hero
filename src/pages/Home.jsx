import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const LOGOS = [
  { name: 'tesonet', alt: 'Tesonet' },
  { name: 'unicorns', alt: 'Unicorns' },
  { name: 'cannumo', alt: 'Cannumo' },
  { name: 'surfshark', alt: 'Surfshark' },
  { name: 'saily', alt: 'Saily' },
  { name: 'tv3', alt: 'TV3' },
  { name: 'brite', alt: 'Brite' },
  { name: 'ism', alt: 'ISM' },
]

const LOGO_CAROUSEL_SPEED_PX_PER_SEC = 67

const FEATURE_TABS = [
  { id: 'projects', label: 'Projects', icon: 'search.svg' },
  { id: 'collaborate', label: 'Collaborate', icon: 'chat.svg' },
  { id: 'campaigns', label: 'Campaigns', icon: 'speaker.svg' },
  { id: 'payments', label: 'Payments', icon: 'wallet.svg' },
]

// Copy per selected tab (edit these strings).
const FEATURE_COPY = {
  projects: {
    brands: {
      description:
        'Search for verified creators by platform, price, language type, and category. From influencers to UGC.',
    },
    creators: {
      description:
        'Find verified brands to work with directly. Join active campaigns and start earning from day one.',
    },
  },
  collaborate: {
    brands: {
      description:
        'Work with countless creators in one place. Chat, track video performance, and safely send products.',
    },
    creators: {
      description:
        'Work securely with many brands in one place. Deliver files, get paid upfront and grow your career.',
    },
  },
  campaigns: {
    brands: {
      description:
        'Buy results by creating campaigns. Review submissions and pay for performance.',
    },
    creators: {
      description:
        'Join campaigns, submit your work, and earn based on what you deliver, talent, results - not follower count.',
    },
  },
  payments: {
    brands: {
      description:
        'Handle payments securely inside Contles. Avoid scams, missed delivery, and messy payment disputes.',
    },
    creators: {
      description:
        'Get paid securely through Contles. No unpaid work after files are sent, no disappearing brands.',
    },
  },
}

function InfiniteLogoCarousel({ logos, speedPxPerSec = LOGO_CAROUSEL_SPEED_PX_PER_SEC }) {
  const containerRef = useRef(null)
  const setRef = useRef(null)
  const trackRef = useRef(null)

  const setWidthRef = useRef(0)
  const [repeatCount, setRepeatCount] = useState(2)

  useLayoutEffect(() => {
    const containerEl = containerRef.current
    const setEl = setRef.current
    if (!containerEl || !setEl) return

    const recompute = () => {
      const setWidth = setEl.getBoundingClientRect().width
      const containerWidth = containerEl.getBoundingClientRect().width
      if (!setWidth || !containerWidth) return

      setWidthRef.current = setWidth
      const needed = Math.ceil(containerWidth / setWidth) + 2
      setRepeatCount(Math.max(2, Math.min(12, needed)))
    }

    recompute()

    const ro = new ResizeObserver(recompute)
    ro.observe(containerEl)
    ro.observe(setEl)

    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [logos.length])

  useEffect(() => {
    const trackEl = trackRef.current
    if (!trackEl) return

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (mql?.matches) return

    let rafId = 0
    let last = performance.now()
    let offset = 0

    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now

      const setWidth = setWidthRef.current
      if (setWidth > 0) {
        offset = (offset + speedPxPerSec * dt) % setWidth
        trackEl.style.transform = `translate3d(${-offset}px, 0, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [speedPxPerSec, repeatCount, logos.length])

  return (
    <div ref={containerRef} className="logo-carousel-container">
      <div ref={trackRef} className="logo-carousel-track">
        <div ref={setRef} className="logo-carousel-set">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={`${import.meta.env.BASE_URL}logos/${logo.name}.png`}
              alt={logo.alt}
              className="w-auto h-[36px] opacity-70 flex-shrink-0"
            />
          ))}
        </div>

        {Array.from({ length: repeatCount - 1 }).map((_, setIndex) => (
          <div key={setIndex} className="logo-carousel-set" aria-hidden="true">
            {logos.map((logo) => (
              <img
                key={`${logo.name}-repeat-${setIndex}`}
                src={`${import.meta.env.BASE_URL}logos/${logo.name}.png`}
                alt={logo.alt}
                className="w-auto h-[36px] opacity-70 flex-shrink-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}




function Home() {
  const logos = useMemo(() => LOGOS, [])
  const [activeTab, setActiveTab] = useState('projects')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeCopy = FEATURE_COPY[activeTab] ?? FEATURE_COPY.projects
  const burgerLottieRef = useRef(null)
  const burgerTotalFramesRef = useRef(0)
  const burgerHalfFrameRef = useRef(0)
  const burgerStageRef = useRef(0) // 0 = ready for first half, 1 = ready for second half
  const burgerNeedsResetRef = useRef(false)
  const burgerInstanceRef = useRef(null)
  const burgerCleanupRef = useRef(null)

  const BURGER_PLAYBACK_SPEED = 2

  useEffect(() => {
    if (!isMobileMenuOpen) {
      // Re-enable Lenis + scroll
      if (typeof window !== 'undefined' && window.lenisInstance?.start) {
        window.lenisInstance.start()
      }
      document.body.style.overflow = ''
      return
    }

    // Disable scroll while menu open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Disable Lenis if it exists (desktop / non-touch)
    if (typeof window !== 'undefined' && window.lenisInstance?.stop) {
      window.lenisInstance.stop()
    }

    return () => {
      document.body.style.overflow = prevOverflow
      if (typeof window !== 'undefined' && window.lenisInstance?.start) {
        window.lenisInstance.start()
      }
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    return () => {
      burgerCleanupRef.current?.()
    }
  }, [])

  return (




    <div className="w-full flex flex-col items-center justify-center overflow-x-hidden !px-[16px] max-[1132px]:!px-[12px]">


    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.section
          className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-white/90 backdrop-blur-[16px] z-[5000]"
          initial={{ opacity: 0, filter: 'blur(18px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* mobile menu */}
          <section className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-text bigalt">Kas Skaitys Tas Gaidys</p>
            </div>
          </section>
        </motion.section>
      )}
    </AnimatePresence>


    <motion.nav 
      className="w-full fixed top-0 left-0 right-0 z-[5100] flex h-fit min-h-[50px] items-center justify-center !py-[8px] !px-[16px] max-[1132px]:!px-[12px] max-[650px]:!py-[6px] bg-bg/60 backdrop-blur-[16px] border-b border-white/50"
      initial={{ 
        opacity: 0, 
        y: -20,
        filter: "blur(10px)",
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.6,
      }}
    >
      <section className="relative w-full h-fit max-w-[1100px] flex items-center justify-between">

        <Link to="/"><img src={`${import.meta.env.BASE_URL}branding/logo.svg`} alt="Contles" className="w-auto h-[24px]" /></Link>

        <div className="flex items-center gap-[6px] justify-center max-[800px]:hidden right-0">
          
          <button className="alt-small-button ">
            <p className="small-button-text text-text">Log In</p>
          </button>

          <button className="small-button ">
            <p className="small-button-text text-white">Join Today</p>
          </button>
        </div>



        <div className="flex items-center gap-[6px] justify-center !hidden max-[800px]:!flex">
          <button className="small-button !py-[6px] !px-[12px] !rounded-[10px] ">
              <p className="small-button-text text-white !text-[15px] !tracking-[-1%]">Join Today</p>
          </button>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              const willOpen = !isMobileMenuOpen
              setIsMobileMenuOpen(willOpen)

              const player = burgerLottieRef.current
              if (!player) return

              // Try to populate frames immediately if "ready/load" already fired before listeners attached.
              if (!burgerTotalFramesRef.current && player.totalFrames) {
                burgerTotalFramesRef.current = player.totalFrames
                burgerHalfFrameRef.current = Math.floor(player.totalFrames / 2)
              }

              const total = burgerTotalFramesRef.current
              const half = burgerHalfFrameRef.current
              // If we still don't know frames yet, just play (at least it animates).
              if (!total || !half) {
                player.setLoop?.(false)
                player.setSpeed?.(BURGER_PLAYBACK_SPEED)
                player.play?.()
                return
              }

              player.setLoop?.(false)
              player.setSpeed?.(BURGER_PLAYBACK_SPEED)

              if (willOpen) {
                // First click: play first half, then pause at the middle.
                if (burgerNeedsResetRef.current) {
                  player.stop?.()
                  burgerNeedsResetRef.current = false
                }
                burgerStageRef.current = 0
                player.setSegment?.(0, half)
                player.setFrame?.(0)
                player.play?.()
              } else {
                // Second click: continue from middle to end.
                burgerStageRef.current = 1
                player.setSegment?.(half, total - 1)
                player.setFrame?.(half)
                player.play?.()
              }
            }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-transparent p-0 overflow-hidden"
          >
            <DotLottieReact
              src={`${import.meta.env.BASE_URL}heroicons/burger.lottie`}
              loop={false}
              autoplay={false}
              dotLottieRefCallback={(dotLottie) => {
                burgerLottieRef.current = dotLottie

                // When React re-renders, this callback can fire multiple times.
                // Only (re)attach listeners when we get a new instance.
                if (burgerInstanceRef.current === dotLottie) return
                burgerCleanupRef.current?.()
                burgerInstanceRef.current = dotLottie
                if (!dotLottie) return

                const syncFrames = () => {
                  const total = dotLottie.totalFrames ?? 0
                  if (!total) return
                  burgerTotalFramesRef.current = total
                  burgerHalfFrameRef.current = Math.floor(total / 2)
                  dotLottie.setLoop?.(false)
                  dotLottie.setSpeed?.(BURGER_PLAYBACK_SPEED)
                  // Ensure a known start state
                  dotLottie.stop?.()
                  burgerStageRef.current = 0
                  burgerNeedsResetRef.current = false
                }

                const onComplete = () => {
                  const total = burgerTotalFramesRef.current
                  const half = burgerHalfFrameRef.current
                  if (!total) return

                  if (burgerStageRef.current === 0) {
                    dotLottie.setFrame?.(half)
                    dotLottie.pause?.()
                    burgerStageRef.current = 1
                  } else {
                    dotLottie.setFrame?.(total - 1)
                    dotLottie.pause?.()
                    burgerStageRef.current = 0
                    burgerNeedsResetRef.current = true
                  }
                }

                dotLottie.addEventListener?.('load', syncFrames)
                dotLottie.addEventListener?.('ready', syncFrames)
                // Also attempt immediately (covers the case where events already fired)
                syncFrames()
                dotLottie.addEventListener?.('complete', onComplete)

                burgerCleanupRef.current = () => {
                  dotLottie.removeEventListener?.('load', syncFrames)
                  dotLottie.removeEventListener?.('ready', syncFrames)
                  dotLottie.removeEventListener?.('complete', onComplete)
                }
              }}
              // Fill the button + visually zoom (many burger assets have padding baked in)
              style={{
                width: '28px',
                height: '28px',
              }}
              width={28}
              height={28}
              // If the artwork has padding, this helps it visually fill the box
              layout={{ fit: 'cover', align: [0.5, 0.5] }}
            />
          </button>
        </div>

        



        <div className="absolute inset-0 flex items-center justify-center gap-[32px] pointer-events-none max-[800px]:hidden">
          <Link to="/" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Home</Link>
          <Link to="/brand" className="text-alt alt pointer-events-auto hover:!text-brands transition-ease-out duration-200">For Brands</Link>
          <Link to="/creator" className="text-alt alt pointer-events-auto hover:!text-creators transition-ease-out duration-200">For Creators</Link>
          <Link to="/blog" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Blog</Link>
        </div>

      </section>
    </motion.nav>


    <section className="w-full flex flex-col items-center justify-center max-w-[1100px] mx-auto">

      <motion.section 
        className="hero-section w-full flex justify-center items-center flex-col pt-[142px]! gap-[42px] max-[650px]:pt-[128px]! max-[650px]:gap-[32px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, visibility: 'hidden' },
          visible: {
            opacity: 1,
            visibility: 'visible',
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.5,
            },
          },
        }}
      >
        <motion.div 
          className="flex flex-col gap-3 items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.p 
            className="capitalize text-[52px] font-semibold tracking-[-8%] leading-[110%] text-text max-w-[450px] text-center max-[650px]:text-[42px] max-[650px]:max-w-[400px]"
            initial={{ 
              opacity: 0, 
              y: 40,
              filter: "blur(20px)",
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5,
            }}
          >
            The platform for Creator marketing
          </motion.p>
          <motion.p 
            className="bigalt text-alt text-center max-w-[370px] max-[650px]:max-w-[320px]"
            initial={{ 
              opacity: 0, 
              y: 40,
              filter: "blur(20px)",
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.7,
            }}
          >
            Where brands and creators connect, work, pay and earn. All at one secure place.
          </motion.p>
        </motion.div>

        <motion.button 
          className="big-button"
          initial={{ 
            opacity: 0, 
            y: 20,
            filter: "blur(20px)",
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.9,
          }}
        >
          <p className="button-text text-white">Start Marketing</p>
        </motion.button>

      </motion.section>


      {/* Desktop version - hidden below 1132px */}
      <div className="w-full flex items-center justify-center !mt-[100px] gap-[32px] max-[1132px]:hidden">

        <motion.p 
          className="smalalt text-text"
          initial={{ 
            opacity: 0, 
            x: -20,
            filter: "blur(10px)",
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.2,
          }}
        >
          Trusted by
        </motion.p>

        <motion.div 
          className="w-px h-[32px] bg-[#D1D1D1] shadow-[1px_0_0_0_#FFF]"
          initial={{ 
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{ 
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.2,
          }}
        />

          <motion.div 
            className="w-fit flex items-center justify-center gap-[32px] opacity-70"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 1.25,
                },
              },
            }}
          >
            {logos.map((logo) => (
              <motion.img 
                key={logo.name}
                src={`${import.meta.env.BASE_URL}logos/${logo.name}.svg`} 
                alt={logo.alt} 
                className="w-auto h-[36px]"
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 20,
                    filter: "blur(10px)",
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              />
            ))}
          </motion.div>

      </div>

      {/* Mobile carousel version - visible below 1132px */}
      <div className="w-full !mt-[100px] min-[1132px]:hidden max-[650px]:!mt-[80px]">

      <motion.p 
          className="smalalt text-alt !mb-[12px]"
          initial={{ 
            opacity: 0, 
            y: 20,
            filter: "blur(10px)",
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.1,
          }}
        >
          Trusted by
        </motion.p>


        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.2,
          }}
        >
          <InfiniteLogoCarousel logos={logos} />
        </motion.div>


      </div>



      <motion.div 
        className="w-full flex items-center justify-center rounded-[24px] border border-border !mt-[32px] aspect-[1100/500] max-[1132px]:aspect-[1100/600] overflow-hidden max-h-[500px] bg-[linear-gradient(266deg,_var(--Influencers,_#FC6262)_0%,_var(--Brands,_#5F0EEC)_100.19%)]  relative max-[690px]:rounded-[16px] max-[650px]:!mt-[16px]"
        initial={{ 
          opacity: 0, 
          y: 30,
          filter: "blur(10px)",
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 1.15,
        }}
      >
        <img className="w-full h-full object-cover absolute top-0 left-0" src={`${import.meta.env.BASE_URL}assets/texture.png`} alt="Texture"/>


        <div className="w-fit h-fit flex absolute top-[58px] left-[58px] right-[58px] max-[690px]:left-[18px] max-[690px]:right-[18px] max-[690px]:top-[18px] max-[1132px]:left-[48px] max-[1132px]:right-[48px] max-[1132px]:top-[42px]  items-center justify-center !p-[6px] max-[690px]:!p-[4px] backdrop-blur-[28px] border border-white/20 bg-white/24 shadow-[inset_0_0_8.1px_0_rgba(255,255,255,0.14)] rounded-[17px] max-[690px]:rounded-[12px]">
        
          <img src={`${import.meta.env.BASE_URL}product/projects.png`} alt="img" className="w-full h-auto object-cover rounded-[12px] max-[690px]:rounded-[8px]" />


        </div>

      </motion.div>




        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-[6px] !mt-[14px] bg-white border border-border rounded-[14px] !p-[6px] shadow-[-20px_207px_58px_0_rgba(0,0,0,0),_-13px_133px_53px_0_rgba(0,0,0,0.01),_-7px_75px_45px_0_rgba(0,0,0,0.03),_-3px_33px_33px_0_rgba(0,0,0,0.06),_-1px_8px_18px_0_rgba(0,0,0,0.07)] w-fit max-w-full max-[555px]:flex-col max-[555px]:gap-[6px]"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >

          <div className="flex gap-[6px] w-fit max-[555px]:w-full">
            {FEATURE_TABS.slice(0, 2).map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border cursor-pointer transition-ease-out duration-200 max-[555px]:flex-1 max-[555px]:w-full ${
                    isActive ? 'bg-bg' : 'bg-white hover:bg-bg'
                  }`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}heroicons/${tab.icon}`}
                    alt=""
                    aria-hidden="true"
                    className={`w-[14px] h-[14px] ${isActive ? 'opacity-100' : 'opacity-54'}`}
                  />
                  <p className={`alt !text-[16px] ${isActive ? 'text-text!' : 'text-alt'}`}>{tab.label}</p>
                </button>
              )
            })}
          </div>
          <div className="flex gap-[6px] w-fit max-[555px]:w-full max-[555px]:mt-[6px]">
            {FEATURE_TABS.slice(2, 4).map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border cursor-pointer transition-ease-out duration-200 max-[555px]:flex-1 max-[555px]:w-full ${
                    isActive ? 'bg-bg' : 'bg-white hover:bg-bg'
                  }`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}heroicons/${tab.icon}`}
                    alt=""
                    aria-hidden="true"
                    className={`w-[14px] h-[14px] ${isActive ? 'opacity-100' : 'opacity-54'}`}
                  />
                  <p className={`alt !text-[16px] ${isActive ? 'text-text!' : 'text-alt'}`}>{tab.label}</p>
                </button>
              )
            })}
          </div>
        </motion.div>

     

        <div className="w-full flex min-h-[128px] items-center justify-center !mt-[64px] max-[1042px]:flex-col max-[1042px]:!mt-[52px] h-fit max-[1042px]:gap-[32px]">

          <motion.div
            className="w-full h-fit flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >

            <img src={`${import.meta.env.BASE_URL}heroicons/briefcase.svg`} alt="icon" className="w-[18px] h-[18px] mb-[6px]" />
            <p className="text-brands bentotitle">Brands</p>

            <p className="!mt-[16px] text-alt alt max-[650px]:!text-[16px] text-center max-w-[400px] max-[650px]:max-w-[290px] !leading-[150%]">{activeCopy.brands.description}</p>

          </motion.div>


          <motion.div
            className="w-px h-[128px] bg-[#D1D1D1] shadow-[0_1px_0_0_#FFF] max-[1042px]:h-[1px] max-[1042px]:shadow-[0_1px_0_0_#FFF] max-[1042px]:w-full max-w-[400px] max-[650px]:max-w-[300px]"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />


          <motion.div
            className="w-full h-fit flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >

            <img src={`${import.meta.env.BASE_URL}heroicons/camera.svg`} alt="icon" className="w-[18px] h-[18px] mb-[6px]" />
            <p className="text-creators bentotitle">Creators</p>

            <p className="!mt-[16px] text-alt alt max-[650px]:!text-[16px] text-center max-w-[400px] max-[650px]:max-w-[290px] !leading-[150%]">{activeCopy.creators.description}</p>
          </motion.div>

        </div>







    </section>



    <div className="h-[300vh]">

    </div>
    
    
    </div>
    
  )
}

export default Home
