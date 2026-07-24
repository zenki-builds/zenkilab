import {
  Cog,
  Car,
  Cpu,
  FlaskConical,
  KeyRound,
  Gift,
  Wrench,
  Home,
  Palette,
  Component,
  Gem,
  type LucideIcon,
  Shield,
  Thermometer,
  Sun,
  Zap,
  Droplets,
  Leaf,
  FileText,
  Camera,
  Lightbulb,
  Sparkles,
} from "lucide-react";

// ── Project Start Journeys ────────────────────────────
export type ProjectJourney = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
};

export const projectJourneys: ProjectJourney[] = [
  {
    title: "I already have an STL file",
    description:
      "Upload your 3D model and we'll review it for printability, material recommendations, and pricing within 24 hours.",
    icon: FileText,
    href: "#quote",
    color: "#22D3EE",
  },
  {
    title: "I have a broken part",
    description:
      "Send us a photo and measurements of the part you need replaced. We'll reverse-engineer and manufacture a perfect replacement.",
    icon: Camera,
    href: "#quote",
    color: "#22D3EE",
  },
  {
    title: "I have an idea",
    description:
      "Describe what you want to make. Our engineers will help you refine the concept, create a model, and bring it to life.",
    icon: Lightbulb,
    href: "#quote",
    color: "#22D3EE",
  },
  {
    title: "I want something custom",
    description:
      "One-off gifts, art pieces, cosplay props, or anything you can dream up. We'll work with you from sketch to finished product.",
    icon: Sparkles,
    href: "#quote",
    color: "#22D3EE",
  },
];

// ── Services ──────────────────────────────────────────
export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  examples: string[];
};

export const services: Service[] = [
  {
    title: "Automotive Parts",
    description:
      "Hard-to-find clips, brackets, and interior trim pieces for restoration and custom builds. High-temperature materials that survive engine bays.",
    icon: Car,
    href: "#quote",
    examples: ["Gauge pods", "Interior trim clips", "Intake components"],
  },
  {
    title: "Replacement Parts",
    description:
      "Broke something you can't buy anymore? Send us the original or a photo with measurements. We'll reverse-engineer and manufacture a perfect match.",
    icon: KeyRound,
    href: "#quote",
    examples: ["Vintage knobs", "Broken clips", "Obsolete fittings"],
  },
  {
    title: "Die-cast Modifications",
    description:
      "Body kits, wheel swaps, and custom accessories for die-cast collectors. Precise, clean prints that match your collection's scale and finish.",
    icon: Gem,
    href: "#quote",
    examples: ["Wheels & tyres", "Body kits", "Display stands"],
  },
  {
    title: "Engineering Prototypes",
    description:
      "Test fit, form, and function before committing to expensive tooling. Turn CAD concepts into physical parts in days, not weeks.",
    icon: FlaskConical,
    href: "#quote",
    examples: ["Product mockups", "Engineering samples", "Fitment checks"],
  },
  {
    title: "Functional Parts",
    description:
      "Gears, brackets, mounts, and mechanical components that actually work under load. Designed for real-world use, not just display.",
    icon: Cog,
    href: "#quote",
    examples: ["Gears & sprockets", "Mounting brackets", "Clips & fasteners"],
  },
  {
    title: "Custom Gifts",
    description:
      "Personalised keepsakes, trophies, and one-off creations that feel thoughtful and intentional. Made to order with attention to every detail.",
    icon: Gift,
    href: "#quote",
    examples: ["Bespoke gifts", "Trophies & awards", "Personalised keychains"],
  },
  {
    title: "Décor & Home",
    description:
      "Vases, lamp shades, organisers, and decorative objects that blend industrial precision with interior design. Beautiful things for everyday spaces.",
    icon: Home,
    href: "#quote",
    examples: ["Pendant lamps", "Planters", "Desk organisers"],
  },
  {
    title: "One-off Custom Prints",
    description:
      "Cosplay props, art pieces, architectural models, or anything you can dream up. If it can be printed, we'll help you make it real.",
    icon: Palette,
    href: "#quote",
    examples: ["Cosplay helmets", "Wall sculptures", "Architectural models"],
  },
];

