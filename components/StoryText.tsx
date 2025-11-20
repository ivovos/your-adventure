'use client';

import VocabWord from './VocabWord';

// Dictionary of difficult 11+ words with their definitions
const vocab: Record<string, string> = {
  'incarnate': 'In human or physical form; embodied',
  'defying': 'Openly refusing to obey or resist',
  'hostile': 'Unfriendly or aggressive',
  'iconic': 'Widely recognized and well-established; representing something important',
  'corrupted': 'Changed from good to bad; damaged or made impure',
  'fragmented': 'Broken into small pieces or parts',
  'infinite': 'Without limits; endless',
  'materializes': 'Appears suddenly or becomes visible',
  'polygonal': 'Having many straight sides and angles',
  'distorted': 'Pulled or twisted out of shape; not accurate or true',
  'succession': 'A number of things or events that follow one another',
  'artifacts': 'Objects made by humans, often of historical interest',
  'unnatural': 'Not normal or natural; strange',
  'vanishes': 'Disappears suddenly',
  'critical': 'Extremely important or serious',
  'unstable': 'Not steady or secure; likely to change',
  'activate': 'Make something start working',
  'access': 'The ability or right to use or see something',
};

interface StoryTextProps {
  content: string;
}

export default function StoryText({ content }: StoryTextProps) {
  // Process the content and identify vocab words
  const renderContent = () => {
    const words = content.split(/(\s+|[.,!?;:])/); // Split but keep delimiters

    return words.map((word, index) => {
      // Clean the word for matching (remove punctuation for lookup)
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');

      // Check if this is a vocabulary word
      if (vocab[cleanWord]) {
        return (
          <VocabWord
            key={index}
            word={word}
            definition={vocab[cleanWord]}
          />
        );
      }

      // Return regular text
      return word;
    });
  };

  return <>{renderContent()}</>;
}
