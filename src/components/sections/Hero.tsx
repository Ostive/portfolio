import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "../ui/Link";

export default Hero;

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight break-words">
            <span className="block">RANDRIANOMENAJANAHARY </span>
            <span className="block text-gradient">Ostive</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12">
            Engineering student passionate about development and innovation,
            specializing in creating modern web applications and software
            solutions.
          </p>
          <motion.div
            className="flex flex-row gap-4 justify-between md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="#projects" className="button-primary ">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#contact" className="button-secondary">
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
