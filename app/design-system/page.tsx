'use client';

import { useState } from 'react';
import ThemeControls from '@/components/design-system/ThemeControls';
import ComponentPreview from '@/components/design-system/ComponentPreview';
import { cn } from '@/lib/utils';

type Tab = 'theme' | 'components';

export default function DesignSystemPage() {
    const [activeTab, setActiveTab] = useState<Tab>('theme');

    return (
        <main className="min-h-screen bg-background p-4 md:p-8 transition-colors duration-300">
            <header className="mb-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold mb-2">Design System</h1>
                    <p className="text-text-secondary text-lg">
                        Manage your application&apos;s theme and components.
                    </p>
                </div>

                <div className="flex p-1 bg-muted rounded-xl">
                    <button
                        onClick={() => setActiveTab('theme')}
                        className={cn(
                            "px-6 py-2 rounded-lg font-display font-semibold transition-all duration-200",
                            activeTab === 'theme'
                                ? "bg-background shadow-sm text-text-primary"
                                : "text-text-secondary hover:text-text-primary"
                        )}
                    >
                        Theme
                    </button>
                    <button
                        onClick={() => setActiveTab('components')}
                        className={cn(
                            "px-6 py-2 rounded-lg font-display font-semibold transition-all duration-200",
                            activeTab === 'components'
                                ? "bg-background shadow-sm text-text-primary"
                                : "text-text-secondary hover:text-text-primary"
                        )}
                    >
                        Components
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto">
                {activeTab === 'theme' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
                        {/* Controls Sidebar */}
                        <div className="lg:col-span-4 h-full overflow-y-auto pr-2">
                            <ThemeControls />
                        </div>

                        {/* Preview Area */}
                        <div className="lg:col-span-8 h-full overflow-y-auto rounded-3xl border border-border bg-background-subtle p-6">
                            <ComponentPreview />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <ComponentPreview />
                    </div>
                )}
            </div>
        </main>
    );
}
