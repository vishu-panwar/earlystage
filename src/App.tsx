import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

type IconName =
  | "arrow"
  | "automation"
  | "brand"
  | "briefcase"
  | "check"
  | "code"
  | "document"
  | "finance"
  | "growth"
  | "legal"
  | "marketing"
  | "menu"
  | "phone"
  | "plus"
  | "spark"
  | "strategy"
  | "x";

const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  automation: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><path d="M10 7h5a2 2 0 0 1 2 2v5M14 17H9a2 2 0 0 1-2-2v-5" /></>,
  brand: <><path d="m12 3 2.2 5.1L20 10l-4.2 3.7L17 19l-5-2.8L7 19l1.2-5.3L4 10l5.8-1.9L12 3Z" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
  document: <><path d="M6 3h9l3 3v15H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  finance: <><circle cx="12" cy="12" r="9" /><path d="M15 8.5c-.7-.5-1.6-.8-2.6-.8-1.5 0-2.7.7-2.7 1.9 0 3.1 5.6 1.3 5.6 4.7 0 1.2-1.1 2-2.8 2-1.2 0-2.3-.4-3.1-1M12.5 5.5v2.2M12.5 16.3v2.2" /></>,
  growth: <><path d="M4 19V9M10 19V5M16 19v-7M3 19h18" /><path d="m15 6 3-3 3 3M18 3v8" /></>,
  legal: <><path d="M12 3v18M5 6h14M5 6l-3 7h6L5 6ZM19 6l-3 7h6l-3-7ZM8 21h8" /></>,
  marketing: <><path d="m4 14 12-7v10L4 14Z" /><path d="M7 15v5H4v-6M16 10c2 0 4-1 4-3M16 14c2 0 4 1 4 3" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 5h4M11 18h2" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  spark: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
  strategy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m15 9 6-6M17 3h4v4" /></>,
  x: <><path d="m6 6 12 12M18 6 6 18" /></>,
};

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const services = [
  { slug: "company-registration", icon: "briefcase" as IconName, kicker: "Company registration", title: "Make It Official.", desc: "Get assistance choosing and completing the appropriate business registration process.", tags: ["Structure guidance", "Documentation", "MSME assistance"], accent: "blue" },
  { slug: "legal-compliance", icon: "legal" as IconName, kicker: "Legal & compliance", title: "Build on a Strong Foundation.", desc: "Professional coordination for essential documentation and ongoing compliance needs.", tags: ["Agreements", "Trademark support", "GST assistance"], accent: "green" },
  { slug: "website-development", icon: "code" as IconName, kicker: "Web development", title: "Your Business, Digitally Built.", desc: "A considered digital presence that communicates value and helps customers discover you.", tags: ["Websites", "E-commerce", "Web applications"], accent: "yellow" },
  { slug: "app-development", icon: "phone" as IconName, kicker: "App development", title: "Turn Your Idea Into an App.", desc: "Practical digital products designed around your customers and business requirements.", tags: ["MVPs", "Cross-platform", "SaaS products"], accent: "red" },
  { slug: "branding", icon: "brand" as IconName, kicker: "Branding & design", title: "Build a Brand People Remember.", desc: "A consistent identity that makes your business recognizable, credible, and distinctive.", tags: ["Identity", "Pitch decks", "Packaging"], accent: "blue" },
  { slug: "digital-marketing", icon: "marketing" as IconName, kicker: "Digital marketing", title: "Get Seen. Get Remembered. Grow.", desc: "Build visibility and a structured digital marketing presence without empty promises.", tags: ["SEO", "Campaigns", "Content"], accent: "green" },
  { slug: "business-consulting", icon: "strategy" as IconName, kicker: "Business consulting", title: "Make Better Business Decisions.", desc: "Practical assistance in planning, positioning, and preparing for the next stage.", tags: ["Market research", "GTM planning", "Operations"], accent: "yellow" },
  { slug: "startup-support", icon: "growth" as IconName, kicker: "Startup support", title: "Prepare for Your Next Big Move.", desc: "Prepare for incubators, programs, investor conversations, and responsible growth.", tags: ["Pitch decks", "Applications", "Readiness"], accent: "red" },
  { slug: "financial-support", icon: "finance" as IconName, kicker: "GST, tax & finance", title: "Keep Your Business Organized.", desc: "Qualified coordination for bookkeeping, tax filing, and financial documentation.", tags: ["GST", "Bookkeeping", "Reporting"], accent: "green" },
  { slug: "business-automation", icon: "automation" as IconName, kicker: "Automation & AI", title: "Work Smarter. Build Faster.", desc: "Connected systems that reduce repetitive work and make operations more visible.", tags: ["CRM", "Workflows", "AI tools"], accent: "blue" },
];

