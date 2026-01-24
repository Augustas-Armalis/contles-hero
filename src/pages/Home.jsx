import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <>


    <div>

      <motion.section 
        className="w-full flex justify-center items-center flex-col pt-[142px]! gap-[42px]"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
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





    </div>
    
    
    </>
    
  )
}

export default Home