// ── Materials ─────────────────────────────────────────
export type MaterialStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type Material = {
  name: string;
  description: string;
  stats: MaterialStat[];
  color: string;
  textColor: string;
  borderColor: string;
};

export const materials: Material[] = [
  {
    name: "PLA",
    description:
      "The workhorse of desktop manufacturing. Stiff, easy to print, and available in hundreds of colours. Ideal for prototypes, display models, and low-stress applications.",
    stats: [
      { label: "Strength", value: "Medium", icon: Shield },
      { label: "Heat Resistance", value: "Up to 55°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Not recommended", icon: Sun },
      { label: "Best For", value: "Prototypes, décor, gifts", icon: Zap },
    ],
    color: "#22D3EE",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
  },
  {
    name: "PETG",
    description:
      "The sweet spot between ease and performance. Stronger than PLA with better heat resistance and flexibility. Food-safe variants available for kitchen applications.",
    stats: [
      { label: "Strength", value: "High", icon: Shield },
      { label: "Heat Resistance", value: "Up to 75°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Good", icon: Sun },
      { label: "Best For", value: "Functional parts, enclosures", icon: Zap },
    ],
    color: "#3B82F6",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    name: "ABS",
    description:
      "Industry-standard thermoplastic. Exceptional impact resistance and durability. Used in automotive interiors, appliance housings, and LEGO bricks.",
    stats: [
      { label: "Strength", value: "Very High", icon: Shield },
      { label: "Heat Resistance", value: "Up to 95°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Good with coating", icon: Sun },
      { label: "Best For", value: "Automotive, tough parts", icon: Zap },
    ],
    color: "#F59E0B",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    name: "ASA",
    description:
      "ABS's outdoor-ready sibling. Superior UV resistance and weatherability make ASA the definitive choice for exterior automotive trim, signage, and outdoor enclosures.",
    stats: [
      { label: "Strength", value: "Very High", icon: Shield },
      { label: "Heat Resistance", value: "Up to 95°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Excellent", icon: Sun },
      { label: "Best For", value: "Outdoor, automotive", icon: Zap },
    ],
    color: "#10B981",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    name: "TPU",
    description:
      "Flexible, rubber-like filament ranging from 85A to 95A shore hardness. Produces gaskets, phone cases, vibration dampeners, and wearable devices.",
    stats: [
      { label: "Strength", value: "Medium–High", icon: Shield },
      { label: "Heat Resistance", value: "Up to 60°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Moderate", icon: Sun },
      { label: "Best For", value: "Flexible parts, wearables", icon: Zap },
    ],
    color: "#8B5CF6",
    textColor: "text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    name: "Carbon Fiber Composite",
    description:
      "Engineering-grade filament reinforced with chopped carbon fibre. Exceptional stiffness-to-weight ratio and dimensional stability. For when aluminium is overkill but PLA isn't enough.",
    stats: [
      { label: "Strength", value: "Extreme", icon: Shield },
      { label: "Heat Resistance", value: "Up to 115°C", icon: Thermometer },
      { label: "Outdoor Use", value: "Excellent", icon: Sun },
      { label: "Best For", value: "Structural, drone, jigs", icon: Zap },
    ],
    color: "#6B7280",
    textColor: "text-gray-400",
    borderColor: "border-gray-500/20",
  },
];

// ── How It Works ──────────────────────────────────────
export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Upload a file, send a photo, or describe your idea. Choose the path that best fits your situation — we meet you where you are.",
  },
  {
    number: "02",
    title: "We review and quote",
    description:
      "Our engineers assess your project within 24 hours. You'll get a clear, itemised quote with material recommendations and timeline.",
  },
  {
    number: "03",
    title: "We manufacture",
    description:
      "Once confirmed, your job enters production. Industrial-grade printers run with live quality monitoring. We keep you updated throughout.",
  },
  {
    number: "04",
    title: "Quality check and deliver",
    description:
      "Every part is inspected, finished, and carefully packaged. Island-wide delivery or pickup from our Colombo facility — your choice.",
  },
];

// ── Gallery Projects ──────────────────────────────────
export type GalleryProject = {
  id: string;
  title: string;
  category: string;
  imageLight: string;
  imageDark: string;
  description: string;
};

