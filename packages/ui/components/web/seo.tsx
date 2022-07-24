import { FC } from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import pageData from "configs/pageData.json";
import logo from "assets/logo.svg";

interface SEOProps {
  pageTitle?: string;
  description?: string;
  favicon?: string;
}

const SEO: FC<SEOProps> = ({ pageTitle, description, favicon }) => {
  const [currentURL, setCurrentURL] = useState("");
  const defaultData = pageData.seo;

  useEffect(() => setCurrentURL(window.location.href), []);

  if (!pageTitle) {
    pageTitle = defaultData.title;
  }

  if (!description) {
    description = defaultData.description;
  }

  if (!favicon) {
    favicon = "/favicon.svg";
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="shortcut icon" href={favicon} />
      <meta name="description" content={description} />
      <meta content={pageTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={currentURL} property="og:url" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="/cover.png" property="og:image" />
    </Head>
  );
};

export default SEO;
