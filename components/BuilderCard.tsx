import { BuilderOption } from '@/lib/story-builder-types';

interface BuilderCardProps {
    option: BuilderOption;
    selected: boolean;
    onClick: () => void;
}

export function BuilderCard({ option, selected, onClick }: BuilderCardProps) {
    return (
        <button
            onClick={onClick}
            className={`
        relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 w-full h-full
        ${selected
                    ? 'border-accent bg-accent/10 scale-105 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
      `}
        >
            <div className="text-6xl mb-4">{option.image}</div>
            <div className="font-display font-bold text-lg text-center leading-tight">{option.label}</div>
            {selected && (
                <div className="absolute top-3 right-3 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </button>
    );
}
