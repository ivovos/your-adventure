'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CHARACTERS, QUESTS, WORLDS, StoryBuilderState } from '@/lib/story-builder-types';
import { BuilderCard } from '@/components/BuilderCard';
import { useStoryStore } from '@/lib/store';
import Link from 'next/link';

export default function CreateStoryPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selections, setSelections] = useState<Partial<StoryBuilderState>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generationProgress, setGenerationProgress] = useState<string>('');
    const router = useRouter();

    const addGeneratedWorld = useStoryStore((state) => state.addGeneratedWorld);
    const setCurrentWorld = useStoryStore((state) => state.setCurrentWorld);

    const handleSelect = (key: keyof StoryBuilderState, value: any) => {
        setSelections(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (step < 3) setStep(prev => (prev + 1) as any);
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => (prev - 1) as any);
    };

    const handleGenerate = async () => {
        if (selections.character && selections.quest && selections.world) {
            setIsGenerating(true);
            setError(null);
            setGenerationProgress('Selecting vocabulary words...');

            try {
                // Simulate progress updates
                setTimeout(() => setGenerationProgress('Crafting your unique adventure...'), 1000);
                setTimeout(() => setGenerationProgress('Adding educational challenges...'), 3000);

                const response = await fetch('/api/generate-story', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selections),
                });

                const data = await response.json();

                if (!response.ok) {
                    // Handle specific error cases
                    if (response.status === 503) {
                        throw new Error(
                            'Story generation is not configured yet. Please add your Anthropic API key to .env.local\n\n' +
                            'Get your API key from: https://console.anthropic.com/'
                        );
                    }
                    throw new Error(data.details || data.error || 'Failed to generate story');
                }

                setGenerationProgress('Finalizing your story...');

                const storyData = data.story;
                const worldId = `generated-${Date.now()}`;

                // Create a new World object with gradient based on world type
                const gradients: Record<string, string> = {
                    'cyber': 'from-purple-500 to-blue-500',
                    'forest': 'from-green-500 to-emerald-700',
                    'space': 'from-indigo-500 to-purple-700',
                    'underwater': 'from-blue-500 to-cyan-600',
                };

                const newWorld = {
                    id: worldId,
                    title: storyData.title,
                    description: storyData.description,
                    emoji: selections.world!.image,
                    coverColor: gradients[selections.world!.id] || 'from-purple-500 to-blue-500',
                    coverGradient: gradients[selections.world!.id] || 'from-purple-500 to-blue-500',
                    coverImage: data.imageUrl,
                    locked: false,
                    storyData: storyData
                };

                // Save to store
                addGeneratedWorld(newWorld);
                setCurrentWorld(worldId);

                // Success! Redirect to story page
                setGenerationProgress('Success! Starting your adventure...');
                setTimeout(() => {
                    router.push('/story');
                }, 500);

            } catch (error: any) {
                console.error('Error generating story:', error);
                setError(error.message || 'An unexpected error occurred. Please try again.');
                setGenerationProgress('');
            } finally {
                setIsGenerating(false);
            }
        }
    };

    return (
        <main className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black mb-4 inline-block">← Back to Home</Link>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Build Your Adventure</h1>
                    <p className="text-xl text-gray-600">Step {step} of 3</p>
                </header>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-12">
                    <div className="bg-accent h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

                <div className="min-h-[400px]">
                    {step === 1 && (
                        <div className="fade-in">
                            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Hero</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {CHARACTERS.map(char => (
                                    <BuilderCard
                                        key={char.id}
                                        option={char}
                                        selected={selections.character?.id === char.id}
                                        onClick={() => handleSelect('character', char)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="fade-in">
                            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Quest</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {QUESTS.map(quest => (
                                    <BuilderCard
                                        key={quest.id}
                                        option={quest}
                                        selected={selections.quest?.id === quest.id}
                                        onClick={() => handleSelect('quest', quest)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="fade-in">
                            <h2 className="text-3xl font-bold text-center mb-8">Choose Your World</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {WORLDS.map(world => (
                                    <BuilderCard
                                        key={world.id}
                                        option={world}
                                        selected={selections.world?.id === world.id}
                                        onClick={() => handleSelect('world', world)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="my-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-red-900 mb-2">Error Generating Story</h3>
                                <p className="text-red-700 whitespace-pre-line text-sm">{error}</p>
                                <button
                                    onClick={() => setError(null)}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Generation Progress */}
                {isGenerating && generationProgress && (
                    <div className="my-8 p-6 bg-accent/10 border-2 border-accent rounded-2xl">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl animate-spin">✨</span>
                            <div className="flex-1">
                                <p className="text-lg font-medium text-gray-900">{generationProgress}</p>
                                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-12">
                    <button
                        onClick={handleBack}
                        disabled={step === 1 || isGenerating}
                        className={`px-8 py-4 rounded-2xl font-bold text-lg transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                    >
                        Back
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !selections.character) ||
                                (step === 2 && !selections.quest)
                            }
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={!selections.world || isGenerating}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <span className="animate-spin">✨</span> Generating...
                                </>
                            ) : (
                                'Generate Story ✨'
                            )}
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
