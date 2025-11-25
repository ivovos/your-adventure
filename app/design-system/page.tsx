import ThemeControls from '@/components/design-system/ThemeControls';
import ComponentPreview from '@/components/design-system/ComponentPreview';

export default function DesignSystemPage() {
    return (
        <main className="h-screen bg-background p-4 md:p-8 transition-colors duration-300 flex flex-col overflow-hidden">
            <header className="mb-8 max-w-7xl mx-auto w-full flex-none">
                <h1 className="text-4xl font-display font-bold mb-2">Design System</h1>
                <p className="text-text-secondary text-lg">
                    Customize your application&apos;s theme and preview components.
                </p>
            </header>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
                {/* Controls Sidebar */}
                <div className="lg:col-span-4 h-full overflow-y-auto pr-2 scrollbar-hide">
                    <ThemeControls />
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8 h-full overflow-y-auto rounded-3xl border border-border bg-background-subtle p-6">
                    <ComponentPreview />
                </div>
            </div>
        </main>
    );
}
