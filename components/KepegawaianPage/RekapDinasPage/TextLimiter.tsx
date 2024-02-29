import React from 'react';

interface TextLimiterProps {
  text: string;
  limit: number;
  key: number;
}

const TextLimiter: React.FC<TextLimiterProps> = (props: TextLimiterProps) => {
  const [showFullText, setShowFullText] = React.useState<{ [key: number]: boolean }>({});

  const { text, limit, key } = props;
  const words = text.split(/\s+/);
  const limitedWords = showFullText[key] ? words : words.slice(0, limit);

  const toggleText = (id: number) => {
    setShowFullText(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      {limitedWords.join(' ')}{' '}
      {text.split(' ').length > limit && (
        <button onClick={() => toggleText(key)} className="text-indigo-600">
          {showFullText[key] ? 'hide' : 'more'}
        </button>
      )}
    </>
  );
};

export default TextLimiter;
