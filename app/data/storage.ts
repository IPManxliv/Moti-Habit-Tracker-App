import { Habit } from '../types/index';

export const HABITS_KEY = '@Moti:habits';
export const DEAD_HABITS_KEY = '@Moti:deadHabits';

export const categories: Habit['category'][] = [
  'Fire', 'Water', 'Electric', 'Ice', 'Plant', 'Spirit', 'Light', 'Dark', 'Lightning', 'Air'
];

export const petNames: { [key in Habit['category']]: string[] } = {
  Fire: ['Blaze', 'Ember', 'Scorch', 'Flare'],
  Water: ['Aqua', 'Wave', 'Tide', 'Splash'],
  Electric: ['Spark', 'Bolt', 'Jolt', 'Zap'],
  Ice: ['Frost', 'Chill', 'Glacier', 'Snowy'],
  Plant: ['Leafy', 'Sprout', 'Bloom', 'Thorn'],
  Spirit: ['Wisp', 'Shade', 'Ghost', 'Soul'],
  Light: ['Glow', 'Shine', 'Ray', 'Star'],
  Dark: ['Shadow', 'Dusk', 'Night', 'Eclipse'],
  Lightning: ['Thunder', 'Storm', 'Flash', 'Strike'],
  Air: ['Breeze', 'Gale', 'Zephyr', 'Sky'],
};

// Initialize with no habits
export let initialHabits: Habit[] = [];