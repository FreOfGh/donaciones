import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import HeaderWithNav from "./components/Common/HeaderWithNav/HeaderWithNav";
import {routing} from "@/i18n/routing";
import DonationFooter from "@/app/[locale]/components/Donation/footer";
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <HeaderWithNav />
          {children}
          <DonationFooter />
          
        </NextIntlClientProvider>
      </body>
    </html>
  );
}