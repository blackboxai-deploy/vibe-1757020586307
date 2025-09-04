/**
 * Material Design 3 Color System
 * Palette principale basée sur #6750A4 avec support thème sombre/clair
 */

// Couleur primaire Material Design 3 demandée
export const PRIMARY_HUE = '#6750A4';

// Système de couleurs Material Design 3
export const materialColors = {
  // Couleurs primaires (violet Material 3)
  primary: {
    0: '#000000',
    10: '#21005D',
    20: '#381E72',
    30: '#4F378B',
    40: '#6750A4',
    50: '#7F67BE',
    60: '#9A82DB',
    70: '#B69DF8',
    80: '#D0BCFF',
    90: '#EADDFF',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  
  // Couleurs secondaires (teintes complémentaires)
  secondary: {
    0: '#000000',
    10: '#1D192B',
    20: '#332D41',
    30: '#4A4458',
    40: '#625B71',
    50: '#7A7289',
    60: '#958DA5',
    70: '#B0A7C0',
    80: '#CCC2DC',
    90: '#E8DEF8',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  
  // Couleurs tertiaires (accents)
  tertiary: {
    0: '#000000',
    10: '#31111D',
    20: '#492532',
    30: '#633B48',
    40: '#7D5260',
    50: '#986977',
    60: '#B58392',
    70: '#D29DAC',
    80: '#EFB8C8',
    90: '#FFD8E4',
    95: '#FFECF1',
    99: '#FFFBFA',
    100: '#FFFFFF',
  },
  
  // Couleurs neutres
  neutral: {
    0: '#000000',
    10: '#1C1B1F',
    20: '#313033',
    30: '#484649',
    40: '#605D62',
    50: '#787579',
    60: '#939094',
    70: '#AEAAAE',
    80: '#CAC4D0',
    90: '#E6E0E9',
    95: '#F4EFF4',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  
  // Couleurs neutres variantes
  neutralVariant: {
    0: '#000000',
    10: '#1D1A22',
    20: '#322F37',
    30: '#49454F',
    40: '#605D66',
    50: '#787579',
    60: '#938F99',
    70: '#AEA9B4',
    80: '#CAC4D0',
    90: '#E7E0EC',
    95: '#F5EEF8',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  
  // Couleurs d'erreur (rouge Material 3)
  error: {
    0: '#000000',
    10: '#410E0B',
    20: '#601410',
    30: '#8C1D18',
    40: '#B3261E',
    50: '#DC362E',
    60: '#E46962',
    70: '#EC928E',
    80: '#F2B8B5',
    90: '#F9DEDC',
    95: '#FCEEEE',
    99: '#FFFBF9',
    100: '#FFFFFF',
  },
  
  // Couleurs de surface (arrière-plans)
  surface: {
    dim: '#E6E0E9',
    bright: '#FEF7FF',
    containerLowest: '#FFFFFF',
    containerLow: '#F7F2FA',
    container: '#F3EDF7',
    containerHigh: '#ECE6F0',
    containerHighest: '#E6E0E9',
  },
  
  // Couleurs de surface (thème sombre)
  surfaceDark: {
    dim: '#141218',
    bright: '#3B383E',
    containerLowest: '#0F0D13',
    containerLow: '#1C1B1F',
    container: '#201F23',
    containerHigh: '#2B292D',
    containerHighest: '#362F38',
  },
};

// Tokens de couleurs pour Tailwind CSS
export const tailwindMaterialColors = {
  // Mode clair
  'primary': materialColors.primary[40],
  'primary-container': materialColors.primary[90],
  'on-primary': materialColors.primary[100],
  'on-primary-container': materialColors.primary[10],
  
  'secondary': materialColors.secondary[40],
  'secondary-container': materialColors.secondary[90],
  'on-secondary': materialColors.secondary[100],
  'on-secondary-container': materialColors.secondary[10],
  
  'tertiary': materialColors.tertiary[40],
  'tertiary-container': materialColors.tertiary[90],
  'on-tertiary': materialColors.tertiary[100],
  'on-tertiary-container': materialColors.tertiary[10],
  
  'surface': materialColors.surface.bright,
  'surface-variant': materialColors.neutralVariant[90],
  'on-surface': materialColors.neutral[10],
  'on-surface-variant': materialColors.neutralVariant[30],
  
  'outline': materialColors.neutralVariant[50],
  'outline-variant': materialColors.neutralVariant[80],
  
  'error': materialColors.error[40],
  'error-container': materialColors.error[90],
  'on-error': materialColors.error[100],
  'on-error-container': materialColors.error[10],
  
  // Couleurs spécifiques pour l'interface mixer
  'mixer-bg': materialColors.surface.containerLowest,
  'fader-track': materialColors.neutralVariant[90],
  'fader-thumb': materialColors.primary[40],
  'mute-active': materialColors.error[40],
  'solo-active': '#FFB74D', // Orange Material pour solo
  'clip-indicator': '#FF5722', // Rouge vif pour clipping
  'meter-green': '#4CAF50',
  'meter-yellow': '#FFC107',
  'meter-red': '#F44336',
};

// Classes CSS custom properties pour Material Design 3
export const materialCSSVariables = `
  :root {
    /* Couleurs primaires */
    --md-sys-color-primary: ${materialColors.primary[40]};
    --md-sys-color-on-primary: ${materialColors.primary[100]};
    --md-sys-color-primary-container: ${materialColors.primary[90]};
    --md-sys-color-on-primary-container: ${materialColors.primary[10]};
    
    /* Couleurs secondaires */
    --md-sys-color-secondary: ${materialColors.secondary[40]};
    --md-sys-color-on-secondary: ${materialColors.secondary[100]};
    --md-sys-color-secondary-container: ${materialColors.secondary[90]};
    --md-sys-color-on-secondary-container: ${materialColors.secondary[10]};
    
    /* Couleurs tertiaires */
    --md-sys-color-tertiary: ${materialColors.tertiary[40]};
    --md-sys-color-on-tertiary: ${materialColors.tertiary[100]};
    --md-sys-color-tertiary-container: ${materialColors.tertiary[90]};
    --md-sys-color-on-tertiary-container: ${materialColors.tertiary[10]};
    
    /* Surfaces */
    --md-sys-color-surface: ${materialColors.surface.bright};
    --md-sys-color-surface-variant: ${materialColors.neutralVariant[90]};
    --md-sys-color-on-surface: ${materialColors.neutral[10]};
    --md-sys-color-on-surface-variant: ${materialColors.neutralVariant[30]};
    
    /* Contours */
    --md-sys-color-outline: ${materialColors.neutralVariant[50]};
    --md-sys-color-outline-variant: ${materialColors.neutralVariant[80]};
    
    /* Erreur */
    --md-sys-color-error: ${materialColors.error[40]};
    --md-sys-color-on-error: ${materialColors.error[100]};
    --md-sys-color-error-container: ${materialColors.error[90]};
    --md-sys-color-on-error-container: ${materialColors.error[10]};
    
    /* Shadow et élévation */
    --md-sys-elevation-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
    
    /* Rayons de bordure (coins arrondis Windows 11 style) */
    --md-sys-shape-corner-extra-small: 4px;
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-large: 16px;
    --md-sys-shape-corner-extra-large: 24px;
  }
  
  [data-theme="dark"] {
    /* Mode sombre - couleurs inversées */
    --md-sys-color-primary: ${materialColors.primary[80]};
    --md-sys-color-on-primary: ${materialColors.primary[20]};
    --md-sys-color-primary-container: ${materialColors.primary[30]};
    --md-sys-color-on-primary-container: ${materialColors.primary[90]};
    
    --md-sys-color-secondary: ${materialColors.secondary[80]};
    --md-sys-color-on-secondary: ${materialColors.secondary[20]};
    --md-sys-color-secondary-container: ${materialColors.secondary[30]};
    --md-sys-color-on-secondary-container: ${materialColors.secondary[90]};
    
    --md-sys-color-tertiary: ${materialColors.tertiary[80]};
    --md-sys-color-on-tertiary: ${materialColors.tertiary[20]};
    --md-sys-color-tertiary-container: ${materialColors.tertiary[30]};
    --md-sys-color-on-tertiary-container: ${materialColors.tertiary[90]};
    
    --md-sys-color-surface: ${materialColors.surfaceDark.dim};
    --md-sys-color-surface-variant: ${materialColors.neutralVariant[30]};
    --md-sys-color-on-surface: ${materialColors.neutral[90]};
    --md-sys-color-on-surface-variant: ${materialColors.neutralVariant[80]};
    
    --md-sys-color-outline: ${materialColors.neutralVariant[60]};
    --md-sys-color-outline-variant: ${materialColors.neutralVariant[30]};
    
    --md-sys-color-error: ${materialColors.error[80]};
    --md-sys-color-on-error: ${materialColors.error[20]};
    --md-sys-color-error-container: ${materialColors.error[30]};
    --md-sys-color-on-error-container: ${materialColors.error[90]};
  }
`;

// Fonction utilitaire pour obtenir une couleur Material Design 3
export function getMaterialColor(
  color: keyof typeof materialColors, 
  tone: number
): string {
  const colorPalette = materialColors[color];
  if (typeof colorPalette === 'object' && tone in colorPalette) {
    return colorPalette[tone as keyof typeof colorPalette];
  }
  return materialColors.primary[40]; // fallback
}