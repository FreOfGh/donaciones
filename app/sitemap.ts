import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fundacioncma.org";
  const locales = ["es", "en", "ja", "fr", "de", "it"];
  const routes = ["", "/about", "/blog", "/contact", "/legal", "/donatepage", "/privacy-policy"];
  const now = new Date();

  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}/${locale}${route}`])
    );

    return locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/donatepage" ? 0.9 : 0.8,
      alternates: {
        languages,
      },
    }));
  });
}