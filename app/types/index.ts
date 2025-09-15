export interface Habit {
  id: string;
  habitName: string;
  petName: string;
  streak: number;
  longestStreak: number;
  mood: Mood;
  category: Category;
  createdAt: number;
  lastFedAt: number;
  hatchProgress: number;
}

export interface DeadHabit extends Omit<Habit, 'lastFedAt'> {
  diedAt: number;
  longestStreak: number;
  finalMood: Mood;
}

export type Mood =
  | 'Happy'
  | 'Excited'
  | 'Neutral'
  | 'Tired'
  | 'Sad'
  | 'Angry'
  | 'Sick'
  | 'Bored';

export type Category =
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Ice'
  | 'Plant'
  | 'Spirit'
  | 'Light'
  | 'Dark'
  | 'Lightning'
  | 'Air';