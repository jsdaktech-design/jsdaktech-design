// AIMaargam — service catalog (no pricing per client direction)

window.CATEGORIES = [
  { id: "strategy",   label: "Strategy",   color: "oklch(0.55 0.18 270)" },
  { id: "training",   label: "Training",   color: "oklch(0.62 0.15 200)" },
  { id: "automation", label: "Automation", color: "oklch(0.60 0.16 160)" },
  { id: "analytics",  label: "Analytics",  color: "oklch(0.58 0.17 250)" },
  { id: "industrial", label: "Industrial", color: "oklch(0.62 0.14 60)"  },
  { id: "enterprise", label: "Enterprise", color: "oklch(0.50 0.16 295)" },
];

window.DURATIONS = [
  { id: "days",    label: "Days",        match: (d) => /day/i.test(d) },
  { id: "weeks",   label: "Weeks",       match: (d) => /week/i.test(d) },
  { id: "short",   label: "1\u20133 Months",  match: (d) => /month/i.test(d) && /1\s*[\u2013-]\s*[23]\s*Month/i.test(d) },
  { id: "long",    label: "3+ Months",   match: (d) => /month/i.test(d) && !/1\s*[\u2013-]\s*[23]\s*Month/i.test(d) },
];

window.SERVICES = [
  {
    id: 1, name: "AI Readiness Assessment",
    scope: "Analyze current business processes and identify AI opportunities.",
    duration: "3\u20135 Days", category: "strategy",
    support: "Consultation report, roadmap",
    detail: "A structured audit of your operations, data, and tooling. We map where AI fits and where it does not, with a prioritized roadmap of opportunities and risks.",
    deliverables: ["Discovery interviews", "Opportunity heatmap", "Phased adoption plan"]
  },
  {
    id: 2, name: "AI Awareness Workshop",
    scope: "Basic AI adoption training for teams and management.",
    duration: "1\u20132 Days", category: "training",
    support: "Trainer, materials, certificates",
    detail: "Hands-on sessions that demystify AI for non-technical teams. Covers core concepts, real use cases, and a working vocabulary leaders need to make decisions.",
    deliverables: ["Live workshop", "Take-home playbook", "Participation certificates"]
  },
  {
    id: 3, name: "ChatGPT for Business Training",
    scope: "Productivity and automation using GenAI tools.",
    duration: "1\u20133 Days", category: "training",
    support: "Hands-on training, templates",
    detail: "Practical training for using generative AI inside real workflows \u2014 drafting, analysis, customer comms, and content. Includes prompt libraries built for your team.",
    deliverables: ["Role-based modules", "Prompt library", "Workflow templates"]
  },
  {
    id: 4, name: "AI Policy & Governance Setup",
    scope: "AI usage policies, ethics, and compliance guidance.",
    duration: "1\u20132 Weeks", category: "strategy",
    support: "Documentation and advisory",
    detail: "Governance frameworks that keep AI use safe, compliant, and auditable. Covers data handling, model risk, and acceptable-use policies for staff and vendors.",
    deliverables: ["Policy documents", "Risk register", "Review cadence"]
  },
  {
    id: 5, name: "AI-Powered Website Chatbot",
    scope: "Customer support chatbot integration.",
    duration: "2\u20134 Weeks", category: "automation",
    support: "Deployment and maintenance",
    detail: "A grounded chatbot trained on your knowledge base. Handles tier-one support and lead capture, with handoff paths to humans when needed.",
    deliverables: ["Knowledge ingestion", "Conversation flows", "Analytics dashboard"]
  },
  {
    id: 6, name: "Social Media AI Automation",
    scope: "AI-assisted content generation and scheduling.",
    duration: "2\u20133 Weeks", category: "automation",
    support: "Automation setup and training",
    detail: "An end-to-end content engine: ideation, drafting, scheduling, and performance review. Tuned to your brand voice and posting cadence.",
    deliverables: ["Brand voice tuning", "Editorial workflow", "Scheduler integration"]
  },
  {
    id: 7, name: "AI Resume Screening System",
    scope: "Automated HR candidate filtering solution.",
    duration: "3\u20136 Weeks", category: "automation",
    support: "Deployment and HR training",
    detail: "Cuts time-to-shortlist by ranking applicants against role criteria. Designed with explainability so HR can defend every decision.",
    deliverables: ["Role rubrics", "Screening pipeline", "Reviewer console"]
  },
  {
    id: 8, name: "AI Attendance & Analytics System",
    scope: "Smart attendance with analytics dashboard.",
    duration: "1\u20132 Months", category: "analytics",
    support: "Installation and support",
    detail: "Computer-vision attendance with workforce analytics layered on top \u2014 patterns, anomalies, and a live dashboard for ops and HR.",
    deliverables: ["On-site install", "Dashboard rollout", "Admin training"]
  },
  {
    id: 9, name: "AI Sales Prediction Dashboard",
    scope: "Predictive analytics for sales forecasting.",
    duration: "1\u20132 Months", category: "analytics",
    support: "Dashboard and staff training",
    detail: "Forecasts that adjust to seasonality, pipeline health, and rep activity. Built so revenue leaders can interrogate the model, not just trust it.",
    deliverables: ["Data integration", "Forecast model", "Sales dashboards"]
  },
  {
    id: 10, name: "AI Customer Support Automation",
    scope: "Automated ticketing and support system.",
    duration: "1\u20133 Months", category: "automation",
    support: "Integration and optimization",
    detail: "Routing, triage, draft replies, and resolution suggestions, embedded in your existing helpdesk. Measurable lift on first-response and CSAT.",
    deliverables: ["Helpdesk connectors", "Triage models", "Quality reporting"]
  },
  {
    id: 11, name: "AI Digital Marketing Automation",
    scope: "AI-driven lead generation and campaign optimization.",
    duration: "1\u20132 Months", category: "automation",
    support: "Campaign setup and analytics",
    detail: "Targeting, creative variants, and bid logic informed by your CRM. Campaigns get smarter every cycle without manual tuning.",
    deliverables: ["Audience modeling", "Creative pipeline", "Attribution stack"]
  },
  {
    id: 12, name: "AI ERP Integration",
    scope: "AI integration into ERP and workflow systems.",
    duration: "2\u20134 Months", category: "enterprise",
    support: "Technical implementation",
    detail: "Bring AI into the core of operations \u2014 procurement, finance, inventory. Includes safe rollout patterns that respect existing approvals and controls.",
    deliverables: ["System mapping", "Integration build", "Change management"]
  },
  {
    id: 13, name: "AI-Based Predictive Maintenance",
    scope: "Industrial equipment monitoring and prediction.",
    duration: "2\u20136 Months", category: "industrial",
    support: "Sensors, dashboards, training",
    detail: "Sensor-driven failure prediction for plants and fleets. Reduces unplanned downtime and lets maintenance teams plan, not react.",
    deliverables: ["Sensor deployment", "Predictive models", "Maintenance dashboards"]
  },
  {
    id: 14, name: "AI Vision Inspection System",
    scope: "Computer vision for quality inspection.",
    duration: "2\u20135 Months", category: "industrial",
    support: "Hardware + AI deployment",
    detail: "Vision systems that catch defects faster and more consistently than manual QC. Tuned to your line, your lighting, your tolerance bands.",
    deliverables: ["Line-side cameras", "Defect models", "QA reporting"]
  },
  {
    id: 15, name: "AI Data Analytics Center",
    scope: "Business intelligence and analytics platform.",
    duration: "2\u20134 Months", category: "analytics",
    support: "Dashboards and reporting",
    detail: "A central analytics layer for the business \u2014 a single source of truth with self-serve dashboards for every function.",
    deliverables: ["Data warehouse", "Semantic layer", "Self-serve BI"]
  },
  {
    id: 16, name: "Corporate AI Transformation Program",
    scope: "Enterprise-wide AI adoption strategy.",
    duration: "3\u201312 Months", category: "enterprise",
    support: "Full consulting and mentoring",
    detail: "A multi-quarter program that aligns leadership, builds capability, and ships AI into the lines of business that move the P&L.",
    deliverables: ["Executive alignment", "Capability build", "Portfolio of pilots"]
  },
  {
    id: 17, name: "AI Center of Excellence Setup",
    scope: "Establish an AI lab and innovation center.",
    duration: "4\u201312 Months", category: "enterprise",
    support: "Infrastructure and staffing guidance",
    detail: "Stand up an internal CoE that becomes the engine for AI work across the company \u2014 with the right people, platforms, and operating cadence.",
    deliverables: ["Operating model", "Platform blueprint", "Hiring playbook"]
  },
  {
    id: 18, name: "AI Skill Development Academy",
    scope: "Customized employee AI upskilling ecosystem.",
    duration: "2\u20138 Months", category: "training",
    support: "LMS, trainers, certifications",
    detail: "A curated learning track for every role \u2014 from analysts to executives \u2014 delivered through your LMS, with certifications that matter.",
    deliverables: ["Role-based curricula", "LMS setup", "Certification program"]
  },
  {
    id: 19, name: "Custom Generative AI Platform",
    scope: "Enterprise GPT / LLM solution for business.",
    duration: "3\u20139 Months", category: "enterprise",
    support: "Model deployment and support",
    detail: "Your own grounded GenAI environment \u2014 private, governed, and connected to internal knowledge. Built so non-technical teams can actually use it.",
    deliverables: ["Private deployment", "Knowledge grounding", "App layer"]
  },
  {
    id: 20, name: "End-to-End Industry AI Transformation",
    scope: "Complete AI-driven digital transformation.",
    duration: "6\u201318 Months", category: "enterprise",
    support: "Strategy, implementation, support, optimization",
    detail: "Our most comprehensive engagement \u2014 strategy through execution. Every layer of the business is rethought around AI, with us alongside for the journey.",
    deliverables: ["Transformation roadmap", "Cross-functional delivery", "Sustained partnership"]
  },
];

window.SUPPORT_ADDONS = [
  { name: "AI Strategy Consulting",          desc: "Executive advisory on AI direction, prioritization, and trade-offs." },
  { name: "Faculty Development Programs",    desc: "Educator training so academic institutions can teach modern AI." },
  { name: "Internship & Industry Collaboration", desc: "Structured programs that connect students with real AI work." },
  { name: "AI Certification Programs",       desc: "Recognized, role-aligned certifications across the AI stack." },
  { name: "Annual Maintenance & Technical Support", desc: "Ongoing care for deployed AI systems \u2014 SLAs, updates, fixes." },
  { name: "Cloud Deployment Assistance",     desc: "Architecture and rollout help across major cloud providers." },
  { name: "Data Security Guidance",          desc: "Reviews and patterns to keep AI data and models secure." },
  { name: "Startup & Innovation Mentorship", desc: "Hands-on mentorship for founders building in AI." },
  { name: "Customized Corporate Training",   desc: "Bespoke programs designed around the work your teams actually do." },
  { name: "AI R&D Collaboration",            desc: "Joint research with industry and academic partners." },
];
