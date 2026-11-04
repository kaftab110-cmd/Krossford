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
        aria-label={alt}
        className={
          fallbackClassName ??
          "flex h-full w-full items-center justify-center bg-zinc-800 text-center text-sm text-zinc-400"
        }
      >
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}