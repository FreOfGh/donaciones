
import FAQ from '@/app/[locale]/components/Donation/faq'
import DonationFooter from '@/app/[locale]/components/Donation/footer'
import DonationCTA from '@/app/[locale]/components/Donation/miserysection'
import BenefitsSection from '@/app/[locale]/components/Donation/Pofits'
import DonationPhoneForm from '@/app/[locale]/components/Donation/donationphoneform'
import ExampleSection from '@/app/[locale]/components/Donation/examplesection'
import type { Metadata } from 'next'
import Hero from '@/app/[locale]/components/Donation/hero'

export const metadata: Metadata = {
    title: 'Donaciones',
    description: 'Haz tu donación para apoyar la educación y el bienestar de niñas, niños y familias en La Esmeralda, Marinilla.',
    alternates: {
        canonical: '/donatepage',
        languages: {
            es: '/es/donatepage',
            en: '/en/donatepage',
            ja: '/ja/donatepage',
            fr: '/fr/donatepage',
            de: '/de/donatepage',
            it: '/it/donatepage',
        }
    },
    openGraph: {
        type: 'website',
        title: 'Donaciones | Fundación Centro Mariana de Alfabetización',
        description: 'Apoya nuestros programas educativos y sociales con tu aporte.',
        url: '/donatepage',
        siteName: 'Fundacion Centro Mariana de Alfabetización',
        images: [
            {
                url: '/hero/principal.jpg',
                width: 1200,
                height: 630,
                alt: 'Donaciones Fundación Centro Mariana de Alfabetización',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Donaciones | Fundación Centro Mariana de Alfabetización',
        description: 'Apoya nuestros programas educativos y sociales con tu aporte.',
        images: ['/hero/principal.jpg'],
    },
}
export default function DonationPage() {
    return (
        <div>
            <Hero />
            <BenefitsSection />
            <DonationPhoneForm />
            <ExampleSection />
            <DonationCTA />
            <FAQ />
        </div>
    )
}

