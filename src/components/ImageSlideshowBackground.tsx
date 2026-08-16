"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ImageSlideshowBackground({
  images,
}: {
  images: string[];
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-navy">
      <div className="grid h-full grid-cols-2 sm:grid-cols-4">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: i * 0.35, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              priority={i === 0}
              className="object-cover object-top"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/20 to-navy/70" />
    </div>
  );
}
