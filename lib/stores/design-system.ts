import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontOption = 'bricolage' | 'atkinson' | 'fraunces' | 'general-sans' | 'cabinet' | 'literata' | 'instrument' | 'source-sans';

export const FONT_OPTIONS: Record<FontOption, { name: string; variable: string }> = {
    'bricolage': { name: 'Bricolage Grotesque', variable: 'var(--font-bricolage)' },
    'atkinson': { name: 'Atkinson Hyperlegible', variable: 'var(--font-atkinson)' },
    'fraunces': { name: 'Fraunces', variable: 'var(--font-fraunces)' },
    'general-sans': { name: 'General Sans', variable: 'var(--font-general-sans)' },
    'cabinet': { name: 'Cabinet Grotesk', variable: 'var(--font-cabinet)' },
    'literata': { name: 'Literata', variable: 'var(--font-literata)' },
    'instrument': { name: 'Instrument Serif', variable: 'var(--font-instrument)' },
    'source-sans': { name: 'Source Sans 3', variable: 'var(--font-source-sans)' },
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
    displayFont: FontOption;
    bodyFont: FontOption;
    setColors: (colors: Partial<DesignSystemState['colors']>) => void;
    setFonts: (fonts: Partial<DesignSystemState['fonts']>) => void;
    setBorderRadius: (radius: Partial<DesignSystemState['borderRadius']>) => void;
    setDisplayFont: (font: FontOption) => void;
    setBodyFont: (font: FontOption) => void;
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
    displayFont: 'cabinet' as FontOption,
    bodyFont: 'atkinson' as FontOption,
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
            setDisplayFont: (font) =>
                set(() => ({
                    displayFont: font,
                })),
            setBodyFont: (font) =>
                set(() => ({
                    bodyFont: font,
                })),
            reset: () => set(defaultState),
        }),
        {
            name: 'design-system-storage',
        }
    )
);
