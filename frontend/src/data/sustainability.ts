import { sungrowUrl } from "@/lib/links";

export const sustainabilityData = {
  hero: {
    titleLines: ["Green Mission", "Better Life"],
    assetKey: "sustainability.hero",
  },

  subNav: [
    { id: "overview", label: "Overview", href: "#overview" },
    { id: "strategy", label: "Sustainability Strategy", href: "#strategy" },
    { id: "reports", label: "Reports and Policies", href: "#reports" },
  ],

  targets: {
    heading: "Sungrow Climate Targets",
    items: [
      {
        id: "t1",
        title: "Achieving carbon neutrality at the operational level",
        timeline: "by 2028 | Scope 1+2",
        iconAssetKey: "sustainability.target.1",
      },
      {
        id: "t2",
        title: "Achieving carbon neutrality across the supply chain",
        timeline: "by 2038 | Scope 1+2+3",
        iconAssetKey: "sustainability.target.2",
      },
      {
        id: "t3",
        title: "Achieving net zero across the supply chain",
        timeline: "by 2048 | Scope 1+2+3",
        iconAssetKey: "sustainability.target.3",
      },
    ],
    note: "The definition of carbon neutrality and net zero is cited from ISO14068-1:2023",
  },

  governance: {
    heading: "Sustainability Governance Framework",
    pyramidAssetKey: "sustainability.governance.pyramid",
    levels: [
      {
        level: "Governance",
        details: "Strategy and Sustainability Committee (Directors of the Board)",
      },
      {
        level: "Management",
        details:
          "Sustainability Management Office (Senior Management of Business Units/Centers), ESG Development Center",
      },
      {
        level: "Implementation",
        details:
          "Sustainability Implementation Working Group (Representatives from Business Units/Centers)",
      },
    ],
  },

  strategy: {
    heading: "Sustainability Strategy",
    bannerAssetKey: "sustainability.strategy.banner",
    bannerLabels: ["Green Ecosystem", "Clean Energy", "Better Life"],
    tabs: [
      {
        id: "governance",
        label: "Governance Excellence",
        title: "Governance Excellence",
        photoAssetKey: "sustainability.strategy.governance",
        stats: [
          { label: "R&D Investment in 2024(USD)", value: "585 Million" },
          { label: "R&D Personnel", value: "40%" },
          { label: "Cumulative Patent Applications", value: "11000+" },
          { label: "Female Director Proportion", value: "25%" },
        ],
      },
      {
        id: "netzero",
        label: "Net-Zero Transition",
        title: "Net-Zero Transition",
        photoAssetKey: "sustainability.strategy.netzero",
        stats: [
          { label: "Renewable Electricity Usage", value: "79%" },
          {
            label: "Energy Consumption per Unit Decreased vs 2020",
            value: "10%",
          },
          { label: "Electricity Saving in 2025", value: "3950 MWh" },
          { label: "Rooftop PV installed capacity", value: "42 MW" },
        ],
      },
      {
        id: "eco",
        label: "Eco-Harmony",
        title: "Eco-Harmony",
        photoAssetKey: "sustainability.strategy.eco",
        stats: [
          { label: "Environmental Management Coverage", value: "100%" },
          { label: "Product Carbon Footprint Certification", value: "16 products" },
          { label: "Eco-design Pilot Project", value: "2 products" },
          { label: "Resource Utilization (Non-Hazardous)", value: "91%" },
        ],
      },
      {
        id: "prosperity",
        label: "Mutual Prosperity",
        title: "Mutual Prosperity",
        photoAssetKey: "sustainability.strategy.prosperity",
        stats: [
          { label: "Customer Satisfaction", value: "94.7%" },
          { label: "Signing Rate of Supplier Code", value: "99.2%" },
          { label: "Suppliers Receiving ESG Audit 2025", value: "251" },
          { label: "Suppliers Receiving Carbon Inventory 2025", value: "139" },
        ],
      },
      {
        id: "equity",
        label: "Equity & Inclusion",
        title: "Equity & Inclusion",
        photoAssetKey: "sustainability.strategy.equity",
        stats: [
          { label: "Female Manager Proportion", value: "16.9%" },
          { label: "Local Hiring Rate", value: "98%" },
          { label: "Employees with Certification Support", value: "1700+" },
          { label: "Cumulative Volunteer Service Hours", value: "12000+" },
        ],
      },
    ],
  },

  reports: {
    heading: "Latest Reports & Policies",
    reportItems: [
      {
        id: "r2025",
        eyebrow: "Enterprise",
        title: "SUNGROW 2025 SUSTAINABILITY REPORT",
        assetKey: "sustainability.report.2025",
        downloadUrl: sungrowUrl("sustainability/report-2025.pdf"),
      },
      {
        id: "r2024",
        eyebrow: "Enterprise",
        title: "SUNGROW 2024 SUSTAINABILITY REPORT",
        assetKey: "sustainability.report.2024",
        downloadUrl: sungrowUrl("sustainability/report-2024.pdf"),
      },
      {
        id: "r2023",
        eyebrow: "Enterprise",
        title: "SUNGROW 2023 SUSTAINABILITY REPORT",
        assetKey: "sustainability.report.2023",
        downloadUrl: sungrowUrl("sustainability/report-2023.pdf"),
      },
      {
        id: "r2022",
        eyebrow: "Enterprise",
        title: "SUNGROW 2022 SUSTAINABILITY REPORT",
        assetKey: "sustainability.report.2022",
        downloadUrl: sungrowUrl("sustainability/report-2022.pdf"),
      },
      {
        id: "r2021",
        eyebrow: "Enterprise",
        title: "SUNGROW 2021 CSR REPORT",
        assetKey: "sustainability.report.2021",
        downloadUrl: sungrowUrl("sustainability/report-2021.pdf"),
      },
    ],
    policyItems: [
      {
        id: "p1",
        eyebrow: "Policy",
        title: "EQUITY, INCLUSION, AND DIVERSITY POLICY",
        assetKey: "sustainability.policy.equity",
        downloadUrl: sungrowUrl("sustainability/policy-eid.pdf"),
      },
      {
        id: "p2",
        eyebrow: "Policy",
        title: "ENVIRONMENTAL MANAGEMENT POLICY",
        assetKey: "sustainability.policy.env",
        downloadUrl: sungrowUrl("sustainability/policy-env.pdf"),
      },
      {
        id: "p3",
        eyebrow: "Policy",
        title: "BIODIVERSITY CONSERVATION POLICY",
        assetKey: "sustainability.policy.bio",
        downloadUrl: sungrowUrl("sustainability/policy-bio.pdf"),
      },
    ],
    cta: {
      label: "Explore More",
      href: sungrowUrl("sustainability/reports"),
    },
  },

  honors: {
    heading: "Honors and Rewards",
    bgAssetKey: "sustainability.honors.bg",
    items: [
      {
        name: "MSCI",
        award: "MSCI ESG Rating AAA",
        logoAssetKey: "sustainability.honors.msci",
      },
      {
        name: "EcoVadis",
        award: "Sustainability Rating Gold Medal",
        logoAssetKey: "sustainability.honors.ecovadis",
      },
      {
        name: "United Nations Global Compact",
        award:
          "20 Case Examples of Private Sector's Sustainable Development in China for 20 Years",
        logoAssetKey: "sustainability.honors.ungc",
      },
      {
        name: "BCG",
        award: "BCG 'Global-Challenger Climate Pioneers'",
        logoAssetKey: "sustainability.honors.bcg",
      },
    ],
  },

  news: {
    heading: "Latest News",
    items: [
      {
        tag: "Sustainability",
        title:
          "From Decade to Decades, Sustainability on the Way: Sungrow Releases its 2024 Sustainability Report.",
        assetKey: "sustainability.news.1",
        href: sungrowUrl("newsdetail/sustainability-report-2024"),
      },
      {
        tag: "Sustainability",
        title:
          "Sungrow Ranks in the Global Top 5%, Awarded EcoVadis Gold Medal",
        assetKey: "sustainability.news.2",
        href: sungrowUrl("newsdetail/ecovadis-gold-2025"),
      },
      {
        tag: "Sustainability",
        title:
          "Sungrow Is listed in Boston Consulting Group's Global-Challenger Climate Pioneers",
        assetKey: "sustainability.news.3",
        href: sungrowUrl("newsdetail/bcg-climate-pioneers"),
      },
    ],
  },

  contactBanner: {
    heading: "Contact Us",
    description:
      "Your insights drive our progress. Contact our ESG team to share feedback, ask questions, or explore partnerships for a greener tomorrow.",
    email: "esg@sungrowpower.com",
    assetKey: "sustainability.contact.banner",
  },
};
