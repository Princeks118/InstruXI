import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MediaProgressBarcomponent({ isMediaUploading, progress }) {
  const [showProgress, setShowProgress] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isMediaUploading) {
      setShowProgress(true);
      const timeout = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100); // delay for smooth animation

      return () => clearTimeout(timeout);
    } else {
      setAnimatedProgress(0);
      setShowProgress(false);
    }
  }, [isMediaUploading, progress]);

  if (!showProgress) return null;

  return (
    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden my-2">
      <motion.div
        className="h-full bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${animatedProgress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}


