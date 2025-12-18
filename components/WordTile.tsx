
import React from 'react';
import { BibleWord } from '../types';

interface WordTileProps {
  word: BibleWord;
  onSelect: () => void;
}

const WordTile: React.FC<WordTileProps> = ({ word, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="aspect-square glass-panel rounded-3xl flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-xl hover:bg-amber-500 group transition-all duration-300 border border-amber-200"
    >
      <span className="text-5xl chinese-font text-amber-900 group-hover:text-white group-hover:scale-125 transition-all duration-300">
        {word.text}
      </span>
      <div className="w-6 h-0.5 bg-amber-200 group-hover:bg-amber-300 rounded-full"></div>
    </button>
  );
};

export default WordTile;
