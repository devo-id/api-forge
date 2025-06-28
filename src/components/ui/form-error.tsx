"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          className="text-sm text-destructive"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
