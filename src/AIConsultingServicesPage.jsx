import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Workflow,
} from 'lucide-react';

const formAction = '/api/lead/';

const processSteps = [
  {
    number: '01',
    label: 'Diagnose',
    title: 'We talk through the work, not the software.',
    text: 'In one 45 minute recorded conversation, with your permission, I ask where work piles up, what you dread doing, and what has already failed.',
    icon: ClipboardList,
  },
  {
    number: '02',
    label: 'Research',
    title: 'I look for the smallest thing that could help.',
    text: 'I study the transcript, research current tools, and check each option against your team, budget, existing systems, and ability to maintain it.',
    icon: Bot,
  },
  {
    number: '03',
    label: 'Prescribe',
    title: 'You get priorities, not a catalog.',
    text: 'Your report separates quick wins from bigger projects, explains the tradeoffs, and gives you a four day plan built around your real numbers.',
    icon: FileText,
  },
  {
    number: '04',
    label: 'Review',
    title: 'We read the prescription together.',
    text: 'On a 30 minute call, we go pain by pain: the possible fix, cost, setup, expected time saved, and which change deserves attention first.',
    icon: CalendarCheck,
  },
];

const proofItems = [
  {
    label: 'On my own phone line',
    title: 'A voice workflow catches the calls I cannot.',
    text: 'It answers, gathers the useful details, and sends me a summary I can act on instead of leaving me another vague voicemail.',
  },
  {
    label: 'Inside construction paperwork',
    title: 'Long spec documents become reviewable data.',
    text: 'I built software that pulls structured information from construction documents into organized spreadsheet output with human review.',
  },
  {
    label: 'Inside a local rental business',
    title: 'The admin work runs through tools I built.',
    text: 'Unit tracking, customer reminders, payments, and daily operating details gave me the same messy handoffs I now help other owners untangle.',
  },
];

const faqs = [
  {
    question: 'What does the AI Tools Assessment cost?',
    answer: 'The AI Tools Assessment is a flat $999. The first website workflow review is free. Implementation is separate and is discussed only after the recommendations are clear.',
  },
  {
    question: 'What do I receive?',
    answer: 'You receive three to seven human verified recommendations, an effort versus impact matrix, a four day quick start, visible ROI assumptions, larger project opportunities, and a 30 minute review call.',
  },
  {
    question: 'Are you going to make us replace our software?',
    answer: 'Usually not. I first look at the phone, email, calendar, CRM, spreadsheets, forms, payment tools, and job systems you already use. If a process change or simple checklist is the better answer, that is what I will recommend.',
  },
  {
    question: 'Is implementation included?',
    answer: 'No. The assessment ends with the report and review. You can use the plan yourself, ask your team to implement it, or request a separate proposal for the parts where you want help.',
  },
  {
    question: 'How are recording and sensitive data handled?',
    answer: 'The discovery is recorded only with your explicit permission. Before the call, we agree what can be discussed and what must stay out of recordings, transcripts, and AI tools.',
  },
];

