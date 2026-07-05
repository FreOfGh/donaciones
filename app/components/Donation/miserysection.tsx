import Image from "next/image";
import Link from "next/link";

export default function DonationCTA() {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Text */}
          <div className="max-w-2xl">

            <h2 className="text-4xl font-bold text-[#0099D8]">
              Education Changes Lives
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-gray-700">
              At the CMA Foundation, we are committed to providing children and
              young people from vulnerable communities with access to quality
              education, empowering them with the knowledge, confidence, and
              opportunities they need to build a brighter future.
            </p>

            <p className="mt-6 text-xl leading-relaxed text-gray-700">
              Your donation helps provide educational support, school supplies,
              learning resources, and safe spaces where every child can grow,
              learn, and reach their full potential.
            </p>

            <Link
              href="#donate-hero"
              className="mt-10 inline-flex h-16 w-72 items-center justify-center rounded-xl bg-[#FFC20E] text-2xl font-bold text-black transition-all duration-300 hover:bg-[#FFB700] hover:shadow-xl hover:-translate-y-1"
            >
              Donate Now
            </Link>

          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[450px] w-full max-w-[500px] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/misery/principal.jpg"
                alt="Children participating in educational activities at the CMA Foundation"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}