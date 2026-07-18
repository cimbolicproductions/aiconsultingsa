import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Workflow,
  Wrench,
} from 'lucide-react';

const formAction = '/api/lead/';

const services = [
  {
    title: 'Calls slipping to voicemail',
    keyword: 'AI phone answering for small business',
    href: '/ai-phone-answering/',
    icon: PhoneCall,
    problem: 'Calls hit voicemail while you are on a job, in a truck, or already helping another customer.',
    solution: 'If the assessment shows phone coverage is the priority, I can build a Twilio based AI receptionist that answers, qualifies the caller, books the next step, and texts you a clean summary.',
  },
  {
    title: 'Paperwork turning into spreadsheet nights',
    keyword: 'AI document automation San Antonio',
    href: '/ai-document-automation-san-antonio/',
    icon: FileText,
    problem: 'PDFs, spec books, invoices, and intake forms keep turning into manual spreadsheet work.',
    solution: 'If the assessment finds a document bottleneck, I can build a guarded workflow that reads the paperwork, structures the data, flags exceptions, and keeps a human in the loop.',
  },
  {
    title: 'Follow ups falling through cracks',
    keyword: 'Small business automation San Antonio',
    href: '/small-business-automation-san-antonio/',
    icon: Workflow,
    problem: 'Your CRM, calendar, inbox, quotes, and follow ups all work, but none of them work together.',
    solution: 'If the assessment finds a broken handoff, I can connect the steps your team repeats so leads, jobs, reminders, and reports move without copy paste work.',
  },
];

const proofItems = [
  {
    title: 'AI voice agent on my own line',
    text: 'I run a Twilio voice agent for my own business calls. It picks up when I cannot, captures the details, and sends me a usable summary.',
  },
  {
    title: 'PDF to spreadsheet automation',
    text: 'I have built software that turns long construction spec documents into organized spreadsheet output with reviewable fields.',
  },
  {
    title: 'Small business ops software',
    text: 'I run a local rental operation and built the admin tools behind it: unit tracking, SMS reminders, and Stripe payments.',
  },
];

const processSteps = [
  {
    title: 'Discover the real workflow',
    text: 'We use one 45 minute recorded conversation, with permission, to map the work, delays, repeated tasks, and failed fixes.',
    icon: ClipboardList,
  },
  {
    title: 'Analyze and research suitable tools',
    text: 'I review the transcript, identify the pain points, and research current off the shelf tools and process changes that fit your business.',
    icon: Bot,
  },
  {
    title: 'Quality check and build the report',
    text: 'Every recommendation is checked for size, cost, security, technical fit, and whether a simpler change would solve the problem.',
    icon: Wrench,
  },
  {
    title: 'Review priorities and choose what is next',
    text: 'We spend 30 minutes reviewing the priorities, assumptions, quick start plan, and whether you want to implement anything.',
    icon: CalendarCheck,
  },
];

const reportSections = [
  {
    title: 'Priorities you can see',
    text: 'A cover, executive summary, effort versus impact matrix, and quick wins summary make the decision clear before the details.',
  },
  {
    title: 'Recommendations you can verify',
    text: 'Each recommended solution connects a real pain point to current cost, setup effort, expected impact, assumptions, and fit.',
  },
  {
    title: 'Actions you can start',
    text: 'A four day quick start, major project list, financial impact estimate, and next steps turn the report into an operating plan.',
  },
];

const afterAssessment = [
  {
    title: 'Use the report yourself',
    text: 'Take the prioritized plan and implement the quick wins with your own team. There is no requirement to buy implementation.',
  },
  {
    title: 'Scope an implementation',
    text: 'If a process redesign, phone system, document workflow, or automation needs hands on help, it becomes a separate proposal.',
  },
  {
    title: 'Add ongoing advisory',
    text: 'If recurring guidance is justified after the first changes, we can discuss an ongoing working relationship without forcing it upfront.',
  },
];

const noList = [
  'I will not automate judgment heavy work without a human review step.',
  'I will not replace software you already use unless it is the bottleneck.',
  'I will not build an AI demo when a checklist, form, script, or rule would solve it.',
];

