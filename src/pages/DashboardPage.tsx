import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { currentUser, community, navigateTo, setIsConsentModalOpen } = useApp();
  const [activeModelRange, setActiveModelRange] = useState<'30day' | 'annual'>('30day');
  const [assistanceRequested, setAssistanceRequested] = useState(false);

  return (
    <div className="flex flex-col w-full px-4 pb-16 space-y-4 max-w-4xl mx-auto animate-in fade-in">
      
      {/* Welcome & Identity Strip */}
      <div className="flex flex-col gap-1.5 pt-2">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#9af4d8]/60 text-[#00725d] text-[11px] font-semibold">
          <span className="material-symbols-outlined text-[14px]">apartment</span>
          <span>Pocket 2 RWA · VNM Cluster Active</span>
        </div>
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl text-[#002620] tracking-tight font-bold">
            Good morning, {currentUser.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-[#404846]">
            Let's make your solar future brighter today.
          </p>
        </div>
      </div>

      {/* Ambient Monsoon / System Alert Banner */}
      <div className="w-full bg-[#dceaf4] rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm border border-[#c0c8c5]/30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#ffdea7] flex items-center justify-center shrink-0 text-[#271900]">
            <span className="material-symbols-outlined text-[18px]">solar_power</span>
          </div>
          <p className="text-xs text-[#404846] truncate">
            <span className="font-semibold text-[#002620]">Monsoon tilt active:</span> Inverter loss auto-calibrated to 0.4%.
          </p>
        </div>
        <span className="material-symbols-outlined text-[#717976] text-[18px] shrink-0">verified</span>
      </div>

      {/* KPI Metric Cards Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Savings */}
        <button
          type="button"
          onClick={() => navigateTo('/assessment')}
          className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col justify-between w-full text-left hover:border-[#006b57]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[#404846] font-medium">Est. Monthly Savings</span>
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">currency_rupee_circle</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-xl sm:text-2xl text-[#002620] font-bold tracking-tight">
                ₹{currentUser.role === 'msme' ? '18,400' : '3,480'}
              </span>
              <span className="text-xs text-[#404846] font-medium">/mo</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="inline-block px-1.5 py-0.5 rounded-full bg-[#9af4d8]/70 text-[#006b57] text-[10px] font-bold">
                +18% vs grid
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[#404846]/80 leading-tight">Delhi DERC Slab 4</p>
          </div>
        </button>

        {/* Card 2: Solar Capacity */}
        <button
          type="button"
          onClick={() => navigateTo('/optimiser')}
          className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col justify-between w-full text-left hover:border-[#006b57]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[#404846] font-medium">Solar Capacity</span>
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">wb_sunny</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-xl sm:text-2xl text-[#002620] font-bold tracking-tight">
                {currentUser.role === 'msme' ? '25.0' : '6.8'}
              </span>
              <span className="text-xs text-[#404846] font-medium">kWp</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="inline-block px-1.5 py-0.5 rounded-full bg-[#9af4d8]/70 text-[#006b57] text-[10px] font-bold">
                Optimal
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[#404846]/80 leading-tight">
              Terrace: {currentUser.terraceAreaSqFt} sq.ft unshaded
            </p>
          </div>
        </button>

        {/* Card 3: Pod Projects */}
        <button
          type="button"
          onClick={() => navigateTo('/community')}
          className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col justify-between w-full text-left hover:border-[#006b57]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[#404846] font-medium">Pod Projects</span>
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">hub</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-lg sm:text-xl text-[#002620] font-bold tracking-tight">
                1 Joined
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="inline-block px-1.5 py-0.5 rounded-full bg-[#e2f0f9] text-[#404846] text-[10px] font-bold">
                {community.committedMembersCount}/{community.totalEligibleFlats} Flats
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[#404846]/80 leading-tight truncate">
              {community.name}
            </p>
          </div>
        </button>

        {/* Card 4: Regulatory Status */}
        <button
          type="button"
          onClick={() => navigateTo('/regulations')}
          className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col justify-between w-full text-left hover:border-[#006b57]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[#404846] font-medium">Regulatory VNM</span>
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">gavel</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-base sm:text-lg text-[#002620] font-bold leading-tight">
                Pre-Approved
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="inline-block px-1.5 py-0.5 rounded-full bg-[#9af4d8]/70 text-[#006b57] text-[10px] font-bold">
                DERC Compliant
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[#404846]/80 leading-tight">BRPL Queue #418</p>
          </div>
        </button>
      </div>

      {/* Recommended Next Action: Consent Banner */}
      {!currentUser.consentSigned ? (
        <div className="relative overflow-hidden bg-[#103d35] text-white rounded-xl p-4 sm:p-5 shadow-md">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#006b57]/30 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdea7] text-[#271900] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#271900] animate-ping"></span>
              Action Required · 2 Days Remaining
            </div>
            <span className="material-symbols-outlined text-[#a3d0c4] text-[20px]">draw</span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-semibold tracking-tight text-white mb-1.5">
            Digitally Sign Member Consent for 12 kWp Pod
          </h2>
          <p className="text-xs text-[#a3d0c4] mb-3.5 leading-relaxed">
            RWA Block C has reached 10 participating flats. Review allocation distribution and authorize single-point BRPL virtual net metering application.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => setIsConsentModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f6bd4f] text-[#271900] font-headline text-xs font-bold rounded-lg active:scale-95 hover:bg-[#ffdea7] transition-all shadow-sm"
            >
              <span>Review &amp; Sign Agreement</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => navigateTo('/credit-allocation')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-headline text-xs font-semibold rounded-lg transition-colors"
            >
              View Financial Impact
            </button>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden bg-[#006b57] text-white rounded-xl p-4 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <span className="font-bold text-sm block">Member Consent Authorized</span>
              <span className="text-xs text-[#9af4d8]">Signed on {currentUser.consentDate || '22 Oct 2026'}. BRPL Queue #418 filed.</span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('/credit-allocation')}
            className="px-3 py-1.5 rounded-lg bg-white text-[#006b57] text-xs font-bold hover:bg-[#f4faff] shrink-0"
          >
            Ledger View
          </button>
        </div>
      )}

      {/* Generation vs Consumption Forecast Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-headline text-base text-[#002620] font-bold">Generation vs Consumption</span>
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#e2f0f9] text-[11px]">
              <button 
                onClick={() => setActiveModelRange('30day')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  activeModelRange === '30day' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
                }`}
              >
                30-Day Model
              </button>
              <button 
                onClick={() => setActiveModelRange('annual')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  activeModelRange === 'annual' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
                }`}
              >
                12-Month
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#404846] text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#006b57]"></span>
            <span>Live Model Simulation · Lat 28.61° N (Delhi NCR)</span>
          </div>
        </div>

        {/* Visual SVG Chart */}
        <div className="relative w-full h-44 bg-[#e8f6ff] rounded-xl p-3 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between z-10 text-[#101d24]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006b57]"></span>
                <span className="text-xs font-semibold text-[#002620]">
                  Solar: {activeModelRange === '30day' ? '540 kWh' : '6,480 kWh'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f6bd4f]"></span>
                <span className="text-xs font-semibold text-[#404846]">
                  Grid: {activeModelRange === '30day' ? '610 kWh' : '7,320 kWh'}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#006b57] font-bold bg-[#9af4d8]/60 px-2 py-0.5 rounded">
              Peak Solstice
            </span>
          </div>

          <div className="w-full h-24 relative flex items-end">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 90">
              <defs>
                <linearGradient id="dashSolarGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006b57" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#006b57" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="dashGridGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f6bd4f" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f6bd4f" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line stroke="#c0c8c5" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="320" y1="20" y2="20" />
              <line stroke="#c0c8c5" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="320" y1="55" y2="55" />
              
              {/* Consumption Grid Curve (Amber) */}
              <path d="M0,45 Q40,40 80,30 T160,25 T240,35 T320,28 L320,90 L0,90 Z" fill="url(#dashGridGlow)" />
              <path d="M0,45 Q40,40 80,30 T160,25 T240,35 T320,28" fill="none" stroke="#ca962b" strokeLinecap="round" strokeWidth="2" />
              
              {/* Generation Solar Curve (Emerald) */}
              <path d="M0,80 Q40,75 80,50 T160,15 T240,40 T320,70 L320,90 L0,90 Z" fill="url(#dashSolarGlow)" />
              <path d="M0,80 Q40,75 80,50 T160,15 T240,40 T320,70" fill="none" stroke="#006b57" strokeLinecap="round" strokeWidth="2.5" />
              <circle cx="160" cy="15" fill="#006b57" r="4.5" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex justify-between text-[#404846] text-[10px] pt-1 font-mono">
            <span>Week 1</span>
            <span>Week 2</span>
            <span className="font-bold text-[#002620]">Week 3 (Solstice Peak)</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Quick Stats Below Chart */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-[#e2f0f9] rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <span className="block text-[11px] text-[#404846]">Grid Bill Offset</span>
              <span className="font-headline text-base font-bold text-[#006b57]">78%</span>
            </div>
            <span className="material-symbols-outlined text-[#006b57] text-[22px]">energy_savings_leaf</span>
          </div>
          <div className="bg-[#e2f0f9] rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <span className="block text-[11px] text-[#404846]">Export Surplus</span>
              <span className="font-headline text-base font-bold text-[#002620]">₹640</span>
            </div>
            <span className="material-symbols-outlined text-[#f6bd4f] text-[22px]">payments</span>
          </div>
        </div>
      </div>

      {/* Rooftop Photo Verification Snapshot */}
      <button
        type="button"
        onClick={() => navigateTo('/assessment')}
        className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e2f0f9] flex items-center gap-3 w-full text-left hover:border-[#006b57]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2"
      >
        <div className="w-16 h-16 rounded-lg bg-[#e2f0f9] overflow-hidden shrink-0 border border-[#c0c8c5]/30">
          <img 
            alt="Terrace LiDAR snapshot" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACjPZWpPpvm_GacMBAT1-ITQUP88NeHtd2HophXbXrsq79Hp_A9SMhNvq4KkNt5kSenejbRaJ4Hnjf9oxZo9oIg_imQDdIY_sbthHKL3bN8Py9MTVXdG-YM_LUP8AGlvBFw22tfnBYtjcoP5jfbXqncqR197PObSRVCQkhBwj58XDjuF1FS890lQYiaGK-e_2Wsx323l6ZdYsGWAsxleiV1F85kSC6TNLvqjKHHyXs2Db8ATCuhwUbzQ"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-headline text-xs sm:text-sm text-[#002620] font-bold truncate">
              Terrace C-Block LiDAR Scanned
            </span>
            <span className="material-symbols-outlined text-[#006b57] text-[16px]">check_circle</span>
          </div>
          <p className="text-[11px] text-[#404846] line-clamp-1 mt-0.5">
            720 sq.ft unobstructed sun path · 94.2% solar access
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-[#006b57] font-semibold bg-[#9af4d8]/50 px-1.5 py-0.2 rounded">
              Simulated by Solaris Engine
            </span>
          </div>
        </div>
      </button>

      {/* Solar Pod Approval Timeline Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-sm font-bold text-[#002620]">Pod Approval Milestones</h3>
            <p className="text-[11px] text-[#404846]">Block C Virtual Net Metering (VNM)</p>
          </div>
          <span className="text-[11px] text-[#006b57] font-bold bg-[#9af4d8]/40 px-2 py-0.5 rounded-full">
            Step 3 of 5
          </span>
        </div>

        {/* Timeline Steps Horizontal Scroll */}
        <div className="flex items-start gap-2 pt-2 overflow-x-auto pb-1 no-scrollbar">
          {/* Step 1 */}
          <div className="flex-1 min-w-[84px] flex flex-col items-center text-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#006b57] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <span className="text-[11px] font-bold text-[#002620] leading-tight">Spatial Feasibility</span>
            <span className="text-[10px] text-[#006b57] font-medium">Passed</span>
          </div>
          <div className="w-4 h-0.5 bg-[#006b57] mt-3.5 shrink-0"></div>

          {/* Step 2 */}
          <div className="flex-1 min-w-[84px] flex flex-col items-center text-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#006b57] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <span className="text-[11px] font-bold text-[#002620] leading-tight">Quota Lock</span>
            <span className="text-[10px] text-[#006b57] font-medium">10 Flats</span>
          </div>
          <div className="w-4 h-0.5 bg-[#006b57] mt-3.5 shrink-0"></div>

          {/* Step 3 (Active) */}
          <div className="flex-1 min-w-[84px] flex flex-col items-center text-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#f6bd4f] text-[#271900] flex items-center justify-center shadow-sm ring-4 ring-[#ffdea7]/60 animate-pulse font-bold">
              <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
            </div>
            <span className="text-[11px] font-bold text-[#002620] leading-tight">DISCOM Filing</span>
            <span className="text-[10px] text-[#ca962b] font-semibold">Oct 28</span>
          </div>
          <div className="w-4 h-0.5 bg-[#dceaf4] mt-3.5 shrink-0"></div>

          {/* Step 4 */}
          <div className="flex-1 min-w-[84px] flex flex-col items-center text-center gap-1 opacity-60">
            <div className="w-7 h-7 rounded-full bg-[#e2f0f9] text-[#404846] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">speed</span>
            </div>
            <span className="text-[11px] font-medium text-[#404846] leading-tight">Smart Meter</span>
            <span className="text-[10px] text-[#717976]">Pending</span>
          </div>
          <div className="w-4 h-0.5 bg-[#dceaf4] mt-3.5 shrink-0"></div>

          {/* Step 5 */}
          <div className="flex-1 min-w-[84px] flex flex-col items-center text-center gap-1 opacity-60">
            <div className="w-7 h-7 rounded-full bg-[#e2f0f9] text-[#404846] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            </div>
            <span className="text-[11px] font-medium text-[#404846] leading-tight">Credit Active</span>
            <span className="text-[10px] text-[#717976]">Nov 15</span>
          </div>
        </div>
      </div>

      {/* Community Activity Feed */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2f0f9] flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-headline text-sm font-bold text-[#002620]">Community Activity</h3>
          <button 
            type="button"
            onClick={() => navigateTo('/community')}
            className="text-xs text-[#006b57] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2 rounded"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#9af4d8]/70 text-[#00725d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xs font-bold text-[#002620] truncate">Flat 302 (Col. Mehta)</span>
                <span className="text-[10px] text-[#717976] shrink-0">2 hrs ago</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Committed ₹45,000 CAPEX share for 2.4 kW allocation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e2f0f9] text-[#002620] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">engineering</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xs font-bold text-[#002620] truncate">BSES Rajdhani Power Ltd</span>
                <span className="text-[10px] text-[#717976] shrink-0">Yesterday</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Completed DT (Distribution Transformer) load capacity feasibility study.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ffdea7] text-[#271900] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xs font-bold text-[#002620] truncate">Solaris AI Solver</span>
                <span className="text-[10px] text-[#717976] shrink-0">2 days ago</span>
              </div>
              <p className="text-xs text-[#404846] mt-0.5">
                Auto-rebalanced credit ratio to 100.0% zero-shortfall across 10 subscribers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick Launcher Strip */}
      <div className="p-3.5 rounded-xl bg-[#e2f0f9] flex items-center justify-between border border-[#c0c8c5]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#006b57]">
            <span className="material-symbols-outlined text-[20px]">contact_support</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#002620]">Need technical assistance?</h4>
            <p className="text-[11px] text-[#404846]">BRPL regulatory desk hotline available 10 AM - 6 PM</p>
          </div>
        </div>
        <button
          onClick={() => setAssistanceRequested(true)}
          className="px-3 py-1.5 rounded-lg bg-white text-[#006b57] text-xs font-semibold active:scale-95 transition-transform shadow-sm hover:bg-[#f4faff]"
        >
          {assistanceRequested ? 'Connecting...' : 'Call Officer'}
        </button>
      </div>

      {assistanceRequested && (
        <div className="p-3 rounded-lg bg-[#e8f6ff] border border-[#006b57]/30 text-xs text-[#002620] flex items-center justify-between animate-in fade-in">
          <span>Desk Officer connected: Direct helpline <strong>+91 (011) 2652-BRPL</strong> (Ref #VNM-418).</span>
          <button type="button" onClick={() => setAssistanceRequested(false)} className="text-[11px] font-bold text-[#006b57] focus:outline-none focus:ring-2 focus:ring-[#9af4d8]/60 focus:ring-offset-2 rounded px-2 py-1">Dismiss</button>
        </div>
      )}

    </div>
  );
};