const servicePageDetails: Record<string, {
  intro: string;
  deliverables: [string, string][];
  bestFor: string[];
  note: string;
}> = {
  "company-registration": {
    intro: "Choose an appropriate business structure, understand the documentation involved, and coordinate the applicable registration process with greater clarity.",
    deliverables: [["Structure comparison", "A practical comparison of eligible structures based on ownership, operations, and current requirements."], ["Documentation support", "A clear checklist and coordination of the information required for the agreed application."], ["Registration coordination", "Administrative assistance through submission and follow-up, subject to authority processing."]],
    bestFor: ["First-time founders", "Freelancers formalising a venture", "Teams choosing between company structures"],
    note: "Government fees, professional fees, taxes, and third-party charges are disclosed separately. Registration and approval are not guaranteed.",
  },
  "legal-compliance": {
    intro: "Organise essential agreements, policies, registrations, and recurring compliance requirements with the involvement of appropriately qualified professionals.",
    deliverables: [["Business documents", "Coordinate founder agreements, NDAs, website policies, contracts, and other agreed documents."], ["Registration assistance", "Support for eligible GST, trademark, and applicable business documentation processes."], ["Compliance planning", "Map known recurring requirements and identify where specialist advice is required."]],
    bestFor: ["Newly registered businesses", "Founders formalising working relationships", "Digital businesses preparing policies"],
    note: "Administrative support and document preparation are not a substitute for independent legal advice. Regulated work must be performed by qualified professionals.",
  },
  "website-development": {
    intro: "Turn your business positioning into a fast, credible, and usable digital presence designed around real customer journeys.",
    deliverables: [["Experience planning", "Define the site structure, user journeys, content requirements, and conversion priorities."], ["Design and development", "Create responsive interfaces and implement the agreed website or web application scope."], ["Launch support", "Coordinate testing, domain and hosting setup, analytics readiness, and handover."]],
    bestFor: ["Businesses launching online", "D2C and e-commerce brands", "Teams replacing an outdated website"],
    note: "Hosting, domains, paid plugins, content production, and third-party services are identified separately where required.",
  },
  "app-development": {
    intro: "Shape a practical product scope and turn it into a usable mobile experience aligned with your customers and operating model.",
    deliverables: [["Product definition", "Clarify users, core workflows, platform requirements, and a focused MVP scope."], ["UX and application build", "Design and develop the agreed Android, iOS, or cross-platform experience."], ["Release preparation", "Testing, technical documentation, deployment coordination, and structured handover."]],
    bestFor: ["Founders validating a product", "Businesses digitising a service", "Teams building an internal application"],
    note: "App-store acceptance, third-party API availability, and platform review timelines cannot be guaranteed.",
  },
  branding: {
    intro: "Build a clear visual and verbal identity that helps your business look consistent, credible, and recognisable across important touchpoints.",
    deliverables: [["Brand direction", "Define positioning cues, personality, audience context, and the visual territory."], ["Identity system", "Develop the agreed logo, typography, colour, and supporting visual language."], ["Practical applications", "Apply the identity to selected collateral such as stationery, presentations, packaging, or social templates."]],
    bestFor: ["New businesses preparing to launch", "Brands that have outgrown their identity", "Teams needing consistent communication"],
    note: "Trademark clearance and registration are separate legal processes and are not implied by delivery of a brand identity.",
  },
  "digital-marketing": {
    intro: "Create a focused marketing foundation that connects positioning, channels, content, campaigns, and performance reporting.",
    deliverables: [["Marketing plan", "Prioritise audiences, channels, messages, content themes, and realistic campaign objectives."], ["Campaign setup", "Prepare agreed search, social, content, email, or paid campaign activity."], ["Reporting framework", "Define useful performance indicators and a practical review rhythm."]],
    bestFor: ["Businesses preparing a launch", "Brands building consistent visibility", "Teams organising fragmented marketing"],
    note: "Search rankings, leads, sales, advertising performance, and return on investment are not guaranteed.",
  },
  "business-consulting": {
    intro: "Bring structure to important business decisions with research, planning, positioning, and practical operating priorities.",
    deliverables: [["Business model review", "Clarify customers, value proposition, channels, resources, costs, and revenue assumptions."], ["Market perspective", "Organise available market, customer, and competitor information to support decisions."], ["Action roadmap", "Translate priorities into phased, practical next steps and business documentation."]],
    bestFor: ["Entrepreneurs shaping an idea", "Teams planning market entry", "Businesses reviewing their operating model"],
    note: "Recommendations depend on available information and are not a guarantee of commercial performance.",
  },
  "startup-support": {
    intro: "Prepare clear business materials for incubators, programs, grants, and investor conversations without overstating readiness or outcomes.",
    deliverables: [["Pitch narrative", "Structure the problem, opportunity, solution, model, traction context, and ask."], ["Application support", "Coordinate agreed startup program, incubation, grant, or proposal documentation."], ["Readiness review", "Identify gaps in the business story, supporting information, and presentation materials."]],
    bestFor: ["Founders preparing a pitch", "Teams applying to startup programs", "Businesses organising investor materials"],
    note: "Funding, grants, meetings, government recognition, program acceptance, and investment are never guaranteed.",
  },
  "financial-support": {
    intro: "Organise day-to-day financial records, tax coordination, invoicing, and reporting with qualified professional involvement where required.",
    deliverables: [["Finance setup", "Coordinate bookkeeping workflows, invoice systems, and an organised document structure."], ["Tax coordination", "Prepare and route relevant information for GST and tax requirements to authorised professionals."], ["Business reporting", "Define practical financial summaries based on available and verified records."]],
    bestFor: ["Newly operating businesses", "Teams organising financial records", "Businesses preparing recurring reporting"],
    note: "Tax, accounting, certification, and regulated financial work must be performed by appropriately qualified or authorised professionals.",
  },
  "business-automation": {
    intro: "Identify repetitive work and connect practical tools that improve visibility, consistency, and the flow of information.",
    deliverables: [["Process audit", "Map selected workflows, bottlenecks, handoffs, and the information moving between systems."], ["Automation design", "Define suitable CRM, support, lead, reporting, or AI-assisted workflows."], ["Implementation", "Configure agreed tools, integrations, permissions, testing, and team handover."]],
    bestFor: ["Teams managing repetitive tasks", "Businesses losing leads between tools", "Operators needing clearer reporting"],
    note: "Third-party platforms, subscriptions, data quality, and API limitations can affect scope and performance.",
  },
};

const goals = [
  { label: "I have a business idea.", recs: ["Business planning", "Structure guidance", "Brand identity"] },
  { label: "I want to register my company.", recs: ["Structure guidance", "Registration assistance", "Compliance setup"] },
  { label: "I need a website or mobile app.", recs: ["Product scoping", "UX & interface design", "Web or app development"] },
  { label: "I want to build my brand.", recs: ["Brand strategy", "Identity design", "Digital presence"] },
  { label: "I need more customers.", recs: ["Market positioning", "Marketing strategy", "Campaign preparation"] },
  { label: "I need legal or compliance assistance.", recs: ["Requirement review", "Qualified professional support", "Documentation"] },
  { label: "I am preparing to raise funds.", recs: ["Investor readiness", "Financial projection assistance", "Pitch deck"] },
  { label: "I want to automate my operations.", recs: ["Process audit", "Workflow design", "Automation setup"] },
  { label: "I need multiple services.", recs: ["Discovery session", "Prioritized roadmap", "Coordinated delivery"] },
];

const stages = [
  { no: "01", name: "Idea", audience: "For aspiring entrepreneurs", text: "Shape the opportunity before committing resources.", needs: ["Idea validation", "Business model planning", "Market research", "Structure guidance"] },
  { no: "02", name: "Setup", audience: "For businesses preparing to launch", text: "Put the practical foundations in place.", needs: ["Company registration", "Legal documentation", "Branding", "Website development"] },
  { no: "03", name: "Launch", audience: "For businesses entering the market", text: "Go to market with clarity and the right systems.", needs: ["Marketing preparation", "Digital presence", "Sales systems", "Operational tools"] },
  { no: "04", name: "Growth", audience: "For businesses ready to evolve", text: "Improve performance with smarter infrastructure.", needs: ["Automation", "Applications", "Business intelligence", "Process optimization"] },
];

