import React, { useState } from 'react';
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

const calendlyUrl = 'https://calendly.com/aiconsultingsa-com/free-ai-audit-call';

const services = [
  {
    title: 'AI phone answering',
    keyword: 'AI phone answering for small business',
    href: '/ai-phone-answering/',
    icon: PhoneCall,
    problem: 'Calls hit voicemail while you are on a job, in a truck, or already helping another customer.',
    solution: 'A Twilio based AI receptionist answers, qualifies the caller, books the next step, and texts you a clean summary.',
  },
  {
    title: 'Document automation',
    keyword: 'AI document automation San Antonio',
    href: '/ai-document-automation-san-antonio/',
    icon: FileText,
    problem: 'PDFs, spec books, invoices, and intake forms keep turning into manual spreadsheet work.',
    solution: 'I build guarded extraction workflows that read the paperwork, structure the data, flag exceptions, and keep a human in the loop.',
  },
  {
    title: 'Back office workflows',
    keyword: 'Small business automation San Antonio',
    href: '/small-business-automation-san-antonio/',
    icon: Workflow,
    problem: 'Your CRM, calendar, inbox, quotes, and follow ups all work, but none of them work together.',
    solution: 'I connect the steps your team repeats every week so leads, jobs, reminders, and reports move without copy paste work.',
  },
];

const proofItems = [
  {
    title: 'AI voice agent on my own line',
    text: 'I run a Twilio voice agent for my own business calls. It picks up when I cannot, captures the details, and sends me the summary.',
  },
  {
    title: 'PDF to spreadsheet automation',
    text: 'I have built software that turns long construction spec documents into organized spreadsheet output for review.',
  },
  {
    title: 'Small business ops software',
    text: 'I run a local rental operation and built the admin tools behind it: unit tracking, SMS reminders, and Stripe payments.',
  },
];

const processSteps = [
  {
    title: 'Walk the real workflow',
    text: 'We start with the job as it happens today: calls, paperwork, follow ups, handoffs, and the places work gets stuck.',
    icon: ClipboardList,
  },
  {
    title: 'Pick one high leverage build',
    text: 'I do not start with a giant transformation plan. We choose one bottleneck where automation can quickly prove itself.',
    icon: Wrench,
  },
  {
    title: 'Build the working system',
    text: 'I wire the AI, rules, integrations, logging, and handoff points so the system behaves predictably in real use.',
    icon: Bot,
  },
  {
    title: 'Train and tune with your team',
    text: 'You get the workflow, the documentation, and the tuning pass after it touches real calls, documents, or leads.',
    icon: CalendarCheck,
  },
];

const faqs = [
  {
    question: 'What kind of San Antonio businesses are the best fit?',
    answer:
      'I work best with 5 to 50 person service businesses around San Antonio: contractors, rental operators, small fleets, distributors, repair shops, and local companies with calls, paperwork, quotes, and follow ups to manage.',
  },
  {
    question: 'Is this strategy consulting or implementation?',
    answer:
      'Implementation. I will help you choose the right first project, but the goal is a working AI workflow your team can use. You are hiring a builder, not someone to leave you with a slide deck.',
  },
  {
    question: 'Do we need to replace our current software?',
    answer:
      'Usually no. The best first projects connect what you already use: phone, email, calendar, CRM, spreadsheets, forms, Stripe, or job management tools.',
  },
  {
    question: 'Do you work outside San Antonio?',
    answer:
      'I focus on businesses within about an hour of San Antonio because seeing the real workflow in person matters. That includes Boerne, New Braunfels, San Marcos, Schertz, Converse, Seguin, Helotes, and nearby areas.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Small focused builds often start in the low thousands. Larger workflow and document automation projects depend on the number of tools, edge cases, and training needs. The first call is to see whether there is a strong enough use case before we talk scope.',
  },
];

export default function AIConsultingServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="text-lg font-semibold tracking-tight text-slate-950">
            AI Consulting SA
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-slate-950">Services</a>
            <a href="#proof" className="hover:text-slate-950">Proof</a>
            <a href="#process" className="hover:text-slate-950">Process</a>
            <a href="#faq" className="hover:text-slate-950">FAQ</a>
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-stone-50 px-3 py-2 text-sm font-medium text-slate-700">
              <MapPin className="h-4 w-4 text-blue-700" />
              San Antonio, Boerne, New Braunfels, Schertz, Seguin
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
              AI consultant in San Antonio for service businesses that need working automation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              I build AI phone answering, document automation, and back office workflows for local operators who are missing calls, losing time to paperwork, or manually chasing the same follow ups every week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Book a free 15 minute call
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+12108028945"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:border-slate-500"
              >
                <Phone className="h-5 w-5" />
                Call (210) 802-8945
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {['No generic AI workshop', 'Built around your tools', 'English and Spanish voice workflows'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <Check className="h-4 w-4 text-blue-700" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-lg border border-slate-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Best fit</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Local companies with one painful bottleneck.</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>Service calls are going to voicemail or getting returned too late.</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>Office staff are buried in PDFs, forms, spreadsheets, and status updates.</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-5 w-5 flex-none text-blue-700" />
                <span>Leads, quotes, appointments, and reminders require too many manual handoffs.</span>
              </li>
            </ul>
            <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
              If the problem can be observed in a normal workday, it can usually be scoped into a focused first build.
            </p>
          </aside>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Positioning</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                You do not need another AI demo. You need one stuck workflow fixed.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The first project should be narrow enough to ship and important enough to matter. A missed call workflow. A document intake workflow. A quote follow up workflow. Once the first one works, the next automation is easier to trust.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Services</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                  High intent AI automation services.
                </h2>
              </div>
              <p className="max-w-xl text-slate-600">
                These are separate search intents and separate buyer pains. Each one has its own page so Google and the customer can understand exactly what you do.
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
                    <p className="mt-4 text-sm font-semibold text-slate-500">Build</p>
                    <p className="mt-1 leading-7 text-slate-700">{service.solution}</p>
                    <a href={service.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">
                      Read more
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
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Proof</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  I build the kind of systems I sell.
                </h2>
                <p className="mt-5 leading-7 text-slate-600">
                  The offer is simple: practical AI implementation for San Antonio businesses. Not prompts for their own sake. Not a strategy deck. Working systems with enough guardrails for real operations.
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

        <section id="process" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                How the first automation gets built.
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
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-100"
            >
              Schedule the first call
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
                    <p className="pb-5 leading-7 text-slate-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 bg-stone-50 py-16">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <MessageSquare className="mx-auto h-9 w-9 text-blue-700" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Bring one painful workflow to the call.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              I will tell you whether AI is the right tool, what a first build would look like, and what I would avoid.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Book a free 15 minute call
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+12108028945"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-950 hover:border-slate-500"
              >
                <Phone className="h-5 w-5" />
                (210) 802-8945
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 text-sm text-slate-600 md:flex-row">
          <div>
            <p className="font-semibold text-slate-950">AI Consulting SA</p>
            <p className="mt-2">AI consultant in San Antonio for small business automation.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/ai-phone-answering/" className="hover:text-slate-950">AI phone answering</a>
            <a href="/ai-document-automation-san-antonio/" className="hover:text-slate-950">Document automation</a>
            <a href="/small-business-automation-san-antonio/" className="hover:text-slate-950">Small business automation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