const faqs = [
  {
    question: 'What does the AI Tools Assessment cost?',
    answer: 'The AI Tools Assessment is a flat $999. Implementation is separate and is scoped only after the recommendations are clear.',
  },
  {
    question: 'What is included in the $999 assessment?',
    answer:
      'The $999 assessment includes a 45 minute recorded discovery with permission, transcript analysis, human verified research, three to seven prioritized recommendations, an effort versus impact matrix, a four day plan, ROI assumptions, and a 30 minute review.',
  },
  {
    question: 'How is the website form different from the assessment?',
    answer:
      'The website form is a free way to share the business, workflow, urgency, and best contact details. I review it and follow up about fit and the next step. The paid assessment is the deeper discovery, research, report, and review.',
  },
  {
    question: 'Is implementation included?',
    answer:
      'No. The assessment ends with a recommendation report and review. You can implement the plan yourself or request a separate proposal for the work you want help with.',
  },
  {
    question: 'How are recording and sensitive data handled?',
    answer:
      'The discovery is recorded only with permission. Before the call, we agree what data can be discussed and what must stay out of recordings, transcripts, and AI tools.',
  },
  {
    question: 'Do we need to replace our current software?',
    answer:
      'Usually no. The assessment considers the phone, email, calendar, CRM, spreadsheets, forms, payment tools, and job systems you already use before recommending anything new.',
  },
  {
    question: 'What business size is the best fit?',
    answer:
      'The primary fit is an owner led San Antonio service business with a repeated workflow involving calls, paperwork, follow ups, or handoffs. Team size does not determine eligibility.',
  },
];

