// hooks/useDemoMode.ts - Novo hook para gerenciar modo demo
import { useState, useCallback } from 'react';

export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const startDemo = useCallback(() => {
    setIsDemoMode(true);
    setDemoCompleted(false);
    setShowDemoModal(false);
  }, []);

  const completDemo = useCallback(() => {
    setDemoCompleted(true);
    setShowDemoModal(true);
  }, []);

  const exitDemo = useCallback(() => {
    setIsDemoMode(false);
    setDemoCompleted(false);
    setShowDemoModal(false);
  }, []);

  const closeDemoModal = useCallback(() => {
    setShowDemoModal(false);
  }, []);

  return {
    isDemoMode,
    demoCompleted,
    showDemoModal,
    startDemo,
    completDemo,
    exitDemo,
    closeDemoModal
  };
};
