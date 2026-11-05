
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | MAYAD OTT",

    description:
        "Find answers to common questions about MAYAD OTT, Rajasthani movies, web series, music, artists, registration, subscriptions and platform services.",

    alternates: {
        canonical: `${SITE_URL}/faq`,
    },

    openGraph: {
        type: "website",
        title: "Frequently Asked Questions | MAYAD OTT",
        description:
            "Get answers about watching Rajasthani movies, music, web series, artists and using the MAYAD OTT platform.",
        url: `${SITE_URL}/faq`,
        siteName: "MAYAD",
        locale: "en_IN",
        images: [
            {
                url: `${SITE_URL}/mayad.jpg`,
                width: 1200,
                height: 630,
                alt: "MAYAD OTT - Frequently Asked Questions",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Frequently Asked Questions | MAYAD OTT",
        description:
            "Find answers about MAYAD OTT, Rajasthani entertainment and platform services.",
        images: [`${SITE_URL}/mayad.jpg`],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
