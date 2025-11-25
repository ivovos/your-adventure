'use client';

import { useDesignSystemStore, FONT_OPTIONS, FontOption } from '@/lib/stores/design-system';

export default function ThemeControls() {
    const { colors, borderRadius, displayFont, bodyFont, setColors, setBorderRadius, setDisplayFont, setBodyFont, reset } = useDesignSystemStore();

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

                {/* Typography Section */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Typography</h3>
                    <div className="space-y-4">
                        {/* Display Font */}
                        <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">
                                Display Font (Headings)
                            </label>
                            <select
                                value={displayFont}
                                onChange={(e) => setDisplayFont(e.target.value as FontOption)}
                                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background font-display font-semibold hover:border-accent transition-colors cursor-pointer"
                            >
                                {(Object.entries(FONT_OPTIONS) as [FontOption, { name: string }][]).map(([key, { name }]) => (
                                    <option key={key} value={key}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Body Font */}
                        <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">
                                Body Font (Content)
                            </label>
                            <select
                                value={bodyFont}
                                onChange={(e) => setBodyFont(e.target.value as FontOption)}
                                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background font-display font-semibold hover:border-accent transition-colors cursor-pointer"
                            >
                                {(Object.entries(FONT_OPTIONS) as [FontOption, { name: string }][]).map(([key, { name }]) => (
                                    <option key={key} value={key}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Border Radius Section */}
                <section>
                    <h3 className="text-lg font-display font-semibold mb-4">Border Radius</h3>
                    <div className="space-y-4">
                        {Object.entries(borderRadius).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="text-sm font-medium text-text-secondary uppercase">
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
