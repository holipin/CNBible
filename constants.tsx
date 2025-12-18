
import { BibleBook } from './types';

export const BIBLE_BOOKS: BibleBook[] = [
  {
    id: 'genesis',
    name: '创世记',
    englishName: 'Genesis',
    description: '起初，神创造天地。',
    imageUrl: './assets/images/genesis.jpg',
    suggestedWords: [
      { text: '创', id: '01' },
      { text: '造', id: '02' },
      { text: '船', id: '03' },
      { text: '灵', id: '04' },
      { text: '禁', id: '05' },
      { text: '婪', id: '06' },
      { text: '义', id: '07' },
      { text: '福', id: '08' }
    ]
  },
  {
    id: 'exodus',
    name: '出埃及记',
    englishName: 'Exodus',
    description: '耶和华的军队从埃及地出来了。',
    imageUrl: './assets/images/exodus.jpg',
    suggestedWords: [
      { text: '出', id: '01' },
      { text: '赎', id: '02' },
      { text: '律', id: '03' },
      { text: '圣', id: '04' },
      { text: '光', id: '05' },
      { text: '血', id: '06' },
      { text: '羔', id: '07' },
      { text: '道', id: '08' }
    ]
  },
  {
    id: 'leviticus',
    name: '利未记',
    englishName: 'Leviticus',
    description: '你们要圣洁，因为我是圣洁的。',
    imageUrl: './assets/images/leviticus.jpg',
    suggestedWords: [
      { text: '献', id: '01' },
      { text: '祭', id: '02' },
      { text: '洁', id: '03' },
      { text: '膏', id: '04' },
      { text: '罪', id: '05' },
      { text: '赦', id: '06' },
      { text: '爱', id: '07' },
      { text: '法', id: '08' }
    ]
  },
  {
    id: 'psalms',
    name: '诗篇',
    englishName: 'Psalms',
    description: '耶和华是我的牧者，我必不至缺乏。',
    imageUrl: './assets/images/psalms.jpg',
    suggestedWords: [
      { text: '赞', id: '01' },
      { text: '美', id: '02' },
      { text: '乐', id: '03' },
      { text: '心', id: '04' },
      { text: '咏', id: '05' },
      { text: '泉', id: '06' },
      { text: '盾', id: '07' },
      { text: '磐', id: '08' }
    ]
  },
  {
    id: 'proverbs',
    name: '箴言',
    englishName: 'Proverbs',
    description: '敬畏耶和华是智慧的开端。',
    imageUrl: './assets/images/proverbs.jpg',
    suggestedWords: [
      { text: '智', id: '01' },
      { text: '慧', id: '02' },
      { text: '言', id: '03' },
      { text: '训', id: '04' },
      { text: '明', id: '05' },
      { text: '哲', id: '06' },
      { text: '守', id: '07' },
      { text: '德', id: '08' }
    ]
  },
  {
    id: 'gospels',
    name: '福音书',
    englishName: 'Gospels',
    description: '神爱世人，甚至将他的独生子赐给他们。',
    imageUrl: './assets/images/gospels.jpg',
    suggestedWords: [
      { text: '爱', id: '01' },
      { text: '信', id: '02' },
      { text: '救', id: '03' },
      { text: '恩', id: '04' },
      { text: '活', id: '05' },
      { text: '路', id: '06' },
      { text: '真', id: '07' },
      { text: '理', id: '08' }
    ]
  },
  {
    id: 'revelation',
    name: '启示录',
    englishName: 'Revelation',
    description: '看哪，我必快来！',
    imageUrl: './assets/images/revelation.jpg',
    suggestedWords: [
      { text: '启', id: '01' },
      { text: '新', id: '02' },
      { text: '城', id: '03' },
      { text: '宝', id: '04' },
      { text: '座', id: '05' },
      { text: '胜', id: '06' },
      { text: '王', id: '07' },
      { text: '荣', id: '08' }
    ]
  }
];
