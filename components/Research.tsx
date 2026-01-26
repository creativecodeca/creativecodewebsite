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
    <div className="min-h-screen bg-[#020202] text-white">
      {/* Left Sidebar - Fixed Chapter Navigation */}
      <div className="hidden lg:block w-80 fixed left-0 top-20 h-[calc(100vh-5rem)] border-r border-white/10 bg-[#020202] overflow-hidden z-40">
        <div className="p-8 h-full flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Research
              </h2>
              <p className="text-sm text-gray-500">The Axioms of Scalable Growth</p>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <nav className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => scrollToChapter(chapter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                      activeChapter === chapter.id
                        ? 'bg-white/5 border-l-2 border-purple-500/50'
                        : 'hover:bg-white/[0.02] border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-mono mt-0.5 ${
                          activeChapter === chapter.id ? 'text-purple-500/70' : 'text-gray-600'
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
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                  <span>11 Chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                  <span>Research-Backed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Right Content - Scrollable */}
      <div className="lg:ml-80 pt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12" ref={contentRef}>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Research & First Principles</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                The Axioms of <br />
                <span className="text-white">
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
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-gray-400" />
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
                          <th className="text-left py-3 px-4 text-white">Variable</th>
                          <th className="text-left py-3 px-4 text-white">B2C (Consumer)</th>
                          <th className="text-left py-3 px-4 text-white">B2B (Professional)</th>
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

                  {/* Diagram 1: B2B Risk Matrix */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The B2B Risk Matrix</h4>
                    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <div className="text-center mb-4">
                          <div className="text-sm font-mono text-gray-500 mb-2">B2C</div>
                          <div className="text-2xl font-bold text-white">Low Risk</div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Personal Decision</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Emotional Driver</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Immediate Gratification</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                        <div className="text-center mb-4">
                          <div className="text-sm font-mono text-purple-500/70 mb-2">B2B</div>
                          <div className="text-2xl font-bold text-white">High Risk</div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500/70 rounded-full"></div>
                            <span>Professional Survival</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500/70 rounded-full"></div>
                            <span>Loss Aversion (2x)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500/70 rounded-full"></div>
                            <span>Committee Justification</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
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
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-gray-400" />
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
                    <Clock className="w-6 h-6 text-gray-400" />
                    The Temporal Cost Catastrophe
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Time is the most volatile non-monetary cost.
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-white/60 mt-1">•</span>
                      <span>
                        <strong>The 5-Minute Rule</strong>: Research by the Harvard Business Review indicates
                        that responding within 5 minutes results in a <strong>10x higher chance of connection</strong> than waiting just 30 minutes.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500/70 mt-1">•</span>
                      <span>
                        <strong>The Speed-to-Lead Multiplier</strong>: A lead followed up with in the first
                        minute sees a <strong>391% increase in conversions</strong>.
                      </span>
                    </li>
                  </ul>

                  {/* Diagram 2: 5-Minute Conversion Cliff */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The 5-Minute Conversion Cliff</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 300" className="w-full h-auto">
                        {/* Axes */}
                        <line x1="50" y1="250" x2="550" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <line x1="50" y1="250" x2="50" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        
                        {/* Y-axis labels */}
                        <text x="30" y="50" fill="rgba(255,255,255,0.5)" fontSize="12">100%</text>
                        <text x="35" y="140" fill="rgba(255,255,255,0.5)" fontSize="12">50%</text>
                        <text x="35" y="255" fill="rgba(255,255,255,0.5)" fontSize="12">0%</text>
                        
                        {/* X-axis labels */}
                        <text x="45" y="275" fill="rgba(255,255,255,0.5)" fontSize="12">0m</text>
                        <text x="140" y="275" fill="rgba(255,255,255,0.5)" fontSize="12">5m</text>
                        <text x="240" y="275" fill="rgba(255,255,255,0.5)" fontSize="12">10m</text>
                        <text x="340" y="275" fill="rgba(255,255,255,0.5)" fontSize="12">30m</text>
                        <text x="520" y="275" fill="rgba(255,255,255,0.5)" fontSize="12">60m</text>
                        
                        {/* Cliff line */}
                        <path
                          d="M 50 50 L 150 60 L 250 120 L 350 200 L 550 240"
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="3"
                          fill="none"
                        />
                        
                        {/* Critical point marker */}
                        <circle cx="150" cy="60" r="6" fill="rgb(168, 85, 247)" />
                        <text x="160" y="55" fill="white" fontSize="14" fontWeight="bold">10x Drop</text>
                        
                        {/* Fill under curve */}
                        <path
                          d="M 50 50 L 150 60 L 250 120 L 350 200 L 550 240 L 550 250 L 50 250 Z"
                          fill="rgba(168, 85, 247, 0.1)"
                        />
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Response Time → Conversion Probability</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Source: Harvard Business Review - Speed-to-Lead Research
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-white" />
                      The Mathematics of Scalability
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p>
                        <strong className="text-white">Axiom 3.1:</strong> Sustainable growth requires an
                        LTV:CAC ratio of at least <strong>3:1</strong>.
                      </p>
                      <p>
                        <strong className="text-white">Axiom 3.2:</strong> The viability of a scaling
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-gray-400" />
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                      The 5 Stages of Sophistication
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">1.</span>
                        <span>
                          <strong>Stage 1 (Unaware)</strong>: No competition. A simple claim works.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">2.</span>
                        <span>
                          <strong>Stage 2 (Solution Aware)</strong>: Competitors enter. The claim must be
                          expanded.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">3.</span>
                        <span>
                          <strong>Stage 3 (Sophisticated)</strong>: The market has heard all the claims. They
                          no longer believe the result. This is where the Unique Mechanism becomes mandatory.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">4.</span>
                        <span>
                          <strong>Stage 4 (Saturated)</strong>: Claims are ignored. The mechanism must be
                          amplified.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">5.</span>
                        <span>
                          <strong>Stage 5 (Indifferent)</strong>: The market is completely skeptical. Scaling
                          requires a shift from "Selling" to "Resonance-Building."
                        </span>
                      </li>
                    </ol>
                  </div>

                  <p className="text-gray-300 mb-4">
                    <strong className="text-purple-500/70">Axiom 4.1:</strong> In a sophisticated market, the
                    "Same-ness Tax" increases CAC and triggers the Skepticism Alarm. When a prospect perceives
                    your solution as a commodity, they default to the lowest price.
                  </p>

                  {/* Diagram 3: 5 Stages of Sophistication Staircase */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">Market Sophistication Staircase</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 350" className="w-full h-auto">
                        {/* Stage 1 */}
                        <rect x="50" y="250" width="100" height="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <text x="100" y="285" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Stage 1</text>
                        <text x="100" y="305" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Unaware</text>
                        
                        {/* Stage 2 */}
                        <rect x="150" y="200" width="100" height="130" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <text x="200" y="260" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Stage 2</text>
                        <text x="200" y="280" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Solution</text>
                        <text x="200" y="295" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Aware</text>
                        
                        {/* Stage 3 */}
                        <rect x="250" y="150" width="100" height="180" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.3)" strokeWidth="2"/>
                        <text x="300" y="235" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Stage 3</text>
                        <text x="300" y="255" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Sophisticated</text>
                        <text x="300" y="270" fill="rgba(168,85,247,0.8)" fontSize="10" textAnchor="middle">(Unique</text>
                        <text x="300" y="283" fill="rgba(168,85,247,0.8)" fontSize="10" textAnchor="middle">Mechanism)</text>
                        
                        {/* Stage 4 */}
                        <rect x="350" y="100" width="100" height="230" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <text x="400" y="210" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Stage 4</text>
                        <text x="400" y="230" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Saturated</text>
                        
                        {/* Stage 5 */}
                        <rect x="450" y="50" width="100" height="280" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <text x="500" y="185" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Stage 5</text>
                        <text x="500" y="205" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Indifferent</text>
                        
                        {/* CAC Arrow */}
                        <path d="M 80 230 L 520 70" stroke="rgba(168,85,247,0.6)" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(168,85,247,0.6)" />
                          </marker>
                        </defs>
                        <text x="300" y="135" fill="rgba(168,85,247,0.9)" fontSize="13" fontWeight="bold">Rising CAC</text>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">As market matures, differentiation becomes mandatory</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Value Equation</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-purple-500/70">Axiom 5.1:</strong> The value of an offer is an
                      objective ratio of outcome and certainty over time and effort.
                    </p>
                    <div className="bg-black/40 p-6 rounded-lg border border-white/10 text-center">
                      <p className="text-lg text-gray-200 font-mono">
                        Value = (Dream Outcome × Likelihood) / (Time Delay × Effort)
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 mt-8">The Skepticism Threshold</h3>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-purple-500/70">Axiom 5.2:</strong> If the Perceived Value exceeds the
                    prospect's belief in the Perceived Likelihood of Achievement, the transaction fails. An
                    offer that is "too good to be true" triggers the amygdala (the brain's fear center).
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Wordiness Tax</h3>
                    <p className="text-gray-300">
                      <strong className="text-gray-400">Axiom 5.3:</strong> Wordiness is a direct increase in
                      Cognitive Cost and a trigger for the Skepticism Alarm. Every unnecessary word forces the
                      prospect to expend mental energy to find the core value. If the offer cannot be
                      communicated with flawless clarity, the prospect assumes the value is absent.
                    </p>
                  </div>

                  {/* Diagram 4: Skepticism Threshold Curve */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The Skepticism Threshold</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 300" className="w-full h-auto">
                        {/* Axes */}
                        <line x1="50" y1="250" x2="550" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <line x1="50" y1="250" x2="50" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        
                        {/* Labels */}
                        <text x="300" y="285" fill="rgba(255,255,255,0.5)" fontSize="14" textAnchor="middle">Perceived Value →</text>
                        <text x="20" y="150" fill="rgba(255,255,255,0.5)" fontSize="14" transform="rotate(-90 20 150)">Conversion Rate →</text>
                        
                        {/* The inverted U curve */}
                        <path
                          d="M 50 240 Q 200 80, 300 50 T 550 240"
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="3"
                          fill="none"
                        />
                        
                        {/* Sweet spot marker */}
                        <circle cx="300" cy="50" r="8" fill="rgb(168, 85, 247)" stroke="white" strokeWidth="2"/>
                        <text x="310" y="45" fill="white" fontSize="13" fontWeight="bold">Optimal</text>
                        
                        {/* Skepticism zone */}
                        <line x1="400" y1="30" x2="400" y2="250" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeDasharray="5,5"/>
                        <text x="410" y="140" fill="rgba(239,68,68,0.8)" fontSize="12" fontWeight="bold">Skepticism</text>
                        <text x="410" y="155" fill="rgba(239,68,68,0.8)" fontSize="12" fontWeight="bold">Alarm</text>
                        
                        {/* Fill zones */}
                        <path
                          d="M 50 240 Q 200 80, 300 50 T 400 100 L 400 250 L 50 250 Z"
                          fill="rgba(168, 85, 247, 0.1)"
                        />
                        <path
                          d="M 400 100 Q 475 165, 550 240 L 550 250 L 400 250 Z"
                          fill="rgba(239, 68, 68, 0.1)"
                        />
                        
                        {/* Zone labels */}
                        <text x="180" y="200" fill="rgba(255,255,255,0.4)" fontSize="11">Trust Zone</text>
                        <text x="460" y="200" fill="rgba(239,68,68,0.6)" fontSize="11">Too Good</text>
                        <text x="460" y="215" fill="rgba(239,68,68,0.6)" fontSize="11">To Be True</text>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Value must exceed price but remain believable</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">Creative Video Architecture</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-gray-400">Axiom 6.1:</strong> A video ad is a sequence of three
                      psychological gates: The Hook (Attention), The Retention (Value), and The Reward (Action).
                    </p>
                    
                    {/* Diagram 5: Video Architecture Timeline */}
                    <div className="bg-black/40 border border-white/10 rounded-lg p-6 my-6">
                      <svg viewBox="0 0 700 200" className="w-full h-auto">
                        {/* Timeline base */}
                        <line x1="50" y1="100" x2="650" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                        
                        {/* Hook section */}
                        <circle cx="100" cy="100" r="50" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="100" y="95" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">HOOK</text>
                        <text x="100" y="112" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Pattern</text>
                        <text x="100" y="127" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Interrupt</text>
                        <text x="100" y="170" fill="rgba(168,85,247,0.8)" fontSize="10" textAnchor="middle">0-3 sec</text>
                        
                        {/* Arrow 1 */}
                        <path d="M 155 100 L 245 100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" markerEnd="url(#arrow1)"/>
                        <defs>
                          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.3)" />
                          </marker>
                        </defs>
                        
                        {/* Retention section */}
                        <circle cx="350" cy="100" r="80" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="350" y="90" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">RETENTION</text>
                        <text x="350" y="107" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Unique</text>
                        <text x="350" y="122" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Mechanism</text>
                        <text x="350" y="190" fill="rgba(168,85,247,0.8)" fontSize="10" textAnchor="middle">3-30 sec</text>
                        
                        {/* Arrow 2 */}
                        <path d="M 435 100 L 505 100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" markerEnd="url(#arrow2)"/>
                        <defs>
                          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.3)" />
                          </marker>
                        </defs>
                        
                        {/* Reward section */}
                        <circle cx="575" cy="100" r="50" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="575" y="95" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">REWARD</text>
                        <text x="575" y="112" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Clear</text>
                        <text x="575" y="127" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">CTA</text>
                        <text x="575" y="170" fill="rgba(168,85,247,0.8)" fontSize="10" textAnchor="middle">30+ sec</text>
                      </svg>
                    </div>
                    
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>
                          <strong>The Hook (Pattern Interrupt)</strong>: Based on the Von Restorff Effect,
                          humans are programmed to pay attention to the "outlier." A hook must be a visual or
                          auditory anomaly that breaks the "Scroll-Trance."
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>
                          <strong>The Retention (The Unique Mechanism)</strong>: Once attention is secured, you
                          must demonstrate the Unique Mechanism. This builds Resonance and proves the Perceived
                          Likelihood of Achievement.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">Static Signal Architecture</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-gray-400">Axiom 6.2:</strong> A static ad is a High-Density
                      Signal designed for Foveal capture. The human eye has two modes: Peripheral (detecting
                      movement) and Foveal (focusing on detail). A static ad must use high-contrast "Visual
                      Anchors" to pull the eye from Peripheral to Foveal focus in under 0.5 seconds.
                    </p>
                    
                    {/* Diagram 6: Static Ad Heatmap */}
                    <div className="bg-black/40 border border-white/10 rounded-lg p-6 my-6">
                      <svg viewBox="0 0 500 400" className="w-full h-auto">
                        {/* Ad frame */}
                        <rect x="50" y="30" width="400" height="340" fill="rgba(20,20,20,1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        
                        {/* Visual Anchor (top) - brightest hotspot */}
                        <ellipse cx="250" cy="120" rx="80" ry="60" fill="rgba(168,85,247,0.3)"/>
                        <ellipse cx="250" cy="120" rx="50" ry="40" fill="rgba(168,85,247,0.5)"/>
                        <text x="250" y="115" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Visual</text>
                        <text x="250" y="132" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Anchor</text>
                        
                        {/* Eye path arrows */}
                        <path d="M 250 165 L 250 210" stroke="rgba(168,85,247,0.8)" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#eyearrow1)"/>
                        <defs>
                          <marker id="eyearrow1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(168,85,247,0.8)" />
                          </marker>
                        </defs>
                        
                        {/* Value proposition - medium hotspot */}
                        <ellipse cx="250" cy="240" rx="120" ry="40" fill="rgba(168,85,247,0.2)"/>
                        <text x="250" y="235" fill="rgba(255,255,255,0.9)" fontSize="11" textAnchor="middle">Value Proposition</text>
                        <text x="250" y="250" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">(High Contrast Text)</text>
                        
                        {/* Eye path to CTA */}
                        <path d="M 250 270 L 250 305" stroke="rgba(168,85,247,0.8)" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#eyearrow2)"/>
                        <defs>
                          <marker id="eyearrow2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(168,85,247,0.8)" />
                          </marker>
                        </defs>
                        
                        {/* CTA button - final hotspot */}
                        <ellipse cx="250" cy="325" rx="70" ry="30" fill="rgba(168,85,247,0.3)"/>
                        <rect x="200" y="310" width="100" height="30" rx="5" fill="rgba(168,85,247,0.5)" stroke="white" strokeWidth="1"/>
                        <text x="250" y="330" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">CTA Button</text>
                        
                        {/* Time annotations */}
                        <text x="470" y="120" fill="rgba(168,85,247,0.8)" fontSize="11">&lt;0.5s</text>
                        <text x="470" y="240" fill="rgba(168,85,247,0.8)" fontSize="11">1-2s</text>
                        <text x="470" y="325" fill="rgba(168,85,247,0.8)" fontSize="11">2-3s</text>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">Foveal Capture Path: Anchor → Value → Action</p>
                      </div>
                    </div>
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Axiom of Intent vs. Interruption</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-gray-400">Axiom 7.1:</strong> Channel selection is determined by
                      the intersection of Market Intent and Market Sophistication.
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>
                          <strong>Search (Intent-Based)</strong>: Google Ads. Best for prospects actively
                          seeking a solution (High Intent).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>
                          <strong>Social (Interruption-Based)</strong>: Meta/LinkedIn. Best for building
                          Resonance and capturing prospects who don't yet know they have a problem (High
                          Awareness-Building).
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
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

                  {/* Diagram 7: The Complexity Tax */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The Complexity Tax</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 300" className="w-full h-auto">
                        {/* Axes */}
                        <line x1="50" y1="250" x2="550" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        <line x1="50" y1="250" x2="50" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                        
                        {/* Labels */}
                        <text x="300" y="285" fill="rgba(255,255,255,0.5)" fontSize="14" textAnchor="middle">Number of Channels →</text>
                        <text x="20" y="150" fill="rgba(255,255,255,0.5)" fontSize="14" transform="rotate(-90 20 150)">Operational Overhead →</text>
                        
                        {/* Exponential curve */}
                        <path
                          d="M 50 230 Q 150 220, 200 200 T 300 150 T 450 80 T 550 40"
                          stroke="rgba(239,68,68,0.8)"
                          strokeWidth="3"
                          fill="none"
                        />
                        
                        {/* Sweet spot zone */}
                        <rect x="140" y="200" width="60" height="50" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.5)" strokeWidth="2" strokeDasharray="5,5"/>
                        <text x="170" y="190" fill="rgba(34,197,94,0.9)" fontSize="11" textAnchor="middle" fontWeight="bold">Optimal</text>
                        
                        {/* Danger zone */}
                        <rect x="350" y="80" width="150" height="170" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeDasharray="5,5"/>
                        <text x="425" y="160" fill="rgba(239,68,68,0.8)" fontSize="12" fontWeight="bold">Danger</text>
                        <text x="425" y="175" fill="rgba(239,68,68,0.8)" fontSize="12" fontWeight="bold">Zone</text>
                        
                        {/* X-axis markers */}
                        <text x="50" y="270" fill="rgba(255,255,255,0.5)" fontSize="11">0</text>
                        <text x="170" y="270" fill="rgba(255,255,255,0.5)" fontSize="11">1-2</text>
                        <text x="300" y="270" fill="rgba(255,255,255,0.5)" fontSize="11">3-4</text>
                        <text x="430" y="270" fill="rgba(255,255,255,0.5)" fontSize="11">5+</text>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Focus beats distribution: One flawless channel outperforms five half-managed ones</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-white" />
                      Trust is a Human-to-Human Protocol
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-white">Axiom 8.1:</strong> In B2B, the "Biological Risk" is
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <p className="text-gray-300 mb-4">
                      <strong className="text-gray-400">Axiom 9.1:</strong> Platform attribution is a biased
                      witness; scaling requires First-Party Data Integrity. Relying on platform ROAS is a
                      failure of logic. Scaling requires a Single Source of Truth—a first-party dashboard that
                      tracks the prospect from the initial click to the final LTV realization.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Scientific Method of Scaling</h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-gray-400">Axiom 9.2:</strong> Growth is the result of isolating
                      the Bottleneck Variable and applying a targeted fix. Scaling is not a creative act; it is
                      a sequence of controlled experiments.
                    </p>
                    <ol className="space-y-2 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">1.</span>
                        <span>
                          <strong>Awareness (The Hook)</strong>: If CTR is low, the Hook is failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">2.</span>
                        <span>
                          <strong>Interest (The Retention)</strong>: If watch time is low, the Mechanism is
                          failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">3.</span>
                        <span>
                          <strong>Desire (The Offer)</strong>: If conversion is low, the Value Equation is
                          failing.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 font-bold">4.</span>
                        <span>
                          <strong>Action (The Closer)</strong>: If close rate is low, the Trust is failing.
                        </span>
                      </li>
                    </ol>
                  </div>
                  
                  {/* Diagram 9: Funnel Forensics */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">Funnel Forensics: Isolating the Variable</h4>
                    <div className="max-w-2xl mx-auto">
                      <svg viewBox="0 0 400 500" className="w-full h-auto">
                        {/* Funnel shape */}
                        <path d="M 80 50 L 320 50 L 280 150 L 240 250 L 200 500" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        
                        {/* Stage 1: Awareness */}
                        <rect x="70" y="50" width="260" height="40" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="200" y="75" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">1. AWARENESS (Hook)</text>
                        <text x="350" y="75" fill="rgba(168,85,247,0.8)" fontSize="11">CTR Low?</text>
                        
                        {/* Stage 2: Interest */}
                        <path d="M 90 120 L 310 120 L 290 160 L 110 160 Z" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="200" y="145" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">2. INTEREST (Retention)</text>
                        <text x="350" y="145" fill="rgba(168,85,247,0.8)" fontSize="11">Watch Time?</text>
                        
                        {/* Stage 3: Desire */}
                        <path d="M 110 190 L 290 190 L 260 240 L 140 240 Z" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="200" y="215" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">3. DESIRE (Offer)</text>
                        <text x="340" y="215" fill="rgba(168,85,247,0.8)" fontSize="11">Conversion?</text>
                        
                        {/* Stage 4: Action */}
                        <path d="M 140 270 L 260 270 L 220 330 L 180 330 Z" fill="rgba(168,85,247,0.3)" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                        <text x="200" y="305" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">4. ACTION (Close)</text>
                        <text x="310" y="305" fill="rgba(168,85,247,0.8)" fontSize="11">Close Rate?</text>
                        
                        {/* Qualified leads exit */}
                        <rect x="180" y="360" width="40" height="80" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="2"/>
                        <text x="200" y="405" fill="rgba(34,197,94,0.9)" fontSize="12" textAnchor="middle" fontWeight="bold">Qualified</text>
                        <text x="200" y="420" fill="rgba(34,197,94,0.9)" fontSize="12" textAnchor="middle" fontWeight="bold">Leads</text>
                        
                        {/* Diagnostic arrows */}
                        <path d="M 330 75 L 360 75" stroke="rgba(168,85,247,0.8)" strokeWidth="1" markerEnd="url(#diagnose)"/>
                        <path d="M 320 145 L 360 145" stroke="rgba(168,85,247,0.8)" strokeWidth="1" markerEnd="url(#diagnose)"/>
                        <path d="M 310 215 L 360 215" stroke="rgba(168,85,247,0.8)" strokeWidth="1" markerEnd="url(#diagnose)"/>
                        <path d="M 290 305 L 360 305" stroke="rgba(168,85,247,0.8)" strokeWidth="1" markerEnd="url(#diagnose)"/>
                        <defs>
                          <marker id="diagnose" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(168,85,247,0.8)" />
                          </marker>
                        </defs>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Isolate the bottleneck, apply targeted fix, measure result</p>
                      </div>
                    </div>
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-400" />
                      Manual vs. Automated Systems
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p>
                        <strong className="text-gray-400">Axiom 10.1:</strong> A manual business is Fragile; an
                        automated system is Anti-Fragile.
                      </p>
                      <p>
                        <strong className="text-gray-400">Axiom 10.2:</strong> Scaling requires Systemic
                        Redundancy to mitigate Single Points of Failure. In the modern digital ecosystem,
                        "External Shocks" (e.g., ad account bans, algorithm updates) are inevitable. An
                        "Anti-Fragile" system maintains Redundancy Assets: multiple acquisition channels, backup
                        creative, and diversified data sources.
                      </p>
                    </div>
                  </div>
                  
                  {/* Diagram 8: Anti-Fragile Fail-Safe */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The Anti-Fragile Fail-Safe System</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 400" className="w-full h-auto">
                        {/* Central Engine */}
                        <circle cx="300" cy="200" r="60" fill="rgba(168,85,247,0.3)" stroke="rgba(168,85,247,0.8)" strokeWidth="3"/>
                        <text x="300" y="195" fill="white" fontSize="15" textAnchor="middle" fontWeight="bold">Revenue</text>
                        <text x="300" y="213" fill="white" fontSize="15" textAnchor="middle" fontWeight="bold">Engine</text>
                        
                        {/* Fuel Line 1: Meta Ads */}
                        <line x1="120" y1="100" x2="260" y2="170" stroke="rgba(34,197,94,0.6)" strokeWidth="3"/>
                        <circle cx="120" cy="100" r="35" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.6)" strokeWidth="2"/>
                        <text x="120" y="103" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Meta</text>
                        <text x="120" y="116" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Ads</text>
                        
                        {/* Fuel Line 2: Google Ads */}
                        <line x1="480" y1="100" x2="340" y2="170" stroke="rgba(34,197,94,0.6)" strokeWidth="3"/>
                        <circle cx="480" cy="100" r="35" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.6)" strokeWidth="2"/>
                        <text x="480" y="103" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Google</text>
                        <text x="480" y="116" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Ads</text>
                        
                        {/* Fuel Line 3: SEO */}
                        <line x1="120" y1="300" x2="260" y2="230" stroke="rgba(34,197,94,0.6)" strokeWidth="3"/>
                        <circle cx="120" cy="300" r="35" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.6)" strokeWidth="2"/>
                        <text x="120" y="305" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">SEO</text>
                        
                        {/* Fuel Line 4: Partnerships */}
                        <line x1="480" y1="300" x2="340" y2="230" stroke="rgba(34,197,94,0.6)" strokeWidth="3"/>
                        <circle cx="480" cy="300" r="35" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.6)" strokeWidth="2"/>
                        <text x="480" y="298" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Partner</text>
                        <text x="480" y="311" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">ships</text>
                        
                        {/* Flow arrows */}
                        <path d="M 150 110 L 250 165" stroke="rgba(34,197,94,0.8)" strokeWidth="2" markerEnd="url(#flowarrow)"/>
                        <path d="M 450 110 L 350 165" stroke="rgba(34,197,94,0.8)" strokeWidth="2" markerEnd="url(#flowarrow)"/>
                        <path d="M 150 290 L 250 235" stroke="rgba(34,197,94,0.8)" strokeWidth="2" markerEnd="url(#flowarrow)"/>
                        <path d="M 450 290 L 350 235" stroke="rgba(34,197,94,0.8)" strokeWidth="2" markerEnd="url(#flowarrow)"/>
                        <defs>
                          <marker id="flowarrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(34,197,94,0.8)" />
                          </marker>
                        </defs>
                        
                        {/* Failed channel indicator */}
                        <line x1="100" y1="80" x2="140" y2="120" stroke="rgba(239,68,68,0.6)" strokeWidth="3"/>
                        <line x1="140" y1="80" x2="100" y2="120" stroke="rgba(239,68,68,0.6)" strokeWidth="3"/>
                        <text x="70" y="65" fill="rgba(239,68,68,0.8)" fontSize="10">If this fails...</text>
                        
                        {/* Redundancy arrows pointing to other channels */}
                        <path d="M 155 115 Q 300 80, 445 115" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#redundancy)"/>
                        <defs>
                          <marker id="redundancy" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(168,85,247,0.5)" />
                          </marker>
                        </defs>
                        <text x="300" y="65" fill="rgba(168,85,247,0.8)" fontSize="11" textAnchor="middle">...others sustain</text>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Redundancy protects against single points of failure</p>
                      </div>
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

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">The Complete System</h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Data Integrity (Axiom 9.1)</strong>: The Truth.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Scientific Method (Axiom 9.2)</strong>: The Optimization.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Sophistication Audit (Axiom 4.1)</strong>: The Differentiation.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Resonance Assets (Chapter 6)</strong>: The Trust.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Irresistible Offer (Axiom 5.1)</strong>: The Value.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Zero-Latency Qualification (Chapter 2)</strong>: The Speed.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Human Closer (Chapter 8)</strong>: The Commitment.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500/70 mt-0.5 shrink-0" />
                        <span>
                          <strong>Anti-Fragile Redundancy (Chapter 10)</strong>: The Survival.
                        </span>
                      </li>
                    </ol>
                  </div>

                  {/* Diagram 10: Autopilot Revenue Engine Flywheel */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-8 my-8">
                    <h4 className="text-lg font-semibold mb-6 text-center">The Autopilot Revenue Engine Flywheel</h4>
                    <div className="max-w-3xl mx-auto">
                      <svg viewBox="0 0 600 600" className="w-full h-auto">
                        {/* Central hub */}
                        <circle cx="300" cy="300" r="80" fill="rgba(168,85,247,0.3)" stroke="rgba(168,85,247,0.8)" strokeWidth="3"/>
                        <text x="300" y="295" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">Autopilot</text>
                        <text x="300" y="315" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">Revenue</text>
                        
                        {/* Flywheel nodes in a circle */}
                        {/* Node 1: Data Integrity (top) */}
                        <circle cx="300" cy="100" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="300" y="100" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Data</text>
                        <text x="300" y="113" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">Integrity</text>
                        
                        {/* Node 2: Scientific Method (60°) */}
                        <circle cx="470" cy="175" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="470" y="172" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Scientific</text>
                        <text x="470" y="185" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Method</text>
                        
                        {/* Node 3: Sophistication (120°) */}
                        <circle cx="520" cy="350" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="520" y="347" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">Sophistication</text>
                        <text x="520" y="360" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">Audit</text>
                        
                        {/* Node 4: Resonance (180°) */}
                        <circle cx="425" cy="475" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="425" y="472" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Resonance</text>
                        <text x="425" y="485" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Assets</text>
                        
                        {/* Node 5: Offer (210°) */}
                        <circle cx="300" cy="520" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="300" y="517" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Irresistible</text>
                        <text x="300" y="530" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Offer</text>
                        
                        {/* Node 6: Zero-Latency (240°) */}
                        <circle cx="175" cy="475" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="175" y="472" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">Zero-Latency</text>
                        <text x="175" y="485" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">Qualification</text>
                        
                        {/* Node 7: Human Closer (270°) */}
                        <circle cx="80" cy="350" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="80" y="347" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Human</text>
                        <text x="80" y="360" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Closer</text>
                        
                        {/* Node 8: Anti-Fragile (300°) */}
                        <circle cx="130" cy="175" r="45" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.6)" strokeWidth="2"/>
                        <text x="130" y="172" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Anti-Fragile</text>
                        <text x="130" y="185" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Redundancy</text>
                        
                        {/* Connecting arcs with arrows forming a circle */}
                        <path d="M 315 145 Q 345 145, 428 165" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 495 215 Q 530 260, 532 305" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 500 385 Q 480 420, 455 445" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 385 495 Q 345 510, 300 510" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 255 505 Q 215 495, 200 475" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 145 445 Q 105 410, 88 385" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 68 305 Q 65 255, 100 215" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        <path d="M 165 155 Q 215 120, 268 110" stroke="rgba(168,85,247,0.5)" strokeWidth="3" fill="none" markerEnd="url(#flywheelarrow)"/>
                        
                        <defs>
                          <marker id="flywheelarrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(168,85,247,0.5)" />
                          </marker>
                        </defs>
                        
                        {/* Rotation indicator */}
                        <path d="M 350 300 Q 350 260, 315 240" stroke="rgba(168,85,247,0.7)" strokeWidth="2" fill="none" markerEnd="url(#rotatearrow)"/>
                        <defs>
                          <marker id="rotatearrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="rgba(168,85,247,0.7)" />
                          </marker>
                        </defs>
                      </svg>
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">Each component feeds the next, creating compounding momentum</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 my-8 text-center">
                    <p className="text-2xl font-bold text-white">
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
