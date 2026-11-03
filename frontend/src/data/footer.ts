import { internalLinks, externalUrl } from "@/lib/links";

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
    isLocal?: boolean;
  }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Products & Solutions",
    links: [
      { label: "Solutions for Home", href: internalLinks.residentialSolution, isLocal: true },
      { label: "Solutions for Business", href: internalLinks.ciPvSolution, isLocal: true },
      { label: "Solutions for Utility", href: externalUrl("solutions/utility") },
      { label: "PV Inverter", href: externalUrl("products/pv-inverter") },
      { label: "Energy Storage System", href: externalUrl("products/ess") },
      { label: "Smart Energy Products", href: externalUrl("products/smart-energy") },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "HPP for Installers", href: externalUrl("partners/installers") },
      { label: "HPP for Distributors", href: externalUrl("partners/distributors") },
      { label: "Find a Distributor", href: externalUrl("find-a-distributor") },
    ],
  },
  {
    title: "Service & Support",
    links: [
      { label: "HPP Service", href: externalUrl("service-brand") },
      { label: "Service Stories", href: externalUrl("service-stories") },
      { label: "Installers Support", href: externalUrl("support/installer") },
      { label: "For Home Support", href: externalUrl("support/home") },
      { label: "For Business Support", href: externalUrl("support/business") },
      { label: "Product Documentation", href: externalUrl("support/documentation") },
      { label: "Cases & Stories", href: externalUrl("cases") },
      { label: "FAQs", href: externalUrl("faqs") },
      { label: "Warranty", href: externalUrl("warranty") },
      { label: "Security Incident Response", href: externalUrl("security-response") },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { label: "Overview", href: internalLinks.sustainability, isLocal: true },
      { label: "Sustainability Strategy", href: externalUrl("sustainability/strategy") },
      { label: "Reports and Policies", href: externalUrl("sustainability/reports") },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Brand Story", href: internalLinks.brandStory, isLocal: true },
      { label: "Technology and Innovation", href: externalUrl("technology-innovation") },
      { label: "Globalization", href: externalUrl("globalization") },
      { label: "Lean Manufacturing", href: externalUrl("lean-manufacturing") },
      { label: "News & Media", href: externalUrl("news") },
      { label: "Investors", href: externalUrl("investors") },
      { label: "Career", href: externalUrl("about/career") },
      { label: "HPP Foundation", href: externalUrl("foundation") },
      { label: "Blog", href: externalUrl("blog") },
      { label: "Contact HIND POWER PROJECT", href: externalUrl("about-us/contact-us") },
    ],
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    assetKey: "social.linkedin",
    href: "https://www.linkedin.com/",
  },
  {
    name: "Instagram",
    assetKey: "social.instagram",
    href: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    assetKey: "social.facebook",
    href: "https://www.facebook.com/CleanPowerForAll",
  },
  {
    name: "X",
    assetKey: "social.twitter",
    href: "https://x.com/",
  },
  {
    name: "YouTube",
    assetKey: "social.youtube",
    href: "https://www.youtube.com/",
  },
];
