import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DonationFooter() {
  const t = useTranslations("Common");

  const phone = t("CustomerService.ThelephoneNumber");
  const email = t("CustomerService.Email");

  return (
    <footer className="bg-[#2E2926] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo + Instagram */}
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/footer/logocma.jpeg"
                alt="Logo Fundación Centro Mariana de Alfabetización"
                width={180}
                height={60}
                className="h-28 w-auto"
              />

              <Link
                href="https://www.instagram.com/fundacioncma/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/svg/instagram.svg"
                  alt="Instagram"
                  width={34}
                  height={34}
                  className="transition-transform hover:scale-110"
                />
              </Link>
            </div>
          </div>

          {/* Servicio al cliente */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t("CustomerService.Title")}
            </h3>

            <div className="space-y-3 text-gray-300">

              <Link
                href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                target="_blank"
                className="flex items-center gap-3 hover:text-white"
              >
                <MessageCircle size={18} />
                <span>{phone}</span>
              </Link>

              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-3 hover:text-white break-all"
              >
                <Mail size={18} />
                <span>{email}</span>
              </Link>

            </div>
          </div>

          {/* Preguntas generales */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t("GeneralQuestions.Title")}
            </h3>

            <Link
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-gray-300 hover:text-white"
            >
              <Phone size={18} />
              <span>{phone}</span>
            </Link>
          </div>

          {/* Dirección */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t("Footer.Address.Title")}
            </h3>

            <div className="flex items-start gap-3 text-gray-300">
              <MapPin size={18} className="mt-1 shrink-0" />

              <span>
                {t("Footer.Address.FirstPiece")}
                <br />
                {t("Footer.Address.SecondPiece")}
              </span>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-gray-600" />

        <div className="flex flex-col gap-4 text-sm text-gray-300 md:flex-row md:items-center md:justify-between">

          <p>{t("Footer.Copyright")}</p>

          <Link
            href="/legal"
            className="underline hover:text-white"
          >
            Legal Notice
          </Link>

        </div>

      </div>
    </footer>
  );
}