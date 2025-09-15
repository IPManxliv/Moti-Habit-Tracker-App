import { Category, Mood } from '../types/index';
import { petVariations } from './petVariations';

// Import egg image
import eggImage from '../assets/images/egg.png';

export function getPetImage(isEggMode: boolean, category: Category, mood: Mood): any {
  if (isEggMode) {
    return eggImage;
  }

  // Get the first pet for the category (since we have one pet per category for now)
  const pet = petVariations[category][0]; // First pet in the array
  if (!pet) {
    console.warn(`No pet found for category ${category}`);
    return eggImage; // Fallback to egg image
  }

  const image = pet.images[mood];
  if (!image) {
    console.warn(`No image found for mood ${mood} in category ${category}`);
    return pet.images['Neutral'] || eggImage; // Fallback to Neutral or egg
  }

  return image;
}