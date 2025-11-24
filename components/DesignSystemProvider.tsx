'use client';

import { useEffect } from 'react';
import { useDesignSystemStore, TYPOGRAPHY_PRESETS } from '@/lib/stores/design-system';

export default function DesignSystemProvider() {
    const { colors, fonts, borderRadius, typographyPreset } = useDesignSystemStore();

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

    // Apply Typography Preset
    useEffect(() => {
        const root = document.documentElement;
        const preset = TYPOGRAPHY_PRESETS[typographyPreset];

        // Apply font families
        root.style.setProperty('--font-body', preset.body);
        root.style.setProperty('--font-display', preset.display);

        // Apply font-variation-settings for headings
        if (preset.displaySettings) {
            root.style.setProperty('--font-display-settings', preset.displaySettings);
        } else {
            root.style.removeProperty('--font-display-settings');
        }

        // Apply font-variation-settings for body
        if (preset.bodySettings) {
            root.style.setProperty('--font-body-settings', preset.bodySettings);
        } else {
            root.style.removeProperty('--font-body-settings');
        }
    }, [typographyPreset]);

    return null;
}
