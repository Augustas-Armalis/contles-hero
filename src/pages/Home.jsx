import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <div className="w-full flex flex-col items-center justify-center">


    <motion.nav 
      className="w-full fixed top-0 left-0 right-0 z-50 flex h-fit items-center justify-center !py-[8px] bg-bg/60 backdrop-blur-[16px] border-b border-white/50"
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

        <div className="flex items-center gap-[6px] justify-center">
          
          <button className="alt-small-button">
            <p className="small-button-text text-text">Log In</p>
          </button>

          <button className="small-button">
            <p className="small-button-text text-white">Join Today</p>
          </button>
        </div>



        <div className="absolute inset-0 flex items-center justify-center gap-[32px] pointer-events-none">
          <Link to="/" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Home</Link>
          <Link to="/brand" className="text-alt alt pointer-events-auto hover:!text-brands transition-ease-out duration-200">For Brands</Link>
          <Link to="/creator" className="text-alt alt pointer-events-auto hover:!text-creators transition-ease-out duration-200">For Creators</Link>
          <Link to="/blog" className="text-alt alt pointer-events-auto hover:!text-text transition-ease-out duration-200">Blog</Link>
        </div>

      </section>
    </motion.nav>


    <section className="w-full flex flex-col items-center justify-center max-w-[1100px] mx-auto">

      <motion.section 
        className="hero-section w-full flex justify-center items-center flex-col pt-[142px]! gap-[42px]"
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
            className="capitalize text-[52px] font-semibold tracking-[-7%] leading-[110%] text-text max-w-[450px] text-center"
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
            className="bigalt text-alt text-center max-w-[370px]"
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


      <div className="w-full flex items-center justify-center !mt-[100px] gap-[32px]">

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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/tesonet.svg`} 
              alt="Tesonet" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/unicorns.svg`} 
              alt="Unicorns" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/cannumo.svg`} 
              alt="Cannumo" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/surfshark.svg`} 
              alt="Surfshark" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/saily.svg`} 
              alt="Saily" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/tv3.svg`} 
              alt="TV3" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/brite.svg`} 
              alt="Brite" 
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
            <motion.img 
              src={`${import.meta.env.BASE_URL}logos/ism.svg`} 
              alt="ISM" 
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


          </motion.div>

      </div>



      <motion.div 
        className="w-full flex items-center justify-center rounded-[24px] border border-border !mt-[32px] aspect-[1100/500] overflow-hidden max-h-[500px] bg-[linear-gradient(266deg,_var(--Influencers,_#FC6262)_0%,_var(--Brands,_#5F0EEC)_100.19%)]  relative"
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
          delay: 1.2,
        }}
      >
        <img className="w-full h-full object-cover absolute top-0 left-0" src={`${import.meta.env.BASE_URL}assets/texture.png`} alt="Texture"/>


        <div className="w-fit h-fit flex absolute top-[58px] left-[58px] right-[58px] items-center justify-center !p-[6px] backdrop-blur-[28px] border border-white/20 bg-white/24 shadow-[inset_0_0_8.1px_0_rgba(255,255,255,0.14)] rounded-[17px]">
        
          <img src={`${import.meta.env.BASE_URL}product/projects.png`} alt="img" className="w-full h-auto object-cover rounded-[12px]" />


        </div>

      </motion.div>




        <div className="w-fit h-fit flex items-center justify-center gap-[6px] !mt-[14px] bg-white border border-border rounded-[14px] !p-[6px] shadow-[-20px_207px_58px_0_rgba(0,0,0,0),_-13px_133px_53px_0_rgba(0,0,0,0.01),_-7px_75px_45px_0_rgba(0,0,0,0.03),_-3px_33px_33px_0_rgba(0,0,0,0.06),_-1px_8px_18px_0_rgba(0,0,0,0.07)]">

          <button className="w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border bg-white cursor-pointer hover:bg-bg transition-ease-out duration-200">
            <img src={`${import.meta.env.BASE_URL}heroicons/search.svg`} alt="icon" className="w-[14px] h-[14px] opacity-54" />
            <p className="text-alt alt">Projects</p>
          </button>

          <button className="w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border bg-white cursor-pointer hover:bg-bg transition-ease-out duration-200">
            <img src={`${import.meta.env.BASE_URL}heroicons/chat.svg`} alt="icon" className="w-[14px] h-[14px] opacity-54" />
            <p className="text-alt alt">Collaborate</p>
          </button>

          <button className="w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border bg-white cursor-pointer hover:bg-bg transition-ease-out duration-200">
            <img src={`${import.meta.env.BASE_URL}heroicons/speaker.svg`} alt="icon" className="w-[14px] h-[14px] opacity-54" />
            <p className="text-alt alt">Campaigns</p>
          </button>

          <button className="w-fit h-fit flex items-center justify-center gap-[6px] !px-[14px] !py-[6px] rounded-[10px] border border-border bg-white cursor-pointer hover:bg-bg transition-ease-out duration-200">
            <img src={`${import.meta.env.BASE_URL}heroicons/wallet.svg`} alt="icon" className="w-[14px] h-[14px] opacity-54" />
            <p className="text-alt alt">Payments</p>
          </button>

        </div>


        <div className="w-full flex h-[128px] items-center justify-center !mt-[64px]">

          <div className="w-full h-fit flex flex-col items-center justify-center">

            <img src={`${import.meta.env.BASE_URL}heroicons/briefcase.svg`} alt="icon" className="w-[18px] h-[18px] mb-[6px]" />
            <p className="text-brands bentotitle">Brands</p>

            <p className="!mt-[16px] text-alt alt text-center max-w-[400px] !leading-[150%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in augue erat. Vivamus non leo in nunc lacinia</p>

          </div>


          <div className="w-px h-full bg-[#D1D1D1] shadow-[1px_0_0_0_#FFF]" />


          <div className="w-full h-fit flex flex-col items-center justify-center">

            <img src={`${import.meta.env.BASE_URL}heroicons/camera.svg`} alt="icon" className="w-[18px] h-[18px] mb-[6px]" />
            <p className="text-creators bentotitle">Creators</p>

            <p className="!mt-[16px] text-alt alt text-center max-w-[400px] !leading-[150%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in augue erat. Vivamus non leo in nunc lacinia</p>

          </div>




        </div>







    </section>



    <div className="h-[300vh]">

    </div>
    
    
    </div>
    
  )
}

export default Home
