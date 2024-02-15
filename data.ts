export type Lesson = {
  id: number;
  title: string;
  content: string;
  videoLink: string;
  duration: number;
};

export type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: number;
  prerequisites: string[];
  expirationDate: Date;
  sections: Section[];
};
