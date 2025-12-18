
import React, { useState } from 'react';
import { BibleBook } from '../types';

interface BookCardProps {
  book: BibleBook;
  onSelect: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
  const [imgSrc, setImgSrc] = useState(book.imageUrl);

  const handleError = () => {
    // Fallback to the original seed URL if local image is not found
    setImgSrc(`https://picsum.photos/seed/${book.id}/800/600`);
  };

  return (
    <div 
      onClick={onSelect}
      className="group cursor-pointer glass-panel rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imgSrc} 
          alt={book.name} 
          onError={handleError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{book.englishName}</span>
          <h3 className="text-white text-2xl font-bold chinese-font">{book.name}</h3>
        </div>
      </div>
      <div className="p-4 bg-white/50">
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {book.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {book.suggestedWords.slice(0, 3).map((w, i) => (
            <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100 font-medium">
              {w.text}
            </span>
          ))}
          <span className="text-xs text-amber-600 font-bold ml-auto">+更多</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
