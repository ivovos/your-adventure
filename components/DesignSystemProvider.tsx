'use client';

import { useEffect } from 'react';
import { useDesignSystemStore, FONT_OPTIONS } from '@/lib/stores/design-system';

export default function DesignSystemProvider() {
    const { colors, fonts, borderRadius, displayFont, bodyFont } = useDesignSystemStore();

    useEffect(() => {
        const root = document.documentElement;

        // Apply Colors
        root.style.setProperty('--color-text-primary', colors.textPrimary);
        root.style.setProperty('--color-text-secondary', colors.textSecondary);
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-background-subtle', colors.backgroundSubtle);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-accent-hover', colors.accentHover);
        root.style.setProperty('--color-accent-dark', colors.accentDark);
        root.style.setProperty('--color-accent-dark', colors.accentDark);
        root.style.setProperty('--color-blue', colors.blue);

        // Apply Fonts
        root.style.setProperty('--font-serif', fonts.serif);
        root.style.setProperty('--font-sans', fonts.sans);
        root.style.setProperty('--font-display', fonts.display);

        // Apply Border Radius
        root.style.setProperty('--radius-xl', borderRadius.xl);
        root.style.setProperty('--radius-2xl', borderRadius['2xl']);
        root.style.setProperty('--radius-3xl', borderRadius['3xl']);
    }, [colors, fonts, borderRadius]);

    // Apply Typography Selections
    useEffect(() => {
        const root = document.documentElement;

        // Apply selected fonts
        root.style.setProperty('--font-body', FONT_OPTIONS[bodyFont].variable);
        root.style.setProperty('--font-display', FONT_OPTIONS[displayFont].variable);
    }, [displayFont, bodyFont]);

    return null;
}
