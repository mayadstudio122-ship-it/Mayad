
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
    title: "Talent Registration | MAYAD Production House",

    description:
        "Register with MAYAD Production House to showcase your talent in acting, direction, writing, singing, dancing, cinematography and other creative fields.",

    alternates: {
        canonical: `${SITE_URL}/register`,
    },

    openGraph: {
        type: "website",
        title: "Talent Registration | MAYAD",
        description:
            "Join the MAYAD talent network. Submit your creative profile for acting, direction, writing, singing, dancing and production opportunities.",
        url: `${SITE_URL}/register`,
        siteName: "MAYAD",
        locale: "en_IN",
        images: [
            {
                url: `${SITE_URL}/mayad.jpg`,
                width: 1200,
                height: 630,
                alt: "MAYAD Production House Talent Registration",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Talent Registration | MAYAD",
        description:
            "Showcase your creative talent and join the MAYAD talent network.",
        images: [`${SITE_URL}/mayad.jpg`],
    },

    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
