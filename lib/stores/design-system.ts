import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DesignSystemState {
    colors: {
        textPrimary: string;
        textSecondary: string;
        background: string;
        backgroundSubtle: string;
        accent: string;
        accentHover: string;
        accentDark: string;
        purple: string;
        blue: string;
        yellow: string;
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
    setColors: (colors: Partial<DesignSystemState['colors']>) => void;
    setFonts: (fonts: Partial<DesignSystemState['fonts']>) => void;
    setBorderRadius: (radius: Partial<DesignSystemState['borderRadius']>) => void;
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
        purple: '#A259FF',
        blue: '#00D5FF',
        yellow: '#FFCF00',
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
            reset: () => set(defaultState),
        }),
        {
            name: 'design-system-storage',
        }
    )
);
