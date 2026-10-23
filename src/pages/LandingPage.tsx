import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { navigateTo, isAuthenticated } = useApp();
  const [activeAudienceTab, setActiveAudienceTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-4xl mx-auto">
      {/* Public Navigation */}
      <header className="px-4 pt-4 pb-1 flex items-center justify-between gap-3">
        <button onClick={() => navigateTo('/')} className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#006b57] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[20px]">solar_power</span>
          </span>
          <span className="font-headline text-lg font-bold text-[#002620] tracking-tight">SOLARIS</span>
        </button>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-3.5 py-2 rounded-lg bg-[#006b57] text-white text-xs font-bold hover:bg-[#002620] transition-colors"
            >
              Open Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigateTo('/login')}
                className="px-3 py-2 rounded-lg text-[#006b57] text-xs font-bold hover:bg-[#e2f0f9] transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigateTo('/signup')}
                className="px-3.5 py-2 rounded-lg bg-[#006b57] text-white text-xs font-bold hover:bg-[#002620] transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-4 pb-6 flex flex-col gap-5">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#9af4d8]/50 text-[#006b57] text-xs font-semibold shadow-sm">
          <span>☀️</span>
          <span>SMARTER SOLAR • STRONGER COMMUNITIES</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h1 className="font-headline text-3xl sm:text-4xl text-[#002620] tracking-tight font-bold">
            Solar is brighter when we grow together.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#404846] leading-relaxed">
            Discover affordable solar solutions, build eligible community projects, and understand your energy savings with transparent planning and intelligent optimisation.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={() => navigateTo(isAuthenticated ? '/dashboard' : '/signup')}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#006b57] text-white font-headline text-sm font-semibold shadow-md active:scale-[0.99] hover:bg-[#002620] transition-all"
          >
            <span>{isAuthenticated ? 'Open My Dashboard' : 'Get Started Free'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => navigateTo(isAuthenticated ? '/assessment' : '/login')}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#e2f0f9] text-[#002620] font-headline text-sm font-semibold hover:bg-[#dceaf4] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAuthenticated ? 'calculate' : 'login'}
            </span>
            <span>{isAuthenticated ? 'Run Solar Assessment' : 'Log In'}</span>
          </button>
        </div>

        {/* Live Feasibility Simulation Card */}
        <div className="mt-2 rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(16,61,53,0.08)] flex flex-col gap-4 border border-[#e2f0f9]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006b57] animate-ping"></span>
              <span className="font-headline text-sm text-[#002620] font-bold">Live Feasibility Simulation</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-xs font-semibold">
              Delhi • BRPL
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="flex flex-col p-2.5 rounded-lg bg-[#e8f6ff]">
              <span className="text-[11px] text-[#404846] truncate">Feasible Cap</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="font-headline text-lg sm:text-xl text-[#002620] font-bold">8.4</span>
                <span className="text-[10px] text-[#404846] font-medium">kW</span>
              </div>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#e8f6ff]">
              <span className="text-[11px] text-[#404846] truncate">Est. Savings</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="font-headline text-lg sm:text-xl text-[#006b57] font-bold">₹7,420</span>
                <span className="text-[10px] text-[#404846] font-medium">/mo</span>
              </div>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#9af4d8]/40">
              <span className="text-[11px] text-[#006b57] truncate font-semibold">Affordability</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="font-headline text-lg sm:text-xl text-[#006b57] font-bold">94%</span>
                <span className="text-[10px] text-[#006b57] font-medium">score</span>
              </div>
            </div>
          </div>

          {/* Diurnal Generation Curve */}
          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#e8f6ff]">
            <div className="flex items-center justify-between text-[#404846]">
              <span className="text-xs flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#f6bd4f]">wb_sunny</span>
                Diurnal Generation Curve
              </span>
              <span className="text-xs font-semibold text-[#002620]">Peak at 1:00 PM</span>
            </div>

            <div className="w-full h-16 relative mt-1">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 70">
                <defs>
                  <linearGradient id="landingSolarGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#006b57" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#006b57" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line stroke="#cedce5" strokeDasharray="2,3" strokeWidth="1" x1="0" x2="300" y1="65" y2="65" />
                <line stroke="#f6bd4f" strokeDasharray="2,2" strokeWidth="1" x1="150" x2="150" y1="10" y2="65" />
                <path d="M 0,65 Q 40,65 90,48 T 150,12 T 210,48 Q 260,65 300,65 Z" fill="url(#landingSolarGlow)" />
                <path d="M 0,65 Q 40,65 90,48 T 150,12 T 210,48 Q 260,65 300,65" fill="none" stroke="#006b57" strokeLinecap="round" strokeWidth="2.5" />
                <circle cx="150" cy="12" fill="#f6bd4f" r="4.5" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#404846] px-1 font-mono">
              <span>6 AM</span>
              <span>10 AM</span>
              <span className="text-[#002620] font-bold">1 PM (4.2 kWh)</span>
              <span>4 PM</span>
              <span>7 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip Badges */}
      <section className="w-full overflow-x-auto no-scrollbar py-2 px-4 flex gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f0f9] whitespace-nowrap text-[#101d24] text-xs font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#006b57]">verified_user</span>
          <span>Regulation-Aware Planning</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f0f9] whitespace-nowrap text-[#101d24] text-xs font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#006b57]">pie_chart</span>
          <span>Transparent Benefit Allocation</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f0f9] whitespace-nowrap text-[#101d24] text-xs font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#006b57]">account_balance_wallet</span>
          <span>Affordability-First Optimisation</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f0f9] whitespace-nowrap text-[#101d24] text-xs font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#006b57]">query_stats</span>
          <span>Lifecycle Solar Monitoring</span>
        </div>
      </section>

      {/* 4-Step Roadmap */}
      <section className="px-4 pt-6 pb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#006b57] font-bold">Simple Roadmap</span>
          <h2 className="font-headline text-2xl text-[#002620] font-bold">How SOLARIS Powers Together</h2>
          <p className="text-xs text-[#404846]">From rooftop mapping to co-op energy dividends in four structured steps.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#103d35] text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm text-[#002620] font-semibold">Assess</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e2f0f9] text-[#404846] text-[10px] font-medium">Instant AI</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Enter your Delhi electricity CA number or address. Our spatial tool scans rooftop shadows and solar irradiance.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#103d35] text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm text-[#002620] font-semibold">Check Eligibility</span>
                <span className="px-2 py-0.5 rounded-full bg-[#9af4d8]/60 text-[#006b57] text-[10px] font-bold">DERC Compliant</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Verify sanctioned load feasibility, transformer capacity, and PM Surya Ghar national subsidy eligibility.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#103d35] text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm text-[#002620] font-semibold">Optimise &amp; Share</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[10px] font-bold">Dynamic Quota</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Form or join a shared solar cluster with neighbours or your RWA. Pool roof area and split monthly generation credits.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#006b57] text-white flex items-center justify-center font-bold text-xs shrink-0">
              4
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm text-[#002620] font-semibold">Manage &amp; Earn</span>
                <span className="px-2 py-0.5 rounded-full bg-[#dceaf4] text-[#002620] text-[10px] font-medium">Auto Net-Meter</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Track daily inverter generation, automated utility bill deductions, and community clean-kilowatt ledgers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Built For You */}
      <section className="px-4 pt-4 pb-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#006b57] font-bold">Solutions Built For You</span>
          <h2 className="font-headline text-2xl text-[#002620] font-bold">Tailored For Every Rooftop</h2>
        </div>

        <div className="grid grid-cols-3 p-1 rounded-xl bg-[#e2f0f9] text-center">
          {['Homes', 'RWAs', 'MSMEs'].map((name, i) => (
            <button
              key={name}
              onClick={() => setActiveAudienceTab(i)}
              className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
                activeAudienceTab === i
                  ? 'bg-white text-[#002620] shadow-sm'
                  : 'text-[#404846] hover:text-[#002620]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {activeAudienceTab === 0 && (
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#9af4d8]/40 flex items-center justify-center text-[#006b57]">
                <span className="material-symbols-outlined text-[24px]">home</span>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold text-[#002620]">For Independent Homes</h3>
                <p className="text-xs text-[#404846]">Individual rooftops with partial or zero shadow.</p>
              </div>
            </div>
            <p className="text-xs text-[#404846] leading-relaxed">
              Enjoy up to ₹78,000 in Central Financial Assistance through PM Surya Ghar. Eliminate peak slab electricity tariffs while maintaining full control over your private setup.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">⚡ 2–10 kW Scale</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">📉 70% Bill Offset</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">🔒 25-Yr Panel Warranty</span>
            </div>
          </div>
        )}

        {activeAudienceTab === 1 && (
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#9af4d8]/40 flex items-center justify-center text-[#006b57]">
                <span className="material-symbols-outlined text-[24px]">apartment</span>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold text-[#002620]">For Communities (RWAs)</h3>
                <p className="text-xs text-[#404846]">Shared terrace co-ops &amp; apartment towers.</p>
              </div>
            </div>
            <p className="text-xs text-[#404846] leading-relaxed">
              Tackle complex shared-roof ownership effortlessly. Our algorithm calculates fair energy share allocations for common areas, elevators, and participating flat owners.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">🤝 Group Net-Metering</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">🏢 Common Load Savings</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">⚖️ Transparent Voting</span>
            </div>
          </div>
        )}

        {activeAudienceTab === 2 && (
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#9af4d8]/40 flex items-center justify-center text-[#006b57]">
                <span className="material-symbols-outlined text-[24px]">factory</span>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold text-[#002620]">For Businesses &amp; MSMEs</h3>
                <p className="text-xs text-[#404846]">Warehouses, small factories, and retail hubs.</p>
              </div>
            </div>
            <p className="text-xs text-[#404846] leading-relaxed">
              Slash daytime industrial and commercial billing rates. Leverage accelerated depreciation tax benefits and ESG audit compliance logs.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">🏭 20–100+ kWp</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">📊 Accelerated Depreciation</span>
              <span className="px-2.5 py-1 rounded-md bg-[#e2f0f9] text-[#002620] text-[11px] font-medium">🌱 ESG Reporting</span>
            </div>
          </div>
        )}
      </section>

      {/* Comparison: Individual vs Shared Solar */}
      <section className="px-4 pt-4 pb-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#006b57] font-bold">Smart Comparison</span>
          <h2 className="font-headline text-2xl text-[#002620] font-bold">Individual vs Shared Solar</h2>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm border border-[#e2f0f9] flex flex-col gap-3">
          <div className="flex flex-col gap-1 pb-3 border-b border-[#e2f0f9]">
            <span className="text-xs text-[#404846] font-medium">Upfront Capital Burden</span>
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              <div className="p-2.5 rounded bg-[#e8f6ff] text-xs text-[#101d24]">
                <span className="font-bold block text-[#002620]">Individual</span>
                100% borne by single owner (₹1.8L - ₹4.5L)
              </div>
              <div className="p-2.5 rounded bg-[#9af4d8]/30 text-xs text-[#006b57] font-medium">
                <span className="font-bold block text-[#006b57]">SOLARIS Shared</span>
                Distributed share (Starting ₹28,000 / seat)
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pb-3 border-b border-[#e2f0f9]">
            <span className="text-xs text-[#404846] font-medium">Roof Shading &amp; Tenancy</span>
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              <div className="p-2.5 rounded bg-[#e8f6ff] text-xs text-[#101d24]">
                <span className="font-bold block text-[#002620]">Individual</span>
                Requires exclusive roof rights &amp; clear unshaded area
              </div>
              <div className="p-2.5 rounded bg-[#9af4d8]/30 text-xs text-[#006b57] font-medium">
                <span className="font-bold block text-[#006b57]">SOLARIS Shared</span>
                Open to flat tenants, shaded roofs, and cooperative wings
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#404846] font-medium">Regulatory Paperwork</span>
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              <div className="p-2.5 rounded bg-[#e8f6ff] text-xs text-[#101d24]">
                <span className="font-bold block text-[#002620]">Individual</span>
                Manual BRPL inspection coordination &amp; DISCOM follow-ups
              </div>
              <div className="p-2.5 rounded bg-[#9af4d8]/30 text-xs text-[#006b57] font-medium">
                <span className="font-bold block text-[#006b57]">SOLARIS Shared</span>
                Integrated portal submission &amp; collective DERC filings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Impact SDG Card */}
      <section className="px-4 pt-4 pb-4">
        <div className="rounded-xl bg-[#103d35] text-white p-4.5 shadow-md flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9af4d8] text-[22px]">public</span>
              <span className="font-headline text-base font-bold">Sustainable Impact</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#002620] font-medium text-[#a3d0c4]">
              Pilot Demo Estimates
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#002620]/60 flex flex-col gap-1 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#f6bd4f]">
                <span className="material-symbols-outlined text-[16px]">work</span>
                <span className="text-xs font-semibold">SDG 8</span>
              </div>
              <span className="text-xs text-[#7ca89d]">Decent Work &amp; Growth</span>
              <div className="mt-1 font-headline text-xl font-bold">142+</div>
              <span className="text-[10px] text-[#d6e5ee]">Local rooftop installer job hours facilitated</span>
            </div>

            <div className="p-3 rounded-lg bg-[#002620]/60 flex flex-col gap-1 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#9af4d8]">
                <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                <span className="text-xs font-semibold">SDG 9</span>
              </div>
              <span className="text-xs text-[#7ca89d]">Industry &amp; Infra</span>
              <div className="mt-1 font-headline text-xl font-bold">1.2 MW</div>
              <span className="text-[10px] text-[#d6e5ee]">Grid resilience potential mapped in South Delhi</span>
            </div>
          </div>

          <p className="text-[11px] text-[#a3d0c4] leading-snug">
            *Figures are simulated analytical estimates based on Delhi BRPL transformer capacity models.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pt-4 pb-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#006b57] font-bold">Got Questions?</span>
          <h2 className="font-headline text-2xl text-[#002620] font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2.5">
          <div 
            onClick={() => toggleFaq(1)} 
            className="rounded-xl bg-white p-3.5 shadow-sm border border-[#e2f0f9] cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-xs sm:text-sm font-semibold text-[#002620]">
                What is Delhi Virtual / Group Net Metering?
              </h4>
              <span className="material-symbols-outlined text-[#006b57]">
                {openFaq === 1 ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            {openFaq === 1 && (
              <p className="text-xs text-[#404846] mt-2 leading-relaxed animate-in fade-in">
                Under Delhi Electricity Regulatory Commission (DERC) regulations, energy generated from a single shared rooftop solar plant can be credited to multiple consumer electricity accounts serviced by the same discom transformer.
              </p>
            )}
          </div>

          <div 
            onClick={() => toggleFaq(2)} 
            className="rounded-xl bg-white p-3.5 shadow-sm border border-[#e2f0f9] cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-xs sm:text-sm font-semibold text-[#002620]">
                How do we qualify for the PM Surya Ghar subsidy?
              </h4>
              <span className="material-symbols-outlined text-[#006b57]">
                {openFaq === 2 ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            {openFaq === 2 && (
              <p className="text-xs text-[#404846] mt-2 leading-relaxed animate-in fade-in">
                Residential consumers with active domestic meter connections are eligible for up to ₹78,000 subsidy for systems up to 3 kW. SOLARIS automatically validates your discom eligibility before installer dispatch.
              </p>
            )}
          </div>

          <div 
            onClick={() => toggleFaq(3)} 
            className="rounded-xl bg-white p-3.5 shadow-sm border border-[#e2f0f9] cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-xs sm:text-sm font-semibold text-[#002620]">
                What if our apartment terrace has shadow?
              </h4>
              <span className="material-symbols-outlined text-[#006b57]">
                {openFaq === 3 ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            {openFaq === 3 && (
              <p className="text-xs text-[#404846] mt-2 leading-relaxed animate-in fade-in">
                Our spatial shadow analysis maps time-of-day sunlight. If your own roof is shadowed, you can subscribe to an eligible community cluster installed on neighbouring compliant roofs.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="px-4 pt-4 pb-6">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#9af4d8]/20 via-[#e2f0f9] to-[#dceaf4] flex flex-col gap-3.5 text-center items-center shadow-sm border border-[#c0c8c5]/30">
          <div className="w-12 h-12 rounded-full bg-[#006b57] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[26px]">solar_power</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-headline text-xl text-[#002620] font-bold">Your solar future starts together.</h3>
            <p className="text-xs text-[#404846] max-w-xs mx-auto">
              Currently live across BSES Rajdhani (BRPL) circles in South and West Delhi. Join 480+ local participants.
            </p>
          </div>
          <button
            onClick={() => navigateTo(isAuthenticated ? '/onboarding' : '/signup')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#006b57] text-white font-headline text-sm font-bold shadow-md active:scale-[0.99] hover:bg-[#002620] transition-transform"
          >
            {isAuthenticated ? 'Get Started with Your CA Number' : 'Create Your Free Account'}
          </button>
          <div className="flex items-center gap-1.5 text-[#404846] text-[11px] justify-center">
            <span className="material-symbols-outlined text-[14px] text-[#006b57]">verified</span>
            <span>Instant DISCOM verification • Zero upfront consultation fee</span>
          </div>
        </div>
      </section>

    </div>
  );
};
