import { sungrowUrl } from "@/lib/links";

export const brandStoryData = {
  hero: {
    title: "Brand Story",
    videoAssetKey: "brand.hero.video",
  },

  mission: {
    heading: "Clean Power for All",
    description:
      "It is our mission and underlying belief. With the rapid advancement of renewable power systems primarily based on renewable energy sources, green power is gradually penetrating numerous industries and households. The road to the clean energy future is full of opportunities and challenges.",
  },

  leader: {
    heading: "To Be the Global Leader of Clean Energy Conversion Technology",
    description:
      "At Sungrow, we are dedicated to promoting the development and application of clean power conversion systems, bridging the gap between innovative clean power technology and everyday needs to realize a zero-carbon world.",
  },

  capabilities: [
    {
      id: "solar",
      name: "Solar",
      iconAssetKey: "brand.card.solar",
      links: [
        { label: "PV System", href: sungrowUrl("utility/pv-system") },
        { label: "Floating PV System", href: sungrowUrl("utility/floating-pv") },
        { label: "Smart Energy Products", href: sungrowUrl("products/smart-energy") },
        { label: "Sungrow Renewables", href: sungrowUrl("renewables") },
      ],
    },
    {
      id: "wind",
      name: "Wind",
      iconAssetKey: "brand.card.wind",
      links: [
        { label: "Wind Products & Solutions", href: sungrowUrl("utility/wind") },
      ],
    },
    {
      id: "storage",
      name: "Storage System",
      iconAssetKey: "brand.card.storage",
      links: [
        { label: "Storage System", href: sungrowUrl("utility/storage-system") },
        { label: "Smart Energy Products", href: sungrowUrl("products/smart-energy") },
      ],
    },
    {
      id: "electrification",
      name: "Electrification",
      iconAssetKey: "brand.card.electrification",
      links: [
        { label: "E-Power", href: sungrowUrl("e-power") },
        { label: "EV Charger", href: sungrowUrl("products/ev-charger") },
      ],
    },
    {
      id: "hydrogen",
      name: "Hydrogen",
      iconAssetKey: "brand.card.hydrogen",
      links: [
        { label: "Hydrogen", href: sungrowUrl("utility/hydrogen") },
      ],
    },
  ],

  bridge: {
    heading: "Bridge to A Sustainable Future",
    description:
      "By connecting advanced engineering with sustainable practices, we pave the way for universal green energy access across global landscapes.",
    videoAssetKey: "brand.bridge.video",
    caption: "As we moving towards an accessible clean future",
  },

  together: {
    heading: "Together, We Build A Sustainable Future",
    description:
      "Guided by innovation and driven by a shared responsibility to our planet, Sungrow works alongside partners and communities to inspire lasting environmental progress.",
    assetKey: "brand.together",
  },

  milestones: {
    heading: "Milestones of Sungrow",
    bgAssetKey: "brand.milestones.bg",
    items: [
      {
        year: "2024",
        text: "Brand value exceeded USD 14 billion",
      },
      {
        year: "2023",
        text: "The world's first 2000 V inverter connected to the grid",
      },
      {
        year: "2022",
        text: "Successfully developed the world's first 35 kV solid-state transformer (SST) based PV inverter",
      },
      {
        year: "2021",
        text: "Ranked No.1 among \"China's Top 500 ESG Excellent Enterprises\"",
      },
      {
        year: "2019",
        text: "Awarded National Industrial Design Center",
      },
      {
        year: "2011",
        text: "Listed on the Shenzhen Stock Exchange",
      },
      {
        year: "2009",
        text: "The first PV concession project in China",
      },
      {
        year: "2003",
        text: "The first grid-connected inverter",
      },
      {
        year: "2002",
        text: "Township Electrification Program",
      },
      {
        year: "1997",
        text: "Establishment of the company",
      },
    ],
  },
};
