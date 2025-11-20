'use client';

import { motion } from 'framer-motion';

export default function ComponentPreview() {
    return (
        <div className="space-y-12 p-8 bg-background-subtle min-h-full rounded-3xl">

            {/* Typography */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Typography</h2>
                <div className="space-y-4 bg-background p-8 rounded-2xl shadow-sm">
                    <h1>Heading 1 - The quick brown fox</h1>
                    <h2>Heading 2 - Jumps over the lazy dog</h2>
                    <h3>Heading 3 - Pack my box with five dozen liquor jugs</h3>
                    <p className="text-lg text-text-primary">
                        Body Text (Large) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p className="text-base text-text-secondary">
                        Body Text (Base / Secondary) - Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4 bg-background p-8 rounded-2xl shadow-sm">
                    <button className="btn-primary">
                        Primary Action
                    </button>
                    <button className="btn-secondary">
                        Secondary Action
                    </button>
                    <button className="btn-primary opacity-50 cursor-not-allowed">
                        Disabled
                    </button>
                </div>
            </section>

            {/* Cards & Interactive Elements */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Interactive Elements</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="choice-button group cursor-pointer">
                        <span className="font-bold">Choice Button</span>
                        <p className="text-sm text-text-secondary mt-1">Hover me to see the effect</p>
                    </div>

                    <div className="bg-background p-6 rounded-2xl border-2 border-accent shadow-sm">
                        <h3 className="text-accent mb-2">Active State Card</h3>
                        <p>This card demonstrates the accent color usage in borders and text.</p>
                    </div>
                </div>
            </section>

            {/* Color Palette Preview */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { name: 'Primary', var: 'bg-text-primary', text: 'text-white' },
                        { name: 'Secondary', var: 'bg-text-secondary', text: 'text-white' },
                        { name: 'Accent', var: 'bg-accent', text: 'text-black' },
                        { name: 'Purple', var: 'bg-purple', text: 'text-white' },
                        { name: 'Blue', var: 'bg-blue', text: 'text-black' },
                        { name: 'Yellow', var: 'bg-yellow', text: 'text-black' },
                        { name: 'Background', var: 'bg-background', text: 'text-black border' },
                        { name: 'Subtle', var: 'bg-background-subtle', text: 'text-black' },
                    ].map((color) => (
                        <div key={color.name} className={`${color.var} ${color.text} p-4 rounded-xl flex items-center justify-center font-bold shadow-sm h-24`}>
                            {color.name}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
