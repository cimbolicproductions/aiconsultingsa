import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Zap,
  Target,
  TrendingUp,
  Shield,
  MapPin,
  Phone,
  Mail,
  Star,
  Lightbulb,
  Settings,
  Cpu,
  Users,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  Workflow,
  Code,
  Brain,
  Building2,
  Factory,
  Truck,
  Wrench
} from 'lucide-react';

export default function AIConsultingServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeLevel, setActiveLevel] = useState(1);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const serviceLevels = [
    {
      level: 1,
      title: "AI Education & Feature Discovery",
      subtitle: "Unlock Hidden Value in Tools You Already Have",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Most businesses use less than 20% of the AI capabilities already available to them. We show you the features that save hours instantly—no new systems required.",
      coreQuestion: '"Did you know your existing tools can do THIS?"',
      outcomes: [
        "30%+ time savings from day one",
        "Zero development work required",
        "Immediate ROI with no learning curve",
        "Team confidence using AI daily"
      ],
      examples: [
        "Automating report generation in Excel with AI",
        "Using ChatGPT features most people never discover",
        "Extracting data from documents automatically",
        "Creating templates that save 10+ hours weekly"
      ],
      timeline: "1-2 weeks",
      investment: "Starting at $5,000",
      bestFor: "Companies new to AI or wanting quick wins"
    },
    {
      level: 2,
      title: "Systems Integration (No-Code/Low-Code)",
      subtitle: "Connect Your Tools Into Automated Workflows",
      icon: <Workflow className="w-8 h-8" />,
      description: "We connect your existing software—CRM, project management, accounting, email—into intelligent workflows that move information automatically with AI processing at each step.",
      coreQuestion: '"What if your systems talked to each other automatically?"',
      outcomes: [
        "Eliminate manual data entry between systems",
        "Automated notifications and escalations",
        "AI-powered routing and decision support",
        "50-70% reduction in administrative overhead"
      ],
      examples: [
        "Quote requests → AI analysis → Auto-generated proposals",
        "Customer inquiries → Smart routing → Auto-responses",
        "Invoice processing → Approval workflows → Accounting sync",
        "Project updates → Stakeholder notifications → Report generation"
      ],
      timeline: "4-8 weeks",
      investment: "Starting at $15,000",
      bestFor: "Companies with multiple software tools that don't communicate"
    },
    {
      level: 3,
      title: "Custom AI Orchestration",
      subtitle: "Purpose-Built Solutions for Complex Operations",
      icon: <Code className="w-8 h-8" />,
      description: "When off-the-shelf won't cut it, we build custom AI architectures that blend deterministic logic (reliable, rule-based code) with probabilistic AI (intelligent, context-aware reasoning) for sophisticated automation.",
      coreQuestion: '"What would a custom AI system built specifically for YOUR business look like?"',
      outcomes: [
        "Handles complexity standard automation can't touch",
        "Combines strict business rules with AI flexibility",
        "Scales with your business growth",
        "Creates genuine competitive advantage"
      ],
      examples: [
        "Custom estimating systems that learn your pricing patterns",
        "Agentic workflows that handle multi-step operations autonomously",
        "Predictive systems that forecast demand and optimize resources",
        "Document intelligence that extracts, validates, and routes automatically"
      ],
      timeline: "8-16 weeks",
      investment: "Starting at $35,000",
      bestFor: "Companies with unique processes or complex operational needs"
    }
  ];

  const faqs = [
    {
      question: "How is this different from other AI consulting services?",
      answer: "Most AI consultants sell you software and disappear. We take a fundamentally different approach: we build systems AND train your team to use them effectively. Our 3-level framework means you get exactly the right solution—not an oversold complex system when simple automation would work, and not a band-aid when you need custom orchestration. Plus, our 100% satisfaction guarantee means you only pay for results."
    },
    {
      question: "Will AI replace my employees?",
      answer: "No—and this fear is exactly why most AI implementations fail. AI doesn't replace your best people; it makes them unstoppable. Your estimator who took 3 days to quote a project will do it in 4 hours—meaning they can handle 5x more work, not that you fire them. Your team becomes more valuable, not obsolete. That's why half of what we do is training."
    },
    {
      question: "How quickly will we see ROI?",
      answer: "Level 1 (Education) clients typically see immediate time savings—often 30%+ within the first week. Level 2 (Integration) projects usually achieve full ROI within 3-6 months. Level 3 (Custom) implementations vary but are designed with clear ROI milestones. We don't build systems without defining measurable success criteria upfront."
    },
    {
      question: "What industries do you work with?",
      answer: "We specialize in operational industries: construction, manufacturing, logistics, wholesale, energy, and facilities management. These sectors have massive AI opportunities with clear, measurable ROI—and without the regulatory complexity of healthcare or finance. Our solutions focus on operational data, not personal information."
    },
    {
      question: "What if we're not sure which level we need?",
      answer: "That's exactly what our free AI assessment is for. In a 30-minute conversation, we'll map your current operations, identify the biggest opportunities, and recommend the right starting point. Many clients start with Level 1 to get quick wins and build confidence, then graduate to more sophisticated solutions."
    },
    {
      question: "Do you work with businesses outside San Antonio?",
      answer: "Yes, we serve clients across Texas and nationally for virtual engagements. However, we offer special advantages for San Antonio and South Texas businesses—including on-site workshops, face-to-face strategy sessions, and hands-on training at your facility."
    },
    {
      question: "What's the difference between 'deterministic' and 'probabilistic' AI?",
      answer: "Great question—this is key to understanding Level 3. Deterministic code follows strict rules: 'if X happens, do Y.' It's reliable and predictable. Probabilistic AI (like ChatGPT) handles nuance, makes judgment calls, and adapts to context—but can be unpredictable. The magic happens when you blend both: deterministic logic controls the process and ensures reliability, while AI handles the variable, context-dependent parts. This is what separates amateur automation from production-grade AI systems."
    }
  ];

  const testimonials = [
    {
      quote: "We went from 3-week bid turnaround to same-day quotes. The AI system analyzes blueprints and generates accurate estimates automatically. We're winning 40% more projects because we respond faster than competitors.",
      author: "Mike Rodriguez",
      role: "Commercial Construction",
      location: "San Antonio",
      result: "40% more project wins"
    },
    {
      quote: "The AI system is great, but the training made the real difference. Our maintenance team went from reactive firefighting to proactive planning. They're proud of their new skills and we cut downtime 65%.",
      author: "Jennifer Chen",
      role: "Manufacturing Operations",
      location: "San Antonio",
      result: "65% downtime reduction"
    },
    {
      quote: "Route optimization AI reduced our fuel costs 28% and our drivers make 30% more deliveries per day. The system adapts in real-time to traffic and weather. This paid for itself in 6 weeks.",
      author: "Carlos Martinez",
      role: "Distribution & Logistics",
      location: "San Antonio",
      result: "28% fuel cost savings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900">AI Consulting SA</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition font-medium">Services</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition font-medium">How It Works</a>
            <a href="#results" className="text-slate-600 hover:text-blue-600 transition font-medium">Results</a>
            <a href="#faq" className="text-slate-600 hover:text-blue-600 transition font-medium">FAQ</a>
            <a href="https://calendly.com/aiconsultingsa-com/free-ai-audit-call" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
              Book Free Call
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-600 md:hidden">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">San Antonio, TX</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - SEO Optimized */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/30">
                <MapPin className="w-4 h-4" />
                Serving San Antonio & South Texas Businesses
              </div>

              {/* H1 - Primary Keyword Target */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Hire an AI Consultant Who
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Guarantees Results</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                AI consulting services that transform how your business operates—from simple automation
                to custom AI orchestration. <strong className="text-white">100% satisfaction guaranteed or full refund.</strong>
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 mb-8 text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Results-based pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Training included</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/aiconsultingsa-com/free-ai-audit-call" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                  Book Your Free 15-Min Call
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#services" className="border-2 border-slate-400 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition text-center">
                  See Our 3-Level Approach
                </a>
              </div>
            </div>

            {/* Value Props Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What Makes Us Different</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-xl h-fit">
                    <Brain className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">3-Level Framework</h3>
                    <p className="text-slate-300 text-sm">Right-sized solutions: from quick wins to custom AI orchestration. You get exactly what you need.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-500/30 p-3 rounded-xl h-fit">
                    <Users className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Team Empowerment</h3>
                    <p className="text-slate-300 text-sm">AI makes your people 3x more productive—not unemployed. Training is built into every engagement.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-amber-500/30 p-3 rounded-xl h-fit">
                    <Shield className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">100% Guarantee</h3>
                    <p className="text-slate-300 text-sm">If you're not satisfied with measurable results, you don't pay. Period.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-500/30 p-3 rounded-xl h-fit">
                    <Cpu className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Technical Depth</h3>
                    <p className="text-slate-300 text-sm">Deterministic + probabilistic AI blended for reliable, intelligent automation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">The Reality</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Most Businesses Are Leaving Money on the Table
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              While competitors automate, you're still doing things manually. Every day without AI implementation costs you in ways that hit the bottom line.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
              <div className="text-red-600 font-bold text-5xl mb-4">40%</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Time Wasted on Manual Work</h3>
              <p className="text-slate-600">
                Your best people spend nearly half their time on tasks AI can handle in minutes:
                data entry, report generation, scheduling, and status updates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
              <div className="text-red-600 font-bold text-5xl mb-4">85%</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Projects Fail</h3>
              <p className="text-slate-600">
                Not because the technology doesn't work—but because employees aren't trained to use it.
                Most consultants deploy and disappear. We train and support.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
              <div className="text-red-600 font-bold text-5xl mb-4">6mo+</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Typical Implementation Time</h3>
              <p className="text-slate-600">
                Big consulting firms drag projects out for months. Our Level 1 clients see results
                in days. Even complex Level 3 projects deliver in 8-16 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Level Framework - Core Service Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              AI Consulting Services Built Around Your Actual Needs
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Not every business needs custom AI development. Our 3-level framework ensures you get
              exactly the right solution—no overselling, no underselling.
            </p>
          </div>

          {/* Level Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {serviceLevels.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLevel(idx + 1)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeLevel === idx + 1
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="hidden sm:inline">Level {service.level}: </span>{service.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          {/* Active Level Detail */}
          {serviceLevels.map((service, idx) => (
            activeLevel === idx + 1 && (
              <div key={idx} className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Left Side - Overview */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${
                        idx === 0 ? 'bg-amber-100 text-amber-600' :
                        idx === 1 ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500">LEVEL {service.level}</div>
                        <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                      </div>
                    </div>

                    <p className="text-lg text-slate-700 mb-6">{service.subtitle}</p>

                    <p className="text-slate-600 mb-6">{service.description}</p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500">
                      <p className="text-slate-700 font-medium italic">{service.coreQuestion}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <Clock className="w-5 h-5 text-slate-500 mb-2" />
                        <div className="text-sm text-slate-500">Timeline</div>
                        <div className="font-bold text-slate-900">{service.timeline}</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <DollarSign className="w-5 h-5 text-slate-500 mb-2" />
                        <div className="text-sm text-slate-500">Investment</div>
                        <div className="font-bold text-slate-900">{service.investment}</div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-600 bg-blue-50 rounded-xl p-4">
                      <strong className="text-blue-700">Best for:</strong> {service.bestFor}
                    </div>
                  </div>

                  {/* Right Side - Outcomes & Examples */}
                  <div className="bg-slate-50 p-8 lg:p-12">
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        What You Get
                      </h4>
                      <ul className="space-y-3">
                        {service.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-600" />
                        Real Examples
                      </h4>
                      <ul className="space-y-3">
                        {service.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="https://calendly.com/aiconsultingsa-com/free-ai-audit-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      Book a Call — Level {service.level}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )
          ))}

          {/* All Levels Comparison */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">Quick Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                    <th className="p-4 font-semibold text-amber-600">Level 1: Education</th>
                    <th className="p-4 font-semibold text-blue-600">Level 2: Integration</th>
                    <th className="p-4 font-semibold text-purple-600">Level 3: Custom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 text-slate-700 font-medium">Development Required</td>
                    <td className="p-4 text-center">None</td>
                    <td className="p-4 text-center">Minimal (no-code)</td>
                    <td className="p-4 text-center">Full custom</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700 font-medium">Timeline</td>
                    <td className="p-4 text-center">1-2 weeks</td>
                    <td className="p-4 text-center">4-8 weeks</td>
                    <td className="p-4 text-center">8-16 weeks</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700 font-medium">Starting Investment</td>
                    <td className="p-4 text-center">$5,000</td>
                    <td className="p-4 text-center">$15,000</td>
                    <td className="p-4 text-center">$35,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700 font-medium">Team Training</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700 font-medium">100% Guarantee</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Edge Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">The Technical Difference</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Deterministic + Probabilistic AI: Why It Matters
              </h2>

              <p className="text-slate-300 text-lg mb-6">
                Most AI implementations fail because they rely entirely on unpredictable generative AI.
                Our approach blends strict, reliable code with intelligent AI reasoning—giving you the best of both worlds.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl h-fit">
                    <Settings className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Deterministic Logic</h3>
                    <p className="text-slate-400">
                      Traditional code that follows strict rules: "If invoice &gt; $10K, require approval."
                      Reliable, predictable, auditable. Forms the backbone of your automation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl h-fit">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Probabilistic AI</h3>
                    <p className="text-slate-400">
                      Generative AI that handles nuance and context: understanding emails, extracting data
                      from messy documents, generating human-quality responses. Intelligent but needs guardrails.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl h-fit">
                    <Cpu className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">The Blend</h3>
                    <p className="text-slate-400">
                      Deterministic logic controls the process, ensures business rules are followed, and catches
                      errors. AI handles the variable, context-dependent parts. Result: reliable intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="font-bold text-xl mb-6">Example: Smart Document Processing</h3>

              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Step 1: Deterministic</div>
                  <p className="text-slate-300 text-sm">Incoming document detected → Route to processing queue → Log receipt timestamp</p>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Step 2: Probabilistic AI</div>
                  <p className="text-slate-300 text-sm">AI reads document → Extracts key data (dates, amounts, parties) → Classifies document type</p>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Step 3: Deterministic</div>
                  <p className="text-slate-300 text-sm">Validate extracted data against business rules → Flag anomalies → Route for approval if needed</p>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Step 4: Probabilistic AI</div>
                  <p className="text-slate-300 text-sm">Generate summary for reviewer → Draft response if needed → Suggest next actions</p>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Step 5: Deterministic</div>
                  <p className="text-slate-300 text-sm">Archive document → Update database → Trigger downstream workflows</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  <strong className="text-white">Result:</strong> Documents processed in minutes instead of hours,
                  with 99%+ accuracy and full audit trails. The AI does the thinking; the code ensures reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">The Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              How to Implement AI in Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              No corporate bureaucracy. No endless meetings. Just a straightforward path from where you are to where you want to be.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Free Assessment",
                description: "30-minute conversation to understand your operations, identify opportunities, and recommend the right level of engagement.",
                icon: <Target className="w-6 h-6" />
              },
              {
                step: 2,
                title: "Custom Roadmap",
                description: "Detailed plan with specific solutions, projected ROI, timeline, and success metrics—tailored to your business.",
                icon: <BookOpen className="w-6 h-6" />
              },
              {
                step: 3,
                title: "Build + Train",
                description: "We implement your AI systems while training your team to use them effectively. Hands-on education, not just software.",
                icon: <Users className="w-6 h-6" />
              },
              {
                step: 4,
                title: "Optimize + Support",
                description: "Ongoing refinement based on real results. Your systems get smarter, your team gets more capable.",
                icon: <TrendingUp className="w-6 h-6" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200"></div>
                )}
                <div className="relative bg-white">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-blue-500/25">
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Business Automation with AI for Operational Industries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We specialize in industries with clear, measurable operations—where AI delivers undeniable ROI
              without regulatory complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Construction & Contractors",
                pain: "3-week bid turnaround killing win rate",
                solution: "Same-day automated estimates with AI",
                stat: "40% more project wins"
              },
              {
                icon: <Factory className="w-8 h-8" />,
                title: "Manufacturing",
                pain: "$100K+ cost per unplanned downtime",
                solution: "Predictive maintenance that prevents failures",
                stat: "65% downtime reduction"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Logistics & Distribution",
                pain: "30% of operating cost in fuel",
                solution: "Real-time route optimization with AI",
                stat: "28% fuel cost savings"
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "Facilities Management",
                pain: "Reactive maintenance chaos",
                solution: "Automated scheduling and work orders",
                stat: "50% fewer emergency calls"
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Wholesale & B2B",
                pain: "Manual order processing bottlenecks",
                solution: "AI-powered quote and order automation",
                stat: "3x faster order processing"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Energy & Utilities",
                pain: "Asset tracking across scattered sites",
                solution: "Intelligent monitoring and alerting",
                stat: "99% asset visibility"
              }
            ].map((industry, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-red-600 font-medium">Pain: </span>
                    <span className="text-slate-600">{industry.pain}</span>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Solution: </span>
                    <span className="text-slate-600">{industry.solution}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-blue-600 font-bold">{industry.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Testimonials */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Proven Results</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              AI Integration Services That Deliver
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real businesses. Measurable outcomes. Not promises—proof.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 relative">
                <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {testimonial.result}
                </div>
                <div className="flex gap-1 mb-4 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-slate-500 text-sm">{testimonial.role}, {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 grid md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-blue-200">Production Apps Built</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-blue-200">Hours AI Training</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Satisfaction Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3 Years</div>
              <div className="text-blue-200">AI Implementation Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Calendly */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Free 15-Minute AI Audit
            </h2>
            <p className="text-xl text-slate-300 mb-4">
              In 15 minutes, you'll know exactly where AI can save you time and money.
              No sales pitch—just honest assessment of your biggest opportunities.
            </p>
            <p className="text-lg text-blue-300 font-medium">
              I'll call you at your scheduled time. Local San Antonio meetings also available.
            </p>
          </div>

          {/* Calendly Inline Widget */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/aiconsultingsa-com/free-ai-audit-call?hide_gdpr_banner=1&background_color=ffffff&text_color=1e293b&primary_color=2563eb"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-slate-300">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>15 minutes, no obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-400" />
              <span>I call you</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">AI Consulting SA</h3>
              <p className="text-slate-400 mb-6 max-w-md">
                AI consulting services that transform San Antonio businesses through intelligent automation,
                team training, and custom AI orchestration. Results guaranteed.
              </p>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-5 h-5" />
                <span>San Antonio, Texas • Serving South Texas</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#services" className="hover:text-white transition">AI Education & Training</a></li>
                <li><a href="#services" className="hover:text-white transition">Systems Integration</a></li>
                <li><a href="#services" className="hover:text-white transition">Custom AI Development</a></li>
                <li><a href="#services" className="hover:text-white transition">Business Automation</a></li>
                <li><a href="#services" className="hover:text-white transition">AI Strategy Consulting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-slate-400">
                <a href="tel:+12108028945" className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="w-5 h-5" />
                  <span>(210) 802-8945</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Greater San Antonio Area</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © 2026 AI Consulting SA. All rights reserved.
              </p>
              <p className="text-slate-600 text-sm text-center md:text-right">
                Built by an AI implementation consultant who believes in results over rhetoric—and backs it with a 100% guarantee.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Schema.org Structured Data - LocalBusiness + ProfessionalService */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["ProfessionalService", "LocalBusiness"],
          "@id": "https://aiconsultingsa.com/#business",
          "name": "AI Consulting SA",
          "description": "San Antonio AI consultant who builds custom workflows, Twilio phone bots, paperwork automation, and team training for small businesses. Save 10+ hours a week with hands-on implementation — not just advice.",
          "url": "https://aiconsultingsa.com",
          "telephone": "+1-210-802-8945",
          "priceRange": "$$",
          "image": "https://aiconsultingsa.com/og-image.png",
          "logo": "https://aiconsultingsa.com/favicon.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Antonio",
            "addressRegion": "TX",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "29.4241",
            "longitude": "-98.4936"
          },
          "areaServed": [
            { "@type": "City", "name": "San Antonio", "containedInPlace": { "@type": "State", "name": "Texas" } },
            { "@type": "City", "name": "Boerne" },
            { "@type": "City", "name": "New Braunfels" },
            { "@type": "City", "name": "San Marcos" },
            { "@type": "City", "name": "Schertz" },
            { "@type": "City", "name": "Converse" },
            { "@type": "City", "name": "Seguin" },
            { "@type": "City", "name": "Helotes" },
            { "@type": "City", "name": "Universal City" }
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "29.4241",
              "longitude": "-98.4936"
            },
            "geoRadius": "75000"
          },
          "knowsLanguage": ["en", "es"],
          "serviceType": [
            "AI Consulting",
            "AI Workflow Automation",
            "Small Business Automation",
            "AI Phone Answering",
            "Twilio Voice AI",
            "AI Team Training",
            "Custom AI Development"
          ],
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }]
        })
      }} />

      {/* Schema.org Structured Data - FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />
    </div>
  );
}
