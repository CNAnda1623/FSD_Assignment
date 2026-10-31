import { internalLinks, sungrowUrl } from "@/lib/links";

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
      { label: "Solutions for Utility", href: sungrowUrl("solutions/utility") },
      { label: "PV Inverter", href: sungrowUrl("products/pv-inverter") },
      { label: "Energy Storage System", href: sungrowUrl("products/ess") },
      { label: "Smart Energy Products", href: sungrowUrl("products/smart-energy") },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Sungrow for Installers", href: sungrowUrl("partners/installers") },
      { label: "Sungrow for Distributors", href: sungrowUrl("partners/distributors") },
      { label: "Find a Distributor", href: sungrowUrl("find-a-distributor") },
    ],
  },
  {
    title: "Service & Support",
    links: [
      { label: "Sungrow Service", href: sungrowUrl("service-brand") },
      { label: "Service Stories", href: sungrowUrl("service-stories") },
      { label: "Installers Support", href: sungrowUrl("support/installer") },
      { label: "For Home Support", href: sungrowUrl("support/home") },
      { label: "For Business Support", href: sungrowUrl("support/business") },
      { label: "Product Documentation", href: sungrowUrl("support/documentation") },
      { label: "Cases & Stories", href: sungrowUrl("cases") },
      { label: "FAQs", href: sungrowUrl("faqs") },
      { label: "Warranty", href: sungrowUrl("warranty") },
      { label: "Security Incident Response", href: sungrowUrl("security-response") },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { label: "Overview", href: internalLinks.sustainability, isLocal: true },
      { label: "Sustainability Strategy", href: sungrowUrl("sustainability/strategy") },
      { label: "Reports and Policies", href: sungrowUrl("sustainability/reports") },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Brand Story", href: internalLinks.brandStory, isLocal: true },
      { label: "Technology and Innovation", href: sungrowUrl("technology-innovation") },
      { label: "Globalization", href: sungrowUrl("globalization") },
      { label: "Lean Manufacturing", href: sungrowUrl("lean-manufacturing") },
      { label: "News & Media", href: sungrowUrl("news") },
      { label: "Investors", href: sungrowUrl("investors") },
      { label: "Career", href: sungrowUrl("about/career") },
      { label: "Sungrow Foundation", href: sungrowUrl("foundation") },
      { label: "Blog", href: sungrowUrl("blog") },
      { label: "Contact Sungrow", href: sungrowUrl("about-us/contact-us") },
    ],
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    assetKey: "social.linkedin",
    href: "https://www.linkedin.com/company/sungrow-power-supply-co-ltd/posts/",
  },
  {
    name: "Instagram",
    assetKey: "social.instagram",
    href: "https://www.instagram.com/sungrow_power/",
  },
  {
    name: "Facebook",
    assetKey: "social.facebook",
    href: "https://www.facebook.com/CleanPowerForAll",
  },
  {
    name: "X",
    assetKey: "social.twitter",
    href: "https://x.com/Sungrow_Power",
  },
  {
    name: "YouTube",
    assetKey: "social.youtube",
    href: "https://www.youtube.com/@Sungrow",
  },
];
