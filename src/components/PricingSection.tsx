import { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, Sparkles, CheckCircle } from 'lucide-react';

interface PricingSectionProps {
  onStartLearning: () => void;
}

export default function PricingSection({ onStartLearning }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-[5%] w-[380px] h-[380px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-[5%] w-[380px] h-[380px] bg-violet-500/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block" id="pricing-badge">
            STRICTLY TRANSPARENT VALUE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 mt-4 leading-tight" id="pricing-title">
            Invest in Your Global Future
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-light" id="pricing-subtitle">
            Choose the perfect immersive trajectory aligned with your CEFR goals. Start with a 14-day premium free trial. Cancel anytime with a single click.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14" id="pricing-toggle-container">
          <span className={`text-xs font-bold uppercase tracking-wider font-mono transition-colors ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          
          <button
            id="btn-billing-toggle"
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7.5 rounded-full bg-slate-200 border border-slate-300 transition-all cursor-pointer p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle billing frequency"
          >
            <div
              className={`bg-indigo-650 w-5.5 h-5.5 rounded-full transition-transform shadow-md ${
                billingPeriod === 'yearly' ? 'translate-x-6.5' : 'translate-x-0'
              }`}
            />
          </button>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider font-mono transition-colors ${billingPeriod === 'yearly' ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}>
              Yearly Billing
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide font-mono animate-pulse">
              SAVE 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch" id="pricing-grid">
          {PRICING_PLANS.map((plan, index) => {
            const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <div
                key={index}
                id={`pricing-card-${index}`}
                className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-white backdrop-blur-sm ${
                  plan.isPopular
                    ? 'border-indigo-300 shadow-2xl scale-[1.02] ring-1 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-350 shadow-xl'
                }`}
              >
                {/* Popular Glow Stripe */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-violet-600 text-white text-[9px] uppercase font-black tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>Most Popular Path</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 text-left">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2.5 leading-relaxed text-left font-light min-h-11">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="mt-6 pb-6 border-b border-slate-100 text-left">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono">
                        ${price}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        / month
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <span className="block text-[10px] text-emerald-600 font-bold font-mono mt-1.5">
                        (Billed annually as ${price * 12}/year)
                      </span>
                    )}
                  </div>

                  {/* Features checklist */}
                  <div className="mt-6 space-y-4 text-left">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">
                      WHAT IS INCLUDED IN THIS SYLLABUS:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-3 items-start">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-slate-700 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Call to Action Button */}
                <button
                  id={`btn-pricing-cta-${index}`}
                  onClick={onStartLearning}
                  className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-350 shadow-sm'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
