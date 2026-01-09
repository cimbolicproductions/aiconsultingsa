import React, { useState } from 'react';
import { ArrowRight, Check, Zap, Target, TrendingUp, Shield, MapPin, Phone, Mail, Star } from 'lucide-react';

export default function AIConsultingLanding() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', challenge: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Attention */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">AI First Solutions</div>
          <div className="flex gap-6 items-center">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">San Antonio, TX</span>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-500/30 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Serving San Antonio & South Texas Businesses
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build Faster. Operate Smarter. 
              <span className="text-blue-200"> Win More Projects.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Your best employees become 3x more productive when they know how to work WITH AI, not fear it. 
              I don't replace your team—I supercharge them with training, tools, and automation that makes 
              their jobs easier and your operations unstoppable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#consultation" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                Get Your Free AI Assessment
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition">
                See How It Works
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-blue-100">
              <Shield className="w-5 h-5" />
              <span className="font-medium">100% Satisfaction Guarantee or Full Refund</span>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Agitation - Interest */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Manual Processes Are Killing Your Margins
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every day without AI automation costs your operation in ways that directly hit the bottom line.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border-2 border-slate-200">
              <div className="text-red-600 font-bold text-5xl mb-4">$85K</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Annual Cost Per Employee</h3>
              <p className="text-slate-600">
                Project managers spend 40% of their time on paperwork, bid coordination, and status updates. 
                AI handles this automatically—freeing them to manage more projects and win more work.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl border-2 border-slate-200">
              <div className="text-red-600 font-bold text-5xl mb-4">23%</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Margin Lost to Inefficiency</h3>
              <p className="text-slate-600">
                Manual inventory tracking, equipment scheduling, and labor coordination create costly delays. 
                Competitors using AI automation operate 30-40% more efficiently.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl border-2 border-slate-200">
              <div className="text-red-600 font-bold text-5xl mb-4">4-6</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Weeks to Deliver Quotes</h3>
              <p className="text-slate-600">
                While you're manually calculating bids and coordinating estimates, projects go to faster competitors. 
                AI cuts quote turnaround from weeks to hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution - Desire */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The AI Solutions That Transform Operations
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Purpose-built automation for construction, manufacturing, and logistics companies. 
              Real tools that deliver measurable results—or you don't pay.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-6">
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Automated Bidding & Estimating
                </h3>
                <p className="text-slate-600 mb-4">
                  Generate accurate quotes in hours instead of weeks. AI analyzes project specs, 
                  historical data, and material costs to create competitive bids faster than your 
                  competition can schedule a site visit.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Instant material takeoffs from blueprints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Labor cost prediction based on project type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Win rate optimization with competitive analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Equipment & Resource Optimization + Team Training
                </h3>
                <p className="text-slate-600 mb-4">
                  Stop guessing on equipment allocation and labor scheduling. AI predicts maintenance needs, 
                  optimizes equipment utilization, and eliminates costly downtime—while your team learns to 
                  leverage these insights for smarter daily decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Predictive maintenance scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Automated crew scheduling and dispatch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Staff training to interpret AI recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 rounded-2xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Here's What Makes Us Different</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">100% Money-Back Guarantee</h4>
                      <p className="text-blue-100">
                        If you're not thrilled with the results, you pay nothing. Zero risk, all reward. 
                        I'm betting on your success—not my invoice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Value-First Pricing</h4>
                      <p className="text-blue-100">
                        Pay what it's worth to you—after you see the results. My goal is your transformation, 
                        not maximizing my fees.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Local San Antonio Focus</h4>
                      <p className="text-blue-100">
                        Face-to-face collaboration with a consultant who understands the South Texas market. 
                        Real meetings, real relationships, real results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Battle-Tested AI Expertise</h4>
                      <p className="text-blue-100">
                        Built 5 production web apps and 1 mobile app from scratch. Spent 1,000+ hours over 3 years 
                        mastering AI (since the boom started)—learning, testing, and building every single day. 
                        I know what works because I've done it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Empowerment Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI That Empowers Your Team, Not Replaces Them
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The biggest mistake companies make? Implementing AI without training their people. 
              I build systems AND teach your team how to leverage them for maximum impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold mb-3">Hands-On Training Programs</h3>
                <p className="text-slate-300 mb-4">
                  Your project managers, estimators, and operations staff learn to use AI tools effectively. 
                  Not theoretical workshops—practical, on-the-job training that sticks.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-200">Role-specific training (estimators, managers, field staff)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-200">Learn-by-doing with real projects, not theory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-200">Ongoing support as questions arise</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold mb-3">AI Champions Program</h3>
                <p className="text-slate-300 mb-4">
                  We identify and train internal "AI champions" who become expert users and help their 
                  colleagues. Your team becomes self-sufficient, not dependent on consultants forever.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Why Employee Training Matters</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold text-blue-200 mb-2">85%</div>
                  <p className="text-blue-100">
                    of AI implementations fail because employees don't know how to use them effectively. 
                    Technology alone isn't enough.
                  </p>
                </div>
                
                <div className="border-t border-blue-400 pt-6">
                  <div className="text-5xl font-bold text-blue-200 mb-2">3x</div>
                  <p className="text-blue-100">
                    productivity increase when employees are trained to work WITH AI tools instead of 
                    fighting against them or ignoring them completely.
                  </p>
                </div>
                
                <div className="border-t border-blue-400 pt-6">
                  <h4 className="font-bold text-xl mb-2">The Result?</h4>
                  <p className="text-blue-100">
                    Your estimators generate quotes faster. Your project managers handle more jobs. 
                    Your operations team makes smarter decisions. Everyone wins—especially your bottom line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              No corporate bureaucracy. No endless meetings. Just a straightforward path from where you are 
              to where you want to be.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Free Assessment</h3>
              <p className="text-slate-600">
                We meet at your office or mine. I analyze your processes, identify AI opportunities, 
                and map your path to automation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Strategy</h3>
              <p className="text-slate-600">
                Receive a detailed roadmap with specific AI solutions, projected ROI, 
                and implementation timeline—tailored to your business.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Build + Train Your Team</h3>
              <p className="text-slate-600">
                I build and deploy your AI systems while training your team to use them effectively. 
                Hands-on sessions, documentation, and ongoing support—not just software handoff.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ongoing Optimization</h3>
              <p className="text-slate-600">
                Your AI systems get smarter over time. I monitor, refine, and enhance 
                performance based on real-world data and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Specialized Solutions for Your Industry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every industry has unique workflows. We build AI systems that understand your specific operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Construction & Contractors",
                benefits: ["Automated bid generation", "Project scheduling optimization", "Subcontractor coordination", "Material tracking & forecasting"]
              },
              { 
                title: "Manufacturing & Production",
                benefits: ["Quality control automation", "Production scheduling AI", "Inventory optimization", "Defect detection systems"]
              },
              { 
                title: "Logistics & Distribution",
                benefits: ["Route optimization", "Warehouse automation", "Demand forecasting", "Shipment tracking systems"]
              },
              { 
                title: "Wholesale & B2B Sales",
                benefits: ["Order processing automation", "Pricing optimization", "Inventory management", "Sales forecasting"]
              },
              { 
                title: "Energy & Utilities",
                benefits: ["Asset monitoring automation", "Predictive maintenance", "Resource allocation", "Operations dashboards"]
              },
              { 
                title: "Facilities & Property Management",
                benefits: ["Maintenance scheduling", "Vendor coordination", "Work order automation", "Building systems monitoring"]
              }
            ].map((industry, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{industry.title}</h3>
                <ul className="space-y-2">
                  {industry.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Results from Real Businesses
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "We went from 3-week bid turnaround to same-day quotes. The AI system analyzes 
                blueprints and generates accurate estimates automatically. We're winning 40% more 
                projects because we respond faster than competitors."
              </p>
              <div className="font-semibold text-slate-900">Mike Rodriguez</div>
              <div className="text-slate-600 text-sm">Commercial Construction, San Antonio</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "The AI system is great, but the training made the real difference. Our maintenance team 
                went from reactive firefighting to proactive planning. They're proud of their new skills 
                and we cut downtime 65%. Training included, not an afterthought."
              </p>
              <div className="font-semibold text-slate-900">Jennifer Chen</div>
              <div className="text-slate-600 text-sm">Manufacturing Operations, San Antonio</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Route optimization AI reduced our fuel costs 28% and our drivers make 30% more 
                deliveries per day. The system adapts in real-time to traffic, weather, and 
                last-minute changes. This paid for itself in 6 weeks."
              </p>
              <div className="font-semibold text-slate-900">Carlos Martinez</div>
              <div className="text-slate-600 text-sm">Distribution & Logistics, San Antonio</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Action */}
      <section id="consultation" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Schedule your free, no-obligation AI assessment. I'll show you exactly where 
              AI can save you money and make you more competitive.
            </p>
            <p className="text-lg text-blue-200 font-semibold">
              Local San Antonio meetings available—let's talk in person.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-slate-900"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-slate-900"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-slate-900"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your Company Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    What's your biggest challenge right now?
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-slate-900"
                    value={formData.challenge}
                    onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                    placeholder="Tell me about the manual processes slowing you down or opportunities you're missing..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  Schedule My Free AI Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-center text-slate-600 text-sm">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure. No spam, ever. 100% satisfaction guaranteed.
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="bg-green-100 text-green-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h3>
                <p className="text-xl text-slate-700">
                  I'll reach out within 24 hours to schedule your free AI assessment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AI First Solutions</h3>
              <p className="text-slate-300 mb-4">
                Transforming San Antonio businesses through intelligent automation and AI-first strategies.
              </p>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-5 h-5" />
                <span>San Antonio, Texas</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-slate-300">
                <li>AI Strategy & Consulting</li>
                <li>Intelligent Automation</li>
                <li>Custom AI Development</li>
                <li>Predictive Analytics</li>
                <li>Process Optimization</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>hello@aifirstsolutions.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Serving Greater San Antonio</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p className="mb-2">
              © 2026 AI First Solutions. All rights reserved.
            </p>
            <p className="text-sm">
              Built by an AI consultant who believes in results over rhetoric—and backs it with a 100% guarantee.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