export default function AIConsultingServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const submitted = new URLSearchParams(window.location.search).get('submitted') === 'true';

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    section.scrollIntoView();
    root.style.scrollBehavior = previousScrollBehavior;
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pb-16 text-slate-950 md:pb-0">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="text-lg font-semibold tracking-tight text-slate-950">
            AI Consulting SA
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#assessment" className="hover:text-slate-950">Assessment</a>
            <a href="#services" className="hover:text-slate-950">Services</a>
            <a href="#proof" className="hover:text-slate-950">Proof</a>
            <a href="#process" className="hover:text-slate-950">Process</a>
            <a href="#faq" className="hover:text-slate-950">FAQ</a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <span className="hidden sm:inline">Start with the form</span>
            <span className="sm:hidden">Start free</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-stone-50 px-3 py-2 text-sm font-medium text-slate-700">
              <MapPin className="h-4 w-4 text-blue-700" />
              AI consultant San Antonio | Built by a local operator
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
              Bring me the workflow your team keeps doing by hand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Start with a paid diagnostic before buying implementation. I map the workflow, research suitable tools, and give you a prioritized plan for what to change, what to keep, and what to do first.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Tell me about your workflow
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+12108028945"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:border-slate-500"
              >
                <Phone className="h-5 w-5" />
                Call Dominic: (210) 802-8945
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              The workflow review is <span className="font-semibold text-slate-700">free</span>. The $999 assessment is the optional next step, only if it fits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {['Free workflow review', '$999 assessment', '3 to 7 recommendations'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <Check className="h-4 w-4 text-blue-700" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-lg border border-slate-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Best fit</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Owner led service businesses with a repeated operating headache.</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>Calls go to voicemail while the owner is working.</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>PDFs, forms, and spreadsheets eat nights and weekends.</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>Quotes, reminders, and CRM notes depend on memory.</span>
              </li>
            </ul>
            <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
              The primary fit is a San Antonio business with a repeated operating headache. Recommendations come first. Implementation happens only if you request it.
            </p>
          </aside>
        </div>
      </header>

      <main>
        <section id="assessment" className="border-b border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1.15fr_0.85fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">AI Tools Assessment</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                A $999 diagnosis before you buy another tool or custom build.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                For owner led San Antonio service businesses of any team size. We start with the work as it happens now, then compare the smallest useful options against your real stack, budget, security needs, and ability to maintain them.
              </p>
              <a
                href="/ai-tools-assessment-san-antonio/"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
              >
                See the full assessment details
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-900/5">
              <div className="h-1.5 bg-blue-700" />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">The AI Tools Assessment</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-slate-950">$999</span>
                  <span className="text-sm font-medium text-slate-500">flat, one time</span>
                </div>
                <ul className="mt-5 space-y-3.5 text-slate-700">
                  {[
                    'One 45 minute recorded discovery, with permission.',
                    'Three to seven human verified recommendations.',
                    'An effort versus impact matrix and four day plan.',
                    'Visible ROI assumptions and a 30 minute review.',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/ai-tools-assessment-san-antonio/"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  See assessment details
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#contact" className="mt-3 block text-center text-sm font-semibold text-blue-700 hover:text-blue-900">
                  or start with a free workflow review
                </a>
                <p className="mt-5 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-500">
                  Recommendations first. Any implementation is optional and separately scoped.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="services" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Possible implementation paths</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                  Three paths the assessment may uncover.
                </h2>
              </div>
              <p className="max-w-xl text-slate-600">
                Missed calls, repeated paperwork, and manual follow ups are different problems. The assessment decides whether an off the shelf tool, a process change, or a focused build is justified.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mb-2 text-sm font-semibold text-blue-700">{service.keyword}</p>
                    <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
                    <p className="mt-4 text-sm font-semibold text-slate-500">Problem</p>
                    <p className="mt-1 leading-7 text-slate-700">{service.problem}</p>
                    <p className="mt-4 text-sm font-semibold text-slate-500">Possible path</p>
                    <p className="mt-1 leading-7 text-slate-700">{service.solution}</p>
                    <a href={service.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">
                      See the page
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="proof" className="border-y border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src="/founder-avatar.svg"
                    alt="Dominic, founder of AI Consulting SA"
                    width="64"
                    height="64"
                    className="h-16 w-16 flex-none rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-slate-950">Dominic</p>
                    <p className="text-sm text-slate-500">Founder, AI Consulting SA &middot; San Antonio</p>
                  </div>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Proof</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  I am not selling the idea of AI. I build the systems.
                </h2>
                <p className="mt-5 leading-7 text-slate-600">
                  I run service businesses here in San Antonio and built the software behind them. The proof is practical: calls captured, documents parsed, reminders sent, payments collected, and workflows logged. Ask to see a live example on the call.
                </p>
              </div>
              <div className="grid gap-4">
                {proofItems.map((item) => (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What I will not automate</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                The fastest way to build trust is to say no.
              </h2>
            </div>
            <div className="grid gap-4">
              {noList.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-stone-50 p-5">
                  <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                  <p className="leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Four phases from workflow to decision.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                      <Icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Nine part report</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                See what you actually walk away with.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Priorities, recommendation details, a quick start, the larger opportunities, the financial assumptions, and next steps, all in one clear report.
              </p>
            </div>
            <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-900/5">
                <img
                  src="/assessment-report-preview.svg"
                  alt="Illustrative sample of the assessment report showing an effort versus impact matrix, a prioritized quick wins list, and an estimated monthly ROI."
                  width="1040"
                  height="720"
                  className="h-auto w-full"
                  loading="lazy"
                />
                <figcaption className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
                  Illustrative layout. Every report uses your business&rsquo;s real workflow, tools, and numbers.
                </figcaption>
              </figure>
              <div className="space-y-6">
                {reportSections.map((item) => (
                  <div key={item.title} className="border-l-2 border-blue-700 pl-5">
                    <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What happens after the assessment</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                One report. Three straightforward choices.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {afterAssessment.map((item, index) => (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-blue-700">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Local service area</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Built for businesses in and around San Antonio.
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                I serve San Antonio, Boerne, New Braunfels, San Marcos, Schertz, Converse, Seguin, Helotes, Universal City, and nearby South Texas operators who benefit from in person workflow discovery.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-100"
            >
              Tell me about your workflow
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        <section id="faq" className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Common questions.</h2>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold text-slate-950"
                  >
                    {faq.question}
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 flex-none text-slate-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-none text-slate-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <p id={`faq-answer-${index}`} className="pb-5 leading-7 text-slate-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <MessageSquare className="h-9 w-9 text-blue-700" />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Tell me about the workflow.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                Share the repeated work, where it gets stuck, and the best way to reach you. I will review it and follow up about whether the $999 assessment is the right next step.
              </p>
              <a
                href="tel:+12108028945"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
              >
                <Phone className="h-5 w-5" />
                Or call (210) 802-8945
              </a>
            </div>
            <div>
              {submitted && (
                <div role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  Thanks. Your workflow was submitted. I will review it and follow up using the contact details you provided.
                </div>
              )}
              <form
                action={formAction}
                method="POST"
                acceptCharset="UTF-8"
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <label className="hidden" aria-hidden="true">
                  Leave this field empty
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Your name
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Business name
                    <input
                      type="text"
                      name="business"
                      autoComplete="organization"
                      required
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Phone <span className="font-normal text-slate-500">(optional)</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>

                <label className="mt-5 block text-sm font-semibold text-slate-800">
                  What workflow keeps getting done by hand?
                  <textarea
                    name="workflow"
                    rows={6}
                    required
                    placeholder="Tell me what happens, how often it happens, and where the work gets stuck."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-3 font-normal text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  Send my workflow
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  This form sends your message through a server route to our email provider. Do not include passwords, protected personal information, or sensitive customer data.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 text-sm text-slate-600 md:flex-row">
          <div>
            <p className="font-semibold text-slate-950">AI Consulting SA</p>
            <p className="mt-2">AI consultant in San Antonio for practical small business automation.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/ai-tools-assessment-san-antonio/" className="hover:text-slate-950">AI Tools Assessment</a>
            <a href="/ai-phone-answering/" className="hover:text-slate-950">AI phone answering</a>
            <a href="/ai-document-automation-san-antonio/" className="hover:text-slate-950">Document automation</a>
            <a href="/small-business-automation-san-antonio/" className="hover:text-slate-950">Small business automation</a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <a
          href="#contact"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white"
        >
          Tell me about your workflow
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
