import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "ja", "fr", "de", "it"],
  defaultLocale: "en"
});