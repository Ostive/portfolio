import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { MouseParallax } from "../ui/MouseParallax";

export default Hero;

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <MouseParallax strength={15} className="flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight break-words relative"
            >
              <span className="block">RANDRIANOMENAJANAHARY </span>
              <span className="block text-gradient typing-cursor inline-block">Ostive</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 relative"
            >
              Engineering student passionate about development and innovation,
              specializing in creating modern web applications and software
              solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-row gap-4 justify-between md:justify-start"
            >
              <MagneticButton href="#projects" className="button-primary">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#contact" className="button-secondary">
                Contact Me
              </MagneticButton>
            </motion.div>
          </motion.div>
        </MouseParallax>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-[30px] h-[50px] rounded-3xl border-2 border-gray-500 flex justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
