'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ComponentPreview() {
    return (
        <div className="space-y-12 p-8 bg-background-subtle min-h-full rounded-3xl">

            {/* Typography */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Typography</h2>
                <div className="space-y-4 bg-background p-8 rounded-2xl shadow-sm border border-border">
                    <h1 className="text-5xl font-display font-bold">Heading 1 (Display)</h1>
                    <h2 className="text-4xl font-display font-bold">Heading 2 (Display)</h2>
                    <h3 className="text-3xl font-display font-bold">Heading 3 (Display)</h3>
                    <p className="text-xl font-body">
                        Body text using the selected body font family. This is used for the main story content.
                        It should be readable and comfortable for long reading sessions.
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                        Small text or metadata using the body font family.
                    </p>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Buttons</h2>
                <div className="space-y-4 bg-background p-8 rounded-2xl shadow-sm border border-border">
                    <div className="flex flex-wrap gap-4">
                        <Button>Default (Primary)</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="lg">Large Button</Button>
                        <Button size="default">Default Button</Button>
                        <Button size="sm">Small Button</Button>
                        <Button size="icon" variant="outline">
                            <span className="h-4 w-4">🔍</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Cards & Inputs */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Cards & Inputs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-display text-3xl">Card Title</CardTitle>
                            <CardDescription className="font-body text-lg">Card Description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email" className="font-display text-sm font-semibold">Email</Label>
                                <Input type="email" id="email" placeholder="Email" className="font-display text-sm" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Action</Button>
                        </CardFooter>
                    </Card>

                    <div className="space-y-4">
                        <div className="choice-button group cursor-pointer">
                            <span className="font-display font-bold">Choice Button</span>
                            <p className="font-body text-sm text-text-secondary mt-1">Hover me to see the effect</p>
                        </div>

                        <div className="bg-background p-6 rounded-2xl border-2 border-accent shadow-sm">
                            <h3 className="font-display text-accent mb-2 font-bold">Active State Card</h3>
                            <p className="font-body">This card demonstrates the accent color usage in borders and text.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quiz Component */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Quiz Component</h2>
                <div className="bg-background p-8 rounded-2xl shadow-sm border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        {[
                            { id: '1', text: 'Follow the river upstream' },
                            { id: '2', text: 'Take the forest path' },
                            { id: '3', text: 'Climb the mountain trail' },
                            { id: '4', text: 'Rest at the village inn' },
                        ].map((choice, index) => (
                            <div
                                key={choice.id}
                                className="relative p-4 rounded-xl border-2 border-border bg-background hover:border-accent hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[100px] cursor-pointer active:scale-95"
                            >
                                {/* Number Circle */}
                                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                                    <span className="text-sm font-display font-bold text-text-primary">
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Choice Text */}
                                <p className="font-display font-bold text-lg leading-snug px-2">
                                    {choice.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Page Component */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Story Page</h2>
                <div className="bg-background p-8 rounded-2xl shadow-sm border border-border">
                    <div className="max-w-reading mx-auto">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-balance">
                            The Ancient Library
                        </h1>

                        {/* Story Content */}
                        <div className="story-content whitespace-pre-line mb-8">
                            The massive wooden doors swing open with a groan, revealing rows upon rows of towering bookshelves. Dust motes dance in the shafts of sunlight streaming through stained glass windows. The air smells of old parchment and forgotten knowledge.

                            You notice a peculiar book lying open on a nearby table, its pages glowing with a faint blue light.
                        </div>

                        {/* Items Display */}
                        <div className="p-5 bg-blue/5 border-2 border-blue rounded-2xl">
                            <p className="font-display font-semibold text-base text-text-primary">
                                📦 <strong>Item acquired:</strong> Ancient Map
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Educational Challenge - Question */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Spelling Challenge</h2>
                <div className="bg-background p-8 rounded-2xl shadow-sm border border-border">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div>
                            <p className="text-sm font-display font-semibold text-text-secondary mb-2">SPELL THE WORD</p>
                            <h2 className="text-3xl font-display font-bold mb-6">Adventure</h2>
                        </div>

                        <div className="space-y-3">
                            {['Adventure', 'Adventur', 'Advbenture', 'Adventrue'].map((option, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left px-6 py-4 rounded-xl border-2 border-border hover:border-accent bg-background transition-all font-display font-semibold text-lg"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Educational Challenge - Correct Answer */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Correct Answer Feedback</h2>
                <div className="bg-accent/10 p-8 rounded-2xl shadow-sm border-2 border-accent">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="text-6xl mb-4">✓</div>
                        <h2 className="text-4xl font-display font-bold text-accent">Correct!</h2>
                        <p className="text-lg text-text-primary">
                            Well done! <strong>Adventure</strong> is spelled correctly.
                        </p>
                        <Button className="mt-6">Continue</Button>
                    </div>
                </div>
            </section>

            {/* Educational Challenge - Incorrect Answer */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Incorrect Answer Feedback</h2>
                <div className="bg-destructive/10 p-8 rounded-2xl shadow-sm border-2 border-destructive">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="text-6xl mb-4">✗</div>
                        <h2 className="text-4xl font-display font-bold text-destructive">Not quite!</h2>
                        <p className="text-lg text-text-primary">
                            The correct spelling is <strong>Adventure</strong>.
                        </p>
                        <p className="text-sm text-text-secondary">
                            Try to remember: It ends with "-ture" not "-tur"
                        </p>
                        <Button variant="secondary" className="mt-6">Try Again</Button>
                    </div>
                </div>
            </section>

            {/* Color Palette Preview */}
            <section className="space-y-6">
                <h2 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-4">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { name: 'Primary', var: 'bg-primary', text: 'text-primary-foreground' },
                        { name: 'Secondary', var: 'bg-secondary', text: 'text-secondary-foreground' },
                        { name: 'Accent', var: 'bg-accent', text: 'text-accent-foreground' },
                        { name: 'Destructive', var: 'bg-destructive', text: 'text-destructive-foreground' },
                        { name: 'Muted', var: 'bg-muted', text: 'text-muted-foreground' },
                        { name: 'Card', var: 'bg-card', text: 'text-card-foreground border' },
                        { name: 'Background', var: 'bg-background', text: 'text-foreground border' },
                        { name: 'Purple', var: 'bg-purple', text: 'text-white' },
                        { name: 'Blue', var: 'bg-blue', text: 'text-black' },
                        { name: 'Yellow', var: 'bg-yellow', text: 'text-black' },
                    ].map((color) => (
                        <div key={color.name} className={`${color.var} ${color.text} p-4 rounded-xl flex items-center justify-center font-bold shadow-sm h-24 text-center`}>
                            {color.name}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
