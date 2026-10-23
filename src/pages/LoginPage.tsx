import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { currentRole, switchRole, navigateTo } = useApp();

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    navigateTo('/dashboard');
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-2xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9af4d8]/60 text-[#00725d] text-xs font-semibold mb-2">
          <span className="material-symbols-outlined text-[15px]">switch_account</span>
          <span>Zero-Friction Persona Switcher</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
          Select Your Solaris Role
        </h1>
        <p className="text-xs sm:text-sm text-[#404846] max-w-md mx-auto mt-1">
          Explore Solaris from any stakeholder perspective with dedicated permissions, ledgers, and tailored workflows.
        </p>
      </div>

      {/* Personas Cards */}
      <div className="space-y-3 pt-2">
        {Object.values(DEMO_USERS).map((user) => {
          const isSelected = currentRole === user.role;
          return (
            <div
              key={user.role}
              onClick={() => handleSelectRole(user.role)}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer flex items-center justify-between gap-3 hover:border-[#006b57]/40 ${
                isSelected ? 'border-[#006b57] ring-2 ring-[#006b57]/20 bg-[#e8f6ff]/30' : 'border-[#e2f0f9]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  alt={user.name}
                  src={user.avatarUrl}
                  className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#006b57]/20 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOCw3_x5kggCZA-8gYXL_IqD9UGPInL8dDI_KLzxMKLSVw6wDKwFNvO83-jGssib42nLy1UBemp8csYhlhtpPj6c1Lv698HOaJ_r6HLI1c6eBs25G95aoANJ6YUj6G7h523c89jsYLlHU0mQqS07NMO8rlR-8LKdaA3pqrIir9Bv5DalugqUNKhcULE8HwTD_vDHSjKuhKODrhdEIqy9y6ylGpU7cX4s_rqKxr2zq5Ae4okzcjh_3QgA';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-sm font-bold text-[#002620] truncate">
                      {user.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#e2f0f9] text-[#002620] font-semibold">
                      {user.discom}
                    </span>
                  </div>
                  <span className="text-xs text-[#006b57] font-semibold block truncate">
                    {user.roleTitle}
                  </span>
                  <span className="text-[11px] text-[#404846] block truncate">
                    CA #{user.consumerNumber} · Sanctioned {user.sanctionedLoadKw} kW · {user.tariffCategory}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                {isSelected ? (
                  <span className="w-7 h-7 rounded-full bg-[#006b57] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#006b57] bg-[#e8f6ff] px-3 py-1.5 rounded-lg hover:bg-[#dceaf4]">
                    Switch
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
