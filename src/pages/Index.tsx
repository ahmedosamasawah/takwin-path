import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { WelcomeStep } from '@/components/onboarding/WelcomeStep';
import { SelectUloomStep } from '@/components/onboarding/SelectUloomStep';
import { SelectMasteredIlmsStep } from '@/components/onboarding/SelectMasteredIlmsStep';
import { DiagnosticOverviewStep } from '@/components/onboarding/DiagnosticOverviewStep';
import { DiagnosticExamStep } from '@/components/onboarding/DiagnosticExamStep';
import { DiagnosticResultsStep } from '@/components/onboarding/DiagnosticResultsStep';
import { ManhadjDashboard } from '@/components/manhaj/ManhadjDashboard';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { DiagnosticResult } from '@/contexts/OnboardingContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';

const ONBOARDING_STEPS = [
  'الترحيب',
  'اختيار العلوم',
  'المعرفة السابقة',
  'نظرة عامة',
  'الاختبار',
  'النتائج',
];

const Index = () => {
  const navigate = useNavigate();
  const { state, setCurrentStep, selectUloom, claimMasteredIlms, addDiagnosticResult, updateSkipDecision, generateManhaj, resetOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(!state.completedOnboarding);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleStartOnboarding = () => {
    setCurrentStep(1);
  };

  const handleSelectUloom = (uloomIds: string[]) => {
    selectUloom(uloomIds);
  };

  const handleClaimMasteredIlms = (ilmIds: string[]) => {
    claimMasteredIlms(ilmIds);
  };

  const handleDiagnosticComplete = (results: DiagnosticResult[]) => {
    results.forEach(result => addDiagnosticResult(result));
    setCurrentStep(5);
  };

  const handleSkipDiagnostics = () => {
    // No diagnostics needed, go directly to manhaj generation
    generateManhaj();
    setShowOnboarding(false);
  };

  const handleCompleteOnboarding = () => {
    generateManhaj();
    setShowOnboarding(false);
  };

  const handleAddManhaj = () => {
    resetOnboarding();
    setShowOnboarding(true);
    setCurrentStep(1);
  };

  // If onboarding is complete, show the dashboard
  if (!showOnboarding && state.completedOnboarding) {
    return <ManhadjDashboard onAddManhaj={handleAddManhaj} />;
  }

  // Render onboarding steps
  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <WelcomeStep onStart={handleStartOnboarding} />;
      
      case 1:
        return (
          <SelectUloomStep
            selectedUloom={state.selectedUloom}
            existingManhajUloom={[...new Set(state.manhaj.map(m => m.uloomId))]}
            onSelect={handleSelectUloom}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      
      case 2:
        return (
          <SelectMasteredIlmsStep
            selectedUloom={state.selectedUloom}
            claimedMasteredIlms={state.claimedMasteredIlms}
            onSelect={handleClaimMasteredIlms}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      
      case 3:
        return (
          <DiagnosticOverviewStep
            selectedUloom={state.selectedUloom}
            claimedMasteredIlms={state.claimedMasteredIlms}
            onStart={() => {
              if (state.claimedMasteredIlms.length === 0) {
                handleSkipDiagnostics();
              } else {
                setCurrentStep(4);
              }
            }}
            onBack={() => setCurrentStep(2)}
          />
        );
      
      case 4:
        return (
          <DiagnosticExamStep
            selectedUloom={state.selectedUloom}
            claimedMasteredIlms={state.claimedMasteredIlms}
            onComplete={handleDiagnosticComplete}
            onBack={() => setCurrentStep(3)}
          />
        );
      
      case 5:
        return (
          <DiagnosticResultsStep
            selectedUloom={state.selectedUloom}
            diagnosticResults={state.diagnosticResults}
            onUpdateSkipDecision={updateSkipDecision}
            onComplete={handleCompleteOnboarding}
            onBack={() => setCurrentStep(4)}
          />
        );
      
      default:
        return <WelcomeStep onStart={handleStartOnboarding} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle on welcome screen */}
      {state.currentStep === 0 && (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
          <Logo size="sm" />
          <ThemeToggle />
        </header>
      )}

      {/* Progress indicator for steps 1-5 */}
      {state.currentStep > 0 && state.currentStep < 6 && (
        <ProgressIndicator 
          steps={ONBOARDING_STEPS.slice(1)} 
          currentStep={state.currentStep - 1} 
          onGoHome={handleGoHome}
        />
      )}

      {/* Step content with padding for progress indicator */}
      <div className={state.currentStep > 0 ? 'pt-20' : ''}>
        {renderStep()}
      </div>
    </div>
  );
};

export default Index;
