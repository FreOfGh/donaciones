import Image from "next/image";
import DonationCard from "./DonationCard";
export default function Hero() {
  return (
    <section id="donate-hero"className="relative h-screen">
  {/* Fondo */}
  <Image
    src="/hero/principal.jpg"
    alt="Comunidad reunida en las instalaciones de la fundación"
    fill
    priority
    className="object-cover"
  />

  {/* Oscurecer fondo */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Contenido encima */}
  <div className="relative z-10 flex h-full">

    {/* Lado izquierdo */}
    <div className="flex-1 relative">

      <div className="absolute top-8 left-8">
        <Image
          src="/logocma.jpeg"
          alt="Logo CMA"
          width={180}
          height={70}
        />
      </div>

      <div className="absolute bottom-24 left-12 bg-sky-500 px-6 py-4">
        <h1 className="text-5xl text-white font-light leading-tight">
          Donate to the CMA Foundation
          <br />
          and help bring education
          <br />
          to the most vulnerable children.
        </h1>
      </div>

    </div>

    {/* Lado derecho */}
    <div className="w-[520px] flex items-center justify-center p-8">
      <DonationCard />
    </div>

  </div>
</section>
  );
}