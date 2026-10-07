import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact MAYAD | Production, Casting & Business Inquiries',
    description:
        'Contact MAYAD for movie production, casting calls, brand partnerships, media and press, business inquiries, and general information. Connect with the MAYAD team.',
    keywords: [
        'MAYAD',
        'Contact MAYAD',
        'MAYAD contact',
        'MAYAD production house',
        'MAYAD movie production',
        'MAYAD casting',
        'MAYAD casting calls',
        'MAYAD business inquiry',
        'MAYAD brand partnership',
        'MAYAD media and press',
        'MAYAD Rajasthan',
        'Rajasthan production house',
        'Rajasthan media company',
    ],

    alternates: {
        canonical: 'https://mayadstudio.com/contact',
    },

    openGraph: {
        title: 'Contact MAYAD | Production, Casting & Business Inquiries',
        description:
            'Get in touch with MAYAD for movie production, casting, business partnerships, media inquiries and more.',
        url: 'https://mayadstudio.com/contact',
        siteName: 'MAYAD',
        type: 'website',
        images: [
            {
                url: 'https://mayadstudio.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact MAYAD',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Contact MAYAD | Production, Casting & Business Inquiries',
        description:
            'Connect with MAYAD for movie production, casting, business partnerships, media inquiries and more.',
        images: ['https://mayadstudio.com/og-image.jpg'],
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}