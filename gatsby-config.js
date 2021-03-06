require("dotenv").config()

const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken:
        process.env.CONTENTFUL_ACCESS_TOKEN ||
        process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
    contentfulConfig.host = process.env.CONTENTFUL_HOST;
    contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
    throw new Error(
        "Contentful spaceId and the access token need to be provided."
    );
}

module.exports = {
    siteMetadata: {
        title: "Gatsby Contentful Starter",
        description: "Official Contentful Gatsby Starter",
    },
    pathPrefix: "/gatsby-contentful-starter",
    plugins: [
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images-contentful`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 768,
                            withWebp: true,
                            showCaptions: true,
                            linkImagesToOriginal: false
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-source-shopify",
            options: {
				password: process.env.SHOPIFY_SHOP_PASSWORD,
				storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
                shopifyConnections: ["collections"]
            }
        },
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-breakpoints",
        "gatsby-plugin-sharp",
        "gatsby-plugin-image",
        {
            resolve: "gatsby-source-contentful",
            options: contentfulConfig,
        },
    ],
};
