import ThemeControls from '@/components/design-system/ThemeControls';
import ComponentPreview from '@/components/design-system/ComponentPreview';

export default function DesignSystemPage() {
    return (
        <main className="min-h-screen bg-background p-4 md:p-8">
            <header className="mb-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-2">Design System Storyboard</h1>
                <p className="text-text-secondary text-lg">
                    Live preview and configuration of the application&apos;s design tokens.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
                {/* Controls Sidebar */}
                <div className="lg:col-span-4 h-full">
                    <ThemeControls />
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8 h-full overflow-y-auto rounded-3xl border border-gray-200">
                    <ComponentPreview />
                </div>
            </div>
        </main>
    );
}
