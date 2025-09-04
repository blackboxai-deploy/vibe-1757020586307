'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { useMixerStore } from '@/store/mixer-store';

interface MaterialProviderProps {
  children: ReactNode;
}

export function MaterialProvider({ children }: MaterialProviderProps) {
  const { ui } = useMixerStore();

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={ui.theme}
      enableSystem={ui.theme === 'auto'}
      themes={['light', 'dark', 'auto']}
      storageKey="ui24r-theme"
    >
      <div className="material-design-3">
        {children}
      </div>
    </ThemeProvider>
  );
}