export const galleryCategories = [
  "All",
  "Automotive",
  "Electronics",
  "Prototypes",
  "Art",
  "Cosplay",
  "Home Décor",
] as const;

export const galleryProjects: GalleryProject[] = [
  {
    id: "1",
    title: "Intake Manifold Prototype",
    category: "Automotive",
    imageLight: "/gallery/intake.jpg",
    imageDark: "/gallery/intake.jpg",
    description:
      "Functional intake manifold printed in ASA for thermal testing on a modified 4-cylinder engine.",
  },
  {
    id: "2",
    title: "Custom PCB Enclosure",
    category: "Electronics",
    imageLight: "/gallery/enclosure.jpg",
    imageDark: "/gallery/enclosure.jpg",
    description:
      "Snap-fit enclosure with integrated standoffs and ventilation for a custom IoT sensor module.",
  },
  {
    id: "3",
    title: "Turbine Housing Mock-up",
    category: "Prototypes",
    imageLight: "/gallery/turbine.jpg",
    imageDark: "/gallery/turbine.jpg",
    description:
      "Full-scale SLA-printed turbine housing for fitment verification before CNC machining.",
  },
  {
    id: "4",
    title: "Geometric Wall Sculpture",
    category: "Art",
    imageLight: "/gallery/sculpture.jpg",
    imageDark: "/gallery/sculpture.jpg",
    description:
      "Parametric wall installation comprising 47 interlocking PLA modules with matte finish.",
  },
  {
    id: "5",
    title: "Mandalorian Helmet",
    category: "Cosplay",
    imageLight: "/gallery/helmet.jpg",
    imageDark: "/gallery/helmet.jpg",
    description:
      "Screen-accurate Beskar helmet printed in PETG, sanded, primed, and painted with Alumaluster finish.",
  },
  {
    id: "6",
    title: "Minimalist Pendant Lamp",
    category: "Home Décor",
    imageLight: "/gallery/lamp.jpg",
    imageDark: "/gallery/lamp.jpg",
    description:
      "Translucent PETG shade with integrated cable management. Designed for standard E27 fittings.",
  },
  {
    id: "7",
    title: "Drone Arm Assembly",
    category: "Prototypes",
    imageLight: "/gallery/drone.jpg",
    imageDark: "/gallery/drone.jpg",
    description:
      "Carbon-fibre-reinforced drone arms with integrated motor mounts, tested to 4.5 kg static load.",
  },
  {
    id: "8",
    title: "Dashboard Gauge Pod",
    category: "Automotive",
    imageLight: "/gallery/gauge.jpg",
    imageDark: "/gallery/gauge.jpg",
    description:
      "A-pillar gauge pod printed in ASA to match OEM texture, housing boost and oil pressure gauges.",
  },
  {
    id: "9",
    title: "Medical Device Housing",
    category: "Electronics",
    imageLight: "/gallery/medical.jpg",
    imageDark: "/gallery/medical.jpg",
    description:
      "IP54-rated enclosure for a portable diagnostic device with sealed button membranes and LCD window.",
  },
];

