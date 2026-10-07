import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | MAYAD',
    description:
        'Find answers to frequently asked questions about MAYAD, our media platform, services, artist network, registration process, and how to contact the MAYAD team.',
    keywords: [
        'MAYAD',
        'MAYAD FAQ',
        'MAYAD frequently asked questions',
        'MAYAD Rajasthan',
        'MAYAD media platform',
        'MAYAD services',
        'MAYAD artists',
        'MAYAD registration',
        'MAYAD contact',
        'Rajasthan media platform',
    ],
    alternates: {
        canonical: 'https://mayadstudio.com/faq',
    },
    openGraph: {
        title: 'Frequently Asked Questions | MAYAD',
        description:
            'Get answers to common questions about MAYAD, our services, media platform, artist network, registration and more.',
        url: 'https://mayadstudio.com/faq',
        siteName: 'MAYAD',
        type: 'website',
        images: [
            {
                url: 'https://mayadstudio.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'MAYAD - Frequently Asked Questions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Frequently Asked Questions | MAYAD',
        description:
            'Get answers to common questions about MAYAD, our services, media platform, artist network, registration and more.',
        images: ['https://mayadstudio.com/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}