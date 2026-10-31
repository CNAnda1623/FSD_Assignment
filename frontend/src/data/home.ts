import { internalLinks, sungrowUrl } from "@/lib/links";

export const homeData = {
  hero: {
    titleTop: "Leading us onward",
    titleMain: "GATHERING GOODWILL FOR A BETTER WORLD",
    mobileVideo: {
      src: "/Images/Home/first.mp4",
      // Optional poster image shown before the video loads
      poster: "",
    },
    mobileSlideA: {
      lines: ["GATHERING GOODWILL", "FOR", "A BETTER WORLD"],
      assetKey: "home.hero.mobileForest",
      src: "/Images/Home/2nd.jpg",
    },
    mobileSlideB: {
      headline: "Sungrow No.1 in Global Inverter Bankability",
      sublines: ["Fortune Future 50", "AAA MSCI ESG Rating in 2025"],
      stat: "75 GW⁺",
      statLabel: "India Shipments of PV Inverters",
      assetKey: "home.hero.mobileBanner",
      src: "/Images/Home/3.jpeg",
    },
  },

  statsBanner: {
    badge: "Sungrow No.1 in Global Inverter Bankability",
    subbadges: ["Fortune Future 50", "AAA MSCI ESG Rating in 2025"],
    stat: "75 GW⁺",
    statLabel: "India Shipments of PV Inverters",
    assetKey: "home.stats.banner",
    src: "/Images/Home/3.jpeg",
  },

  cleanPower: {
    heading: "Clean Power for All",
    description:
      "At Sungrow, we are committed to promoting the development and application of clean energy across all major energy technology sectors, including solar, wind, storage, electrification, and hydrogen. Our goal is to increase the adoption of clean energy and drive more creative, innovative ways to use clean energy.",
    stats: [
      {
        id: "stat-1",
        value: 46,
        suffix: " GW",
        label: "Power Electronic Converters Installation",
        iconAsset: "home.stats.icon1",
        src: "/Images/Home/clean_power_1st.svg",
        isStatic: false,
      },
      {
        id: "stat-2",
        value: 1,
        staticText: "NO.1",
        label: "PV Inverter & ESS & PCS Bankability*¹",
        iconAsset: "home.stats.icon2",
        src: "/Images/Home/clean_power_2nd.svg",
        isStatic: true,
      },
      {
        id: "stat-3",
        value: 6,
        suffix: "",
        label: "R&D Centers",
        iconAsset: "home.stats.icon3",
        src: "/Images/Home/clean_power_3rd.svg",
        isStatic: false,
      },
      {
        id: "stat-4",
        value: 19,
        suffix: "+",
        label: "International Subsidiaries",
        iconAsset: "home.stats.icon4",
        src: "/Images/Home/clean_power_4tg.svg",
        isStatic: false,
      },
      {
        id: "stat-5",
        value: 0,
        staticText: "AAA",
        label: "MSCI ESG Rating in 2025*²",
        iconAsset: "home.stats.icon5",
        src: "/Images/Home/clean_power_5th.svg",
        isStatic: true,
      },
    ],
    footnotes: [
      "*¹ Source: BloombergNEF",
      "*² Source: Morgan Stanley Capital International",
    ],
    cta: {
      label: "Discover Who We Are",
      href: internalLinks.brandStory,
    },
  },

  scenarios: {
    label: "Customer Scenarios · Business Areas",
    tabs: [
      {
        id: "for-home",
        label: "For Home",
        title: "For Home",
        bgAssetKey: "home.scenarios.home",
        links: [
          {
            label: "Products & Solutions",
            href: internalLinks.residentialSolution,
            isLocal: true,
          },
          {
            label: "Cases & Stories",
            href: sungrowUrl("cases-homeowners"),
          },
          {
            label: "Service & Support",
            href: sungrowUrl("support/home"),
          },
        ],
      },
      {
        id: "for-business",
        label: "For Business",
        title: "For Business",
        bgAssetKey: "home.scenarios.business",
        links: [
          {
            label: "C&I PV Solution",
            href: internalLinks.ciPvSolution,
            isLocal: true,
          },
          {
            label: "C&I PV+ESS+EV Charging Solution",
            href: sungrowUrl("solution/ci-pv-ess-ev-charging"),
          },
          {
            label: "Cases & Stories",
            href: sungrowUrl("cases-business"),
          },
        ],
      },
      {
        id: "for-utility",
        label: "For Utility",
        title: "For Utility",
        bgAssetKey: "home.scenarios.utility",
        links: [
          { label: "Utility PV System", href: sungrowUrl("utility/pv-system") },
          { label: "Energy Storage System", href: sungrowUrl("utility/storage-system") },
          { label: "Floating PV System", href: sungrowUrl("utility/floating-pv") },
          { label: "Wind", href: sungrowUrl("utility/wind") },
          { label: "Hydrogen", href: sungrowUrl("utility/hydrogen") },
        ],
      },
      {
        id: "installers",
        label: "Installers",
        title: "Installers",
        bgAssetKey: "home.scenarios.installers",
        links: [
          { label: "Sungrow for Installers", href: sungrowUrl("partners/installers") },
          { label: "Become an Installer", href: sungrowUrl("partners/become-installer") },
          { label: "Installer Support", href: sungrowUrl("support/installer") },
        ],
      },
      {
        id: "distributors",
        label: "Distributors",
        title: "Distributors",
        bgAssetKey: "home.scenarios.distributors",
        links: [
          { label: "For Home Solutions", href: internalLinks.residentialSolution, isLocal: true },
          { label: "For Business Solutions", href: internalLinks.ciPvSolution, isLocal: true },
          { label: "Become a Distributor", href: sungrowUrl("partners/become-distributor") },
        ],
      },
    ],
  },

  whySungrow: {
    heading: "Why Sungrow",
    description:
      "Backed by the trust of partners worldwide, Sungrow is committed to delivering unwavering excellence in technology, manufacturing and service. Together, let's bridge to a sustainable future.",
  },

  commitment: {
    heading: "Our Commitment to Innovation and Excellence",
    cards: [
      {
        id: "tech",
        title: "Technological Innovation",
        assetKey: "home.commitment.tech",
        href: sungrowUrl("technologyinnovation"),
      },
      {
        id: "lean",
        title: "Lean Manufacturing",
        assetKey: "home.commitment.lean",
        href: sungrowUrl("lean-manufacturing"),
      },
      {
        id: "global",
        title: "Global Presence",
        assetKey: "home.commitment.global",
        href: sungrowUrl("globalpresence"),
      },
      {
        id: "service",
        title: "Professional Services",
        assetKey: "home.commitment.service",
        href: sungrowUrl("service-brand"),
      },
      {
        id: "excellence",
        title: "Sustainable Excellence",
        assetKey: "home.commitment.excellence",
        href: sungrowUrl("sustainability"),
      },
    ],
  },

  stackedPanels: {
    heading: "Together, We Forge a Greener Tomorrow",
    panels: [
      {
        id: "sustainability",
        eyebrow: "Sustainability",
        title: "Green Mission, Better Life",
        assetKey: "home.panels.sustainability",
        ctaLabel: "Explore More",
        href: internalLinks.sustainability,
        isLocal: true,
      },
      {
        id: "people",
        eyebrow: "Our people",
        title: "Greener World, Greater Us",
        assetKey: "home.panels.people",
        ctaLabel: "Explore More",
        href: sungrowUrl("about/career"),
        isLocal: false,
      },
      {
        id: "service",
        eyebrow: "Our Service",
        title: "Where the Sun Shines, We're Ready to Serve",
        assetKey: "home.panels.service",
        ctaLabel: "Explore More",
        href: sungrowUrl("service-brand"),
        isLocal: false,
      },
    ],
  },

  presence: {
    eyebrow: "OUR PRESENCE",
    heading: "Encompassing diverse areas of construction pan India",
    description:
      "NCC Limited has made a mark in the country as one of the largest listed companies in terms of revenue with proven expertise in buildings, transportation, water and environment, irrigation, electrical(T&D), mining and railways sectors. NCC Limited has expanded its footprint to have a pan India presence with offices across nine cities – Ahmedabad, Amaravati, Bengaluru, Delhi, Lucknow, Mumbai, Pune, Kolkata, and Patna with headquarters located at Hyderabad.",
    stat: {
      value: 160,
      suffix: "+",
      label: "Active projects across India",
    },
    cta: {
      label: "KNOW MORE",
      href: "/about-us",
    },
    image: {
      src: "/Images/Home/map.png",
      alt: "NCC Limited Pan India Presence Map",
      width: 676,
      height: 687,
    },
  },

  news: {
    heading: "Trending News & Events",
    featured: {
      tag: "News",
      title:
        "Countdown Begins! Sungrow Unveils New Innovation at All Energy Australia 2025",
      date: "Oct. 22, 2025",
      assetKey: "home.news.1",
      href: sungrowUrl("newsdetail/all-energy-australia-2025"),
    },
    items: [
      {
        tag: "Events",
        title: "2025 MEA PV & ESS summit",
        date: "Aug. 21, 2025",
        assetKey: "home.news.2",
        href: sungrowUrl("event/2025-mea-pv-ess-summit"),
      },
      {
        tag: "Events",
        title: "2025 Southeast Asia Distributor Summit",
        date: "Jul. 17, 2025",
        assetKey: "home.news.3",
        href: sungrowUrl("seadistributorsummit"),
      },
      {
        tag: "Events",
        title: "Microinverter Quick Installation Challenge",
        date: "Apr. 16, 2025",
        assetKey: "home.news.4",
        href: sungrowUrl("microinverter-challenge"),
      },
      {
        tag: "Influencer",
        title: "Explore the New MG Series Together with Jonn",
        date: "Jul. 31, 2025",
        assetKey: "home.news.5",
        href: sungrowUrl("mg-series-jonn"),
      },
    ],
    cta: {
      label: "Explore More",
      href: sungrowUrl("news-media-news-list"),
    },
  },
};
