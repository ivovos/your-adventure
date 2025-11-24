import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TypographyPreset = 'bricolage-atkinson' | 'fraunces-general' | 'cabinet-literata' | 'cabinet-atkinson' | 'instrument-source' | 'fraunces-only' | 'cabinet-only';

export interface TypographyPresetConfig {
    name: string;
    vibe: string;
    display: string;
    body: string;
    displaySettings?: string;
    bodySettings?: string;
}

export const TYPOGRAPHY_PRESETS: Record<TypographyPreset, TypographyPresetConfig> = {
    'bricolage-atkinson': {
        name: 'Bricolage + Atkinson',
        vibe: 'Playful meets functional',
        display: 'var(--font-bricolage)',
        body: 'var(--font-atkinson)',
    },
    'fraunces-general': {
        name: 'Fraunces + General Sans',
        vibe: 'Characterful serif with clean sans',
        display: 'var(--font-fraunces)',
        body: 'var(--font-general-sans)',
        displaySettings: "'SOFT' 100",
    },
    'cabinet-literata': {
        name: 'Cabinet Grotesk + Literata',
        vibe: 'Confident and approachable',
        display: 'var(--font-cabinet)',
        body: 'var(--font-literata)',
    },
    'cabinet-atkinson': {
        name: 'Cabinet Grotesk + Atkinson',
        vibe: 'Modern and highly readable',
        display: 'var(--font-cabinet)',
        body: 'var(--font-atkinson)',
    },
    'instrument-source': {
        name: 'Instrument Serif + Source Sans',
        vibe: 'Sophisticated but friendly',
        display: 'var(--font-instrument)',
        body: 'var(--font-source-sans)',
    },
    'fraunces-only': {
        name: 'Fraunces Variable',
        vibe: 'Cohesive, uses variable font axis',
        display: 'var(--font-fraunces)',
        body: 'var(--font-fraunces)',
        displaySettings: "'SOFT' 100",
        bodySettings: "'SOFT' 0",
    },
    'cabinet-only': {
        name: 'Cabinet Grotesk Only',
        vibe: 'Unified, confident',
        display: 'var(--font-cabinet)',
        body: 'var(--font-cabinet)',
    },
};

export interface DesignSystemState {
    colors: {
        textPrimary: string;
        textSecondary: string;
        background: string;
        backgroundSubtle: string;
        accent: string;
        accentHover: string;
        accentDark: string;
        blue: string;
    };
    fonts: {
        serif: string;
        sans: string;
        display: string;
    };
    borderRadius: {
        xl: string;
        '2xl': string;
        '3xl': string;
    };
    typographyPreset: TypographyPreset;
    setColors: (colors: Partial<DesignSystemState['colors']>) => void;
    setFonts: (fonts: Partial<DesignSystemState['fonts']>) => void;
    setBorderRadius: (radius: Partial<DesignSystemState['borderRadius']>) => void;
    setTypographyPreset: (preset: TypographyPreset) => void;
    reset: () => void;
}

const defaultState = {
    colors: {
        textPrimary: '#000000',
        textSecondary: '#666666',
        background: '#FFFFFF',
        backgroundSubtle: '#F7F7F7',
        accent: '#00D632',
        accentHover: '#00BD2A',
        accentDark: '#00A023',
        blue: '#00D5FF',
    },
    fonts: {
        serif: "'Charter', 'Iowan Old Style', 'Georgia', 'serif'",
        sans: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'sans-serif'",
        display: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'",
    },
    borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
    },
    typographyPreset: 'cabinet-literata' as TypographyPreset,
};

export const useDesignSystemStore = create<DesignSystemState>()(
    persist(
        (set) => ({
            ...defaultState,
            setColors: (colors) =>
                set((state) => ({
                    colors: { ...state.colors, ...colors },
                })),
            setFonts: (fonts) =>
                set((state) => ({
                    fonts: { ...state.fonts, ...fonts },
                })),
            setBorderRadius: (radius) =>
                set((state) => ({
                    borderRadius: { ...state.borderRadius, ...radius },
                })),
            setTypographyPreset: (preset) =>
                set(() => ({
                    typographyPreset: preset,
                })),
            reset: () => set(defaultState),
        }),
        {
            name: 'design-system-storage',
        }
    )
);
