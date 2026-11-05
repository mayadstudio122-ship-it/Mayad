
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.mayadstudio.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/profile/",
                    "/watchlist/",
                    "/register/",
                    "/forgot-password/",
                    "/d148b489-49a3-4eae-9e82-ccf473893d6d/",
                ],
            },
        ],

        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
