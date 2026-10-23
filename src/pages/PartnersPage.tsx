import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PARTNER_QUOTATIONS } from '../data/mockData';

export const PartnersPage: React.FC = () => {
  const { community, addAuditLog } = useApp();
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [financeLoanAmount, setFinanceLoanAmount] = useState<number>(350000);
  const [financeTenureYears, setFinanceTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // EMI formula
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = financeTenureYears * 12;
  const calculatedEmi = Math.round(
    (financeLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const handleRequestQuote = (companyName: string) => {
    setRfqSubmitted(true);
    addAuditLog(
      'Quotation Requested',
      `Requested commercial quotation from ${companyName} for ${community.proposedCapacityKw} kWp system.`,
      'financial'
    );
    setTimeout(() => {
      setRfqSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-4xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#9af4d8]/60 text-[#00725d] text-xs font-semibold mb-1">
          <span className="material-symbols-outlined text-[14px]">handshake</span>
          <span>Delhi Empanelled EPC Network</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
          Installers &amp; Financing Partners
        </h1>
        <p className="text-xs sm:text-sm text-[#404846] mt-0.5">
          Connect with certified Delhi rooftop solar EPC providers and subsidized green loan institutions.
        </p>
      </div>

      {rfqSubmitted && (
        <div className="p-3.5 bg-[#9af4d8]/40 border border-[#006b57]/30 rounded-xl text-xs text-[#002620] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">check_circle</span>
            <span>Quotation Request Dispatched! Partner engineering desk will respond within 24 business hours.</span>
          </div>
          <button onClick={() => setRfqSubmitted(false)} className="text-[11px] font-bold text-[#006b57]">Dismiss</button>
        </div>
      )}

      {/* Partner Quotations List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-base font-bold text-[#002620]">Screened EPC Quotations</h2>
          <span className="text-xs text-[#404846] font-mono">3 Qualified Bids</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PARTNER_QUOTATIONS.map((quote) => (
            <div
              key={quote.id}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all flex flex-col justify-between ${
                selectedPartnerId === quote.id ? 'border-[#006b57] ring-2 ring-[#006b57]/20' : 'border-[#e2f0f9]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9af4d8] text-[#002019] font-bold">
                    {quote.tier}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#ca962b]">
                    <span className="material-symbols-outlined text-[15px]">star</span>
                    <span>{quote.rating}</span>
                    <span className="text-[10px] text-[#717976]">({quote.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-headline text-sm font-bold text-[#002620]">{quote.companyName}</h3>
                
                <div className="my-2.5 p-2 bg-[#e8f6ff] rounded-lg border border-[#d6e5ee]">
                  <span className="text-[10px] text-[#404846] block">Base Rate / kWp</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline text-lg font-bold text-[#002620]">
                      ₹{quote.baseRatePerKwInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#404846]">/kWp</span>
                  </div>
                  <span className="text-[10px] text-[#006b57] font-semibold block mt-0.5">
                    Est. Total (12 kWp): ₹{quote.totalQuotationInr.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#404846] pt-1">
                  <div className="flex justify-between">
                    <span>Panel Warranty:</span>
                    <strong className="text-[#101d24]">{quote.warrantyPanelsYears} Years</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Inverter Warranty:</span>
                    <strong className="text-[#101d24]">{quote.warrantyInverterYears} Years</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Free O&amp;M Included:</span>
                    <strong className="text-[#006b57]">{quote.omIncludedYears} Years</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>DISCOM Liaison:</span>
                    <strong className="text-[#006b57]">{quote.discomLiaisonIncluded ? 'Included' : 'Self-Filing'}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {quote.badges.map((b) => (
                    <span key={b} className="text-[9px] px-1.5 py-0.5 rounded bg-[#e2f0f9] text-[#002620] font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleRequestQuote(quote.companyName)}
                  className="w-full py-2 px-3 rounded-lg bg-[#006b57] text-white text-xs font-bold shadow-sm hover:bg-[#002620] transition-colors"
                >
                  Request Formal Scope
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financing Comparison Calculator */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006b57] text-[20px]">account_balance</span>
          <div>
            <h2 className="font-headline text-sm font-bold text-[#002620]">
              Green Concessional Financing Calculator
            </h2>
            <p className="text-[11px] text-[#404846]">SBI PM Surya Ghar &amp; IREDA Rooftop Solar Loan Terms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#404846]">Loan Principal Amount</label>
            <div className="flex items-center bg-[#e8f6ff] rounded-lg px-3 border border-[#d6e5ee]">
              <span className="text-xs text-[#717976]">₹</span>
              <input
                type="number"
                step="25000"
                min="50000"
                max="1000000"
                value={financeLoanAmount}
                onChange={(e) => setFinanceLoanAmount(Number(e.target.value))}
                className="w-full h-9 bg-transparent text-xs font-bold text-[#101d24] focus:outline-none pl-1"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#404846]">Interest Rate (% p.a.)</label>
            <input
              type="number"
              step="0.1"
              min="6.0"
              max="15.0"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-9 px-3 bg-[#e8f6ff] rounded-lg text-xs font-bold text-[#101d24] border border-[#d6e5ee] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#404846]">Tenure (Years)</label>
            <select
              value={financeTenureYears}
              onChange={(e) => setFinanceTenureYears(Number(e.target.value))}
              className="w-full h-9 px-2 bg-[#e8f6ff] rounded-lg text-xs font-bold text-[#101d24] border border-[#d6e5ee] focus:outline-none"
            >
              <option value={3}>3 Years (36 mo)</option>
              <option value={5}>5 Years (60 mo - Recommended)</option>
              <option value={7}>7 Years (84 mo)</option>
            </select>
          </div>
        </div>

        {/* EMI Outcome Banner */}
        <div className="p-3 bg-[#103d35] text-white rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#a3d0c4] uppercase font-bold block">Estimated Monthly EMI</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline text-2xl font-bold">₹{calculatedEmi.toLocaleString('en-IN')}</span>
              <span className="text-xs text-[#a3d0c4]">/month</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#a3d0c4] block">Total Interest Payable</span>
            <span className="text-sm font-semibold text-[#f6bd4f]">
              ₹{(calculatedEmi * totalMonths - financeLoanAmount).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
