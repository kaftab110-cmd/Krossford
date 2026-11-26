"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = React.ComponentProps<typeof Image> & {
  fallbackClassName?: string;
};

export default function SafeImage({
  src,
  alt,
  fallbackClassName,
  ...props
}: SafeImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  if (hasError) {
    return (
      <div
        aria-label={alt || "Krossford Handcrafted Leather Product"}
        className={
          fallbackClassName ??
          "flex h-full w-full items-center justify-center bg-zinc-800 text-center text-sm text-zinc-400"
        }
      >
        KROSSFORD
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt || "Krossford Handcrafted Leather Product"}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}