import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const LOGOS = [
  { name: 'tesonet', alt: 'Tesonet' },
  { name: 'chazz', alt: 'Chazz' },
  { name: 'cannumo', alt: 'Cannumo' },
  { name: 'surfshark', alt: 'Surfshark' },
  { name: 'brite', alt: 'Brite' },
  { name: 'unicorns', alt: 'Unicorns' },
  { name: 'tv3', alt: 'TV3' },
  { name: 'saily', alt: 'Saily' },
  { name: 'ism', alt: 'ISM' },
]

const HERO_PREVIEW_IMAGES = [
  'product/1.webp',
  'product/2.webp',
  'product/3.webp',
  'product/4.webp',
  'product/5.webp',
  'product/6.webp',
  'product/7.webp',
  'product/8.webp',
  'product/9.webp',
  'product/10.webp',
  'product/11.webp',
  'product/12.webp'
]

const HERO_PREVIEW_INITIAL_DELAY_MS = 3000
const HERO_PREVIEW_HOLD_MS = 700
const HERO_PREVIEW_FADE_MS = 700

const LOGO_CAROUSEL_SPEED_PX_PER_SEC = 67

const FEATURE_TABS = [
  { id: 'projects', label: 'Projects', icon: 'search.svg' },
  { id: 'collaborate', label: 'Collaborate', icon: 'chat.svg' },
  { id: 'campaigns', label: 'Campaigns', icon: 'speaker.svg' },
  { id: 'payments', label: 'Payments', icon: 'wallet.svg' },
]

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

