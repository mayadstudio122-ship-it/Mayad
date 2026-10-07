import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Talent Registration | MAYAD Production House',
    description:
        'Register with MAYAD Production House and join our talent network. Apply as an actor, actress, director, writer, cinematographer, editor, singer, dancer, anchor, host, or sound designer.',
    keywords: [
        'MAYAD',
        'MAYAD talent registration',
        'MAYAD registration',
        'MAYAD talent network',
        'MAYAD production house',
        'MAYAD casting',
        'MAYAD actors registration',
        'MAYAD actress registration',
        'MAYAD director registration',
        'MAYAD writer registration',
        'MAYAD singer registration',
        'MAYAD dancer registration',
        'MAYAD cinematographer',
        'MAYAD editor',
        'Rajasthan casting',
        'Rajasthan talent registration',
        'Rajasthan production house',
    ],

    alternates: {
        canonical: 'https://mayadstudio.com/register',
    },

    openGraph: {
        title: 'Talent Registration | MAYAD Production House',
        description:
            'Join the MAYAD talent network. Register your profile for opportunities in acting, direction, writing, cinematography, editing, singing, dancing, anchoring and more.',
        url: 'https://mayadstudio.com/register',
        siteName: 'MAYAD',
        type: 'website',
        images: [
            {
                url: 'https://mayadstudio.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'MAYAD Talent Registration',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Talent Registration | MAYAD Production House',
        description:
            'Join the MAYAD talent network and register your creative profile for future opportunities.',
        images: ['https://mayadstudio.com/og-image.jpg'],
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}