function SectionLabel({ children, dark = false }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-orange-300' : 'text-orange-800'}`}>
      {children}
    </p>
  );
}

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
    <div className="min-h-screen bg-[#f7f2e9] pb-20 text-slate-950 md:pb-0">
      <nav className="sticky top-0 z-50 border-b border-stone-300/80 bg-[#fffdf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight text-slate-950">
            <img
              src="/favicon.png"
              alt=""
              width="36"
              height="36"
              className="h-9 w-9 rounded-lg object-cover shadow-sm"
            />
            <span className="hidden sm:inline">AI Consulting SA</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            <a href="#meet-dominic" className="hover:text-slate-950">Meet Dominic</a>
            <a href="#prescription" className="hover:text-slate-950">The prescription</a>
            <a href="#process" className="hover:text-slate-950">How it works</a>
            <a href="#proof" className="hover:text-slate-950">Proof</a>
            <a href="#faq" className="hover:text-slate-950">Questions</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+12108028945" className="hidden items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 sm:inline-flex">
              <Phone className="h-4 w-4" />
              (210) 802-8945
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-orange-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-900"
            >
              Share the workflow
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>

      <header className="site-hero overflow-hidden border-b border-stone-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 2xl:py-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <MapPin className="h-4 w-4 text-orange-800" />
              San Antonio AI consultant and local operator
            </div>
            <h1 className="max-w-4xl font-serif text-4xl leading-[0.98] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl 2xl:text-7xl">
              San Antonio AI consulting for the work you&rsquo;re tired of fighting.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 2xl:text-xl">
              I&rsquo;m Dominic. Show me the part of your business that eats time, drops details, or keeps landing back on your plate. I&rsquo;ll diagnose what is actually wrong and give you a practical prescription before you spend another dollar on software.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-800 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-orange-900"
              >
                Share the workflow
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+12108028945"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-400 bg-white/70 px-6 py-3.5 font-semibold text-slate-950 hover:border-slate-700 hover:bg-white"
              >
                <Phone className="h-5 w-5" />
                Call Dominic
              </a>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Start with a free workflow review. If the fit is right, the complete AI Tools Assessment is a flat $999.
            </p>
          </div>

          <aside id="meet-dominic" className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-orange-700/30 blur-3xl" />
            <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_80%_20%,rgba(194,65,12,0.35),transparent_35%)] p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <img
                  src="/founder-avatar.svg"
                  alt="Dominic's monogram"
                  width="88"
                  height="88"
                  className="h-[88px] w-[88px] rounded-full border-2 border-white/20 shadow-xl"
                />
                <div>
                  <SectionLabel dark>A note from Dominic</SectionLabel>
                  <p className="mt-1 font-serif text-3xl">Owner to owner.</p>
                  <p className="mt-1 text-sm text-slate-400">San Antonio operator and builder</p>
                </div>
              </div>
            </div>
            <div className="relative space-y-3 p-6 text-base leading-7 text-slate-200 sm:p-7">
              <p>
                You probably do not need more software. You need someone to look at the work with fresh eyes.
              </p>
              <p>
                I run local service businesses too. Missed calls, reminders, payments, and paperwork are familiar problems.
              </p>
              <p className="border-l-2 border-orange-400 pl-4 font-serif text-lg leading-7 text-white">
                I look for the smallest fix: AI, ordinary software, or a checklist. I will tell you which.
              </p>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="pain" className="bg-[#fffdf8] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <SectionLabel>Recognize the pain</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Your business is working. The workflow is not.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Most owners do not wake up wanting an AI system. They want the call handled, the information where it belongs, and the customer followed up with without carrying every step in their head.
              </p>
            </div>

            <div className="mt-12 divide-y divide-stone-300 border-y border-stone-300">
              <article className="grid gap-8 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
                <div>
                  <p className="text-sm font-bold text-orange-800">01 / THE PHONE</p>
                  <h3 className="mt-3 font-serif text-3xl text-slate-950">It rings while you are already doing the job.</h3>
                  <p className="mt-4 max-w-xl leading-7 text-slate-600">
                    You are driving, under a sink, with a customer, or helping your team. The caller gets silence, and you inherit another callback with no context.
                  </p>
                  <a href="/ai-phone-answering/" className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-800 hover:text-orange-950">
                    See the phone answering path <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                    <span className="flex items-center gap-2 font-semibold"><PhoneCall className="h-4 w-4 text-orange-300" /> New call summary</span>
                    <span className="text-slate-400">2:14 PM</span>
                  </div>
                  <dl className="mt-4 grid grid-cols-[100px_1fr] gap-x-4 gap-y-3 text-sm">
                    <dt className="text-slate-400">Needs</dt><dd>Same day service estimate</dd>
                    <dt className="text-slate-400">Location</dt><dd>North San Antonio</dd>
                    <dt className="text-slate-400">Urgency</dt><dd className="text-orange-300">Call back within 15 minutes</dd>
                    <dt className="text-slate-400">Next step</dt><dd>Owner notified with complete details</dd>
                  </dl>
                </div>
              </article>

              <article className="grid gap-8 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                <div className="order-2 rounded-2xl border border-stone-300 bg-[#f7f2e9] p-6 md:order-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">The same customer details</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {['PDF form', 'Spreadsheet', 'Job system'].map((item, index) => (
                      <div key={item} className="relative rounded-xl border border-stone-300 bg-white px-4 py-5 text-center font-semibold text-slate-800 shadow-sm">
                        {item}
                        {index < 2 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-orange-800 sm:block" />}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-center text-sm text-slate-500">Typed again. Checked again. Fixed again.</p>
                </div>
                <div className="order-1 md:order-2">
                  <p className="text-sm font-bold text-orange-800">02 / THE PAPERWORK</p>
                  <h3 className="mt-3 font-serif text-3xl text-slate-950">The same details get typed into three places.</h3>
                  <p className="mt-4 max-w-xl leading-7 text-slate-600">
                    A PDF becomes a spreadsheet, the spreadsheet becomes a job entry, and every handoff creates another chance for something to disappear.
                  </p>
                  <a href="/ai-document-automation-san-antonio/" className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-800 hover:text-orange-950">
                    See the document path <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>

              <article className="grid gap-8 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
                <div>
                  <p className="text-sm font-bold text-orange-800">03 / THE HANDOFF</p>
                  <h3 className="mt-3 font-serif text-3xl text-slate-950">Follow up lives in someone&rsquo;s memory.</h3>
                  <p className="mt-4 max-w-xl leading-7 text-slate-600">
                    The CRM, calendar, inbox, and quote tool each work. The gap between them is where leads cool off and owners become the reminder system.
                  </p>
                  <a href="/small-business-automation-san-antonio/" className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-800 hover:text-orange-950">
                    See the workflow path <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="rounded-2xl border border-stone-300 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-800"><Workflow className="h-5 w-5" /></span>
                    <div>
                      <p className="font-semibold text-slate-950">A handoff should create its own next step.</p>
                      <p className="text-sm text-slate-500">Not another note for you to remember.</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="rounded-lg bg-stone-100 px-4 py-3"><span className="font-semibold">Quote sent</span><span className="float-right text-slate-500">Today</span></div>
                    <div className="rounded-lg bg-orange-50 px-4 py-3 text-orange-950"><span className="font-semibold">Follow up scheduled</span><span className="float-right">+ 2 days</span></div>
                    <div className="rounded-lg bg-stone-100 px-4 py-3"><span className="font-semibold">Owner sees the outcome</span><span className="float-right text-slate-500">Automatically</span></div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="prescription" className="overflow-hidden bg-slate-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <div>
              <SectionLabel dark>The $999 AI Tools Assessment</SectionLabel>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                The assessment ends with a prescription, not a pile of ideas.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A useful report should tell you what hurts, why it is happening, what can change quickly, and what the change is worth. The podcast model calls for three to seven right sized recommendations. That discipline stays intact here.
              </p>
              <div className="mt-9 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
                {[
                  ['Quick wins', 'High impact changes that are simple to adopt now.'],
                  ['Major projects', 'Valuable work that needs a thoughtful build later.'],
                  ['Four day start', 'One small action a day so the report does not sit on a shelf.'],
                  ['Visible ROI', 'Your hours, your rate, tool cost, and every assumption shown.'],
                ].map(([title, text]) => (
                  <div key={title} className="bg-slate-900 p-5">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/ai-tools-assessment-san-antonio/" className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-700 px-6 py-3.5 font-semibold text-white hover:bg-orange-600">
                  See the complete assessment <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                  Share the workflow
                </a>
              </div>
            </div>

            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/30">
              <img
                src="/assessment-report-preview.svg"
                alt="Illustrative assessment report with an effort versus impact matrix, prioritized quick wins, and estimated monthly return."
                width="1040"
                height="720"
                className="h-auto w-full"
                loading="lazy"
              />
              <figcaption className="border-t border-slate-200 px-5 py-3 text-sm leading-6 text-slate-600">
                Illustrative layout. Your prescription uses your workflow, verified tools, and clearly labeled assumptions.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="process" className="bg-[#f7f2e9] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionLabel>The exact fulfillment flow</SectionLabel>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Diagnose. Research. Prescribe. Review.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                  This is the Startup Ideas Podcast model translated into a clear client experience. Implementation comes after the diagnosis, and only if you want help.
                </p>
              </div>

              <div className="border-l border-stone-300 pl-6 sm:pl-10">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.label} className={`relative pb-12 ${index === processSteps.length - 1 ? 'pb-0' : ''}`}>
                      <span className="absolute -left-[2.15rem] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-[#f7f2e9] text-orange-800 sm:-left-[3.05rem]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                        <p className="text-sm font-bold text-orange-800">{step.number}<br />{step.label}</p>
                        <div>
                          <h3 className="font-serif text-3xl text-slate-950">{step.title}</h3>
                          <p className="mt-3 max-w-2xl leading-7 text-slate-600">{step.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="border-y border-stone-300 bg-[#fffdf8] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <SectionLabel>Why Dominic</SectionLabel>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  I build systems because I needed them first.
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  I am a San Antonio operator who builds. I know the strange tension of trying to serve the customer in front of you while the phone rings, the admin piles up, and the next follow up depends on you remembering it tonight.
                </p>
                <p className="mt-5 border-l-2 border-orange-700 pl-5 font-serif text-2xl leading-9 text-slate-900">
                  I am not here to force AI into your business. I am here to help the work move.
                </p>
              </div>
              <div className="divide-y divide-stone-300 border-y border-stone-300">
                {proofItems.map((item) => (
                  <article key={item.label} className="grid gap-3 py-7 sm:grid-cols-[170px_1fr]">
                    <p className="text-sm font-bold uppercase tracking-wider text-orange-800">{item.label}</p>
                    <div>
                      <h3 className="font-serif text-2xl text-slate-950">{item.title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-orange-800 py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <p className="font-serif text-3xl leading-tight sm:text-4xl">If a checklist fixes it, I will not sell you a robot.</p>
              <p className="mt-3 max-w-3xl leading-7 text-orange-100">The right answer might be AI, ordinary software, a cleaner handoff, or keeping the process manual. The diagnosis comes first.</p>
            </div>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-orange-900 hover:bg-orange-50">
              Share the workflow <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        <section id="faq" className="bg-[#fffdf8] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <SectionLabel>Questions before we talk</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl">Straight answers.</h2>
            </div>
            <div className="divide-y divide-stone-300 border-y border-stone-300">
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
                      <ChevronUp className="h-5 w-5 flex-none text-orange-800" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-none text-slate-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <p id={`faq-answer-${index}`} className="max-w-3xl pb-5 leading-7 text-slate-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-stone-300 bg-[#f7f2e9] py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
            <div>
              <MessageSquare className="h-9 w-9 text-orange-800" />
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl">
                What is the one process you wish would disappear?
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Give me the messy version. Tell me what happens, who touches it, and where it falls apart. I will personally review it and tell you whether the paid assessment makes sense.
              </p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Prefer to talk?</p>
              <a href="tel:+12108028945" className="mt-2 inline-flex items-center gap-2 font-serif text-2xl text-orange-800 hover:text-orange-950">
                <Phone className="h-5 w-5" />
                (210) 802-8945
              </a>
            </div>
            <div>
              {submitted && (
                <div role="status" className="mb-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-950">
                  Thanks. Your workflow was submitted. I will review it and follow up using the contact details you provided.
                </div>
              )}
              <form action={formAction} method="POST" acceptCharset="UTF-8" className="rounded-2xl border border-stone-300 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
                <label className="hidden" aria-hidden="true">
                  Leave this field empty
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Your name
                    <input type="text" name="name" autoComplete="name" required className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf8] px-4 py-3 font-normal text-slate-950 outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Business name
                    <input type="text" name="business" autoComplete="organization" required className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf8] px-4 py-3 font-normal text-slate-950 outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Email
                    <input type="email" name="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf8] px-4 py-3 font-normal text-slate-950 outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-semibold text-slate-800">
                    Phone <span className="font-normal text-slate-500">(optional)</span>
                    <input type="tel" name="phone" autoComplete="tel" className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf8] px-4 py-3 font-normal text-slate-950 outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" />
                  </label>
                </div>
                <label className="mt-5 block text-sm font-semibold text-slate-800">
                  If you could wave a magic wand and delete one process, what would it be?
                  <textarea
                    name="workflow"
                    rows={6}
                    required
                    placeholder="Tell me how it works today, how often it happens, and where the work gets stuck."
                    className="mt-2 w-full resize-y rounded-xl border border-stone-300 bg-[#fffdf8] px-4 py-3 font-normal text-slate-950 outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100"
                  />
                </label>
                <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-800 px-6 py-3.5 font-semibold text-white hover:bg-orange-900">
                  Send the workflow to Dominic <ArrowRight className="h-5 w-5" />
                </button>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  This form sends your message through a secure server route to our email provider. Do not include passwords, protected personal information, or sensitive customer data.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
          <div>
            <p className="font-serif text-2xl text-white">AI Consulting SA</p>
            <p className="mt-2 max-w-xl text-sm leading-6">Practical AI consulting for San Antonio service business owners who want one painful workflow to move better.</p>
            <p className="mt-3 text-sm">San Antonio, Texas &middot; <a href="tel:+12108028945" className="text-white hover:text-orange-300">(210) 802-8945</a></p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a href="/ai-tools-assessment-san-antonio/" className="hover:text-white">AI Tools Assessment</a>
            <a href="/ai-phone-answering/" className="hover:text-white">Phone answering</a>
            <a href="/ai-document-automation-san-antonio/" className="hover:text-white">Document automation</a>
            <a href="/small-business-automation-san-antonio/" className="hover:text-white">Workflow automation</a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[0.75fr_1.25fr] gap-2 border-t border-stone-300 bg-[#fffdf8]/95 p-3 backdrop-blur md:hidden">
        <a href="tel:+12108028945" className="flex items-center justify-center gap-2 rounded-full border border-stone-400 px-4 py-3 font-semibold text-slate-950">
          <Phone className="h-4 w-4" /> Call
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 rounded-full bg-orange-800 px-4 py-3 font-semibold text-white">
          Share the workflow <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
