import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Uloom, Ilm, Matn } from '@/data/mockData';

export interface DiagnosticResult {
  ilmId: string;
  matnResults: {
    matnId: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    skipEligible: boolean;
    userWantsToSkip: boolean;
  }[];
  overallScore: number;
}

export interface ManhadjEntry {
  uloomId: string;
  ilmId: string;
  matnId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

interface OnboardingState {
  currentStep: number;
  selectedUloom: string[];
  claimedMasteredIlms: string[];
  diagnosticResults: DiagnosticResult[];
  manhaj: ManhadjEntry[];
  completedOnboarding: boolean;
}

interface OnboardingContextType {
  state: OnboardingState;
  setCurrentStep: (step: number) => void;
  selectUloom: (uloomIds: string[]) => void;
  claimMasteredIlms: (ilmIds: string[]) => void;
  addDiagnosticResult: (result: DiagnosticResult) => void;
  updateSkipDecision: (ilmId: string, matnId: string, skip: boolean) => void;
  generateManhaj: () => void;
  resetOnboarding: () => void;
  startStudyingMatn: (matnId: string) => void;
  completeMatn: (matnId: string) => void;
  studySkippedMatn: (matnId: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  currentStep: 0,
  selectedUloom: [],
  claimedMasteredIlms: [],
  diagnosticResults: [],
  manhaj: [],
  completedOnboarding: false,
};

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const selectUloom = (uloomIds: string[]) => {
    setState(prev => ({ ...prev, selectedUloom: uloomIds }));
  };

  const claimMasteredIlms = (ilmIds: string[]) => {
    setState(prev => ({ ...prev, claimedMasteredIlms: ilmIds }));
  };

  const addDiagnosticResult = (result: DiagnosticResult) => {
    setState(prev => ({
      ...prev,
      diagnosticResults: [...prev.diagnosticResults.filter(r => r.ilmId !== result.ilmId), result]
    }));
  };

  const updateSkipDecision = (ilmId: string, matnId: string, skip: boolean) => {
    setState(prev => ({
      ...prev,
      diagnosticResults: prev.diagnosticResults.map(result => {
        if (result.ilmId === ilmId) {
          return {
            ...result,
            matnResults: result.matnResults.map(mr => 
              mr.matnId === matnId ? { ...mr, userWantsToSkip: skip } : mr
            )
          };
        }
        return result;
      })
    }));
  };

  const generateManhaj = () => {
    const manhaj: ManhadjEntry[] = [];
    const { selectedUloom, diagnosticResults } = state;

    // Import uloomData dynamically to avoid circular dependency
    import('@/data/mockData').then(({ uloomData }) => {
      selectedUloom.forEach(uloomId => {
        const uloom = uloomData.find(u => u.id === uloomId);
        if (!uloom) return;

        uloom.ilms.forEach(ilm => {
          const diagResult = diagnosticResults.find(r => r.ilmId === ilm.id);

          ilm.matns.forEach(matn => {
            let status: 'pending' | 'skipped' = 'pending';

            if (diagResult) {
              const matnResult = diagResult.matnResults.find(mr => mr.matnId === matn.id);
              if (matnResult?.skipEligible && matnResult?.userWantsToSkip) {
                status = 'skipped';
              }
            }

            manhaj.push({
              uloomId,
              ilmId: ilm.id,
              matnId: matn.id,
              status
            });
          });
        });
      });

      setState(prev => ({
        ...prev,
        manhaj,
        completedOnboarding: true
      }));
    });
  };

  const resetOnboarding = () => {
    setState(prev => ({
      ...initialState,
      manhaj: prev.manhaj, // Keep existing manhaj
      completedOnboarding: prev.completedOnboarding
    }));
  };

  const startStudyingMatn = (matnId: string) => {
    setState(prev => ({
      ...prev,
      manhaj: prev.manhaj.map(entry =>
        entry.matnId === matnId ? { ...entry, status: 'in_progress' } : entry
      )
    }));
  };

  const completeMatn = (matnId: string) => {
    setState(prev => ({
      ...prev,
      manhaj: prev.manhaj.map(entry =>
        entry.matnId === matnId ? { ...entry, status: 'completed' } : entry
      )
    }));
  };

  const studySkippedMatn = (matnId: string) => {
    setState(prev => ({
      ...prev,
      manhaj: prev.manhaj.map(entry =>
        entry.matnId === matnId && entry.status === 'skipped' 
          ? { ...entry, status: 'in_progress' } 
          : entry
      )
    }));
  };

  return (
    <OnboardingContext.Provider value={{
      state,
      setCurrentStep,
      selectUloom,
      claimMasteredIlms,
      addDiagnosticResult,
      updateSkipDecision,
      generateManhaj,
      resetOnboarding,
      startStudyingMatn,
      completeMatn,
      studySkippedMatn
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
