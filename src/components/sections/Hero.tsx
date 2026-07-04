import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "../ui/GlitchText";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm text-term-accent mb-6"
          >
            <span className="text-term-muted">$</span> whoami
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight break-words font-mono"
          >
            <span className="block">RANDRIANOMENAJANAHARY</span>
            <span className="block text-term-accent terminal-cursor">
              <GlitchText text="Ostive" />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-term-muted max-w-2xl mb-12 font-mono"
          >
            <span className="text-term-accent">{'// '}</span>
            Engineering student passionate about development and innovation,
            specializing in creating modern web applications and software
            solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-row gap-4 justify-between md:justify-start"
          >
            <a href="#projects" className="button-primary">
              view_projects <ArrowRight className="ml-1 h-4 w-4" />
            </a>
            <a href="#contact" className="button-secondary">
              contact_me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
