import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MONTHLY_GENERATION_SERIES, MAINTENANCE_TICKETS } from '../data/mockData';
import { MaintenanceTicket } from '../types';

export const MonitoringPage: React.FC = () => {
  const { addAuditLog } = useApp();
  const [activeView, setActiveView] = useState<'monthly' | 'daily' | 'yearly'>('monthly');
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(MAINTENANCE_TICKETS);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketComponent, setTicketComponent] = useState('Array #1 - Strings');
  const [ticketSeverity, setTicketSeverity] = useState<MaintenanceTicket['severity']>('medium');
  const [ticketDesc, setTicketDesc] = useState('');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTkt: MaintenanceTicket = {
      id: `tkt_${Date.now()}`,
      title: ticketTitle,
      severity: ticketSeverity,
      status: 'open',
      component: ticketComponent,
      reportedDate: new Date().toISOString().slice(0, 10),
      assignedEngineer: 'GreenGrid Support Desk (Eng. Sumit)',
      estimatedResolutionDate: 'Within 48h',
      description: ticketDesc
    };
    setTickets([newTkt, ...tickets]);
    addAuditLog('Maintenance Ticket Created', `Logged ticket "${ticketTitle}" for ${ticketComponent}`, 'system');
    setShowNewTicketModal(false);
    setTicketTitle('');
    setTicketDesc('');
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-4xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#9af4d8]/60 text-[#00725d] text-xs font-semibold mb-1">
            <span className="material-symbols-outlined text-[14px]">query_stats</span>
            <span>Real-time Inverter Telemetry</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
            Solar Generation &amp; Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-[#404846] mt-0.5">
            Active plant telemetry, expected vs actual performance, and DERC compliance alerts.
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#006b57] text-white text-xs font-bold shadow-sm hover:bg-[#002620] transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">report_problem</span>
          <span className="hidden sm:inline">Report Fault</span>
        </button>
      </div>

      {/* Telemetry Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
          <span className="text-[10px] text-[#717976] block">Inverter Status</span>
          <span className="font-headline text-sm font-bold text-[#006b57] flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#006b57] animate-pulse"></span> Online (Grid-Tied)
          </span>
          <span className="text-[10px] text-[#717976]">Grid Frequency: 50.02 Hz</span>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
          <span className="text-[10px] text-[#717976] block">Current Power Output</span>
          <span className="font-headline text-base font-bold text-[#002620] mt-0.5 block font-mono">
            8.92 kW
          </span>
          <span className="text-[10px] text-[#006b57] font-semibold">74% of 12 kWp rating</span>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
          <span className="text-[10px] text-[#717976] block">Today's Generation</span>
          <span className="font-headline text-base font-bold text-[#002620] mt-0.5 block font-mono">
            48.2 kWh
          </span>
          <span className="text-[10px] text-[#ca962b] font-semibold">Solar irradiance: 5.2 kWh/m²</span>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
          <span className="text-[10px] text-[#717976] block">Performance Ratio (PR)</span>
          <span className="font-headline text-base font-bold text-[#006b57] mt-0.5 block font-mono">
            82.4%
          </span>
          <span className="text-[10px] text-[#717976]">Target baseline: 80.0%</span>
        </div>
      </div>

      {/* Generation Chart Container */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2f0f9] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">ssid_chart</span>
            <span className="font-headline text-sm font-bold text-[#002620]">
              Generation Trends vs Consumption
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#e2f0f9] p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveView('monthly')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeView === 'monthly' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
              }`}
            >
              12 Months
            </button>
            <button
              onClick={() => setActiveView('daily')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeView === 'daily' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
              }`}
            >
              Daily
            </button>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="w-full h-56 pt-4 flex flex-col justify-end">
          <div className="w-full h-44 flex items-end justify-between gap-1 sm:gap-2 px-1">
            {MONTHLY_GENERATION_SERIES.map((item) => {
              const genHeight = Math.round((item.generationKwh / 950) * 100);
              const consHeight = Math.round((item.consumptionKwh / 950) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    <div
                      title={`Solar Generation: ${item.generationKwh} kWh`}
                      className="w-1/2 max-w-[14px] bg-[#006b57] rounded-t transition-all group-hover:bg-[#002620]"
                      style={{ height: `${genHeight}%` }}
                    />
                    <div
                      title={`Grid Consumption: ${item.consumptionKwh} kWh`}
                      className="w-1/2 max-w-[14px] bg-[#f6bd4f] rounded-t transition-all group-hover:bg-[#ca962b]"
                      style={{ height: `${consHeight}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#717976] font-mono mt-1">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-xs border-t border-[#e2f0f9]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#006b57]"></span>
              <span className="text-[#101d24] font-medium">Solar Generation (kWh)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#f6bd4f]"></span>
              <span className="text-[#101d24] font-medium">Grid Consumption (kWh)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance & Service Tickets */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2f0f9] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b57] text-[20px]">build</span>
            <h2 className="font-headline text-sm font-bold text-[#002620]">Maintenance &amp; O&amp;M Service Log</h2>
          </div>
          <span className="text-xs text-[#404846] font-mono">{tickets.length} Active Records</span>
        </div>

        <div className="space-y-2.5">
          {tickets.map((t) => (
            <div key={t.id} className="p-3 bg-[#f8faf7] rounded-xl border border-[#e2f0f9] space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-[#002620] block text-xs sm:text-sm">{t.title}</span>
                  <span className="text-[10px] text-[#717976]">Component: {t.component} · Reported {t.reportedDate}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  t.status === 'resolved' 
                    ? 'bg-[#9af4d8] text-[#00725d]' 
                    : t.status === 'investigating' 
                    ? 'bg-[#ffdea7] text-[#271900]' 
                    : 'bg-[#dceaf4] text-[#002620]'
                }`}>
                  {t.status}
                </span>
              </div>
              <p className="text-[#404846] text-[11px] leading-relaxed">{t.description}</p>
              <div className="flex items-center justify-between text-[10px] text-[#717976] pt-1 border-t border-[#e2f0f9]">
                <span>Assigned: {t.assignedEngineer}</span>
                <span>Est. Resolution: {t.estimatedResolutionDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Fault Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#c0c8c5]/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#e2f0f9] pb-2">
              <span className="font-headline font-bold text-sm text-[#002620]">Report Solar Maintenance Fault</span>
              <button onClick={() => setShowNewTicketModal(false)} className="text-[#404846]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#101d24] block mb-1">Issue Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inverter Error Code E042"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-[#c0c8c5] focus:outline-none focus:border-[#006b57]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-[#101d24] block mb-1">Component</label>
                  <select
                    value={ticketComponent}
                    onChange={(e) => setTicketComponent(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-[#c0c8c5]"
                  >
                    <option value="Inverter 12kWp">Inverter Array</option>
                    <option value="Bi-directional Meter">Smart Meter</option>
                    <option value="PV Modules (Roof)">Solar PV Panels</option>
                    <option value="AC/DC Cabling">Distribution Box</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#101d24] block mb-1">Severity</label>
                  <select
                    value={ticketSeverity}
                    onChange={(e) => setTicketSeverity(e.target.value as any)}
                    className="w-full h-9 px-2 rounded-lg border border-[#c0c8c5]"
                  >
                    <option value="low">Low (Routine)</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Loss of yield)</option>
                    <option value="critical">Critical (Safety hazard)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#101d24] block mb-1">Description / Observations</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide details about inverter display readings, physical inspections, or tripping..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#c0c8c5] focus:outline-none focus:border-[#006b57]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-[#404846] hover:bg-[#e2f0f9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#006b57] text-white text-xs font-bold hover:bg-[#002620]"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
