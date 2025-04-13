import { motion } from 'framer-motion';
import skipQuLogo from '../assets/skipqu-logo.png';

export const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#00C4CC] flex flex-col items-center justify-between py-20 font-sf"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        className="flex-grow flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1.2, 1]
          }}
          transition={{ duration: 1, times: [0, 0.2, 0.8, 1] }}
          className="inline-block"
        >
          <img
            src={skipQuLogo}
            alt="SkipQu Logo"
            className="mx-auto filter invert brightness-0"
          />
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white text-3xl font-bold text-center">
        SkipQu
      </motion.h1>
    </motion.div>
  );
};