const COMPARISON_ROW_LABELS = [
  'Buy real results',
  'Clear goals upfront',
  'Verified creators & brands',
  'Performance tracking',
  'Secure payments',
  'Direct collaboration',
  'On-platform chat',
  'UGC & product send',
  'Campaigns & direct work',
  'Creator & brand search',
  'Scales without overhaed',
]

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
  const [heroPreviewBaseIndex, setHeroPreviewBaseIndex] = useState(0)
  const [heroPreviewOverlayIndex, setHeroPreviewOverlayIndex] = useState(null)
  const heroPreviewHasStartedRef = useRef(false)
  const heroPreviewQueueRef = useRef([])
  const activeCopy = FEATURE_COPY[activeTab] ?? FEATURE_COPY.projects
  const burgerLottieRef = useRef(null)
  const burgerTotalFramesRef = useRef(0)
  const burgerHalfFrameRef = useRef(0)
  const burgerStageRef = useRef(0)
  const burgerNeedsResetRef = useRef(false)
  const burgerInstanceRef = useRef(null)
  const burgerCleanupRef = useRef(null)

  const BURGER_PLAYBACK_SPEED = 2
  const FAQ_EASE = [0.16, 1, 0.3, 1]

  const [faqLoading, setFaqLoading] = useState(true)
  const [faqItems, setFaqItems] = useState([])
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    async function loadFaq() {
      setFaqLoading(true)

      const fallbackFaq = [
        {
          id: 'small-or-big',
          question: 'Is Contles for small brands or only big companies?',
          answer:
            'Contles is built for brands of all sizes that want to work with creators without agencies, chaos, or unnecessary risk, and manage everything in one place.',
        },
        {
          id: 'budget',
          question: 'Do I need a big budget to use Contles?',
          answer:
            'No. You control the budget. You can work with individual creators or run campaigns at any scale.',
        },
        {
          id: 'followers',
          question: 'Is this only for influencers with lots of followers?',
          answer:
            'No. Contles supports UGC creators, influencers, and mixed creators, where quality of work matters more than follower count. We encourage new creators to start their career here!',
        },
        {
          id: 'dms',
          question: 'How is this safer than working through DMs?',
          answer:
            'Everything happens in one place - communication, files, product sending, and payments. Payments are handled through Contles, keeping collaborations structured and protected.',
        },
        {
          id: 'disappears',
          question: 'What happens if someone doesn’t deliver or disappears?',
          answer:
            'Clear requirements are set upfront. If the work isn’t delivered as agreed, payouts are not released.',
        },
        {
          id: 'direct',
          question: 'Can I work with creators directly, not only through campaigns?',
          answer:
            'Yes. You can collaborate 1:1 with creators or run campaigns. Both are supported.',
        },
        {
          id: 'products',
          question: 'Can brands send products and get UGC safely?',
          answer:
            'Yes. Product sending and UGC delivery are managed inside Contles, with tracking and confirmation on both sides.',
        },
        {
          id: 'upfront',
          question: 'Do creators get paid upfront?',
          answer:
            'Yes. For direct projects, brands pay upfront. Payments are handled securely through Contles so both sides are protected.',
        },
        {
          id: 'long-term',
          question: 'Is Contles good for long-term creator work?',
          answer:
            'Yes. You can easily manage one-off projects or ongoing collaborations with multiple creators.',
        },
        {
          id: 'browse',
          question: 'Do I need to pay just to browse creators or brands?',
          answer:
            'No. Discovery is free. You only pay when actual work starts.',
        },
      ]

      try {
        // No backend hooked up yet — use fallback.
        setFaqItems(fallbackFaq)
      } finally {
        // Small delay so the loading state can be seen (optional).
        window.setTimeout(() => setFaqLoading(false), 150)
      }
    }

    loadFaq()
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      if (typeof window !== 'undefined' && window.lenisInstance?.start) {
        window.lenisInstance.start()
      }
      document.body.style.overflow = ''
      return
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

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

  useEffect(() => {
    const len = HERO_PREVIEW_IMAGES.length
    if (len <= 1) return

    let holdTimer = 0
    let swapTimer = 0
    let cancelled = false

    const shuffle = (arr) => {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }

    const getNextIndex = () => {

      if (heroPreviewBaseIndex === 0) {

        if (heroPreviewQueueRef.current.length === 0) {
          heroPreviewQueueRef.current = shuffle(
            Array.from({ length: len }, (_, i) => i).slice(1)
          )
        }
        return heroPreviewQueueRef.current.shift()
      }

      if (heroPreviewQueueRef.current.length > 0) {
        return heroPreviewQueueRef.current.shift()
      }

      return 0
    }

    const holdMs = heroPreviewHasStartedRef.current
      ? HERO_PREVIEW_HOLD_MS
      : HERO_PREVIEW_INITIAL_DELAY_MS

    holdTimer = window.setTimeout(() => {
      if (cancelled) return
      heroPreviewHasStartedRef.current = true
      const next = getNextIndex()
      setHeroPreviewOverlayIndex(next)

      swapTimer = window.setTimeout(() => {
        if (cancelled) return
        setHeroPreviewBaseIndex(next)
        setHeroPreviewOverlayIndex(null)
      }, HERO_PREVIEW_FADE_MS)
    }, holdMs)

    return () => {
      cancelled = true
      window.clearTimeout(holdTimer)
      window.clearTimeout(swapTimer)
    }
  }, [heroPreviewBaseIndex])

  return (








    <div className="w-full flex flex-col items-center justify-center overflow-x-hidden !pb-[32px]">


    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.section
          className="w-full h-[200vh] fixed top-0 left-0 right-0 bottom-0 bg-bg backdrop-blur-[16px] z-[5000]"
          initial={{ opacity: 0, filter: 'blur(18px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <section className="w-full h-[100vh] absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-between !pt-[52px]">

              <div className="w-full h-fit flex flex-col items-start justify-center">
                <Link to="https://www.contles.com" className="w-full h-fit !py-[16px] flex flex-col items-start justify-center !px-[14px] border-b border-border border-t">
                  <p  className="!text-text alt !text-[24px]">Home</p>
                </Link>
                <Link to="https://www.join.contles.com" className="w-full h-fit !py-[16px] flex flex-col items-start justify-center !px-[14px] border-b border-border">
                  <p  className="!text-text alt !text-[24px]">For Brands</p>
                </Link>
                <Link to="https://www.join.contles.com" className="w-full h-fit !py-[16px] flex flex-col items-start justify-center !px-[14px] border-b border-border">
                  <p  className="!text-text alt !text-[24px]">For Creators</p>
                </Link>
                <Link to="https://www.join.contles.com" className="w-full h-fit !py-[16px] flex flex-col items-start justify-center !px-[14px] border-b border-border">
                  <p  className="!text-text alt !text-[24px]">Blog</p>
                </Link>
                
                
              </div>


              <div className="w-full h-fit !py-[18px] !px-[14px] flex flex-col items-center justify-center border-t border-border">

              <Link to="/contact" className="alt-small-button !w-full !py-[8px] !px-[14px] !rounded-[12px]">
            <p className="small-button-text text-text !text-[18px]">Contact</p>
              </Link>
                
              </div>



            </div>
          </section>
        </motion.section>
      )}
    </AnimatePresence>


    <motion.nav 
      className="w-full fixed top-0 left-0 right-0 z-[5100] flex h-fit min-h-[50px] items-center justify-center !py-[8px] !px-[16px] max-[1132px]:!px-[12px] max-[650px]:!py-[6px] bg-bg/80 backdrop-blur-[16px]"
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

        <Link to="https://www.contles.com"><img src={`${import.meta.env.BASE_URL}branding/logo.svg`} alt="Contles" className="w-auto h-[24px]" /></Link>

        <div className="flex items-center gap-[6px] justify-center max-[800px]:hidden right-0">
          
          <Link to="/contact" className="alt-small-button">
            <p className="small-button-text text-text">Contact</p>
          </Link>

          <Link to="https://www.join.contles.com" className="small-button ">
            <p className="small-button-text text-white">Join Today</p>
          </Link>
        </div>



        <div className="flex items-center gap-[6px] justify-center !hidden max-[800px]:!flex">
          <Link to="https://www.join.contles.com" className="small-button !py-[6px] !px-[12px] !rounded-[10px] ">
              <p className="small-button-text text-white !text-[15px] !tracking-[-1%]">Join Today</p>
          </Link>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              const willOpen = !isMobileMenuOpen
              setIsMobileMenuOpen(willOpen)

              const player = burgerLottieRef.current
              if (!player) return

              if (!burgerTotalFramesRef.current && player.totalFrames) {
                burgerTotalFramesRef.current = player.totalFrames
                burgerHalfFrameRef.current = Math.floor(player.totalFrames / 2)
              }

              const total = burgerTotalFramesRef.current
              const half = burgerHalfFrameRef.current
              if (!total || !half) {
                player.setLoop?.(false)
                player.setSpeed?.(BURGER_PLAYBACK_SPEED)
                player.play?.()
                return
              }

              player.setLoop?.(false)
              player.setSpeed?.(BURGER_PLAYBACK_SPEED)

              if (willOpen) {
                if (burgerNeedsResetRef.current) {
                  player.stop?.()
                  burgerNeedsResetRef.current = false
                }
                burgerStageRef.current = 0
                player.setSegment?.(0, half)
                player.setFrame?.(0)
                player.play?.()
              } else {
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
                syncFrames()
                dotLottie.addEventListener?.('complete', onComplete)

                burgerCleanupRef.current = () => {
                  dotLottie.removeEventListener?.('load', syncFrames)
                  dotLottie.removeEventListener?.('ready', syncFrames)
                  dotLottie.removeEventListener?.('complete', onComplete)
                }
              }}
              style={{
                width: '28px',
                height: '28px',
              }}
              width={28}
              height={28}
              layout={{ fit: 'cover', align: [0.5, 0.5] }}
            />
          </button>
        </div>

        



        <div className="absolute inset-0 flex items-center justify-center gap-[32px] pointer-events-none max-[800px]:hidden">
          <Link to="https://www.contles.com" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Home</Link>
          <Link to="https://www.join.contles.com" className="text-alt alt pointer-events-auto hover:!text-brands transition-ease-out duration-200">For Brands</Link>
          <Link to="https://www.join.contles.com" className="text-alt alt pointer-events-auto hover:!text-creators transition-ease-out duration-200">For Creators</Link>
          <Link to="https://www.join.contles.com" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Blog</Link>
        </div>

      </section>
    </motion.nav>


    <section className="w-full flex flex-col items-center justify-center max-w-[1136px] !px-[16px] max-[1132px]:!px-[12px]">

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

        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              filter: 'blur(20px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.9,
              },
            },
          }}
          style={{
            willChange: 'transform, opacity, filter',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <Link to="https://www.join.contles.com" className="big-button">
            <p className="button-text text-white">Start Marketing</p>
          </Link>
        </motion.div>

      </motion.section>


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
                src={`${import.meta.env.BASE_URL}logos/${logo.name}.png`} 
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
        
          <div className="w-full grid">
            <img
              src={`${import.meta.env.BASE_URL}${HERO_PREVIEW_IMAGES[heroPreviewBaseIndex]}`}
              alt="Product preview"
              className="w-full h-auto object-cover rounded-[12px] max-[690px]:rounded-[8px] col-start-1 row-start-1"
            />

            {heroPreviewOverlayIndex !== null && (
              <motion.img
                key={HERO_PREVIEW_IMAGES[heroPreviewOverlayIndex]}
                src={`${import.meta.env.BASE_URL}${HERO_PREVIEW_IMAGES[heroPreviewOverlayIndex]}`}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-cover rounded-[12px] max-[690px]:rounded-[8px] col-start-1 row-start-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: HERO_PREVIEW_FADE_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </div>


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



        <section className="w-full flex flex-col items-center justify-center !mt-[192px] max-[650px]:!mt-[142px]">

          <motion.p
            className="title !mb-[52px] w-fit text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Buy results, not promises
          </motion.p>

          <div className="w-full flex flex-wrap items-center justify-center gap-[10px]">

            <motion.div
              className=" w-full h-full max-w-[360px] max-h-[330px] aspect-[360/330] bg-white rounded-[14px] border border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0" src={`${import.meta.env.BASE_URL}bento/first.webp`}></img>
              <div className="absolute left-[16px] bottom-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-text">Define success</p>
                <p className="alt text-alt max-w-[220px] !leading-[140%]">Set clear goals, milestones, and KPIs. All in one place</p>
              </div>
            </motion.div>

            <motion.div
              className=" w-full h-full max-w-[360px] max-h-[330px] aspect-[360/330] bg-white rounded-[14px] border border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0" src={`${import.meta.env.BASE_URL}bento/second.webp`}></img>
              <div className="absolute left-[16px] bottom-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-text">Creators execute</p>
                <p className="alt text-alt max-w-[240px] !leading-[140%]">Verified creators join and deliver based on the agreed terms</p>
              </div>
            </motion.div>

            <motion.div
              className=" w-full h-full max-w-[360px] max-h-[330px] aspect-[360/330] bg-white rounded-[14px] border border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0" src={`${import.meta.env.BASE_URL}bento/third.webp`}></img>
              <div className="absolute left-[16px] bottom-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-text">Pay when it works</p>
                <p className="alt text-alt max-w-[220px] !leading-[140%]">Funds are released only when the defined results are met</p>
              </div>
            </motion.div>


            

          </div>



        </section>






    </section>





      <section className="w-full flex flex-col items-center justify-center !mt-[192px] bg-black !pb-[164px] !pt-[128px] max-[760px]:!mt-[124px] max-[760px]:!pt-[84px] max-[760px]:!pb-[124px]">

        <section className="w-full flex flex-col items-center justify-center max-w-[1136px] !px-[16px] max-[1132px]:!px-[12px] gap-[10px]">


          <motion.p
            className="title !mb-[52px] w-fit text-center !text-white"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
            How Contles works
            </motion.p>




            <div className="w-full flex flex-wrap items-center justify-center gap-[10px]">

            <motion.div
              className=" w-full h-full max-w-[656px] max-h-[330px] aspect-[656/330] max-[1056px]:!aspect-[360/330] max-[1138px]:!aspect-[434/330] max-[1138px]:max-w-[434px] max-[1056px]:max-w-[360px] bg-[#0F0F0F] rounded-[14px] border border-[#1B1B1B] relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0 max-[1138px]:hidden" src={`${import.meta.env.BASE_URL}bento/fourth.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1138px]:flex max-[1056px]:hidden" src={`${import.meta.env.BASE_URL}bento/fourthmedium.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1056px]:flex" src={`${import.meta.env.BASE_URL}bento/fourthsmall.webp`}></img>


              <div className="absolute left-[16px] top-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-white">Free discovery</p>
                <p className="alt text-alt !leading-[140%] max-[1138px]:!max-w-[220px]">Explore creators, campaigns and brands without paywalls</p>
              </div>
            </motion.div>

            <motion.div
              className=" w-full h-full max-w-[434px] max-h-[330px] aspect-[434/330] max-[1056px]:!aspect-[360/330] max-[1056px]:max-w-[360px]  bg-[#0F0F0F] rounded-[14px] border border-[#1B1B1B] relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0 max-[1056px]:hidden" src={`${import.meta.env.BASE_URL}bento/fifth.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1056px]:flex" src={`${import.meta.env.BASE_URL}bento/fifthsmall.webp`}></img>
              <div className="absolute left-[16px] top-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-white">Verified creators</p>
                <p className="alt text-alt !leading-[140%]">Real portfolios, work history, and ratings</p>
              </div>
            </motion.div>
            

          </div>


          <div className="w-full flex flex-wrap items-center justify-center gap-[10px]">

            <motion.div
              className=" w-full h-full max-w-[434px] max-h-[330px] aspect-[434/330] max-[1056px]:!aspect-[360/330] max-[1056px]:max-w-[360px] bg-[#0F0F0F] rounded-[14px] border border-[#1B1B1B] relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0 max-[1056px]:hidden" src={`${import.meta.env.BASE_URL}bento/sixth.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1056px]:flex" src={`${import.meta.env.BASE_URL}bento/sixthsmall.webp`}></img>
              <div className="absolute left-[16px] top-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-white">Secure payments</p>
                <p className="alt text-alt !leading-[140%]">Handled inside the platform, not DMs</p>
              </div>
            </motion.div>


            <motion.div
              className=" w-full h-full max-w-[656px] max-h-[330px] aspect-[656/330] max-[1056px]:!aspect-[360/330] max-[1138px]:!aspect-[434/330] max-[1138px]:max-w-[434px] max-[1056px]:max-w-[360px] bg-[#0F0F0F] rounded-[14px] border border-[#1B1B1B] relative overflow-hidden"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img className="absolute w-full h-auto object-cover top-0 left-0 max-[1138px]:hidden" src={`${import.meta.env.BASE_URL}bento/seventh.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1138px]:flex max-[1056px]:hidden" src={`${import.meta.env.BASE_URL}bento/seventhmedium.webp`}></img>
              <img className="absolute w-full h-auto object-cover top-0 left-0 hidden max-[1056px]:flex" src={`${import.meta.env.BASE_URL}bento/seventhsmall.webp`}></img>

              <div className="absolute left-[16px] top-[16px] flex flex-col items-start justify-center gap-[8px]">
                <p className="bentotitle text-white">Work directly</p>
                <p className="alt text-alt !leading-[140%] max-[1138px]:!max-w-[220px]">Manage creator work, files, send products in one place</p>
              </div>
            </motion.div>
            

          </div>





        </section>

        

      </section>








      <section className="relative w-full h-fit max-w-[1132px] flex items-center justify-between !px-[16px] max-[1132px]:!px-[12px]">
        <section className="w-full flex flex-col items-center justify-center !mt-[164px] max-[760px]:!mt-[92px]">
          <motion.p
            className="title  w-fit text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            How are we different
          </motion.p>

          <img src={`${import.meta.env.BASE_URL}heroicons/vertical.svg`} alt="alert" className="w-auto h-[20px] !mt-[8px] hidden max-[630px]:flex" />

          <motion.div className="w-full !mt-[52px] max-[630px]:!mt-[42px] h-fit flex flex-row items-center justify-between max-[945px]:overflow-x-auto nice-scrollbar"
          
          
          
initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
viewport={{ once: true, amount: 0 }}
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}


>
            <div className="w-fit flex flex-shrink-0 flex flex-col">
              <div className="w-full h-[64px]"></div>



              <div className="w-full h-[52px] !py-[16px] border-b border-t border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Buy real results
                </p>
              </div>

              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Clear goals upfront
                </p>
              </div>


              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                  Verified creators & brands
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Performance tracking
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Secure payments
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Direct collaboration
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                On-platform chat
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                UGC & product send
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Campaigns & direct work
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Creator & brand search
                </p>
              </div>
              <div className="w-full h-[52px] !py-[16px] border-b border-border">
                <p className="alt text-alt max-[945px]:!text-[14px] !mr-[14px]">
                Scales without overhaed
                </p>
              </div>
              <div className="w-full h-[14px]">
                
              </div>






            </div>

            <div className="w-full !py-[16px] min-w-[64px] flex flex-col">
              <div className="w-full border-t border-r border-l  flex items-center justify-center border-border rounded-t-[16px] h-[64px] bg-white ">
                <img
                  src={`${import.meta.env.BASE_URL}branding/logo.svg`}
                  alt="logo"
                  className="w-auto h-[24px] max-[945px]:hidden"
                />
                <img
                  src={`${import.meta.env.BASE_URL}branding/icon.svg`}
                  alt="logo"
                  className="w-auto h-[24px] hidden max-[945px]:flex"
                />
              </div>




              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Yes</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Always</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Yes</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Built-in</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Built-in</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Built-in</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Yes</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Built-in</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Both</p>
              </div>

              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Free & verified</p>
              </div>
              <div className="w-full h-fit !py-[16px] !px-[16px] border-l border-r border-border bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/check.svg`}
                  alt="check"
                  className="w-auto h-[20px] "
                />
                <p className="alt !text-text max-[945px]:hidden">Yes</p>
              </div>


              <div className="w-full h-[14px] border-l border-r border-border border-b rounded-b-[16px] bg-white gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                
              </div>






            </div>

            











            <div className="w-full min-w-[120px] !py-[16px] flex flex-col">
              <div className="w-full !px-[16px] flex items-center justify-center h-[64px]">
                <p className="alt !text-[18px] text-alt max-[945px]:!text-[16px]">
                Competitors
                </p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b border-t border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Flat fees</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Sometimes</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Mixed</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Limited</p>
              </div>
              <div className="w-full h-fit !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Platform rules</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Limited</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Basic</p>
              </div>


              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Only campaigns</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Often paid</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Limited</p>
              </div>

              <div className="w-full h-[12px]">
                
              </div>




            </div>






            <div className="w-full !py-[16px] flex flex-col min-w-[120px]">
              <div className="w-full !px-[16px] flex items-center justify-center h-[64px]">
                <p className="alt !text-[18px] text-alt max-[945px]:!text-[16px]">
                  Agencies
                </p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b border-t border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Retainers</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Depends</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Curated</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Reported</p>
              </div>
              <div className="w-full h-fit !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Contracts</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Managed</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No</p>
              </div>


              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/alert.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Manual</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Managed</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Expensive</p>
              </div>

              <div className="w-full h-[12px]">
                
              </div>




            </div>







            <div className="w-full min-w-[120px] !py-[16px] flex flex-col">
              <div className="w-full !px-[16px] flex items-center justify-center h-[64px]">
                <p className="alt !text-[18px] text-alt max-[945px]:!text-[16px]">
                DMs/manual
                </p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b border-t border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No guarantees</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Rarely</p>
              </div>


              
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">None</p>
              </div>
              <div className="w-full h-fit !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Too risky</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Messy</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Scattered</p>
              </div>


              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Manual</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Manual</p>
              </div>
              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">No</p>
              </div>

              <div className="w-full h-[52px] !py-[16px] !px-[16px] border-b  border-border  gap-[8px] flex items-center justify-start max-[945px]:justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}heroicons/x.svg`}
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="alt max-[945px]:hidden">Time-heavy</p>
              </div>

              <div className="w-full h-[12px]">
                
              </div>




            </div>







          </motion.div>
        </section>
      </section>





          {/* <section className="w-full flex flex-col items-center justify-center !mt-[164px] max-[760px]:!mt-[124px]"> */}
          <section className="w-full flex flex-col items-center justify-center !mt-[164px] max-[760px]:!mt-[92px]">


          {/* FAQ */}
          <div
            id="faq"
            className="w-full max-w-[1136px] !px-[16px] max-[1132px]:!px-[12px] flex flex-col items-center justify-center mt-[136px] max-[460px]:mt-[112px] gap-[10px] scroll-mt-[200px]"
          >
            <motion.p
            className="title !mb-[52px] w-fit text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Common Questions
            <p className="alt text-alt normal-case max-w-[560px] !pt-[14px]">
              If you have more - write to us{' '}
              <span className="text-text  lowercase">hello@contles.com</span>
            </p>
          </motion.p>
            
            <div className="w-full flex flex-col max-w-[750px] w-full">
              {(faqLoading ? Array.from({ length: 5 }) : faqItems).map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <motion.div key={item?.id ?? idx} className="max-w-[750px] w-full"
                  
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              
              
              >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="max-w-[750px] w-full flex items-center justify-between gap-[12px] !py-[16px] group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <p
                        className="alt !text-text !text-[18px] max-[460px]:!text-[16px] !leading-[150%] text-left group-hover:underline underline-offset-[3px] alt !text-start"
                      >
                        {faqLoading ? 'Loading…' : item.question}
                      </p>
                      <span className="ml-[12px] shrink-0 text-alt">
                        <motion.svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.28, ease: FAQ_EASE }}
                        >
                          <motion.path
                            d="M10 4v12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            animate={{ scaleY: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.28, ease: FAQ_EASE }}
                            style={{ originY: 0.5, originX: 0.5 }}
                          />
                          <path
                            d="M4 10h12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      transition={{ type: 'tween', ease: FAQ_EASE, duration: 0.35 }}
                      className="grid"
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -4 }}
                          transition={{ duration: 0.28, ease: FAQ_EASE }}
                          className=" !pb-[16px]"
                          aria-hidden={!isOpen}
                        >
                          <p className="alt text-alt text-left max-[460px]:!text-[16px] !leading-[150%]">
                            {faqLoading ? '' : item.answer}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {idx < (faqLoading ? 5 : faqItems.length) - 1 && (
                      <div className="w-full h-px bg-border my-[8px]" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          </section>




          <section className="w-full flex flex-col items-center justify-center !mt-[164px] max-[760px]:!mt-[124px]">

<section className="w-full flex flex-col items-center justify-center max-w-[1136px] !px-[16px] max-[1132px]:!px-[12px]">
  


          <motion.div 
        className="w-full flex items-center justify-center rounded-[24px] border border-border !h-fit overflow-hidden bg-[linear-gradient(266deg,_var(--Influencers,_#FC6262)_0%,_var(--Brands,_#5F0EEC)_100.19%)]  relative max-[690px]:rounded-[16px]"
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.17 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >

<div className="w-full flex items-center justify-center flex-col z-20 !mt-[36px] max-[652px]:!mt-[42px] !px-[32px]">
  <div className="w-[78px] h-[78px] flex items-center justify-center shadow-[0_10px_22.5px_-3px_rgba(0,0,0,0.25),10px_-4px_7px_-8px_rgba(191,76,163,0.25)_inset,0_-13px_7px_-8px_rgba(191,76,163,0.25)_inset,-10px_-4px_7px_-8px_rgba(191,76,163,0.25)_inset] bg-white rounded-[19px]">

    <img src={`${import.meta.env.BASE_URL}branding/icon.svg`} alt="icon" className="w-[40px] h-[40px]" />


  </div>


  <p className="title w-fit text-center text-white !mt-[24px] !mb-[18px]">Creator marketing Reimagined</p>


  <Link to="https://www.join.contles.com" className="big-button !mb-[42px] max-[652px]:!mb-[52px] max-[652px]:!mt-[12px]">
            <p className="button-text text-white">Start For Free</p>
        </Link>


          <div className="w-fit max-[652px]:hidden h-fit flex flex top-[290px] max-[690px]:left-[18px] max-[690px]:right-[18px] max-[690px]:top-[18px] max-[1132px]:left-[48px] max-[1132px]:right-[48px] max-[1132px]:top-[42px] items-center justify-center !p-[6px] max-[690px]:!p-[4px] backdrop-blur-[28px] border border-white/20 !pb-[0px] bg-white/24 shadow-[inset_0_0_8.1px_0_rgba(255,255,255,0.14)] rounded-t-[17px] rounded-b-[0px] max-[690px]:rounded-t-[12px] rounded-b-[0px] border-b-0 overflow-hidden ">
        
        <div
          className="w-full grid"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 100px), rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 100px), rgba(0,0,0,0) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}product/smallis.png`}
            alt="Product preview"
            className="w-full h-auto object-cover rounded-[12px] rounded-b-[0px] max-[690px]:rounded-[8px] col-start-1 row-start-1"
          />
        </div>


      </div>
</div>



        <img className="w-full h-full object-cover absolute top-0 left-0" src={`${import.meta.env.BASE_URL}assets/texture.png`} alt="Texture"/>



      </motion.div>


      <div className="w-full h-fit flex items-center justify-between !mt-[18px] flex-row max-[580px]:flex-col max-[580px]:gap-[12px]">

        <motion.div 
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-[24px] w-fit">
          <p className="alt text-alt opacity-70">2026 © Contles</p>
          <div className="w-px h-[24px] bg-[#D1D1D1] shadow-[1px_0_0_0_#FFF]" />
          <Link className="alt text-alt hover:!text-text transition-ease-out duration-200 opacity-70" to="/terms">Terms</Link>
          <Link className="alt text-alt hover:!text-text transition-ease-out duration-200 opacity-70" to="/privacy">Privacy</Link>
        </motion.div>


          <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-[10px] w-fit">
        <p className="alt text-alt opacity-70">Follow us on</p>
        <div className="flex items-center justify-center gap-[6px] w-fit">
          <Link to="https://www.instagram.com/trycontles/" target="_blank" className="hover:opacity-80 transition-ease-out duration-200"><img src={`${import.meta.env.BASE_URL}heroicons/color-instagram.png`} alt="Instagram" className="w-[24px] h-[24px]" /></Link>
          <Link to="https://www.tiktok.com/@trycontles" target="_blank" className="hover:opacity-80 transition-ease-out duration-200"><img src={`${import.meta.env.BASE_URL}heroicons/color-tiktok.png`} alt="TikTok" className="w-[24px] h-[24px]" /></Link>
          <Link to="https://www.linkedin.com/company/contles/" target="_blank" className="hover:opacity-80 transition-ease-out duration-200"><img src={`${import.meta.env.BASE_URL}heroicons/color-linkedin.png`} alt="LinkedIn" className="w-[24px] h-[24px]" /></Link>
          <Link to="https://x.com/trycontles" target="_blank" className="hover:opacity-80 transition-ease-out duration-200"><img src={`${import.meta.env.BASE_URL}heroicons/color-twitter.png`} alt="X" className="w-[24px] h-[24px]" /></Link>
          <Link to="https://www.facebook.com/profile.php?id=61585310110358" target="_blank" className="hover:opacity-80 transition-ease-out duration-200"><img src={`${import.meta.env.BASE_URL}heroicons/color-facebook.png`} alt="Facebook" className="w-[24px] h-[24px]" /></Link>
        </div>
        </motion.div>
          


        </div>

</section>




</section>
    






    
    
    </div>
    
  )
}

export default Home
