import { sungrowUrl } from "@/lib/links";

export const ciData = {
  hero: {
    subLabel: "C&I PV Solution",
    headline: "Enhanced Safety, Increased Returns",
    assetKey: "ci.hero",
  },

  flexible: {
    heading: "Flexible Solutions for Maximum Value",
    description:
      "Versatile configurations tailored for varied rooftop architectures and high energy consumption businesses, maximizing generation while reducing total cost of ownership.",
    assetKey: "ci.flexible",
  },

  safety: {
    heading: "Advanced Safety",
    description:
      "Equipped with AFCI 3.0 arc-fault detection, rapid shutdown, and intelligent disconnect mechanisms to safeguard commercial buildings and personnel against high-voltage risks.",
    videoAssetKey: "ci.video.safety",
  },

  optimization: {
    heading: "Smart Optimization",
    description: "Two ways to boost overall yields.",
    videoAssetKey: "ci.video.optimization",
    captions: {
      left: {
        orangeHighlight: "Fearless of Shading, Increase Generation by 30%",
        subTitle: "Module-Level Optimization",
      },
      right: {
        orangeHighlight: "Track Maximum Power Points, Increase Yield by 2%",
        subTitle: "PowerMax Global MPPT",
      },
    },
  },

  install: {
    heading: "Effortless Installation & Commissioning",
    description:
      "Engineered with modular architectures, lightweight chassis, and intuitive wireless scan-to-connect tools for rapid deployment and minimal site downtime.",
    assetKey: "ci.install",
  },

  om: {
    heading: "Hassle-Free O&M",
    description:
      "Automated IV curve scanning and remote diagnostics provide real-time visibility and predictive fault mitigation, significantly curtailing manual site inspections.",
    videoAssetKey: "ci.video.om",
    captions: {
      left: {
        orangeHighlight: "Reducing Scanning Losses by 8%-30%",
        subTitle: "Module-Level IV Scanning & Diagnosis",
      },
      right: {
        orangeHighlight: "Preventing Overheating & Shutdown",
        subTitle: "Multi-Component Self-Cleaning Cooling System",
      },
    },
  },

  howItWorks: {
    title: "How Does It Work?",
    description:
      "A complete system to power your business with clean energy.",
    rows: [
      {
        id: "inverter",
        label: "PV Inverter",
        description: "High-efficiency 3-phase string inverter",
        thumbAssetKey: "ci.howItWorks.inverter",
        mainAssetKey: "ci.howItWorks.main",
      },
      {
        id: "isolarcloud",
        label: "iSolarCloud",
        description: "Intelligent commercial asset monitoring platform",
        thumbAssetKey: "ci.howItWorks.isolarcloud",
        mainAssetKey: "ci.howItWorks.main",
      },
    ] as const,
  },

  cases: {
    heading: "Cases & Stories",
    items: [
      {
        id: "c1",
        tag: "Business Owners",
        title: "Drinking Water From The Sun 100 kWp PV Plant",
        assetKey: "ci.case.1",
        href: sungrowUrl("cases/drinking-water-100kwp"),
      },
      {
        id: "c2",
        tag: "Business Owners",
        title:
          "C&I PV with SG125CX-P2 in Metzlesdorf Münch Energie Is the Customer",
        assetKey: "ci.case.2",
        href: sungrowUrl("cases/metzlesdorf-sg125cx"),
      },
    ],
    cta: {
      label: "Explore More",
      href: sungrowUrl("cases-business"),
    },
  },

  products: {
    heading: "Our Products",
    items: [
      {
        id: "p1",
        category: "3-Phase String Inverter",
        name: "150kW SG150CX",
        assetKey: "ci.product.1",
        learnMoreUrl: sungrowUrl("products/sg150cx"),
        docUrl: sungrowUrl("support/documentation/sg150cx"),
      },
      {
        id: "p2",
        category: "3-Phase String Inverter",
        name: "125kW SG125CX-P2",
        assetKey: "ci.product.2",
        learnMoreUrl: sungrowUrl("products/sg125cx-p2"),
        docUrl: sungrowUrl("support/documentation/sg125cx-p2"),
      },
      {
        id: "p3",
        category: "Smart Energy Management Platform",
        name: "iSolarCloud",
        assetKey: "ci.product.3",
        learnMoreUrl: sungrowUrl("products/isolarcloud"),
        docUrl: sungrowUrl("support/documentation/isolarcloud"),
      },
    ],
    cta: {
      label: "Explore More",
      href: sungrowUrl("products"),
    },
  },
};
