import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  CommunityProject, 
  CommunityMember, 
  AuditLogItem, 
  NotificationItem, 
  UserRole,
  OptimisationParams,
  OptimisationResult
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_COMMUNITY, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { runAffordabilityOptimiser } from '../utils/optimiserEngine';

interface AppContextType {
  currentRole: UserRole;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  
  currentPath: string;
  navigateTo: (path: string) => void;

  community: CommunityProject;
  updateCommunity: (updates: Partial<CommunityProject>) => void;
  inviteMember: (newMember: Omit<CommunityMember, 'id'>) => void;
  toggleMemberConsent: (memberId: string) => void;
  
  signUserConsent: () => void;
  isConsentModalOpen: boolean;
  setIsConsentModalOpen: (open: boolean) => void;

  optimisationParams: OptimisationParams;
  setOptimisationParams: React.Dispatch<React.SetStateAction<OptimisationParams>>;
  optimisationResult: OptimisationResult;
  rerunOptimiser: () => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, details: string, category?: AuditLogItem['category']) => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'solaris_role',
  USER: 'solaris_user',
  COMMUNITY: 'solaris_community',
  LOGS: 'solaris_logs',
  NOTIFS: 'solaris_notifs'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Role & User State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'household';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEMO_USERS['household'];
  });

  // 2. Navigation State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/dashboard';
  });

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPath(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Community State
  const [community, setCommunity] = useState<CommunityProject>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMUNITY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_COMMUNITY;
  });

  // 4. Modal & UI State
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 5. Notifications & Audit Logs
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_AUDIT_LOGS;
  });

  // 6. Optimiser State
  const [optimisationParams, setOptimisationParams] = useState<OptimisationParams>({
    roofAreaSqFt: 1400,
    targetCapacityKw: 12,
    budgetCeilingInr: 580000,
    financingRatePercentage: 8.5,
    participantCapInr: 4500,
    stressFactors: {
      monsoonDrop: false,
      rateSpike: false,
      unitDropOut: false,
      subsidyDelay: false
    }
  });

  const [optimisationResult, setOptimisationResult] = useState<OptimisationResult>(() => {
    return runAffordabilityOptimiser(INITIAL_COMMUNITY.members, {
      roofAreaSqFt: 1400,
      targetCapacityKw: 12,
      budgetCeilingInr: 580000,
      financingRatePercentage: 8.5,
      participantCapInr: 4500,
      stressFactors: {
        monsoonDrop: false,
        rateSpike: false,
        unitDropOut: false,
        subsidyDelay: false
      }
    });
  });

  const rerunOptimiser = () => {
    const result = runAffordabilityOptimiser(community.members, optimisationParams);
    setOptimisationResult(result);
    addAuditLog(
      'Affordability Solver Executed',
      `Re-solved for ${optimisationParams.targetCapacityKw} kWp with ${result.includedCount} subscribers, avg gain ₹${result.avgNetMonthlySavingsInr}/mo.`,
      'financial'
    );
  };

  useEffect(() => {
    rerunOptimiser();
  }, [optimisationParams, community.members.length]);

  // Actions
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const newUser = DEMO_USERS[role] || DEMO_USERS['household'];
    setCurrentUser(newUser);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    addAuditLog('Role Switch', `Switched active demo context to ${newUser.name} (${newUser.roleTitle})`, 'system');
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    });
  };

  const updateCommunity = (updates: Partial<CommunityProject>) => {
    setCommunity(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(updated));
      return updated;
    });
  };

  const inviteMember = (newMemberData: Omit<CommunityMember, 'id'>) => {
    const newId = `m_${Date.now()}`;
    const newMember: CommunityMember = {
      ...newMemberData,
      id: newId
    };
    const updatedMembers = [...community.members, newMember];
    updateCommunity({
      members: updatedMembers,
      totalEligibleFlats: community.totalEligibleFlats + 1
    });
    addAuditLog(
      'Participant Added',
      `Invited ${newMember.ownerName} (${newMember.flatNumber}, ${newMember.tower}) with CA #${newMember.caNumber}`,
      'consent'
    );
  };

  const toggleMemberConsent = (memberId: string) => {
    const updated = community.members.map(m => {
      if (m.id === memberId) {
        const nextSigned = !m.consentSigned;
        return {
          ...m,
          consentSigned: nextSigned,
          status: (nextSigned ? 'signed_deposited' : 'pending_invite') as CommunityMember['status']
        };
      }
      return m;
    });
    updateCommunity({ members: updated });
  };

  const signUserConsent = () => {
    updateCurrentUser({
      consentSigned: true,
      consentDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    });
    // Also update in community members list if matching
    const updated = community.members.map(m => {
      if (m.flatNumber.includes('301')) {
        return { ...m, consentSigned: true, status: 'signed_deposited' as const };
      }
      return m;
    });
    updateCommunity({
      members: updated,
      committedMembersCount: Math.min(community.totalEligibleFlats, community.committedMembersCount + 1),
      totalCommittedInr: community.totalCommittedInr + 45000
    });
    addAuditLog(
      'Digital Member Consent Executed',
      `Rohit Rao (Flat 301) digitally signed single-point BRPL Virtual Net Metering agreement.`,
      'consent'
    );
    setIsConsentModalOpen(false);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addAuditLog = (action: string, details: string, category: AuditLogItem['category'] = 'system') => {
    const newLog: AuditLogItem = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }) + ' IST',
      actor: currentUser.name,
      action,
      details,
      category
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        updateCurrentUser,
        currentPath,
        navigateTo,
        community,
        updateCommunity,
        inviteMember,
        toggleMemberConsent,
        signUserConsent,
        isConsentModalOpen,
        setIsConsentModalOpen,
        optimisationParams,
        setOptimisationParams,
        optimisationResult,
        rerunOptimiser,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        auditLogs,
        addAuditLog,
        isSidebarOpen,
        setIsSidebarOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
