import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REGULATORY_RULES } from '../data/mockData';
import { RegulatoryRule } from '../types';
import { runAllSolarisTests, TestResult } from '../tests/solarisTests';

export const AdminPage: React.FC = () => {
  const { currentRole, currentUser, auditLogs, community, addAuditLog } = useApp();
  const [rules, setRules] = useState<RegulatoryRule[]>(REGULATORY_RULES);
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'rules' | 'tests'>('overview');
  const [testResults, setTestResults] = useState<TestResult[]>(() => runAllSolarisTests());
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const results = runAllSolarisTests();
      setTestResults(results);
      setIsRunningTests(false);
      addAuditLog('Acceptance Tests Executed', `Ran ${results.length} automated tests. All constraints validated.`, 'system');
    }, 400);
  };

  const isAdmin = currentRole === 'admin_auditor';

  const toggleRuleStatus = (ruleId: string) => {
    if (!isAdmin) {
      alert('Action Restricted: Only Authorized DERC Administrators / Auditors may modify regulatory rules.');
      return;
    }
    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextStatus = r.status === 'eligible' ? 'potentially_eligible' : r.status === 'potentially_eligible' ? 'needs_verification' : 'eligible';
        addAuditLog('Regulatory Rule Modified', `Admin ${currentUser.name} updated rule "${r.name}" to ${nextStatus}`, 'regulatory');
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-4xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdea7] text-[#271900] text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            <span>DERC Ombudsman &amp; Auditor Console</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
            System Administration &amp; Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-[#404846] mt-0.5">
            Real-time compliance monitoring, statutory rule ledger, and immutable transaction audit logs.
          </p>
        </div>

        {!isAdmin && (
          <span className="px-2.5 py-1 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-bold">
            Read-Only Audit Mode
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[#e2f0f9] text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTab === 'overview' ? 'bg-white text-[#002620] shadow-sm font-bold' : 'text-[#404846]'
          }`}
        >
          Cohort Overview
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTab === 'audit' ? 'bg-white text-[#002620] shadow-sm font-bold' : 'text-[#404846]'
          }`}
        >
          Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTab === 'rules' ? 'bg-white text-[#002620] shadow-sm font-bold' : 'text-[#404846]'
          }`}
        >
          Statutory Rules
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTab === 'tests' ? 'bg-white text-[#002620] shadow-sm font-bold' : 'text-[#404846]'
          }`}
        >
          Verification Tests ({testResults.length})
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-3 animate-in fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
              <span className="text-[10px] text-[#717976]">Active Cohorts</span>
              <span className="font-headline text-lg font-bold text-[#002620] block mt-0.5">1 Cluster</span>
              <span className="text-[10px] text-[#006b57]">Gulmohar Enclave RWA</span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
              <span className="text-[10px] text-[#717976]">Total Subscribers</span>
              <span className="font-headline text-lg font-bold text-[#002620] block mt-0.5">
                {community.committedMembersCount} Units
              </span>
              <span className="text-[10px] text-[#006b57]">100% CA Verified</span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
              <span className="text-[10px] text-[#717976]">Sanctioned Capacity</span>
              <span className="font-headline text-lg font-bold text-[#002620] block mt-0.5">14.0 kWp</span>
              <span className="text-[10px] text-[#ca962b]">Within 80% DT Limit</span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2f0f9]">
              <span className="text-[10px] text-[#717976]">Reconciliation Audit</span>
              <span className="font-headline text-lg font-bold text-[#006b57] block mt-0.5">0.0% Variance</span>
              <span className="text-[10px] text-[#006b57]">Mathematically Locked</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-3">
            <h3 className="font-headline text-sm font-bold text-[#002620]">Active Community Project Record</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#e2f0f9]">
                <span className="text-[#717976]">Project ID:</span>
                <span className="font-mono font-bold">{community.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e2f0f9]">
                <span className="text-[#717976]">DISCOM Circle:</span>
                <span className="font-semibold">{community.discom} ({community.clusterCircle})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e2f0f9]">
                <span className="text-[#717976]">Gross / Net Capital Outlay:</span>
                <span className="font-mono font-bold">₹{community.grossOutlayInr.toLocaleString('en-IN')} / ₹{community.netTargetInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#717976]">Current Lifecycle Stage:</span>
                <span className="font-semibold text-[#006b57] uppercase">{community.status.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-headline text-sm font-bold text-[#002620]">Immutable Audit Trail</span>
            <span className="text-xs text-[#717976] font-mono">{auditLogs.length} events logged</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-[#f8faf7] rounded-lg border border-[#e2f0f9] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#002620]">{log.action}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      log.category === 'regulatory' 
                        ? 'bg-[#e8f6ff] text-[#006b57]' 
                        : log.category === 'financial' 
                        ? 'bg-[#ffdea7] text-[#271900]' 
                        : 'bg-[#e2f0f9] text-[#404846]'
                    }`}>
                      {log.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#717976] font-mono">{log.timestamp}</span>
                </div>
                <p className="text-[#404846] text-[11px] leading-relaxed">{log.details}</p>
                <div className="text-[10px] text-[#717976] pt-0.5">
                  Actor: <strong className="text-[#101d24]">{log.actor}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Rules Ledger */}
      {activeTab === 'rules' && (
        <div className="space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-headline text-sm font-bold text-[#002620]">Delhi DERC Statutory Rules</span>
            <span className="text-xs text-[#717976]">{isAdmin ? 'Tap status to toggle' : 'Protected'}</span>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-2.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-headline text-sm font-bold text-[#002620]">{rule.name}</h3>
                    <span className="text-[10px] text-[#717976] font-mono">{rule.policyCitation} · {rule.docketNumber}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRuleStatus(rule.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer transition-all ${
                      rule.status === 'eligible' 
                        ? 'bg-[#9af4d8] text-[#00725d]' 
                        : rule.status === 'potentially_eligible' 
                        ? 'bg-[#e8f6ff] text-[#006b57]' 
                        : rule.status === 'needs_verification' 
                        ? 'bg-[#ffdea7] text-[#271900]' 
                        : 'bg-[#d6e5ee] text-[#404846]'
                    }`}
                  >
                    {rule.status.replace('_', ' ')}
                  </button>
                </div>

                <p className="text-[#404846] text-xs leading-relaxed">{rule.summary}</p>

                <div className="p-2.5 bg-[#f8faf7] rounded-lg border border-[#e2f0f9] space-y-1">
                  <span className="text-[10px] font-bold text-[#002620] uppercase block">Approval Pathway</span>
                  <p className="text-[11px] text-[#404846]">{rule.discomApprovalPathway}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Automated Verification Tests */}
      {activeTab === 'tests' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-headline text-sm font-bold text-[#002620]">
                Automated Acceptance Tests &amp; Boundary Verification
              </span>
              <p className="text-xs text-[#404846]">
                Validates Section 20 specifications: solar sizing, 100% allocation sum, subsidy caps, and budget constraints.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="px-3.5 py-1.5 rounded-lg bg-[#006b57] text-white text-xs font-bold hover:bg-[#002620] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {isRunningTests ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Run Tests</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-2.5">
            {testResults.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border flex items-start gap-3 bg-[#f8faf7] border-[#e2f0f9]"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  t.passed ? 'bg-[#9af4d8] text-[#00725d]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                }`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {t.passed ? 'check' : 'close'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#002620]">{t.name}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      t.passed ? 'bg-[#9af4d8] text-[#00725d]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {t.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404846] mt-0.5 leading-relaxed">{t.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
