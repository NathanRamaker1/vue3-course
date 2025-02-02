export interface ICard {
    id: number;
    title: string;
    description: string;
  }
  
  export interface IList {
    id: number;
    title: string;
    cards : ICard[];
  }