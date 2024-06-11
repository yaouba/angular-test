export interface IBook {
  key?: string;
  userId?: string;
  title: string;
  author: string;
  date: string;
  tags: string;
  comment?: string;
  note?: string;
  imageUrl?: string
}