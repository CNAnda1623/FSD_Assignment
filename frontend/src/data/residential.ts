import { sungrowUrl } from "@/lib/links";

export const residentialData = {
  hero: {
    subLabel: "Residential PV + ESS + EV Charging Solution",
    headline: "Clean Power, Carbon-Free Life",
    assetKey: "residential.hero",
  },

  block1: {
    heading: "Solutions that Bring Zero-Carbon Energy to Every Home",
    description:
      "Seamlessly integrating rooftop solar generation, smart battery storage, and electric vehicle fast-charging for whole-home energy independence.",
    assetKey: "residential.block1",
  },

  block2: {
    heading:
      "Efficient and Reliable Clean Energy: Your Key to True Energy Freedom",
    description:
      "High-conversion multi-MPPT inverters ensure maximum electricity generation even in low-light and shaded residential conditions, keeping power flowing 24/7.",
    assetKey: "residential.block2",
  },

  block3: {
    heading: "Triple Protection, Worry-Free Design",
    description:
      "Built-in DC arc-fault circuit interrupter (AFCI), IP65/IP66 weather sealing, and battery multi-level thermal protection keep your family and home secure.",
    assetKey: "residential.block3",
  },

  block4: {
    heading:
      "An Intuitive Experience that Brings Comfort to Every Part of Your Life",
    description:
      "Quiet operation, compact sleek wall-mounted aesthetics, and intelligent automated mode switching blend effortlessly into your household.",
    assetKey: "residential.block4",
  },

  block5: {
    heading: "Powered by The Sun, Managed by iSolarCloud",
    description:
      "Gain real-time insight into your energy generation, self-consumption rate, and EV charging status from anywhere with the intuitive iSolarCloud app.",
    assetKey: "residential.block5",
  },

  howItWorks: {
    title: "How Does It Work?",
    description:
      "A complete home clean energy ecosystem designed for seamless living.",
    rows: [
      {
        id: "hybrid-inverter",
        label: "Residential Hybrid Inverter",
        description: "Intelligent PV + ESS single-phase & three-phase inverters",
        thumbAssetKey: "residential.howItWorks.inverter",
        mainAssetKey: "residential.howItWorks.main",
      },
      {
        id: "isolarcloud-res",
        label: "iSolarCloud",
        description: "Mobile management app with real-time home telemetry",
        thumbAssetKey: "residential.howItWorks.isolarcloud",
        mainAssetKey: "residential.block5",
      },
    ] as const,
  },

  service: {
    heading: "Service That Goes Above and Beyond",
    assetKey: "residential.service",
    pillars: [
      {
        title: "All-in-One System Design",
        text: "Customized solutions from a team of experts at no extra cost.",
      },
      {
        title: "Turnkey Solutions",
        text: "Comprehensive support and services—from grid connection to daily operations and maintenance.",
      },
      {
        title: "One-Stop Service",
        text: "End-to-end support with clear accountability and fast response.",
      },
    ],
  },

  cases: {
    heading: "Hear from Our Customers and Partners",
    items: [
      {
        id: "r-c1",
        tag: "Homeowners",
        title:
          "Sungrow Home Energy System: Smart Way to Reduce Your Electricity Bills",
        assetKey: "residential.case.1",
        href: sungrowUrl("cases/home-energy-reduce-bills"),
      },
      {
        id: "r-c2",
        tag: "Homeowners",
        title: "A Decade of Trust: Why This Family Chose Sungrow Solar Again",
        assetKey: "residential.case.2",
        href: sungrowUrl("cases/decade-of-trust"),
      },
    ],
    cta: {
      label: "Explore More",
      href: sungrowUrl("cases-homeowners"),
    },
  },

  products: {
    heading: "Our Products",
    item: {
      id: "isolarcloud-product",
      category: "Smart Energy Management Platform",
      name: "iSolarCloud",
      assetKey: "residential.product",
      learnMoreUrl: sungrowUrl("products/isolarcloud"),
      docUrl: sungrowUrl("support/documentation/isolarcloud"),
    },
  },
};
