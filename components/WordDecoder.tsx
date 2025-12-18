
import React, { useState, useEffect } from 'react';
import { DecodingResult } from '../types';
import { fetchWordData } from '../services/wordService';
import { BIBLE_BOOKS } from '../constants';

interface WordDecoderProps {
  wordText: string;
  wordId: string;
  bookName: string;
}

const WordDecoder: React.FC<WordDecoderProps> = ({ wordText, wordId, bookName }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DecodingResult | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const book = BIBLE_BOOKS.find(b => b.name === bookName);
        const bookId = book?.id || 'general';
        
        const data = await fetchWordData(wordText, wordId, bookId, bookName);
        setResult(data);
      } catch (err) {
        setError("無法解析此漢字，請稍後再試。");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [wordText, wordId, bookName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
        <div className="w-24 h-24 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-6"></div>
        <h3 className="text-2xl text-white font-bold animate-bounce chinese-font drop-shadow-md">靈感啟示中...</h3>
        <p className="text-white/70 mt-2">正在為「{wordText}」尋求屬靈的解讀</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="text-center py-20 glass-panel rounded-3xl border border-red-100">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-lg"
        >
          重試
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in duration-700 max-w-4xl mx-auto">
      <div className="glass-panel rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-amber-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-100 rounded-full -ml-24 -mb-24 opacity-50"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full shadow-inner flex items-center justify-center border-4 border-amber-100 mb-6 group transition-transform duration-500 hover:rotate-6">
              <span className="text-8xl md:text-[10rem] chinese-font text-amber-900 drop-shadow-sm">
                {result.character}
              </span>
            </div>
            <div className="text-center">
              <span className="text-2xl text-amber-600 font-medium tracking-widest">{result.pinyin}</span>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{result.meaning}</h3>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
              <h4 className="text-amber-800 font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                字形拆解
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {result.components.map((comp, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/40 p-2 rounded-lg border border-amber-50">
                    <span className="text-2xl font-bold text-amber-900 bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow-sm border border-amber-100">
                      {comp.part}
                    </span>
                    <span className="text-slate-600 text-sm font-medium">{comp.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-amber-800 font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                聖經靈感解碼
              </h4>
              <p className="text-slate-700 leading-relaxed text-lg  whitespace-pre-line">
                {result.biblicalConnection}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-100 text-center text-slate-400 text-sm">
          <p>解碼自聖經書卷：{bookName}</p>
        </div>
      </div>
    </div>
  );
};

export default WordDecoder;
