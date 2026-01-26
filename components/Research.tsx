import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Users, Clock, Target, Lightbulb, Shield, BarChart3, Zap, CheckCircle, Brain } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  number: number;
}

const Research: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-1');
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const chapters: Chapter[] = [
    { id: 'chapter-1', title: 'Human Decision & B2B Psychology', number: 1 },
    { id: 'chapter-2', title: 'Transactional Cost & Temporal Friction', number: 2 },
    { id: 'chapter-3', title: 'Unit Economics & The Creative Lever', number: 3 },
    { id: 'chapter-4', title: 'Market Sophistication & Differentiation', number: 4 },
    { id: 'chapter-5', title: 'The Irresistible Offer', number: 5 },
    { id: 'chapter-6', title: 'Visual Architecture', number: 6 },
    { id: 'chapter-7', title: 'Channel Selection & Systemic Focus', number: 7 },
    { id: 'chapter-8', title: 'Empathy & Biological Risk', number: 8 },
    { id: 'chapter-9', title: 'Data Integrity & Scientific Method', number: 9 },
    { id: 'chapter-10', title: 'Anti-Fragility & Redundancy', number: 10 },
    { id: 'chapter-11', title: 'The Autopilot Revenue Engine', number: 11 },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('[data-chapter]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-20">
      <div className="flex max-w-[1800px] mx-auto">
        {/* Left Sidebar - Fixed Chapter Navigation */}
        <div className="hidden lg:block w-80 fixed left-0 top-20 h-[calc(100vh-5rem)] border-r border-white/10 bg-[#020202] overflow-hidden">
          <div className="p-8 h-full flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Research
              </h2>
              <p className="text-sm text-gray-400">The Axioms of Scalable Growth</p>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <nav className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => scrollToChapter(chapter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                      activeChapter === chapter.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-2 border-purple-400'
                        : 'hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-mono mt-0.5 ${
                          activeChapter === chapter.id ? 'text-purple-400' : 'text-gray-500'
                        }`}
                      >
                        {String(chapter.number).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm leading-tight ${
                          activeChapter === chapter.id
                            ? 'text-white font-medium'
                            : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                      >
                        {chapter.title}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>11 Chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span>Research-Backed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Scrollable */}
        <div className="flex-1 lg:ml-80" ref={contentRef}>
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Research & First Principles</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                The Axioms of <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Scalable Growth
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                This analysis identifies the non-negotiable principles governing commercial growth. Every
                conclusion is derived from the objective reality of human behavior, the biological constraints
                of psychology, and the mathematical constraints of unit economics.
              </p>
            </motion.div>

            {/* Chapter 1 */}
            <section id="chapter-1" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    01
                  </div>
                  <h2 className="text-3xl font-bold">The Axiom of Human Decision & B2B Psychology</h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    The most common failure in commercial strategy is the categorical separation of "B2B" and
                    "B2C." This is a logical error. All transactions are <strong>H2H (Human-to-Human)</strong>.
                    While B2C often solves for immediate gratification or status, B2B solves for{' '}
                    <strong>Risk Mitigation</strong> and <strong>Professional Survival</strong>.
                  </p>

                  <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      The Biological Reality of Loss Aversion
                    </h3>
                    <p className="text-gray-300">
                      B2B decision-making is governed by a higher intensity of <strong>Loss Aversion</strong>.
                      According to the Prospect Theory developed by Kahneman and Tversky, the pain of losing is
                      psychologically twice as powerful as the joy of gaining. In B2B, the "loss" isn't just
                      financial; it is the potential loss of job security or professional standing.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 mt-8">B2B vs. B2C: The Logical Divergence</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 text-purple-400">Variable</th>
                          <th className="text-left py-3 px-4 text-purple-400">B2C (Consumer)</th>
                          <th className="text-left py-3 px-4 text-purple-400">B2B (Professional)</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">Primary Driver</td>
                          <td className="py-3 px-4">Immediate Desire / Identity</td>
                          <td className="py-3 px-4">Risk Mitigation / ROI</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">Decision Unit</td>
                          <td className="py-3 px-4">Individual (Impulsive)</td>
                          <td className="py-3 px-4">Committee (Deliberative)</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">Time Horizon</td>
                          <td className="py-3 px-4">Short-Term (Instant)</td>
                          <td className="py-3 px-4">Long-Term (Quarterly/Annual)</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Cognitive Cost</td>
                          <td className="py-3 px-4">Low (Emotional)</td>
                          <td className="py-3 px-4">High (Analytical/Justificatory)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                      <Target className="w-5 h-5" />
                      Operational Conclusion
                    </h4>
                    <p className="text-gray-300">
                      Scaling B2B requires a system that provides the analytical "proof" needed to justify the
                      decision to a committee, while simultaneously resolving the individual decision-maker's
                      biological fear of making a mistake. You do not sell a service; you sell the{' '}
                      <strong>elimination of professional risk</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 2 */}
            <section id="chapter-2" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    02
                  </div>
                  <h2 className="text-3xl font-bold">The Axiom of Transactional Cost & Temporal Friction</h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    A transaction only occurs when a prospect's <strong>perceived value</strong> exceeds the{' '}
                    <strong>total perceived cost of acquisition</strong>. This cost is a composite of three
                    elements: Monetary Cost, Cognitive Cost, and Temporal Cost.
                  </p>

                  <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      The Cognitive Load Theory
                    </h3>
                    <p className="text-gray-300">
                      Based on Sweller's Cognitive Load Theory, the human brain has a limited working memory.
                      Every unnecessary step, vague sentence, or slow-loading page adds to the "Extraneous
                      Cognitive Load." When this load exceeds the brain's capacity, the prospect experiences
                      "Decision Fatigue" and defaults to the safest option: <strong>Doing Nothing</strong>.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 mt-8 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-orange-400" />
                    The Temporal Cost Catastrophe
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Time is the most volatile non-monetary cost.
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>
                        <strong>The 5-Minute Rule</strong>: Research by the Harvard Business Review indicates
                        that responding within 5 minutes results in a <strong>10x higher chance of connection</strong> than waiting just 30 minutes.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>
                        <strong>The Speed-to-Lead Multiplier</strong>: A lead followed up with in the first
                        minute sees a <strong>391% increase in conversions</strong>.
                      </span>
                    </li>
                  </ul>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                      <Target className="w-5 h-5" />
                      Operational Conclusion
                    </h4>
                    <p className="text-gray-300">
                      Any system relying on a human to manually initiate contact is fundamentally non-scalable.
                      The delay inherent in manual processes is a quantifiable destruction of qualified leads.
                      Scaling requires the transition from human-initiated response to system-enforced immediacy
                      through <strong>Zero-Latency Infrastructure</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 3 */}
            <section id="chapter-3" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    03
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of Unit Economics, Liquidity & The Creative Lever
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Growth is not measured by revenue; it is measured by the sustainable margin between the
                    value generated by a customer and the cost incurred to acquire them.
                  </p>

                  <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      The Mathematics of Scalability
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p>
                        <strong className="text-emerald-400">Axiom 3.1:</strong> Sustainable growth requires an
                        LTV:CAC ratio of at least <strong>3:1</strong>.
                      </p>
                      <p>
                        <strong className="text-emerald-400">Axiom 3.2:</strong> The viability of a scaling
                        strategy is determined by the Payback Period—the time required to recoup the CAC.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 mt-8">
                    The Industry Fallacy: The "LTV Vanity" Trap
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Agencies often boast about high LTV, but they fail to account for the{' '}
                    <strong>Cash Flow Gap</strong>. Scaling with a long payback period is a slow-motion
                    collapse. To achieve "Infinite Scalability," the initial offer must be engineered for{' '}
                    <strong>Cash-Flow Positive Acquisition</strong>, recouping the CAC within 0-90 days.
                  </p>

                  <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-orange-400" />
                      The Creative Determinant
                    </h3>
                    <p className="text-gray-300">
                      Nielsen research confirms that <strong>creative quality is responsible for 47% to 56% of
                      a campaign's effectiveness</strong>. The platform algorithm is a distribution engine; the
                      message is the lever that determines the CAC. A weak message delivered to a perfect
                      audience will fail. A strong message delivered to a broad audience will succeed by
                      lowering the "Attention Cost" in the auction.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 4 */}
            <section id="chapter-4" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    04
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of Market Sophistication & Differentiation
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    An offer exists within the context of the market's previous experiences. As a market
                    matures, it moves through the <strong>5 Stages of Sophistication</strong>.
                  </p>

                  <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      The 5 Stages of Sophistication
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-indigo-400 font-bold">1.</span>
                        <span>
                          <strong>Stage 1 (Unaware)</strong>: No competition. A simple claim works.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-indigo-400 font-bold">2.</span>
                        <span>
                          <strong>Stage 2 (Solution Aware)</strong>: Competitors enter. The claim must be
                          expanded.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-indigo-400 font-bold">3.</span>
                        <span>
                          <strong>Stage 3 (Sophisticated)</strong>: The market has heard all the claims. They
                          no longer believe the result. This is where the Unique Mechanism becomes mandatory.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-indigo-400 font-bold">4.</span>
                        <span>
                          <strong>Stage 4 (Saturated)</strong>: Claims are ignored. The mechanism must be
                          amplified.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-indigo-400 font-bold">5.</span>
                        <span>
                          <strong>Stage 5 (Indifferent)</strong>: The market is completely skeptical. Scaling
                          requires a shift from "Selling" to "Resonance-Building."
                        </span>
                      </li>
                    </ol>
                  </div>

                  <p className="text-gray-300 mb-4">
                    <strong className="text-purple-400">Axiom 4.1:</strong> In a sophisticated market, the
                    "Same-ness Tax" increases CAC and triggers the Skepticism Alarm. When a prospect perceives
                    your solution as a commodity, they default to the lowest price.
                  </p>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                      <Target className="w-5 h-5" />
                      Operational Conclusion
                    </h4>
                    <p className="text-gray-300">
                      Scaling requires the systematic identification of the market's sophistication stage. If
                      you use a Stage 1 "Direct Offer" in a Stage 5 "Saturated Market," your CAC will be
                      infinite.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 5 */}
            <section id="chapter-5" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    05
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of the Irresistible Offer & The Skepticism Threshold
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    The Offer is the single most powerful lever in the scaling process. A superior offer
                    mathematically outperforms superior marketing.
                  </p>

                  <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Value Equation</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-purple-400">Axiom 5.1:</strong> The value of an offer is an
                      objective ratio of outcome and certainty over time and effort.
                    </p>
                    <div className="bg-black/40 p-6 rounded-lg border border-purple-500/20 text-center">
                      <p className="text-lg text-gray-200 font-mono">
                        Value = (Dream Outcome × Likelihood) / (Time Delay × Effort)
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 mt-8">The Skepticism Threshold</h3>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-purple-400">Axiom 5.2:</strong> If the Perceived Value exceeds the
                    prospect's belief in the Perceived Likelihood of Achievement, the transaction fails. An
                    offer that is "too good to be true" triggers the amygdala (the brain's fear center).
                  </p>

                  <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Wordiness Tax</h3>
                    <p className="text-gray-300">
                      <strong className="text-red-400">Axiom 5.3:</strong> Wordiness is a direct increase in
                      Cognitive Cost and a trigger for the Skepticism Alarm. Every unnecessary word forces the
                      prospect to expend mental energy to find the core value. If the offer cannot be
                      communicated with flawless clarity, the prospect assumes the value is absent.
                    </p>
                  </div>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                      <Target className="w-5 h-5" />
                      Operational Conclusion
                    </h4>
                    <p className="text-gray-300">
                      The Offer must be a strategic combination of Force Multipliers (Guarantees, Scarcity,
                      Stacking, Done-For-You) designed to maximize the Value Equation while remaining below the
                      Skepticism Threshold.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 6 */}
            <section id="chapter-6" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    06
                  </div>
                  <h2 className="text-3xl font-bold">The Axiom of Visual Architecture</h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Visual assets are the most efficient medium for conveying high-density information. However,
                    most fail because they ignore the physics of attention.
                  </p>

                  <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">Creative Video Architecture</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-cyan-400">Axiom 6.1:</strong> A video ad is a sequence of three
                      psychological gates: The Hook (Attention), The Retention (Value), and The Reward (Action).
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>
                          <strong>The Hook (Pattern Interrupt)</strong>: Based on the Von Restorff Effect,
                          humans are programmed to pay attention to the "outlier." A hook must be a visual or
                          auditory anomaly that breaks the "Scroll-Trance."
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>
                          <strong>The Retention (The Unique Mechanism)</strong>: Once attention is secured, you
                          must demonstrate the Unique Mechanism. This builds Resonance and proves the Perceived
                          Likelihood of Achievement.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">Static Signal Architecture</h3>
                    <p className="text-gray-300">
                      <strong className="text-violet-400">Axiom 6.2:</strong> A static ad is a High-Density
                      Signal designed for Foveal capture. The human eye has two modes: Peripheral (detecting
                      movement) and Foveal (focusing on detail). A static ad must use high-contrast "Visual
                      Anchors" to pull the eye from Peripheral to Foveal focus in under 0.5 seconds.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 7 */}
            <section id="chapter-7" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    07
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of Channel Selection & Systemic Focus
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    "Half-dipping" into multiple channels is a failure of focus that leads to a{' '}
                    <strong>Complexity Tax</strong> on your capital and attention.
                  </p>

                  <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Axiom of Intent vs. Interruption</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-amber-400">Axiom 7.1:</strong> Channel selection is determined by
                      the intersection of Market Intent and Market Sophistication.
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>
                          <strong>Search (Intent-Based)</strong>: Google Ads. Best for prospects actively
                          seeking a solution (High Intent).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>
                          <strong>Social (Interruption-Based)</strong>: Meta/LinkedIn. Best for building
                          Resonance and capturing prospects who don't yet know they have a problem (High
                          Awareness-Building).
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 border border-rose-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">
                      The Axiom of Systemic Focus (The Anti-Dilettante Principle)
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-rose-400">Axiom 7.2:</strong> A business is better off with one
                      flawless, automated acquisition engine than five manual, "half-dipped" channels. Every new
                      channel added without automation increases the Complexity Tax—the operational overhead
                      required to manage the data.
                    </p>
                  </div>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                      <Target className="w-5 h-5" />
                      Operational Conclusion
                    </h4>
                    <p className="text-gray-300">
                      You do not "try" platforms. You engineer a system for a specific "pond" where your Unique
                      Mechanism has the highest mathematical advantage.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 8 */}
            <section id="chapter-8" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    08
                  </div>
                  <h2 className="text-3xl font-bold">The Axiom of Empathy & Biological Risk</h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    While code handles logic, humans handle <strong>Biological Risk</strong>—the inherent fear
                    of loss, deception, or error that AI cannot yet solve.
                  </p>

                  <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-400" />
                      Trust is a Human-to-Human Protocol
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-emerald-400">Axiom 8.1:</strong> In B2B, the "Biological Risk" is
                      the fear of professional failure. Automation handles the Qualification (logic), but the
                      human handles the Commitment (empathy). Scaling is the liberation of the human from
                      repetitive tasks to high-value, trust-building interactions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 9 */}
            <section id="chapter-9" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    09
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of Data Integrity & The Scientific Method
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    In a scaling ecosystem, the most dangerous variable is <strong>Inaccurate Information</strong>.
                  </p>

                  <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-6 my-8">
                    <p className="text-gray-300 mb-4">
                      <strong className="text-blue-400">Axiom 9.1:</strong> Platform attribution is a biased
                      witness; scaling requires First-Party Data Integrity. Relying on platform ROAS is a
                      failure of logic. Scaling requires a Single Source of Truth—a first-party dashboard that
                      tracks the prospect from the initial click to the final LTV realization.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Scientific Method of Scaling</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-violet-400">Axiom 9.2:</strong> Growth is the result of isolating
                      the Bottleneck Variable and applying a targeted fix. Scaling is not a creative act; it is
                      a sequence of controlled experiments.
                    </p>
                    <ol className="space-y-2 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-violet-400 font-bold">1.</span>
                        <span>
                          <strong>Awareness (The Hook)</strong>: If CTR is low, the Hook is failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-violet-400 font-bold">2.</span>
                        <span>
                          <strong>Interest (The Retention)</strong>: If watch time is low, the Mechanism is
                          failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-violet-400 font-bold">3.</span>
                        <span>
                          <strong>Desire (The Offer)</strong>: If conversion is low, the Value Equation is
                          failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-violet-400 font-bold">4.</span>
                        <span>
                          <strong>Action (The Closer)</strong>: If close rate is low, the Trust is failing.
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 10 */}
            <section id="chapter-10" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    10
                  </div>
                  <h2 className="text-3xl font-bold">
                    The Axiom of Anti-Fragility & Systemic Redundancy
                  </h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Scaling often breaks manual businesses. A scalable system must be designed to get stronger
                    as it handles more volume and to survive external shocks.
                  </p>

                  <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-400" />
                      Manual vs. Automated Systems
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p>
                        <strong className="text-red-400">Axiom 10.1:</strong> A manual business is Fragile; an
                        automated system is Anti-Fragile.
                      </p>
                      <p>
                        <strong className="text-red-400">Axiom 10.2:</strong> Scaling requires Systemic
                        Redundancy to mitigate Single Points of Failure. In the modern digital ecosystem,
                        "External Shocks" (e.g., ad account bans, algorithm updates) are inevitable. An
                        "Anti-Fragile" system maintains Redundancy Assets: multiple acquisition channels, backup
                        creative, and diversified data sources.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Chapter 11 */}
            <section id="chapter-11" data-chapter className="mb-24 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    11
                  </div>
                  <h2 className="text-3xl font-bold">The Synthesis: The Autopilot Revenue Engine</h2>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    The synthesis of these axioms creates a closed-loop system designed for predictable growth.
                  </p>

                  <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Complete System</h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Data Integrity (Axiom 9.1)</strong>: The Truth.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Scientific Method (Axiom 9.2)</strong>: The Optimization.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Sophistication Audit (Axiom 4.1)</strong>: The Differentiation.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Resonance Assets (Chapter 6)</strong>: The Trust.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Irresistible Offer (Axiom 5.1)</strong>: The Value.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Zero-Latency Qualification (Chapter 2)</strong>: The Speed.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Human Closer (Chapter 8)</strong>: The Commitment.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <span>
                          <strong>Anti-Fragile Redundancy (Chapter 10)</strong>: The Survival.
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 my-8 text-center">
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      Growth is the inevitable outcome of a system built on flawless logic and biological truth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* References */}
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">References</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-2">
                  <p>[1]: Unit Economics Benchmarks: Industry standards for sustainable growth.</p>
                  <p>[2]: Creative Effectiveness (Meta): Meta Agency Summit data on auction outcomes.</p>
                  <p>
                    [3]: Creative Effectiveness (Nielsen): Research on creative quality as the primary driver of
                    sales lift.
                  </p>
                  <p>
                    [4]: Speed to Lead Statistics: Harvard Business Review research on conversion decay.
                  </p>
                  <p>[5]: The Value Equation: Framework developed by Alex Hormozi in "$100M Offers."</p>
                  <p>[6]: Brand Equity Investment: Kantar research on the multiplier of brand resonance.</p>
                  <p>[7]: Prospect Theory: Kahneman, D., & Tversky, A. (1979). Econometrica.</p>
                  <p>[8]: Cognitive Load Theory: Sweller, J. (1988). Cognitive Science.</p>
                  <p>
                    [9]: Mere-Exposure Effect: Zajonc, R. B. (1968). Journal of Personality and Social
                    Psychology.
                  </p>
                  <p>[10]: Von Restorff Effect: Von Restorff, H. (1933). Psychologische Forschung.</p>
                  <p>[11]: Gestalt Principles: Wertheimer, M. (1923). Psychologische Forschung.</p>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Research;
