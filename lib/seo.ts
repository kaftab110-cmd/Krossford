import { Metadata } from "next";

const SITE_NAME = "Krossford";
const SITE_URL = "https://krossford.com";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

type SeoParams = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SeoParams): Metadata {
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${formattedPath}`;

  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [absoluteOgImage],
    },
  };
}