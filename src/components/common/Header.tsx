import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface HeaderProps {
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ subtitle = 'Main Dashboard' }) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    navigateTo,
    isAuthenticated,
    logOut,
    setIsSidebarOpen 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleOptions: { role: UserRole; label: string; desc: string; icon: string }[] = [
    { role: 'household', label: 'Rohit Rao (Resident)', desc: 'Apartment Flat 301 · RWA Member', icon: 'home' },
    { role: 'rwa_coordinator', label: 'Anita Verma (RWA Coordinator)', desc: 'General Secretary · Gulmohar RWA', icon: 'apartment' },
    { role: 'msme', label: 'Alok Gupta (MSME Owner)', desc: 'Shree Fabric Mills · 25 kW Grid', icon: 'storefront' },
    { role: 'installer_partner', label: 'Vikram Solar (EPC Partner)', desc: 'Empanelled BRPL Solar Contractor', icon: 'engineering' },
    { role: 'admin_auditor', label: 'Er. Rajesh Sharma (Auditor)', desc: 'DERC Ombudsman & Regulatory Auditor', icon: 'gavel' }
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#f4faff]/90 backdrop-blur-xl border-b border-[#e2f0f9] shadow-[0_1px_12px_rgba(16,61,53,0.06)]">
      <div className="h-16 px-4 max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Brand Lockup */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#101d24] hover:bg-[#e2f0f9] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          <div 
            onClick={() => navigateTo('/dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <img 
              alt="Solaris Emblem" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1VRQ3ag_QUrg4F0RpgjDeg7dO5VcOfyaoOVMnuIl2OAGmbDHOYUxs2eERwlsekc4X4YPZEiFGfPCJ2p0zPYO7kbJQLSUvF3z2dlANCijd68Bpca06A2Vi1uqrvQPl7TnFRfFCSB0SsHgvs3NVpLhyvpNDZV4E-ZtB3wqovkmmQ2Zo6GtMJaSipNp0Sqqlz489QzoJnctAEJd_LUXI1cKHjEkUq_qibBtcKFTkSBu623vnQUNoBl2byPwHQ"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-base text-[#002620] tracking-tight font-bold leading-none">
                  SOLARIS
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#9af4d8]/70 text-[#006b57] text-[11px] font-semibold leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006b57] animate-pulse"></span>
                  Delhi ({currentUser.discom})
                </span>
              </div>
              <span className="text-[11px] text-[#404846] font-medium truncate max-w-[170px] sm:max-w-none">
                {subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Role Selector, User Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Quick Demo Role Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#e2f0f9] hover:bg-[#dceaf4] text-[#002620] text-xs font-semibold transition-colors"
              title="Switch demo role persona"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006b57]">switch_account</span>
              <span className="truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
              <span className="material-symbols-outlined text-[14px] text-[#717976]">expand_more</span>
            </button>

            {/* Role Switcher Dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-[#c0c8c5]/40 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-[#e2f0f9]">
                  <span className="text-xs font-bold text-[#002620] uppercase tracking-wider block">Interactive Role Switcher</span>
                  <span className="text-[11px] text-[#404846]">Explore Solaris through 5 distinct user perspectives</span>
                </div>
                <div className="py-1 max-h-80 overflow-y-auto">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        switchRole(opt.role);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#f4faff] transition-colors ${
                        currentRole === opt.role ? 'bg-[#9af4d8]/20 border-l-2 border-[#006b57]' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#006b57] mt-0.5">{opt.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-[#101d24] block truncate">{opt.label}</span>
                        <span className="text-[11px] text-[#404846] block truncate">{opt.desc}</span>
                      </div>
                      {currentRole === opt.role && (
                        <span className="material-symbols-outlined text-[16px] text-[#006b57]">check</span>
                      )}
                    </button>
                  ))}
                </div>
                {isAuthenticated && (
                  <div className="px-2 pt-2 pb-1 border-t border-[#e2f0f9]">
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        logOut();
                      }}
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold text-[#93000a] hover:bg-[#ffdad6]/40 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div 
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="w-9 h-9 flex items-center justify-center cursor-pointer"
            title={`${currentUser.name} (${currentUser.roleTitle})`}
          >
            <img 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover shadow-[0_0_0_2px_rgba(0,107,87,0.2)]" 
              src={currentUser.avatarUrl}
              onError={(e) => {
                // Graceful fallback avatar
                (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOCw3_x5kggCZA-8gYXL_IqD9UGPInL8dDI_KLzxMKLSVw6wDKwFNvO83-jGssib42nLy1UBemp8csYhlhtpPj6c1Lv698HOaJ_r6HLI1c6eBs25G95aoANJ6YUj6G7h523c89jsYLlHU0mQqS07NMO8rlR-8LKdaA3pqrIir9Bv5DalugqUNKhcULE8HwTD_vDHSjKuhKODrhdEIqy9y6ylGpU7cX4s_rqKxr2zq5Ae4okzcjh_3QgA';
              }}
            />
          </div>

        </div>

      </div>
    </header>
  );
};