const faqs = [
  ["What is EarlyStage.in?", "EarlyStage.in is a business launch and growth platform designed to help founders identify and access services across registration, compliance, technology, branding, marketing, and business planning."],
  ["Who can use EarlyStage.in?", "Aspiring entrepreneurs, founders, freelancers, MSMEs, D2C brands, local businesses going digital, and established teams preparing for their next stage can explore the platform."],
  ["Can I start with just one service?", "Yes. Services can be discussed individually or combined around a wider business requirement."],
  ["Can you help register a new company?", "Registration assistance can be provided based on your eligibility, chosen structure, documentation, and applicable requirements. Government approval is never guaranteed."],
  ["Do you provide website and mobile app development?", "Yes. Project scope can cover websites, e-commerce, web applications, MVPs, and cross-platform mobile applications."],
  ["Can you help with branding and digital marketing?", "Yes. Branding can include identity and collateral, while marketing support can cover strategy, content, SEO, and campaigns. Rankings, leads, sales, and ROI are not guaranteed."],
  ["Can you assist with startup applications and pitch decks?", "Yes. Assistance can cover application documentation, business proposals, financial projection support, and pitch deck preparation. Funding or program acceptance cannot be guaranteed."],
  ["How are service prices calculated?", "Pricing depends on scope, complexity, deliverables, specialist involvement, and third-party requirements. A written proposal should clarify what is included."],
  ["Are government fees included in service quotations?", "Government charges, professional fees, third-party costs, and taxes should be itemized separately where relevant. Confirm the current quotation before proceeding."],
  ["How does the consultation process work?", "It begins with a short discovery discussion, followed by a recommended scope, priorities, and next steps. Work only begins after you agree to the scope."],
  ["How long will my project take?", "Timelines vary with project scope, responsiveness, documentation, third-party providers, and government processing. An estimated schedule is provided with the scope."],
  ["Can I combine multiple services?", "Yes. A phased roadmap can coordinate related services without implying that every service is automatically part of one package."],
  ["Do you provide ongoing business support?", "Ongoing support may be scoped for maintenance, marketing, compliance coordination, or product evolution based on current requirements."],
  ["Are registrations and approvals guaranteed?", "No. Registrations, government approvals, funding, grants, rankings, and third-party decisions cannot be guaranteed."],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} to="/" aria-label="EarlyStage.in home">
      <img src="./earlystage-logo.png" alt="" aria-hidden="true" />
      <span>EarlyStage<span>.in</span></span>
    </Link>
  );
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={`btn ${secondary ? "btn-secondary" : ""}`} to={href}>{children}<Icon name="arrow" size={18} /></Link>;
}

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = location.pathname;
  
  // Close menu when location changes
  useEffect(() => {
    setOpen(false);
    setMobileServices(false);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const links = [["Home", "/"], ["Services", "/services"], ["Solutions", "/solutions"], ["How It Works", "/how-it-works"], ["About Us", "/about"], ["Resources", "/resources"], ["Contact", "/contact"]];
  return (
    <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav shell" aria-label="Primary navigation">
        <Logo light />
        <div className="nav-links">
          {links.map(([label, href]) => label === "Services" ? (
            <div className="nav-service" key={href}>
              <Link className={currentPath.startsWith("/services") ? "active" : ""} to={href}>Services</Link>
              <div className="service-menu">
                <div className="service-menu-head">
                  <div>
                    <span>Explore the ecosystem</span>
                    <strong>Everything your business needs to move forward.</strong>
                  </div>
                  <Link className="menu-all" to="/services">View all services <Icon name="arrow" size={15} /></Link>
                </div>
                <div className="service-menu-body">
                  <div className="service-menu-grid">
                    {services.map(service => (
                      <Link to={`/services/${service.slug}`} key={service.slug}>
                        <span className={`menu-service-icon accent-${service.accent}`}><Icon name={service.icon} size={18} /></span>
                        <span>
                          <strong>{service.kicker}</strong>
                          <small>{service.desc}</small>
                        </span>
                        <Icon name="arrow" size={15} />
                      </Link>
                    ))}
                  </div>
                  <aside className="menu-roadmap">
                    <span className="menu-roadmap-icon"><Icon name="spark" size={21} /></span>
                    <p>Not sure where to begin?</p>
                    <strong>Build your business roadmap.</strong>
                    <small>Select your goals and get a practical set of recommended next steps.</small>
                    <Link to="/solutions">Find my starting point <Icon name="arrow" size={15} /></Link>
                  </aside>
                </div>
              </div>
            </div>
          ) : <Link className={currentPath === href ? "active" : ""} key={href} to={href}>{label}</Link>)}
        </div>
        <div className="nav-actions"><Link className="login-link" to="/contact">Login</Link><Link className="nav-cta" to="/contact">Launch Your Business</Link></div>
        <button className={`menu-button ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </nav>
      <div className={`mobile-nav-layer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="mobile-nav-backdrop" aria-label="Close navigation" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
        <aside className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-menu-top"><p><span>Navigate</span><strong>Build what comes next.</strong></p><i>IDEA → TAKE OFF</i></div>
          <div className="mobile-links">
            {links.map(([label, href], index) => label === "Services" ? <div className={`mobile-service-group ${mobileServices ? "expanded" : ""}`} key={href}>
              <button onClick={() => setMobileServices(!mobileServices)} aria-expanded={mobileServices}><span>0{index + 1}</span><strong>Services</strong><Icon name="plus" size={19} /></button>
              <div className="mobile-service-list">
                {services.map(service => <Link to={`/services/${service.slug}`} tabIndex={open && mobileServices ? 0 : -1} key={service.slug}><Icon name={service.icon} size={16} /><span>{service.kicker}</span><Icon name="arrow" size={14} /></Link>)}
                <Link className="mobile-view-all" to="/services" tabIndex={open && mobileServices ? 0 : -1}>View all services <Icon name="arrow" size={14} /></Link>
              </div>
            </div> : <Link className={currentPath === href ? "active" : ""} key={href} to={href} tabIndex={open ? 0 : -1}><span>0{index + 1}</span><strong>{label}</strong><Icon name="arrow" size={17} /></Link>)}
          </div>
          <div className="mobile-menu-foot"><Link to="/contact" className="mobile-primary-cta" tabIndex={open ? 0 : -1}>Launch Your Business <Icon name="arrow" size={18} /></Link><p><Icon name="check" size={14} /> Built for founders. Designed for growth.</p></div>
        </aside>
      </div>
    </header>
  );
}

function HeroVisual() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div className="hero-logo-wrap" onPointerMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      setTilt({ x: ((e.clientX - r.left) / r.width - .5) * 5, y: ((e.clientY - r.top) / r.height - .5) * -5 });
    }} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="hero-logo-orbit orbit-outer"><i /><i /><i /></div>
      <div className="hero-logo-orbit orbit-inner" />
      <div className="hero-logo-stage" style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}>
        <div className="hero-logo-glow" />
        <img src="./earlystage-logo.png" alt="EarlyStage.in upward growth logo" fetchPriority="high" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid shell">
        <div className="hero-copy">
          <p className="eyebrow light">Your business. Built for what&apos;s next.</p>
          <h1>Your Idea.<br />Our Expertise.<br />One <span>Powerful Launch.</span></h1>
          <p className="hero-lede">From company registration and legal compliance to technology, branding, and marketing — everything you need to launch and grow your business, all in one place.</p>
          <div className="hero-buttons"><ButtonLink href="/contact">Launch Your Business</ButtonLink><ButtonLink href="#services" secondary>Explore Our Services</ButtonLink></div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text?: string; dark?: boolean }) {
  return <div className={`section-heading ${dark ? "heading-dark" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-lede">{text}</p>}</div>;
}

function Advantage() {
  return (
    <section className="section advantage" id="about">
      <div className="shell">
        <SectionHeading eyebrow="The EarlyStage advantage" title="Starting a Business Shouldn't Feel Complicated." text="Building a business needs more than a great idea. EarlyStage.in brings essential services together so entrepreneurs can spend more energy building their vision." />
        <div className="comparison">
          <div className="compare-card without"><p className="card-kicker">Without the right support</p><h3>Disconnected effort</h3>{["Multiple service providers", "Confusing processes", "Fragmented communication", "Unclear next steps"].map((x, i) => <div className="compare-row" key={x}><span>0{i + 1}</span>{x}</div>)}</div>
          <div className="bridge"><span>One clearer path</span><Icon name="arrow" /></div>
          <div className="compare-card with"><p className="card-kicker">With EarlyStage.in</p><h3>Coordinated progress</h3>{["Connected business services", "A clearer execution roadmap", "Coordinated service delivery", "One place to begin"].map(x => <div className="compare-row" key={x}><Icon name="check" size={18} />{x}</div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Services({ limit }: { limit?: number }) {
  const shown = limit ? services.slice(0, limit) : services;
  return (
    <section className="section services-section" id="services">
      <div className="shell">
        <div className="heading-row"><SectionHeading eyebrow="Everything under one roof" title="From First Step to Full-Scale Growth." text="Access the expertise and services your business needs at every stage of its journey." /><ButtonLink href="/services" secondary>View all services</ButtonLink></div>
        <div className="service-grid">
          {shown.map((service, i) => (
            <article className={`service-card accent-${service.accent}`} key={service.slug}>
              <div className="service-top"><div className="service-icon"><Icon name={service.icon} /></div><span>0{i + 1}</span></div>
              <p className="card-kicker">{service.kicker}</p><h3>{service.title}</h3><p>{service.desc}</p>
              <div className="tag-row">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a className="text-link" href={`/services/${service.slug}`}>Explore service <Icon name="arrow" size={17} /></a>
            </article>
          ))}
          {!limit && <article className="service-card custom-card"><div className="service-icon"><Icon name="plus" /></div><p className="card-kicker">Custom requirements</p><h3>Need Something Different?</h3><p>Tell us what your business needs. We&apos;ll help identify the right service or professional support.</p><ButtonLink href="/contact">Discuss Requirements</ButtonLink></article>}
        </div>
      </div>
    </section>
  );
}

function Discovery() {
  const [selected, setSelected] = useState<number[]>([0]);
  const recommendations = useMemo(() => Array.from(new Set(selected.flatMap(i => goals[i].recs))), [selected]);
  return (
    <section className="section discovery" id="solutions">
      <div className="shell discovery-grid">
        <div><SectionHeading dark eyebrow="Service discovery" title="Where Are You in Your Business Journey?" text="Select one or more goals. We’ll turn the moving pieces into a practical starting point." />
          <div className="goal-grid">{goals.map((goal, i) => <button key={goal.label} className={selected.includes(i) ? "selected" : ""} onClick={() => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}><span>{selected.includes(i) ? <Icon name="check" size={15} /> : i + 1}</span>{goal.label}</button>)}</div>
        </div>
        <aside className="roadmap-panel">
          <div className="roadmap-head"><span>Suggested roadmap</span><small>{selected.length} goal{selected.length === 1 ? "" : "s"} selected</small></div>
          {recommendations.length ? <ol>{recommendations.slice(0, 6).map((rec, i) => <li key={rec}><span>0{i + 1}</span><div><strong>{rec}</strong><small>{i === 0 ? "Recommended starting point" : "Suggested next step"}</small></div></li>)}</ol> : <p className="empty">Select a goal to see suggested next steps.</p>}
          <ButtonLink href="/contact">Create My Business Roadmap</ButtonLink>
          <p className="fine-print">Recommendations are general guidance, not legal, tax, or investment advice.</p>
        </aside>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    ["01", "Discover", "We understand your idea, requirements, goals, budget, and current stage."],
    ["02", "Plan", "We identify relevant services and create a practical roadmap around your priorities."],
    ["03", "Build", "Our team or relevant professionals work on the agreed tasks and deliverables."],
    ["04", "Launch", "Prepare for launch with an organized handover of the agreed work."],
    ["05", "Grow", "Access additional services as your business and requirements evolve."],
  ];
  return <section className="section journey" id="how-it-works"><div className="shell"><SectionHeading eyebrow="How it works" title="One Partner. A Clearer Path Forward." /><div className="journey-path">{steps.map(([no, name, text], i) => <article key={name} style={{ "--step": i } as React.CSSProperties}><div className="milestone">{no}</div><p className="card-kicker">Stage {no}</p><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>;
}

function StageExplorer() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return <section className="section stage-section"><div className="shell"><SectionHeading eyebrow="Services that evolve with you" title="Support for Every Stage of Your Journey." /><div className="stage-tabs" role="tablist">{stages.map((s, i) => <button key={s.name} role="tab" aria-selected={active === i} onClick={() => setActive(i)}><span>{s.no}</span>{s.name}</button>)}</div><div className="stage-content"><div><p className="card-kicker">{stage.audience}</p><h3>{stage.name} stage</h3><p>{stage.text}</p><ButtonLink href="/contact">Plan my next step</ButtonLink></div><div className="needs-list">{stage.needs.map((need, i) => <div key={need}><span>0{i + 1}</span>{need}<Icon name="arrow" size={18} /></div>)}</div></div></div></section>;
}

function WhyUs() {
  const items = [["One connected experience", "Explore essential business services through one considered platform."], ["Founder-first approach", "Recommendations begin with the business's actual needs."], ["Practical execution", "Clear scopes, defined deliverables, and visible next steps."], ["Flexible service selection", "Choose one service or discuss a coordinated combination."], ["Technology-driven thinking", "Use modern tools and automation where they meaningfully help."], ["Growth-ready support", "Find additional support as your business requirements evolve."]];
  return <section className="section why"><div className="shell why-grid"><SectionHeading dark eyebrow="Why EarlyStage.in?" title="Built Around Early-Stage Businesses." text="Serious support without the noise, vague promises, or one-size-fits-all packages." /><div className="why-list">{items.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}

function Work() {
  return <section className="section work"><div className="shell"><div className="heading-row"><SectionHeading eyebrow="Selected explorations" title="Good Ideas Deserve Great Execution." text="No verified client case studies have been supplied yet. These clearly labeled concepts show the intended range of work." /></div><div className="work-grid">
    <article className="work-card work-one"><div className="browser"><div /><div className="browser-copy"><span>CONCEPT 01</span><strong>Modern commerce,<br />made focused.</strong><i /></div></div><p className="card-kicker">Concept exploration · D2C</p><h3>A digital launch system for an emerging consumer brand.</h3><span className="work-tags">Identity · E-commerce · Launch strategy</span></article>
    <article className="work-card work-two"><div className="phone-stack"><div><span>CONCEPT</span><i /><i /><i /></div><div><Icon name="growth" /><strong>42 tasks</strong><small>Organized for launch</small></div></div><p className="card-kicker">Concept exploration · SaaS</p><h3>A clear, usable operating workspace for small teams.</h3><span className="work-tags">Product design · MVP · Automation</span></article>
  </div></div></section>;
}

function Toolkit() {
  const tasks = ["Clarify the business problem", "Compare suitable business structures", "Prepare required documentation", "Define brand foundations", "Plan the digital presence", "Outline a launch strategy"];
  const [done, setDone] = useState<number[]>([]);
  return <section className="section toolkit" id="resources"><div className="shell toolkit-grid"><div><SectionHeading dark eyebrow="Business starter toolkit" title="Turn a Big Idea Into Clear Next Steps." text="A practical starter checklist to help organize the questions worth answering before launch." /><div className="resource-links">{["Registration guide", "Structure comparison", "Website checklist", "Branding checklist", "Pitch deck guide", "Documentation checklist"].map(x => <a href="/resources" key={x}>{x}<Icon name="arrow" size={16} /></a>)}</div></div><div className="checklist"><div className="progress-head"><div><span>Startup checklist</span><strong>{done.length} of {tasks.length} complete</strong></div><b>{Math.round(done.length / tasks.length * 100)}%</b></div><div className="progress-track"><i style={{ width: `${done.length / tasks.length * 100}%` }} /></div>{tasks.map((task, i) => <label key={task}><input type="checkbox" checked={done.includes(i)} onChange={() => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i])} /><span><Icon name="check" size={15} /></span>{task}</label>)}<p className="fine-print">Requirements differ by structure, location, industry, and applicable law.</p></div></div></section>;
}

function Estimator() {
  const options = ["Registration assistance", "Legal documentation", "Website development", "Mobile app development", "Branding", "Marketing", "Business consulting", "Automation"];
  const [selected, setSelected] = useState<string[]>([]);
  const [complexity, setComplexity] = useState("Standard");
  return <section className="section estimator"><div className="shell"><SectionHeading eyebrow="Project planner" title="Plan Your Business Launch." text="Build a service summary for a tailored quotation. Verified public pricing has not been configured, so the tool will not invent a number." /><div className="estimator-box"><div><p className="form-label">1. Select the services you need</p><div className="estimate-options">{options.map(x => <button className={selected.includes(x) ? "selected" : ""} onClick={() => setSelected(s => s.includes(x) ? s.filter(v => v !== x) : [...s, x])} key={x}><span>{selected.includes(x) && <Icon name="check" size={14} />}</span>{x}</button>)}</div><p className="form-label">2. Choose approximate complexity</p><div className="segmented">{["Basic", "Standard", "Advanced"].map(x => <button className={complexity === x ? "selected" : ""} onClick={() => setComplexity(x)} key={x}>{x}</button>)}</div></div><aside><p className="card-kicker">Your project summary</p><h3>{selected.length ? `${selected.length} selected service${selected.length > 1 ? "s" : ""}` : "Start by selecting services"}</h3>{selected.map(x => <div className="summary-item" key={x}><Icon name="check" size={16} />{x}</div>)}<div className="quote-state"><small>Estimated professional fees</small><strong>Custom quote required</strong><p>Complexity: {complexity}. Government charges, third-party costs, and applicable taxes will be identified separately where relevant.</p></div><ButtonLink href="/contact">Request My Estimate</ButtonLink><p className="fine-print">Any estimate provided after consultation is indicative and not a binding quotation.</p></aside></div></div></section>;
}

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "error">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setState("error");
  };
  return <form className={`lead-form ${compact ? "compact-form" : ""}`} onSubmit={submit}>
    <div className="field-row"><label>Full name<input required name="name" autoComplete="name" placeholder="Your full name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label></div>
    <div className="field-row"><label>Phone number<input required type="tel" name="phone" autoComplete="tel" placeholder="+91" /></label><label>Business stage<select name="stage" required defaultValue=""><option value="" disabled>Select your stage</option>{stages.map(s => <option key={s.name}>{s.name}</option>)}</select></label></div>
    {!compact && <><div className="field-row"><label>Business name <small>Optional</small><input name="business" autoComplete="organization" placeholder="Your business or idea" /></label><label>Approximate budget <small>Optional</small><select name="budget" defaultValue=""><option value="">Select a range</option><option>Not decided yet</option><option>Under ₹50,000</option><option>₹50,000 – ₹2,00,000</option><option>₹2,00,000 – ₹5,00,000</option><option>Above ₹5,00,000</option></select></label></div><label>Services required<select name="service" required defaultValue=""><option value="" disabled>Choose a primary service</option>{services.map(s => <option key={s.slug}>{s.kicker}</option>)}</select></label><label>Tell us about the project<textarea required name="message" rows={4} placeholder="What are you building, and what support do you need?" /></label></>}
    <label className="consent"><input required type="checkbox" /><span><Icon name="check" size={13} /></span>I agree to be contacted about this enquiry and acknowledge the privacy notice.</label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="btn submit-btn" type="submit">{compact ? "Request a consultation" : "Start My Business Journey"}<Icon name="arrow" size={18} /></button>
    {state === "error" && <p className="form-message error" role="alert">Secure lead submission is not configured yet. No data was sent. Connect the server-side lead endpoint to enable enquiries.</p>}
  </form>;
}

function Conversion() {
  return <section className="section conversion" id="contact"><div className="shell conversion-grid"><div><p className="eyebrow light">Your next chapter</p><h2>Your Business Journey Starts Here.</h2><p>Tell us what you&apos;re building. Let&apos;s identify the right services to help bring your business vision to life.</p><div className="conversion-shape"><i /><i /><i /></div></div><LeadForm /></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="section faq" id="faq"><div className="shell faq-grid"><SectionHeading eyebrow="Questions, answered" title="Clear Answers Before You Begin." text="Transparent information matters. If your question is more specific, start a consultation." /><div className="accordion">{faqs.map(([q, a], i) => <div className={`faq-item ${open === i ? "open" : ""}`} key={q}><button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><Icon name={open === i ? "x" : "plus"} size={19} /></button>{open === i && <div className="faq-answer"><p>{a}</p></div>}</div>)}</div></div></section>;
}

function Footer() {
  const groups = [
    ["Company", [["About Us", "/about"], ["Our Approach", "/how-it-works"], ["Contact", "/contact"]]],
    ["Services", [["Company Registration", "/services/company-registration"], ["Legal & Compliance", "/services/legal-compliance"], ["Website Development", "/services/website-development"], ["App Development", "/services/app-development"], ["Branding", "/services/branding"], ["Automation", "/services/business-automation"]]],
    ["Resources", [["Startup Guides", "/resources"], ["Business Checklists", "/resources"], ["FAQs", "/#faq"]]],
    ["Legal", [["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms"], ["Service Disclaimer", "/terms"]]],
  ] as const;
  return <footer><div className="shell footer-grid"><div className="footer-brand"><Logo light /><p>Where Indian Businesses Take Off.</p></div>{groups.map(([title, links]) => <div className="footer-links" key={title}><strong>{title}</strong>{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}</div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} EarlyStage.in</span><span>Built for founders. Designed for growth.</span></div></footer>;
}

function HomeLaunchSystem() {
  return <section className="home-system"><div className="shell"><div className="home-system-head"><div><p className="eyebrow">The launch operating system</p><h2>Different Experts.<br />One Business Context.</h2></div><p>EarlyStage.in is designed to connect the practical work around a business—not bundle everything blindly. Start with what matters now, then add the right capability when the business is ready.</p></div><div className="system-map"><div className="system-core"><span>EARLYSTAGE.IN</span><strong>Your business<br />at the centre.</strong><small>One evolving context</small></div><div className="system-line line-one" /><div className="system-line line-two" /><div className="system-line line-three" /><div className="system-line line-four" /><article className="system-node system-legal"><span><Icon name="legal" /></span><div><small>FOUNDATION</small><strong>Structure & compliance</strong><p>Set up the essentials responsibly.</p></div></article><article className="system-node system-build"><span><Icon name="code" /></span><div><small>BUILD</small><strong>Digital products</strong><p>Create useful customer experiences.</p></div></article><article className="system-node system-brand"><span><Icon name="brand" /></span><div><small>POSITION</small><strong>Brand & presence</strong><p>Communicate with more clarity.</p></div></article><article className="system-node system-grow"><span><Icon name="growth" /></span><div><small>EVOLVE</small><strong>Growth & systems</strong><p>Improve how the business operates.</p></div></article></div></div></section>;
}

function HomeServiceCommand() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const details = servicePageDetails[service.slug];
  return <section className="home-command" id="services"><div className="shell"><div className="home-command-head"><SectionHeading dark eyebrow="Business capability map" title="Ten Capabilities. Activated Around Your Priorities." text="Explore one capability at a time. The right starting point depends on your stage, blockers, and current resources." /><span className="command-count">{String(active + 1).padStart(2, "0")}<i />{String(services.length).padStart(2, "0")}</span></div><div className="command-layout"><div className="command-list" role="tablist">{services.map((item, i) => <button role="tab" aria-selected={active === i} onClick={() => setActive(i)} key={item.slug}><span>{String(i + 1).padStart(2, "0")}</span><Icon name={item.icon} size={18} />{item.kicker}<Icon name="arrow" size={15} /></button>)}</div><div className="command-detail"><div className={`command-icon accent-${service.accent}`}><Icon name={service.icon} size={34} /></div><p className="card-kicker">{service.kicker}</p><h3>{service.title}</h3><p>{details.intro}</p><div className="command-deliverables">{details.deliverables.map(([title], i) => <span key={title}><b>0{i + 1}</b>{title}</span>)}</div><a className="command-link" href={`/services/${service.slug}`}>Explore {service.kicker.toLowerCase()} <Icon name="arrow" size={17} /></a><small>{details.note}</small></div></div></div></section>;
}

function HomeFounderPaths() {
  const paths = [
    { label: "I’m shaping an idea", title: "Make the opportunity clearer before building.", text: "Turn assumptions into a basic business model, understand the market context, and decide what needs validation first.", icon: "spark" as IconName, steps: ["Business model", "Market perspective", "Validation plan"], link: "/solutions" },
    { label: "I’m preparing to launch", title: "Bring the critical launch pieces into sequence.", text: "Coordinate structure, documentation, brand, digital presence, and launch preparation without treating everything as equally urgent.", icon: "briefcase" as IconName, steps: ["Business setup", "Brand foundation", "Digital launch"], link: "/solutions" },
    { label: "I’m already operating", title: "Fix friction and build stronger operating systems.", text: "Identify disconnected tools, unclear workflows, weak customer touchpoints, or marketing gaps that are slowing the business down.", icon: "automation" as IconName, steps: ["Process review", "Priority fixes", "System improvement"], link: "/solutions" },
  ];
  const [active, setActive] = useState(0);
  const item = paths[active];
  return <section className="home-paths"><div className="shell"><div className="paths-intro"><p className="eyebrow">Start from where you are</p><h2>No Two Founder Journeys Begin at the Same Point.</h2><p>Choose the situation that sounds closest to yours. It changes the questions worth asking and the work worth prioritising.</p></div><div className="path-selector">{paths.map((path, i) => <button className={active === i ? "active" : ""} onClick={() => setActive(i)} key={path.label}><span>0{i + 1}</span>{path.label}</button>)}</div><div className="path-stage"><div className="path-stage-copy"><span className="path-icon"><Icon name={item.icon} size={26} /></span><p className="card-kicker">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p><ButtonLink href={item.link}>Explore my stage</ButtonLink></div><div className="path-steps">{item.steps.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong><i /></div>)}</div></div></div></section>;
}

function HomeExecutionModel() {
  const items = [
    ["Context before recommendations", "We begin with the business stage, requirement, constraints, and immediate priorities—not a preselected package."],
    ["Scope before execution", "Deliverables, responsibilities, dependencies, exclusions, fees, and relevant third-party costs should be visible first."],
    ["Specialists where required", "Legal, tax, accounting, and other regulated work must involve appropriately qualified professionals."],
    ["No outcome theatre", "No fabricated success rates, guaranteed approvals, guaranteed funding, rankings, leads, or returns."],
  ];
  return <section className="home-execution"><div className="shell execution-grid"><div className="execution-visual"><div className="execution-axis"><span>DISCOVER</span><span>DEFINE</span><span>DELIVER</span><span>EVOLVE</span></div><div className="execution-stack"><i /><i /><i /><i /><strong>CLARITY<br />AT EVERY<br />HANDOFF</strong></div></div><div className="execution-copy"><p className="eyebrow light">A more responsible way to build</p><h2>Serious Execution Starts With Clear Expectations.</h2><p className="execution-lede">A premium experience is not just visual. It means knowing what is being done, who is responsible, and where uncertainty still exists.</p><div className="execution-list">{items.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></div></section>;
}

function HomeWorkspace() {
  return <section className="home-workspace"><div className="shell"><div className="workspace-heading"><SectionHeading eyebrow="Founder workspace" title="Useful Tools Before You Commit to a Project." text="Organise your thinking, compare priorities, and prepare better inputs for the next conversation." /><ButtonLink href="/resources" secondary>Open resources</ButtonLink></div><div className="workspace-grid"><a className="workspace-card workspace-roadmap" href="/solutions"><div className="workspace-preview"><span>YOUR BUSINESS ROADMAP</span>{["Business direction", "Foundation", "Digital build", "Launch readiness"].map((x,i) => <i key={x}><b>{i + 1}</b>{x}</i>)}</div><div><p className="card-kicker">Interactive planner</p><h3>Find a practical starting point.</h3><span>Build my roadmap <Icon name="arrow" size={16} /></span></div></a><a className="workspace-card workspace-estimate" href="/#planner"><div className="workspace-preview"><span>PROJECT SCOPE</span><strong>Custom quote<br />required</strong><small>Professional fees · Third-party costs · Taxes</small></div><div><p className="card-kicker">Scope builder</p><h3>Organise services for an estimate.</h3><span>Plan my project <Icon name="arrow" size={16} /></span></div></a><a className="workspace-card workspace-check" href="/resources"><div className="workspace-preview"><span>LAUNCH CHECKLIST</span><strong>0 / 6</strong><i><b /></i><small>Prepare your foundations</small></div><div><p className="card-kicker">Founder checklist</p><h3>Turn broad tasks into visible progress.</h3><span>Start the checklist <Icon name="arrow" size={16} /></span></div></a></div></div></section>;
}

function HomeTestimonials() {
  const standards = [
    ["Real identity", "A founder or authorised business representative."],
    ["Real engagement", "The service discussed must have actually been delivered."],
    ["Responsible claims", "No edited, exaggerated, or guaranteed-outcome statements."],
  ];
  return <section className="home-testimonials"><div className="shell"><div className="testimonial-heading"><div><p className="eyebrow light">Founder stories</p><h2>Trust Should Be Earned, Not Invented.</h2></div><p>Verified client testimonials have not been supplied yet. Rather than publishing fictional praise, this space is ready for genuine founder experiences when permission and source details are available.</p></div><div className="testimonial-stage"><div className="testimonial-empty"><span className="quote-mark">“</span><p className="card-kicker">Verified stories coming soon</p><h3>Real work. Real founders.<br />Real words only.</h3><p>Future testimonials can include the founder&apos;s approved quote, business name, service delivered, and a link to the related case study where available.</p><ButtonLink href="/contact">Share Your Experience</ButtonLink></div><div className="testimonial-standards"><span className="standards-label">Publishing standard</span>{standards.map(([title,text],i) => <article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="check" size={18} /></article>)}</div></div></div></section>;
}

function HomeClosing() {
  return <section className="home-closing"><div className="shell home-closing-grid"><div className="closing-logo-visual"><div className="closing-logo-orbit"><i /><i /><i /></div><img src="./earlystage-logo.png" alt="EarlyStage.in upward growth logo" /><span>IDEA</span><strong>TAKE OFF</strong></div><div><p className="eyebrow light">Move with more clarity</p><h2>Your Business Does Not Need More Noise. It Needs a Next Step.</h2><p>Share the business context, the challenge in front of you, and what progress would look like. We&apos;ll help identify a responsible place to begin.</p><div><ButtonLink href="/contact">Start a Business Conversation</ButtonLink><ButtonLink href="/services" secondary>Explore the Ecosystem</ButtonLink></div><small>No guaranteed approvals, funding, rankings, leads, sales, or commercial outcomes.</small></div></div></section>;
}

function HomePage() {
  return <><Hero /><HomeLaunchSystem /><HomeServiceCommand /><HomeFounderPaths /><HomeExecutionModel /><HomeWorkspace /><HomeTestimonials /><div id="planner"><Estimator /></div><HomeClosing /></>;
}

function ServicePage({ slug }: { slug: string }) {
  const service = services.find(s => s.slug === slug) ?? services[0];
  const details = servicePageDetails[service.slug] ?? servicePageDetails["company-registration"];
  return <><section className="inner-hero"><div className="shell inner-grid"><div><p className="eyebrow light">{service.kicker}</p><h1>{service.title}</h1><p>{details.intro}</p><ButtonLink href="/contact">Discuss your requirements</ButtonLink></div><div className={`inner-visual accent-${service.accent}`}><Icon name={service.icon} size={54} /><span>{service.kicker}</span></div></div></section><section className="section detail"><div className="shell detail-grid"><div><p className="eyebrow">What we can explore</p><h2>A clear scope from the start.</h2><p className="detail-intro">Every engagement is shaped around agreed requirements, dependencies, deliverables, and timelines.</p></div><div>{details.deliverables.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section className="section service-fit"><div className="shell service-fit-grid"><div><p className="eyebrow">Who this can help</p><h2>Designed for the stage you&apos;re in.</h2></div><div>{details.bestFor.map(item => <p key={item}><Icon name="check" size={18} />{item}</p>)}<div className="service-disclosure"><Icon name="document" /><span><strong>Important to know</strong>{details.note}</span></div></div></div></section><Conversion /></>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="inner-hero simple"><div className="shell"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>;
}

function AboutPage() {
  const values = [["Clarity", "Explain what is relevant, what is included, and what happens next."], ["Credibility", "Use transparent scopes and avoid claims that cannot be responsibly supported."], ["Execution", "Turn broad requirements into practical work and agreed deliverables."], ["Growth", "Build foundations that can evolve as the business moves forward."]];
  return <><PageHero eyebrow="About EarlyStage.in" title="Business Building, Made More Coherent." text="EarlyStage.in is being built as a practical launch and growth platform for Indian entrepreneurs navigating the many moving parts of starting a business." /><section className="section about-story"><div className="shell story-grid"><div><p className="eyebrow">Why we exist</p><h2>A great idea needs more than scattered advice.</h2></div><div><p>Founders often coordinate registrations, legal documents, technology, branding, and marketing through disconnected providers. That makes an already difficult journey harder to understand and manage.</p><p>Our mission is to create a clearer place to begin: understand the business, identify the relevant support, define a sensible sequence, and coordinate execution without pretending every founder needs the same package.</p></div></div></section><section className="section values-section"><div className="shell"><SectionHeading eyebrow="What guides the platform" title="Built on Four Working Principles." /><div className="values-grid">{values.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><WhyUs /><Conversion /></>;
}

function SolutionsPage() {
  return <><PageHero eyebrow="Business-stage solutions" title="Start With Your Situation, Not a Service Catalogue." text="Tell us where the business stands today. The right roadmap can combine individual services in a sequence shaped around your priorities." /><Discovery /><StageExplorer /><section className="section solution-principles"><div className="shell"><SectionHeading eyebrow="A responsible recommendation" title="What Shapes a Suggested Roadmap." /><div className="values-grid">{[["Current stage", "An idea needs different foundations from an operating business."], ["Urgency", "Immediate blockers are separated from work that can be phased later."], ["Dependencies", "Some deliverables need to exist before other work can begin."], ["Budget context", "Priorities should fit the available resources without hiding essential costs."]].map(([title,text],i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><Conversion /></>;
}

function HowItWorksPage() {
  return <><PageHero eyebrow="Our approach" title="A Clear Process From First Conversation to Handover." text="Every engagement begins with context, moves through an agreed scope, and keeps responsibilities and next steps visible." /><Journey /><section className="section process-detail"><div className="shell process-grid"><div><p className="eyebrow">Before work begins</p><h2>Know What You&apos;re Agreeing To.</h2><p>A proposal should define the scope, deliverables, dependencies, responsibilities, estimated schedule, professional fees, third-party costs, applicable taxes, and any important exclusions.</p></div><div className="process-cards">{[["01", "Discovery summary", "A shared understanding of the business, goals, current constraints, and requested support."], ["02", "Written scope", "The work, outputs, revision expectations, assumptions, and commercial terms."], ["03", "Delivery rhythm", "Agreed communication, reviews, approvals, and the information required from each side."], ["04", "Organised handover", "Final deliverables, relevant access, documentation, and recommended next steps."]].map(([no,title,text]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><FAQ /><Conversion /></>;
}

function ResourcesPage() {
  const guides = [["Business registration guide", "Questions to consider when comparing common business structures."], ["Startup launch checklist", "A practical overview of tasks founders often organise before launch."], ["Website launch checklist", "Content, domain, analytics, testing, and handover considerations."], ["Brand foundation guide", "The basic decisions that help a new identity stay consistent."], ["Pitch deck preparation", "A framework for organising an investor or program presentation."], ["Business documents checklist", "A starting list that must be adapted to structure, industry, and location."]];
  return <><PageHero eyebrow="Founder resources" title="Practical Guides for the Work Ahead." text="Use structured checklists and plain-language guides to organise decisions, ask better questions, and prepare for specialist conversations." /><section className="section resource-library"><div className="shell"><SectionHeading eyebrow="Resource library" title="Build Your Founder Toolkit." /><div className="resource-card-grid">{guides.map(([title,text],i) => <article key={title}><span><Icon name={i % 2 ? "document" : "briefcase"} /></span><p className="card-kicker">Guide {String(i+1).padStart(2,"0")}</p><h3>{title}</h3><p>{text}</p><small>Coming to the resource library</small></article>)}</div></div></section><Toolkit /><section className="section resource-notice"><div className="shell"><Icon name="legal" /><div><h3>Use guides as a starting point.</h3><p>Requirements differ by business structure, location, industry, and applicable law. General resources are not legal, tax, accounting, or investment advice.</p></div></div></section></>;
}

function ContactPage() {
  const enquiryTypes = [
    ["briefcase" as IconName, "Start a business", "Registration, structure, compliance, and launch planning."],
    ["code" as IconName, "Build a digital product", "Websites, applications, MVPs, and connected systems."],
    ["brand" as IconName, "Create market presence", "Brand identity, content, campaigns, and growth preparation."],
    ["strategy" as IconName, "Solve a business challenge", "Planning, research, automation, or a custom requirement."],
  ];
  return <><section className="contact-hero"><div className="shell contact-hero-grid"><div className="contact-hero-copy"><p className="eyebrow light">Contact EarlyStage.in</p><h1>Let&apos;s Turn Your Next Step Into a Clear Plan.</h1><p>Share where your business stands, what you are trying to achieve, and where you need support. We&apos;ll use that context to identify a more useful starting point.</p><div className="contact-promise"><span><Icon name="check" size={16} /> Requirement-led conversation</span><span><Icon name="check" size={16} /> Clear next-step recommendation</span><span><Icon name="check" size={16} /> No guaranteed-outcome claims</span></div></div><div className="contact-orbit" aria-hidden="true"><i /><i /><i /><span><Icon name="arrow" size={25} /></span><b>IDEA</b><strong>NEXT<br />STEP</strong></div></div></section><section className="contact-main"><div className="shell contact-main-grid"><aside className="contact-sidebar"><p className="eyebrow">Choose your starting point</p><h2>What would you like to move forward?</h2><div className="enquiry-types">{enquiryTypes.map(([icon,title,text]) => <a href="#contact-form" key={title}><span><Icon name={icon} size={19} /></span><p><strong>{title}</strong><small>{text}</small></p><Icon name="arrow" size={16} /></a>)}</div><div className="response-card"><span>What happens next?</span><ol><li><b>01</b> We review the context supplied.</li><li><b>02</b> Relevant questions and priorities are identified.</li><li><b>03</b> Any proposed work is shared in a written scope.</li></ol></div></aside><div className="contact-form-panel" id="contact-form"><div className="contact-form-head"><p className="eyebrow">Business enquiry</p><h2>Tell Us What You&apos;re Building.</h2><p>Useful context helps make the first conversation more practical. Optional fields can be left blank.</p></div><LeadForm /><div className="contact-privacy"><Icon name="legal" size={18} /><p>Your details should only be used to respond to this enquiry. The secure submission backend and verified privacy contact must be configured before live data collection begins.</p></div></div></div></section><section className="contact-detail-strip"><div className="shell"><div><span>General enquiries</span><strong>Contact details pending verification</strong></div><div><span>Business hours</span><strong>To be confirmed</strong></div><div><span>Office / remote</span><strong>Service location not yet published</strong></div></div></section><FAQ /></>;
}

function LegalPage({ type }: { type: "privacy-policy" | "terms" }) {
  const privacy = [
    ["Current data collection status", "The enquiry interface validates information in the browser, but a server-side submission endpoint has not been configured. The current form therefore does not transmit or store submitted enquiry data."],
    ["Information intended for collection", "Once configured, enquiries may include name, email address, phone number, business name, business stage, requested services, budget range, consent status, and project description."],
    ["Purpose and lawful handling", "Enquiry information should only be used to respond to requests, evaluate service requirements, maintain business records, prevent abuse, and meet applicable legal obligations."],
    ["Service providers and retention", "A production policy must identify the hosting, email, CRM, analytics, security, and storage providers actually used, along with appropriate retention periods."],
    ["Your choices", "A verified privacy contact and process for access, correction, deletion, withdrawal, or other applicable requests must be published before data collection is enabled."],
  ];
  const terms = [
    ["Platform information", "Website content provides general information about potential service categories. It is not a binding offer, professional opinion, or guarantee that a service is suitable or available."],
    ["Scopes and commercial terms", "Work should only begin after a written scope identifies deliverables, responsibilities, timelines, professional fees, government charges, third-party costs, taxes, exclusions, and payment terms."],
    ["Professional services", "Regulated legal, tax, accounting, financial, or other professional work must be carried out by appropriately qualified or authorised professionals."],
    ["Third-party decisions", "Registrations, approvals, funding, grants, program acceptance, app-store reviews, advertising outcomes, search rankings, and other third-party decisions are not guaranteed."],
    ["Intellectual property and confidentiality", "Project-specific ownership, licences, portfolio permissions, confidentiality, and handling of supplied materials must be defined in the applicable agreement."],
    ["Cancellations and refunds", "A verified refund and cancellation policy must be supplied for publication. Project-specific terms should address completed work, committed third-party costs, and non-refundable items."],
  ];
  const isPrivacy = type === "privacy-policy";
  const sections = isPrivacy ? privacy : terms;
  return <><PageHero eyebrow="Legal information" title={isPrivacy ? "Privacy Policy." : "Terms of Service."} text={isPrivacy ? "A transparent summary of the intended handling of enquiry data and the configuration still required before collection begins." : "The principles that should govern use of the platform and any future service engagement."} /><section className="section legal-content"><div className="shell legal-grid"><aside><span>Document status</span><strong>Draft for configuration</strong><p>Effective date and verified business/legal details must be added before production publication.</p></aside><div>{sections.map(([title,text],i) => <article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div></div></section></>;
}

function StandardPage({ type }: { type: string }) {
  if (type === "solutions") return <SolutionsPage />;
  if (type === "how-it-works") return <HowItWorksPage />;
  if (type === "resources") return <ResourcesPage />;
  if (type === "contact") return <ContactPage />;
  if (type === "privacy-policy" || type === "terms") return <LegalPage type={type} />;
  return <AboutPage />;
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={
            <>
              <section className="inner-hero simple">
                <div className="shell">
                  <p className="eyebrow light">The EarlyStage ecosystem</p>
                  <h1>Expertise for Every Part of the Build.</h1>
                  <p>Explore practical support across business setup, professional services, technology, brand, marketing, and operations.</p>
                </div>
              </section>
              <Services />
            </>
          } />
          <Route path="/services/:slug" element={<ServicePageWrapper />} />
          <Route path="/solutions" element={<StandardPage type="solutions" />} />
          <Route path="/how-it-works" element={<StandardPage type="how-it-works" />} />
          <Route path="/about" element={<StandardPage type="about" />} />
          <Route path="/resources" element={<StandardPage type="resources" />} />
          <Route path="/contact" element={<StandardPage type="contact" />} />
          <Route path="/privacy-policy" element={<StandardPage type="privacy-policy" />} />
          <Route path="/terms" element={<StandardPage type="terms" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function ServicePageWrapper() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop() ?? "";
  return <ServicePage slug={slug} />;
}
