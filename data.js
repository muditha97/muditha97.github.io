/*
 * Site content. Edit this file to update the portfolio — no build step needed.
 * Ported from the Claude Design file Portfolio.dc.html.
 */

/* Contact details and editor options (the design's "Tweaks" panel). */
const SITE = {
  linkedinUrl: "https://www.linkedin.com/in/muditha-pathum/",
  email: "mudithajayaweera97@gmail.com",
  githubUrl: "https://github.com/muditha97",
  cvUrl: "", // e.g. 'cv/muditha-jayaweera-cv.pdf' — the "Download CV" buttons appear once set
  // Shows the dashed "Needs input" / "Before publishing" notes. Set to false before going live.
  showEditorNotes: false,
};

const STATUS = {
  live: "#7fc99a",
  team: "#8fb4e8",
  wip: "#e2b76a",
  personal: "#b9a3e3",
};
const PROJECTS = [
  {
    title: "Hotel Manager",
    subtitle: "Hospitality integration platform",
    kind: "team",
    status: "Production · team system",
    category:
      "Production software · Backend systems · Third-party integrations",
    oneLiner:
      "Keeping booking and property-management data consistent across Opera Cloud, Mews and our own platform — with retries, idempotency and recovery paths built in.",
    summary:
      "A hotel management and booking ecosystem that synchronises reservation and property data between the platform and external property-management systems such as Opera Cloud and Mews.",
    problem:
      "Booking data lives in several systems at once. Each PMS has its own API, authentication model, event semantics and failure modes, and events can arrive late, out of order, or more than once. The platform has to stay consistent per hotel without manual reconciliation.",
    role: "Joined as a full-stack developer in 2022; since 2025 I lead the booking and integrations domain as Senior Software Engineer and team lead. The wider platform is built and maintained by a broader engineering team.",
    mine: [
      "Leading the booking and integrations domain across many hotel properties",
      "Opera Cloud and Mews integrations: auth, token refresh, webhook ingestion, real-time sync",
      "Event-driven processing on AWS SQS with idempotency, retries and transactional consistency",
      "Production incident ownership for booking failures",
      "Architecture reviews, code standards and mentoring within the team",
    ],
    team: [
      "Overall platform architecture and infrastructure",
      "Guest- and staff-facing applications",
      "Operations and release process",
    ],
    highlightsTitle: "ENGINEERING CHALLENGES",
    highlights: [
      "Synchronising booking and PMS data across external systems in near real time",
      "Asynchronous events, retries and duplicate delivery",
      "Idempotency so replays never double-write a booking",
      "Hotel-specific tenant context and per-property authentication",
      "Operational visibility and fast recovery when an integration fails",
    ],
    archLabel: "Hotel Manager event-driven integration architecture",
    arch: [
      {
        label: "External",
        nodes: ["Opera Cloud", "Mews", "Booking channels"],
        edge: "webhooks · REST · polling",
      },
      {
        label: "Ingress",
        nodes: ["NestJS API", "EventBridge"],
        edge: "routed by event type, tagged with hotel context",
      },
      {
        label: "Processing",
        nodes: ["SQS queues", "Lambda workers", "Dead-letter queue"],
        edge: "idempotent writes · failed messages parked for replay",
      },
      {
        label: "Data",
        nodes: ["MongoDB · MikroORM", "Redis"],
        edge: "served via",
      },
      {
        label: "Clients",
        nodes: ["REST & GraphQL APIs", "React / React Native apps"],
      },
    ],
    decisions: [
      {
        t: "Idempotent consumers",
        b: "Inbound events carry a stable key, so a duplicate delivery becomes a no-op instead of a second write.",
      },
      {
        t: "Queues between systems",
        b: "SQS absorbs bursts from external systems and decouples PMS availability from our own services.",
      },
      {
        t: "Dead-letter queues with a way back",
        b: "Messages that keep failing are parked for inspection and replay, not lost or retried forever.",
      },
      {
        t: "Tenant context on every message",
        b: "Hotel-specific context travels with each event so a worker never acts on the wrong property.",
      },
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "MongoDB",
      "MikroORM",
      "Redis",
      "AWS Lambda",
      "SQS",
      "EventBridge",
      "GraphQL",
      "REST",
      "Docker",
      "React",
      "React Native",
    ],
    links: [],
    images: [],
    planned: [],
    note: "",
  },
  {
    title: "NutriPlatform",
    subtitle: "Practice software for nutritionists",
    kind: "live",
    status: "Live",
    category:
      "Independent SaaS · Product engineering · AI-assisted development",
    oneLiner:
      "Client records, session notes, meal and workout plans, a client app, messaging and invoicing — replacing WhatsApp threads and Excel meal plans.",
    summary:
      "Practice software for nutritionists, dietitians and health coaches: from consult to plan to progress in one place. Built in Sri Lanka, for how practices in South Asia actually work.",
    problem:
      "Many practitioners run their practice across WhatsApp threads, Excel and Canva meal plans, paper intake forms and screenshots of bank transfers. Plans get rewritten for every client, progress is scattered, and sensitive health data sits on personal phones.",
    role: "Independent product, built end to end: product definition, UX, architecture, implementation, deployment and ongoing iteration — using the AI-assisted engineering workflow described in case study 05.",
    mine: [],
    team: [],
    highlightsTitle: "LIVE TODAY",
    highlights: [
      "Meal plan builder with USDA and Edamam food search; protein, carbs and fat total automatically",
      "Reusable meal-plan templates and custom local foods",
      "Workout plans alongside nutrition plans",
      "Client app installable to the home screen — no app store",
      "Food, mood and energy diary, plus messaging",
      "SOAP and intake notes with full version history",
      "Owner, practitioner and front-desk roles; optional per-practitioner client visibility",
      "Consent tracking aligned with Sri Lanka\u2019s PDPA",
      "LKR invoices tracked from draft to paid",
    ],
    archLabel: "NutriPlatform architecture",
    arch: [
      {
        label: "Clients",
        nodes: ["Practitioner web app", "Client app (installable)"],
        edge: "authenticated, role-scoped API calls",
      },
      {
        label: "API",
        nodes: [
          "NestJS · TypeScript",
          "Auth & roles",
          "Practice-scoped access",
        ],
        edge: "domain services",
      },
      {
        label: "Services",
        nodes: [
          "Plans & macro totals",
          "Food search",
          "Versioned notes",
          "Consent",
          "Invoicing",
        ],
        edge: "reads / writes",
      },
      {
        label: "Data",
        nodes: ["MongoDB (data separated per practice)", "USDA · Edamam"],
      },
    ],
    decisions: [
      {
        t: "Isolation per practice",
        b: "Every record belongs to a practice, so one practice\u2019s data is never visible to another.",
      },
      {
        t: "Notes are never overwritten",
        b: "Clinical notes keep a version history, so a record can\u2019t change without a trace.",
      },
      {
        t: "Installable web app for clients",
        b: "Clients get their own app without an app-store install — lower friction for the practitioner to onboard them.",
      },
      {
        t: "Local-first food data",
        b: "USDA and Edamam cover the basics; custom foods cover local dishes Western databases miss.",
      },
    ],
    planned: [
      "Final LKR pricing tiers (currently free to start)",
      "Online payments — invoices are currently marked paid manually",
    ],
    stack: [
      "React",
      "React Native",
      "TypeScript",
      "Node.js",
      "NestJS",
      "MongoDB",
    ],
    links: [
      {
        label: "nutriplatformapp.com",
        href: "https://www.nutriplatformapp.com/",
      },
    ],
    images: [],
    note: "add dashboard and client-app screenshots (set images in the data). Features are confirmed from nutriplatformapp.com; verify the stack and architecture against the repository, and confirm the repo is public before linking it.",
  },
  {
    title: "LeadFlow",
    subtitle: "WhatsApp lead management",
    kind: "wip",
    status: "In development",
    category: "SaaS · Full-stack development · Business automation",
    oneLiner:
      "A sales pipeline for businesses that sell over WhatsApp: a drag-and-drop Kanban board, follow-up reminders and AI-drafted replies, built as a React and NestJS monorepo.",
    summary:
      "A lead-management app for small teams whose leads arrive through WhatsApp and social channels: capture each lead, move it through a pipeline, schedule follow-ups and reply in one click, instead of losing it in a chat list.",
    problem:
      "Small businesses run sales through WhatsApp, but a chat list is not a pipeline. Leads go cold, follow-ups are forgotten, and context about each conversation lives only in someone\u2019s memory.",
    role: "Independent project: architecture, frontend, backend and shared packages.",
    mine: [],
    team: [],
    highlightsTitle: "BUILT TODAY",
    highlights: [
      "Kanban pipeline with drag and drop: New, Contacted, Qualified, Closed, Lost",
      "Lead list with search, status and source filters, and pagination",
      "Lead sources: WhatsApp, Facebook, Instagram, website, referral, manual",
      "Follow-up dates with reminders and a dashboard panel of who to contact next",
      "Activity timeline per lead: creation, status changes, follow-ups, notes",
      "One-click WhatsApp chat with a pre-filled message",
      "AI-drafted WhatsApp replies and lead summaries (Groq, Llama 3.3 70B)",
      "Dashboard stats, plus in-app notifications for new leads and status changes",
      "Workspaces with Admin and Member roles; deleted leads can be restored",
      "JWT auth with short-lived access tokens and hashed, rotating refresh tokens",
    ],
    archLabel: "LeadFlow monorepo architecture",
    arch: [
      {
        label: "apps/web",
        nodes: ["React 19", "Vite", "Tailwind CSS", "dnd-kit Kanban"],
        edge: "REST · Bearer JWT, auto-refresh on 401",
      },
      {
        label: "Guards",
        nodes: ["Rate limiting", "JWT auth", "Admin / Member roles"],
        edge: "workspace-scoped requests",
      },
      {
        label: "apps/api",
        nodes: ["Leads", "Activities", "Dashboard", "Notifications", "AI", "Auth"],
        edge: "reads / writes",
      },
      {
        label: "Data & AI",
        nodes: ["MongoDB", "Groq LLM API"],
        edge: "both apps import",
      },
      { label: "packages", nodes: ["Shared statuses, labels & types"] },
    ],
    decisions: [
      {
        t: "pnpm monorepo",
        b: "One repo, separate deployables, shared packages, so status names and types change in one place.",
      },
      {
        t: "Status rules as plain data",
        b: "Allowed pipeline transitions live in one table that can be tested without starting the app.",
      },
      {
        t: "Nothing disappears silently",
        b: "Deletes are soft and every change lands in the lead’s timeline, so a lead can be restored and its history explained.",
      },
      {
        t: "AI drafts, people send",
        b: "Replies and summaries are suggestions built from the lead’s history; the user edits and sends them. AI calls are rate-limited.",
      },
    ],
    planned: ["Public launch"],
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "MongoDB",
      "JWT",
      "Groq",
      "pnpm",
      "Jest",
    ],
    links: [],
    images: [],
    note: "add screenshots of the Kanban board and lead detail. The GitHub repo is private, so it isn't linked.",
  },
  {
    title: "MudithaOS",
    subtitle: "Personal knowledge assistant",
    kind: "personal",
    status: "Personal · local-first",
    category: "AI engineering · RAG · Local-first AI",
    oneLiner:
      "Retrieval-augmented generation over my own Obsidian notes, running entirely on local models with Ollama, Qdrant and n8n.",
    summary:
      "A personal knowledge assistant that retrieves and reasons over locally stored notes, built so private knowledge never has to leave my machine.",
    problem:
      "Years of notes are only useful if you can find and connect them. Cloud assistants solve retrieval but require sending private knowledge to a third party.",
    role: "Personal project: architecture, ingestion pipeline, retrieval and infrastructure.",
    mine: [],
    team: [],
    highlightsTitle: "WHAT IT EXPLORES",
    highlights: [
      "Local LLM inference with Ollama",
      "Document ingestion and chunking from Obsidian",
      "Embeddings and vector search in Qdrant",
      "Automation workflows in n8n",
      "Every service containerised with Docker",
    ],
    archLabel: "MudithaOS local RAG pipeline",
    arch: [
      {
        label: "Sources",
        nodes: ["Obsidian vault", "Local documents"],
        edge: "n8n ingestion: parse · chunk",
      },
      {
        label: "Embed",
        nodes: ["Ollama embedding model"],
        edge: "vectors + metadata",
      },
      {
        label: "Store",
        nodes: ["Qdrant"],
        edge: "semantic search · top-k chunks",
      },
      { label: "Answer", nodes: ["Ollama LLM", "Answer with sources"] },
    ],
    decisions: [
      {
        t: "Local inference",
        b: "Models run on my own hardware, so notes are never sent to an external API.",
      },
      {
        t: "Obsidian as source of truth",
        b: "The assistant reads the vault; it doesn\u2019t become another place to store notes.",
      },
      {
        t: "n8n for orchestration",
        b: "Pipelines stay visible and easy to change, rather than buried in scripts.",
      },
    ],
    planned: [],
    stack: [
      "Ollama",
      "Qdrant",
      "Embeddings",
      "RAG",
      "n8n",
      "Obsidian",
      "Docker",
    ],
    links: [],
    images: [],
    note: "separate implemented functionality from planned capabilities.",
  },
  {
    title: "AI Engineering Department",
    subtitle: "Agent workflows for NutriPlatform",
    kind: "wip",
    status: "In use · evolving",
    category: "AI agents · Developer productivity · Workflow automation",
    oneLiner:
      "Specialised Claude Code agents that work from Linear tickets and shared product knowledge — with a human approval step before anything ships or publishes.",
    summary:
      "An engineering workflow initiative behind NutriPlatform: specialised AI-assisted roles for engineering, analysis and marketing, built from custom Claude Code commands, skills, agents and templates.",
    problem:
      "A solo founder carries every role. Much of the work is repetitive — turning a topic into tickets, a ticket into a branch, a release into a post — but the decisions inside it still matter.",
    role: "Designed and built the workflows, agent instructions, reusable templates and the shared product-knowledge documentation they rely on.",
    mine: [],
    team: [],
    highlightsTitle: "THE DEPARTMENT",
    highlights: [
      "Software engineering agent working from Linear tickets and GitHub issues",
      "Business analyst agent that investigates topics and drafts epics and tickets",
      "Marketing agent that researches competitors and drafts social content",
      "Custom Claude Code commands, skills, sub-agents and templates",
      "Shared product knowledge, updated after each completed task",
      "Human approval before merging, filing or publishing",
    ],
    archLabel: "AI engineering department workflow",
    arch: [
      {
        label: "Inputs",
        nodes: ["Linear tickets", "GitHub issues", "Product knowledge docs"],
        edge: "context for",
      },
      {
        label: "Agents",
        nodes: ["Engineering", "Business analyst", "Marketing"],
        edge: "drafts: PRs · epics · posts",
      },
      {
        label: "Human gate",
        nodes: ["Review & approve"],
        edge: "only approved work ships",
      },
      {
        label: "Outputs",
        nodes: ["Merged code", "Planned work", "Published content"],
        edge: "learnings written back",
      },
      { label: "Feedback", nodes: ["Knowledge docs updated"] },
    ],
    decisions: [
      {
        t: "Narrow agents, clear roles",
        b: "Each agent has one job and its own instructions, rather than one general assistant.",
      },
      {
        t: "Humans own irreversible steps",
        b: "Merges, ticket creation and publishing all wait for approval. This is assisted, not autonomous.",
      },
      {
        t: "Knowledge as a shared asset",
        b: "Product docs give every agent the same context and are updated as work completes.",
      },
    ],
    planned: [],
    stack: [
      "Claude Code",
      "Custom skills",
      "Sub-agents",
      "Commands",
      "Linear",
      "GitHub",
    ],
    links: [],
    images: [],
    note: "add examples (redacted ticket → PR) if you want to show the workflow in action. No time savings are claimed.",
  },
];
const SKILLS = [
  {
    title: "Backend engineering",
    items: [
      "TypeScript, JavaScript, Node.js, NestJS, Express",
      "REST APIs and GraphQL",
      "Stripe payments, Opera Cloud and Mews integrations",
      "Authentication and authorisation",
      "Event-driven and asynchronous processing",
      "Integrations, retries, idempotency, error handling",
    ],
  },
  {
    title: "Frontend & mobile",
    items: [
      "React, Next.js",
      "React Native and Expo",
      "Vite, Tailwind CSS",
      "Forms, validation and state management",
      "API integration",
    ],
  },
  {
    title: "Data",
    items: [
      "MongoDB",
      "PostgreSQL, MySQL",
      "Redis",
      "MikroORM",
      "Data modelling and persistence design",
      "Query optimisation",
    ],
  },
  {
    title: "Cloud & infrastructure",
    items: [
      "AWS Lambda, SQS, SNS, EventBridge, S3, EC2",
      "Dead-letter queues and recovery",
      "Docker, Pulumi",
      "CI/CD with GitHub and GitLab",
      "Monitoring and production troubleshooting",
    ],
  },
  {
    title: "AI engineering",
    items: [
      "LLMs and retrieval-augmented generation",
      "Embeddings, Qdrant, Ollama",
      "Local, privacy-conscious AI",
      "n8n automation",
      "Agents: Claude Code skills, sub-agents, hooks, commands",
    ],
  },
  {
    title: "Engineering practice",
    items: [
      "Distributed systems and event-driven architecture",
      "Domain-Driven Design, modular monorepos",
      "Multi-tenant SaaS architecture",
      "Incident management, testing and debugging",
      "Mentoring and code review",
      "Technical documentation",
      "Agile, ticket-driven delivery",
    ],
  },
];
const EXPERIENCE = [
  {
    org: "Remotioned Technologies",
    role: "Senior Software Engineer · Team Lead — London (remote)",
    focus:
      "Leading the booking and integrations domain of a UK hospitality SaaS platform: real-time Opera Cloud and Mews sync, event-driven processing on AWS, and mentoring engineers on the team.",
    dates: "Jan 2025 — Present",
  },
  {
    org: "Remotioned Technologies",
    role: "Full-Stack Developer — London (remote)",
    focus:
      "NestJS APIs for core booking workflows, PMS and payment-gateway integrations, and React / React Native features for the property-management dashboard.",
    dates: "Oct 2022 — Jan 2025",
  },
  {
    org: "Arimac Digital",
    role: "Software Engineer — Colombo",
    focus:
      "React and React Native features for enterprise client apps, plus Node.js services for real-time data sync and push notifications across three concurrent projects.",
    dates: "Jun 2022 — Oct 2022",
  },
  {
    org: "Konekt",
    role: "Software Engineer — Colombo",
    focus:
      "Frontend and backend features in React, React Native and Laravel across client projects; mentored two interns.",
    dates: "Jan 2022 — May 2022",
  },
  {
    org: "Theekshana R&D",
    role: "Software Engineer Intern — Colombo",
    focus:
      "Web applications for government departments, including research into procurement systems and working directly with clients on requirements.",
    dates: "Jul 2021 — Dec 2021",
  },
];
const STEPS = [
  {
    t: "Understand the problem",
    b: "Start from the business goal and the acceptance criteria, not the solution.",
  },
  {
    t: "Investigate the system",
    b: "Read the existing code, data and constraints before proposing change.",
  },
  {
    t: "Design for maintenance",
    b: "Choose the simplest architecture that the next engineer can still reason about.",
  },
  {
    t: "Implement with boundaries",
    b: "Clear modules and abstractions that earn their place.",
  },
  {
    t: "Test what matters",
    b: "Business rules and failure scenarios first — duplicates, timeouts, partial writes.",
  },
  {
    t: "Validate in reality",
    b: "Check integration behaviour and operational reliability, not just green tests.",
  },
  {
    t: "Document and improve",
    b: "Record decisions and keep improving the system after it ships.",
  },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
const BEYOND = [
  {
    t: "Software engineering",
    b: "The foundation: production systems, integrations, reliability.",
    ref: "Hotel Manager",
  },
  {
    t: "AI-assisted development",
    b: "Agents that work from tickets and shared knowledge, under review.",
    ref: "Case study 05",
  },
  {
    t: "Local AI & knowledge",
    b: "Retrieval over private notes with models that run locally.",
    ref: "MudithaOS",
  },
  {
    t: "Products & SaaS",
    b: "Taking ideas to live products real customers can use.",
    ref: "NutriPlatform · LeadFlow",
  },
  {
    t: "Workflow automation",
    b: "Automating the repetitive parts, keeping humans on decisions.",
    ref: "n8n · agents",
  },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
const HERO = [
  {
    label: "Products",
    nodes: ["Hotel Manager", "NutriPlatform", "LeadFlow", "MudithaOS"],
  },
  {
    label: "Services",
    nodes: ["NestJS APIs", "REST · GraphQL", "Auth & tenancy"],
  },
  { label: "Events", nodes: ["EventBridge", "SQS", "Lambda", "DLQ"] },
  { label: "Data", nodes: ["MongoDB", "Redis", "Qdrant"] },
  { label: "AI", nodes: ["RAG", "Ollama", "Agents"] },
].map((l, i, a) => ({ ...l, connector: i < a.length - 1 }));
const NAV = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Approach", "#approach"],
  ["AI", "#ai"],
].map(([label, href]) => ({ label, href }));
