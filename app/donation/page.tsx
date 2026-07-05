
import FAQ from '@/app/components/Donation/faq'
import DonationFooter from '@/app/components/Donation/footer'
import DonationCTA from '@/app/components/Donation/miserysection'
import BenefitsSection from '@/app/components/Donation/Pofits'
import DonationPhoneForm from '@/app/components/Donation/donationphoneform'
import ExampleSection from '@/app/components/Donation/examplesection'
import type { Metadata } from 'next'
import Hero from '@/app/components/Donation/hero'
import DonationCard from '@/app/components/Donation/DonationCard'
export const metadata: Metadata = {
    title: 'Donation page fundacion Centro Mariana de Alfabetización',
    description: 'Page for donations to support the education of the chilhood in the Esmeralda Town',
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL + '/donation',
        languages: {
            'en': process.env.NEXT_PUBLIC_SITE_URL + '/en/donation'
        }
    },
    openGraph:{
        title: 'Donation page fundacion Centro Mariana de Alfabetización',
        description: 'Page for donations to support the education of the chilhood in the Esmeralda Town',
        url: process.env.NEXT_PUBLIC_SITE_URL + '/donation',
        siteName: 'Fundacion Centro Mariana de Alfabetización',
        

    }
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
            <DonationFooter />
        </div>
    )
}


