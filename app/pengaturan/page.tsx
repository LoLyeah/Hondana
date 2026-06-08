'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import versionData from '../../data/version.json';

// Settings sub-components
import PwaInstallSection from '../../components/settings/PwaInstallSection';
import AiConfigSection from '../../components/settings/AiConfigSection';
import CacheSection from '../../components/settings/CacheSection';
import QuizSettingsSection from '../../components/settings/QuizSettingsSection';
import AccountSection from '../../components/settings/AccountSection';
import ContentWrapper from '../../components/ContentWrapper';

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
  }
};

export default function Pengaturan() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header title="Pengaturan" />
        <ContentWrapper hasSidebar className="flex-1 flex flex-col gap-6 min-h-[60vh] opacity-60">
          <LoadingSkeleton type="settings" />
        </ContentWrapper>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header title="Pengaturan" />

      <ContentWrapper hasSidebar noPadding>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col gap-6 px-4 py-6"
        >
          <PwaInstallSection />
          <AiConfigSection />
          <CacheSection />
          <QuizSettingsSection />
          <AccountSection />

          {/* About App Info */}
          <motion.section variants={itemVariants} className="flex flex-col items-center gap-1 mt-4 text-center select-none">
            <span className="text-xs font-black tracking-widest text-text-secondary/50">HONDANA V{versionData.version}</span>
            <span className="text-[10px] font-bold text-text-secondary/30">DEVELOPED BY {versionData.developedBy}</span>
          </motion.section>
        </motion.div>
      </ContentWrapper>

      <BottomNav />
    </>
  );
}
