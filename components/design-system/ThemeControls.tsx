'use client';

import { useDesignSystemStore, TYPOGRAPHY_PRESETS, TypographyPreset, TypographyPresetConfig } from '@/lib/stores/design-system';
import { cn } from '@/lib/utils';

export default function ThemeControls() {
    const { colors, fonts, borderRadius, typographyPreset, setColors, setFonts, setBorderRadius, setTypographyPreset, reset } = useDesignSystemStore();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold">Theme Controls</h2>
                <button
                    onClick={reset}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                    Reset to Default
                </button>
            </div>

            <div className="space-y-8">
                {/* Colors Section */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Colors</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {Object.entries(colors).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-background-subtle rounded-xl border border-border">
                                <label className="text-sm font-medium text-text-secondary capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-text-secondary uppercase">{value}</span>
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-border ring-2 ring-transparent hover:ring-accent transition-all">
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => setColors({ [key]: e.target.value })}
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Typography Presets Section */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Typography</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {(Object.entries(TYPOGRAPHY_PRESETS) as [TypographyPreset, TypographyPresetConfig][]).map(([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => setTypographyPreset(key)}
                                className={cn(
                                    "text-left p-4 rounded-xl border-2 transition-all",
                                    typographyPreset === key
                                        ? "border-accent bg-accent/5"
                                        : "border-border bg-background-subtle hover:border-accent/50"
                                )}
                            >
                                <div className="font-display font-semibold text-sm mb-1">{preset.name}</div>
                                <div className="text-xs text-text-secondary">{preset.vibe}</div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Font Customization (Advanced) */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Typography</h3>
                    <div className="space-y-4">
                        {Object.entries(fonts).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">
                                    {key} Font Family
                                </label>
                                <textarea
                                    value={value}
                                    onChange={(e) => setFonts({ [key]: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border rounded-md h-20 font-mono"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Border Radius Section */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Border Radius</h3>
                    <div className="space-y-4">
                        {Object.entries(borderRadius).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 uppercase">
                                    {key}
                                </label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setBorderRadius({ [key]: e.target.value })}
                                    className="w-32 px-2 py-1 text-sm border rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
