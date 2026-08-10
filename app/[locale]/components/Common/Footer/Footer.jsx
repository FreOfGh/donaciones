import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DonationFooter() {
  return (
    <footer className="bg-[#2E2926] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Parte superior */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo el icono de instaram debe estar al lado del logo*/}
          <div>
            <Image
              src='/footer/logocma.jpeg'
              alt="Logo fundación centro mariana de alfabetización"
              width={180}
              height={20}
              className="mb-4 h-30 w-auto"
            />
            <div className="flex items-center gap-3">
              <Link
                href="https://www.instagram.com/fundacioncma/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
              <Image
                src='/svg/instagram.svg'
                alt="Instagram"
                width={40}
                height={40}
              />

              </Link>
            </div>
          </div>

          {/* Atención */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Customer service
            </h3>

            <div className="space-y-3 text-gray-300">

              <div className="flex items-center gap-3">
                <MessageCircle size={18} />
                <span>+57 310 829 8815</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>centro.marianadealfabetizacion@gmail.com</span>
              </div>

            </div>
          </div>

          {/* Consultas */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              general questions
            </h3>

            <div className="flex items-center gap-3 text-gray-300">
              <Phone size={18} />
              <span>+57 310 829 8815</span>
            </div>
          </div>

          {/* Dirección */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Address:
            </h3>

            <div className="flex items-start gap-3 text-gray-300">
              <MapPin size={18} className="mt-1" />

              <span>
                Finca 156
                <br />
                Vereda La Esmeralda, Marinilla, Antioquia, Colombia
              </span>
            </div>
          </div>
        </div>

        {/* Línea */}
        <div className="my-10 border-t border-gray-600" />

        {/* Parte inferior con icono de instagram*/}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-gray-300 text-sm">

            ©2026 Fundación Centro Mariana de Alfabetización - All rights reserved |

            <Link
              href="/legal"
              className="ml-2 underline hover:text-white"
            >
              Legal Notice
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}