// ── FAQ ────────────────────────────────────────────────
export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "What file formats do you accept?",
    answer:
      "We accept STL, OBJ, 3MF, and STEP files. For assemblies, ZIP archives containing multiple files are recommended. Maximum single file size is 250 MB through our uploader. For larger projects, contact us directly.",
  },
  {
    question: "I don't have a 3D file — can you still help?",
    answer:
      "Absolutely. Most of our customers don't have ready-made 3D models. You can send us a photo of a broken part, a sketch of an idea, or just describe what you need. Our team can create the model for you or guide you through the process.",
  },
  {
    question: "What materials can you print in?",
    answer:
      "Our current material lineup includes PLA, PETG, ABS, ASA, and TPU. Carbon-fibre-reinforced composites are available on a per-project basis. Each material has different properties — strength, flexibility, heat resistance, and UV stability — and we'll help you select the right one for your application.",
  },
  {
    question: "How long does printing take?",
    answer:
      "Production time depends on part size, complexity, and material. Small parts (keychains, brackets) typically ship within 2–3 business days. Larger or complex projects may take 5–10 business days. You'll receive an estimated timeline with your quotation.",
  },
  {
    question: "Do you offer post-processing?",
    answer:
      "Yes. Standard post-processing includes support removal and light sanding. Additional services — vapour smoothing (ABS/ASA), primer application, painting, and clear-coat finishing — are available at quoted rates. Specify your finishing requirements when submitting.",
  },
  {
    question: "Can you print in multiple colours?",
    answer:
      "Single-colour prints are our standard. Multi-colour printing is available for select projects using manual filament changes or multi-material systems. Note that multi-colour adds print time and cost. Contact us with your specific requirements.",
  },
  {
    question: "What if my design needs modification?",
    answer:
      "Our engineering team can assist with design-for-manufacturing (DFM) feedback, minor modifications, and file repair. Major redesign work is quoted separately. We recommend providing native CAD files (STEP, Fusion 360, SolidWorks) when possible for the best support.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We currently ship within Sri Lanka with island-wide delivery. International shipping is available upon request for select projects. Rates are calculated based on package dimensions, weight, and destination.",
  },
  {
    question: "How are prices calculated?",
    answer:
      "Pricing is based on material volume, print time, post-processing requirements, and quantity. You'll receive a transparent, itemised quote before any work begins. Rush orders and complex geometries may incur surcharges.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer:
      "No. We manufacture single one-off prints as well as production runs of hundreds of units. Per-unit cost decreases with quantity, and we're happy to discuss volume pricing for recurring orders.",
  },
];

// ── Social Proof / Stats ──────────────────────────────
export type TrustStat = {
  label: string;
  value: string;
};

export const trustStats: TrustStat[] = [
  { label: "Projects Completed", value: "1,200+" },
  { label: "Materials Available", value: "10+" },
  { label: "Machines", value: "6" },
  { label: "Years Building", value: "4+" },
];

// ── About ─────────────────────────────────────────────
export const aboutText = {
  heading: "Built by makers, for makers.",
  paragraph1:
    "Zenki Lab began in a workshop solving real-world problems. What started as a way to manufacture custom parts for automotive restoration grew into a workshop dedicated to helping makers, enthusiasts and creators bring their ideas into reality.",
  paragraph2:
    "Every project deserves the same care we'd expect for our own. Honest advice, clear communication, and parts that fit — every time.",
};

// ── Coming Soon ───────────────────────────────────────
export type ComingSoonFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const comingSoonFeatures: ComingSoonFeature[] = [
  {
    title: "Customer Dashboard",
    description: "Track your orders and project history in one place.",
    icon: FileText,
  },
  {
    title: "Live Print Monitoring",
    description: "Watch your parts being manufactured in real time.",
    icon: Camera,
  },
  {
    title: "Timelapse Downloads",
    description: "Get a timelapse video of your print from start to finish.",
    icon: Camera,
  },
  {
    title: "Online Quote System",
    description: "Instant quotes powered by automated file analysis.",
    icon: Zap,
  },
];

// ── Contact ────────────────────────────────────────────
export type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

export const contactChannels: ContactChannel[] = [
  { label: "WhatsApp", value: "+94 77 000 0000", href: "https://wa.me/94770000000" },
  { label: "Email", value: "hello@zenkilab.com", href: "mailto:hello@zenkilab.com" },
  { label: "Instagram", value: "@zenkilab", href: "https://instagram.com/zenkilab" },
  { label: "Facebook", value: "/zenkilab", href: "https://facebook.com/zenkilab" },
  { label: "TikTok", value: "@zenkilab", href: "https://tiktok.com/@zenkilab" },
];

// ── Footer ─────────────────────────────────────────────
export const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Custom Parts", href: "#services" },
      { label: "Prototypes", href: "#services" },
      { label: "Automotive", href: "#services" },
      { label: "Electronics", href: "#services" },
    ],
  },
  {
    title: "Materials",
    links: [
      { label: "PLA", href: "#materials" },
      { label: "PETG", href: "#materials" },
      { label: "ABS", href: "#materials" },
      { label: "ASA", href: "#materials" },
      { label: "TPU", href: "#materials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Gallery", href: "#gallery" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
      { label: "Start a Project", href: "#quote" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];