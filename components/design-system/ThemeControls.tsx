'use client';

import { useDesignSystemStore } from '@/lib/stores/design-system';

export default function ThemeControls() {
    const { colors, fonts, borderRadius, setColors, setFonts, setBorderRadius, reset } = useDesignSystemStore();

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
                    <div className="space-y-4">
                        {Object.entries(colors).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setColors({ [key]: e.target.value })}
                                        className="w-24 px-2 py-1 text-sm border rounded-md"
                                    />
                                    <input
                                        type="color"
                                        value={value}
                                        onChange={(e) => setColors({ [key]: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Fonts Section */}
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
