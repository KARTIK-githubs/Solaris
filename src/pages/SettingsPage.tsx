import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateCurrentUser, addAuditLog } = useApp();
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [caNumber, setCaNumber] = useState(currentUser.consumerNumber);
  const [discom, setDiscom] = useState(currentUser.discom);
  const [sanctionedLoad, setSanctionedLoad] = useState(currentUser.sanctionedLoadKw);
  const [tariffCategory, setTariffCategory] = useState(currentUser.tariffCategory);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      consumerNumber: caNumber,
      discom,
      sanctionedLoadKw: Number(sanctionedLoad),
      tariffCategory
    });
    addAuditLog('Settings Updated', `Modified account profile and DISCOM parameters.`, 'system');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset local demo records to factory initial state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-2xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-2">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
          Settings &amp; Connection Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#404846] mt-0.5">
          Manage your verified consumer identity, sanctioned load, and DISCOM integration parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-[#9af4d8] text-[#002019] rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-4">
        
        {/* User Identity */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-3">
          <h2 className="font-headline text-sm font-bold text-[#002620]">Personal Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-[#101d24] block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-[#c0c8c5] focus:outline-none focus:border-[#006b57]"
              />
            </div>
            <div>
              <label className="font-semibold text-[#101d24] block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-[#c0c8c5] focus:outline-none focus:border-[#006b57]"
              />
            </div>
          </div>
        </div>

        {/* DISCOM & Meter Parameters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2f0f9] space-y-3">
          <h2 className="font-headline text-sm font-bold text-[#002620]">DISCOM Grid Parameters</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-[#101d24] block mb-1">DISCOM Utility</label>
              <select
                value={discom}
                onChange={(e) => setDiscom(e.target.value as any)}
                className="w-full h-10 px-2.5 rounded-lg border border-[#c0c8c5]"
              >
                <option value="BRPL">BSES Rajdhani Power Ltd (BRPL)</option>
                <option value="BYPL">BSES Yamuna Power Ltd (BYPL)</option>
                <option value="TPDDL">Tata Power Delhi Distribution (TPDDL)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#101d24] block mb-1">Consumer Account (CA) #</label>
              <input
                type="text"
                value={caNumber}
                onChange={(e) => setCaNumber(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-[#c0c8c5] font-mono font-bold focus:outline-none focus:border-[#006b57]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#101d24] block mb-1">Sanctioned Load (kW)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="50"
                value={sanctionedLoad}
                onChange={(e) => setSanctionedLoad(Number(e.target.value))}
                required
                className="w-full h-10 px-3 rounded-lg border border-[#c0c8c5] focus:outline-none focus:border-[#006b57]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#101d24] block mb-1">Tariff Classification</label>
              <select
                value={tariffCategory}
                onChange={(e) => setTariffCategory(e.target.value as any)}
                className="w-full h-10 px-2.5 rounded-lg border border-[#c0c8c5]"
              >
                <option value="Domestic">Domestic (LT-1)</option>
                <option value="Non-Domestic">Non-Domestic / Commercial (LT-2)</option>
                <option value="Industrial">Industrial (LT-3)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="px-3.5 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors"
          >
            Reset Demo Data
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#006b57] text-white font-headline text-xs font-bold shadow-md hover:bg-[#002620] transition-colors"
          >
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
};
