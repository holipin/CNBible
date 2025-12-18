
import React, { useState } from 'react';
import { AppState, BibleBook, BibleWord } from './types';
import { BIBLE_BOOKS } from './constants';
import BookCard from './components/BookCard';
import WordTile from './components/WordTile';
import WordDecoder from './components/WordDecoder';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    level: 'LV1',
    selectedBook: null,
    selectedWord: null,
  });

  const handleSelectBook = (book: BibleBook) => {
    setState({
      level: 'LV2',
      selectedBook: book,
      selectedWord: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWord = (word: BibleWord) => {
    setState(prev => ({
      ...prev,
      level: 'LV3',
      selectedWord: word,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setState(prev => {
      if (prev.level === 'LV3') return { ...prev, level: 'LV2', selectedWord: null };
      if (prev.level === 'LV2') return { ...prev, level: 'LV1', selectedBook: null };
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel shadow-sm border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="cursor-pointer flex items-center gap-3"
            onClick={() => setState({ level: 'LV1', selectedBook: null, selectedWord: null })}
          >
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
              ✝️
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-amber-900">
                圣经漢字解碼
              </h1>
              <p className="text-xs text-amber-700 font-medium">Chinese Bible Word Decoded</p>
            </div>
          </div>

          {state.level !== 'LV1' && (
            <button 
              onClick={handleBack}
              className="px-4 py-2 text-sm font-semibold text-amber-800 hover:text-amber-600 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {state.level === 'LV1' && (
          <section className="animate-in fade-in duration-700">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 chinese-font drop-shadow-lg">探索神的話語</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
                讓我們一起解读中华文明博大精深漢字結構，从而认识圣经的故事和属灵意义。
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {BIBLE_BOOKS.map(book => (
                <BookCard key={book.id} book={book} onSelect={() => handleSelectBook(book)} />
              ))}
            </div>
          </section>
        )}

        {state.level === 'LV2' && state.selectedBook && (
          <section className="animate-in slide-in-from-right duration-500">
            <div className="mb-10 text-center">
              <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md opacity-80">{state.selectedBook.englishName}</span>
              <h2 className="text-5xl font-bold text-white mt-2 mb-4 chinese-font drop-shadow-lg">{state.selectedBook.name}</h2>
              <p className="italic text-white font-medium drop-shadow-sm opacity-90">「{state.selectedBook.description}」</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {state.selectedBook.suggestedWords.map((wordObj, idx) => (
                <WordTile key={idx} word={wordObj} onSelect={() => handleSelectWord(wordObj)} />
              ))}
            </div>

            <div className="mt-16 text-center text-white/60">
               <p>選擇一個漢字，開啟屬靈的奧秘</p>
            </div>
          </section>
        )}

        {state.level === 'LV3' && state.selectedBook && state.selectedWord && (
          <WordDecoder 
            wordText={state.selectedWord.text}
            wordId={state.selectedWord.id} 
            bookName={state.selectedBook.name} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-white/60 text-sm border-t border-white/10 mt-12">
        <p>© 2025 聖書漢字解碼 | 願主的話語成為你路上的光</p>
      </footer>
    </div>
  );
};

export default App;
