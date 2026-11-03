import { internalLinks, externalUrl } from "@/lib/links";

export interface NavLink {
  label: string;
  href: string;
  isLocal?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href?: string;
  isDirectLink?: boolean;
  columns?: MegaMenuColumn[];
}

export const navigationItems: MegaMenuItem[] = [
  {
    id: "for-home",
    label: "For Home",
    columns: [
      {
        title: "Solutions & Cases",
        links: [
          {
            label: "Residential PV+ESS+EV Charging Solution",
            href: internalLinks.residentialSolution,
            isLocal: true,
          },
          {
            label: "Residential PV Solution",
            href: externalUrl("solutions-residential"),
          },
          {
            label: "Cases & Stories",
            href: externalUrl("cases-homeowners"),
          },
        ],
      },
      {
        title: "How to Buy",
        links: [
          {
            label: "Home Energy Estimator",
            href: externalUrl("energy-estimator"),
          },
          {
            label: "Find a Distributor",
            href: externalUrl("find-a-distributor"),
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            label: "For Home Support",
            href: externalUrl("support/home"),
          },
          {
            label: "Product Documentation",
            href: externalUrl("support/documentation"),
          },
          {
            label: "iSolarCloud",
            href: externalUrl("isolarcloud"),
          },
          {
            label: "iEnergyCharge",
            href: externalUrl("ienergycharge"),
          },
          {
            label: "FAQs",
            href: externalUrl("faqs"),
          },
          {
            label: "Warranty",
            href: externalUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "for-business",
    label: "For Business",
    columns: [
      {
        title: "Solutions & Cases",
        links: [
          {
            label: "C&I PV Solution",
            href: internalLinks.ciPvSolution,
            isLocal: true,
          },
          {
            label: "C&I PV+ESS+EV Charging Solution",
            href: externalUrl("solution/ci-pv-ess-ev-charging"),
          },
          {
            label: "Cases & Stories",
            href: externalUrl("cases-business"),
          },
        ],
      },
      {
        title: "How to Buy",
        links: [
          {
            label: "Find a Distributor",
            href: externalUrl("find-a-distributor"),
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            label: "For Business Support",
            href: externalUrl("support/business"),
          },
          {
            label: "Product Documentation",
            href: externalUrl("support/documentation"),
          },
          {
            label: "iSolarCloud",
            href: externalUrl("isolarcloud"),
          },
          {
            label: "FAQs",
            href: externalUrl("faqs"),
          },
          {
            label: "Warranty",
            href: externalUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "service-support",
    label: "Service & Support",
    columns: [
      {
        title: "HPP Service",
        links: [
          {
            label: "Service Brand",
            href: externalUrl("service-brand"),
          },
          {
            label: "Service Stories",
            href: externalUrl("service-stories"),
          },
        ],
      },
      {
        title: "Support for You",
        links: [
          {
            label: "Installers Support",
            href: externalUrl("support/installer"),
          },
          {
            label: "Homeowners Support",
            href: externalUrl("support/home"),
          },
          {
            label: "Business Owners Support",
            href: externalUrl("support/business"),
          },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "Product Documentation",
            href: externalUrl("support/documentation"),
          },
          {
            label: "FAQs",
            href: externalUrl("faqs"),
          },
          {
            label: "Warranty",
            href: externalUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    href: internalLinks.sustainability,
    isDirectLink: true,
  },
  {
    id: "about-us",
    label: "About Us",
    columns: [
      {
        title: "About HIND POWER PROJECT",
        links: [
          {
            label: "Brand Story",
            href: internalLinks.brandStory,
            isLocal: true,
          },
          {
            label: "Contact HIND POWER PROJECT",
            href: externalUrl("about-us/contact-us"),
          },
        ],
      },
      {
        title: "News and Media",
        links: [
          {
            label: "News",
            href: externalUrl("news"),
          },
          {
            label: "Events",
            href: externalUrl("events"),
          },
          {
            label: "HPP Campaign",
            href: externalUrl("campaign"),
          },
          {
            label: "White Paper",
            href: externalUrl("white-paper"),
          },
        ],
      },
      {
        title: "Investors & Corporate",
        links: [
          {
            label: "Overview",
            href: externalUrl("investors/overview"),
          },
          {
            label: "Corporate Governance",
            href: externalUrl("investors/governance"),
          },
          {
            label: "Financial Reports",
            href: externalUrl("investors/reports"),
          },
          {
            label: "Career",
            href: externalUrl("about/career"),
          },
          {
            label: "HPP Foundation",
            href: externalUrl("foundation"),
          },
        ],
      },
    ],
  },
];
