
export interface BibleWord {
  text: string;
  id: string;
}

export interface BibleBook {
  id: string;
  name: string;
  englishName: string;
  description: string;
  imageUrl: string;
  suggestedWords: BibleWord[];
}

export type NavLevel = 'LV1' | 'LV2' | 'LV3';

export interface AppState {
  level: NavLevel;
  selectedBook: BibleBook | null;
  selectedWord: BibleWord | null;
}

export interface DecodingResult {
  character: string;
  pinyin: string;
  meaning: string;
  biblicalConnection: string;
  components: {
    part: string;
    meaning: string;
  }[];
}
