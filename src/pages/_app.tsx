import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { Layout } from "~/components/Layout";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IN",
          url: "https://jsl-tube.sa1.dev/",
          siteName: "JSL Tube",
        }}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
          {
            rel: "icon",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
          {
            rel: "icon",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        ]}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-P0R770425V"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-P0R770425V');
        `}
      </Script>
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(MyApp);
