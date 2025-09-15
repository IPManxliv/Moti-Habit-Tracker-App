import AsyncStorage from '@react-native-async-storage/async-storage';
import { HABITS_KEY, DEAD_HABITS_KEY, categories } from './storage';
import { Habit, DeadHabit, Mood, Category } from '../types/index';
import { petNames } from './storage';

export async function getHabits(): Promise<Habit[]> {
  try {
    const habitsJson = await AsyncStorage.getItem(HABITS_KEY);
    let habits = habitsJson ? JSON.parse(habitsJson) : [];
    // Validate and fix habits data
    habits = habits.map((habit: any) => ({
      id: habit.id || String(Date.now()),
      habitName: habit.habitName || 'Unnamed Habit',
      petName: habit.petName || '',
      streak: habit.streak || 0,
      longestStreak: habit.longestStreak || 0,
      mood: (habit.mood || 'Neutral') as Mood,
      createdAt: habit.createdAt || Date.now(),
      lastFedAt: habit.lastFedAt || 0,
      category: (habit.category || categories[Math.floor(Math.random() * categories.length)]) as Category,
      hatchProgress: habit.hatchProgress || 0,
    }));
    return habits;
  } catch (e) {
    console.error('Error getting habits:', e);
    return [];
  }
}

export async function getDeadHabits(): Promise<DeadHabit[]> {
  try {
    const deadHabitsJson = await AsyncStorage.getItem(DEAD_HABITS_KEY);
    let deadHabits = deadHabitsJson ? JSON.parse(deadHabitsJson) : [];
    // Validate and fix dead habits data
    deadHabits = deadHabits.map((deadHabit: any) => ({
      id: deadHabit.id || String(Date.now()),
      habitName: deadHabit.habitName || 'Unnamed Habit',
      petName: deadHabit.petName || '',
      streak: deadHabit.streak || 0,
      longestStreak: deadHabit.longestStreak || 0,
      mood: (deadHabit.mood || 'Neutral') as Mood,
      createdAt: deadHabit.createdAt || Date.now(),
      category: (deadHabit.category || categories[Math.floor(Math.random() * categories.length)]) as Category,
      hatchProgress: deadHabit.hatchProgress || 0,
      diedAt: deadHabit.diedAt || Date.now(),
      finalMood: (deadHabit.finalMood || 'Neutral') as Mood,
    }));
    return deadHabits;
  } catch (e) {
    console.error('Error getting dead habits:', e);
    return [];
  }
}

export async function saveHabits(habits: Habit[]): Promise<void> {
  try {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (e) {
    console.error('Error saving habits:', e);
  }
}

export async function saveDeadHabits(deadHabits: DeadHabit[]): Promise<void> {
  try {
    await AsyncStorage.setItem(DEAD_HABITS_KEY, JSON.stringify(deadHabits));
  } catch (e) {
    console.error('Error saving dead habits:', e);
  }
}

function getRandomPetName(category: Category): string {
  const names = petNames[category];
  return names[Math.floor(Math.random() * names.length)];
}

function getMood(streak: number, daysSinceLastFed: number): Mood {
  if (daysSinceLastFed > 2) return 'Sick';
  if (streak >= 5) return 'Excited';
  if (streak >= 3) return 'Happy';
  if (daysSinceLastFed === 2) return 'Sad';
  if (daysSinceLastFed === 1) return 'Tired';
  if (streak === 0) return 'Bored';
  return 'Neutral';
}

export async function addHabit(newHabit: Pick<Habit, 'habitName'> & Partial<Pick<Habit, 'petName' | 'longestStreak'>>): Promise<void> {
  try {
    const habits = await getHabits();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const now = Date.now();
    const habit: Habit = {
      ...newHabit,
      id: String(now),
      petName: newHabit.petName || '',
      longestStreak: newHabit.longestStreak || 0,
      streak: 0,
      mood: 'Neutral',
      createdAt: now,
      lastFedAt: 0,
      category: randomCategory,
      hatchProgress: 0,
    };
    const updatedHabits = [...habits, habit];
    await saveHabits(updatedHabits);
  } catch (e) {
    console.error('Error adding habit:', e);
  }
}

export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export async function updatePetName(habitId: string, newPetName: string): Promise<void> {
  try {
    const habits = await getHabits();
    const updatedHabits = habits.map((habit) => {
      if (String(habit.id) !== String(habitId)) return habit;
      return {
        ...habit,
        petName: newPetName,
      };
    });
    await saveHabits(updatedHabits);
  } catch (e) {
    console.error('Error updating pet name:', e);
  }
}

export async function feedHabit(habitId: string): Promise<void> {
  try {
    const habits = await getHabits();
    const deadHabits = await getDeadHabits();
    const now = Date.now();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const updatedHabits = habits.map((habit) => {
      if (String(habit.id) !== String(habitId)) return habit;

      const daysSinceLastFed = habit.lastFedAt === 0 ? 0 : Math.floor((now - habit.lastFedAt) / millisecondsPerDay);
      const wasFedToday = habit.lastFedAt !== 0 && isSameDay(habit.lastFedAt, now);

      if (wasFedToday) return habit;

      const newStreak = daysSinceLastFed <= 1 ? habit.streak + 1 : 1;
      const newHatchProgress = habit.hatchProgress < 3 ? habit.hatchProgress + 1 : habit.hatchProgress;

      return {
        ...habit,
        streak: newStreak,
        longestStreak: Math.max(habit.longestStreak, newStreak),
        mood: getMood(newStreak, 0),
        lastFedAt: now,
        hatchProgress: newHatchProgress,
      };
    });

    await saveHabits(updatedHabits);
  } catch (e) {
    console.error('Error feeding habit:', e);
  }
}

export async function deleteHabit(habitId: string): Promise<void> {
  try {
    const habits = await getHabits();
    const updatedHabits = habits.filter((habit) => String(habit.id) !== String(habitId));
    await saveHabits(updatedHabits);
  } catch (e) {
    console.error('Error deleting habit:', e);
  }
}

export async function checkForDeadHabits(): Promise<void> {
  try {
    const habits = await getHabits();
    const deadHabits = await getDeadHabits();
    const now = Date.now();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const newDeadHabits: DeadHabit[] = [];
    const remainingHabits = habits.filter((habit) => {
      const daysSinceLastFed = habit.lastFedAt === 0 ? Math.floor((now - habit.createdAt) / millisecondsPerDay) : Math.floor((now - habit.lastFedAt) / millisecondsPerDay);
      
      if (habit.hatchProgress < 3 && daysSinceLastFed >= 3) {
        newDeadHabits.push({
          ...habit,
          diedAt: now,
          longestStreak: habit.longestStreak,
          finalMood: habit.mood,
        });
        return false;
      }

      if (habit.hatchProgress >= 3 && daysSinceLastFed >= 3) {
        newDeadHabits.push({
          ...habit,
          diedAt: now,
          longestStreak: habit.longestStreak,
          finalMood: habit.mood,
        });
        return false;
      }

      return true;
    });

    await saveHabits(remainingHabits);
    await saveDeadHabits([...deadHabits, ...newDeadHabits]);
  } catch (e) {
    console.error('Error checking for dead habits:', e);
  }
}