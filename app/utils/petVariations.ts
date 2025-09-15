import { Category, Mood } from '../types/index';

// Import images for each category (one pet per category for now)
import firePetHappy from '../assets/images/fire/pet_happy.png';
import firePetExcited from '../assets/images/fire/pet_excited.png';
import firePetNeutral from '../assets/images/fire/pet_neutral.png';
import firePetTired from '../assets/images/fire/pet_tired.png';
import firePetSad from '../assets/images/fire/pet_sad.png';
import firePetAngry from '../assets/images/fire/pet_angry.png';
import firePetSick from '../assets/images/fire/pet_sick.png';
import firePetBored from '../assets/images/fire/pet_bored.png';

import waterPetHappy from '../assets/images/water/pet_happy.png';
import waterPetExcited from '../assets/images/water/pet_excited.png';
import waterPetNeutral from '../assets/images/water/pet_neutral.png';
import waterPetTired from '../assets/images/water/pet_tired.png';
import waterPetSad from '../assets/images/water/pet_sad.png';
import waterPetAngry from '../assets/images/water/pet_angry.png';
import waterPetSick from '../assets/images/water/pet_sick.png';
import waterPetBored from '../assets/images/water/pet_bored.png';

import electricPetHappy from '../assets/images/electric/pet_happy.png';
import electricPetExcited from '../assets/images/electric/pet_excited.png';
import electricPetNeutral from '../assets/images/electric/pet_neutral.png';
import electricPetTired from '../assets/images/electric/pet_tired.png';
import electricPetSad from '../assets/images/electric/pet_sad.png';
import electricPetAngry from '../assets/images/electric/pet_angry.png';
import electricPetSick from '../assets/images/electric/pet_sick.png';
import electricPetBored from '../assets/images/electric/pet_bored.png';

import icePetHappy from '../assets/images/ice/pet_happy.png';
import icePetExcited from '../assets/images/ice/pet_excited.png';
import icePetNeutral from '../assets/images/ice/pet_neutral.png';
import icePetTired from '../assets/images/ice/pet_tired.png';
import icePetSad from '../assets/images/ice/pet_sad.png';
import icePetAngry from '../assets/images/ice/pet_angry.png';
import icePetSick from '../assets/images/ice/pet_sick.png';
import icePetBored from '../assets/images/ice/pet_bored.png';

import plantPetHappy from '../assets/images/plant/pet_happy.png';
import plantPetExcited from '../assets/images/plant/pet_excited.png';
import plantPetNeutral from '../assets/images/plant/pet_neutral.png';
import plantPetTired from '../assets/images/plant/pet_tired.png';
import plantPetSad from '../assets/images/plant/pet_sad.png';
import plantPetAngry from '../assets/images/plant/pet_angry.png';
import plantPetSick from '../assets/images/plant/pet_sick.png';
import plantPetBored from '../assets/images/plant/pet_bored.png';

import spiritPetHappy from '../assets/images/spirit/pet_happy.png';
import spiritPetExcited from '../assets/images/spirit/pet_excited.png';
import spiritPetNeutral from '../assets/images/spirit/pet_neutral.png';
import spiritPetTired from '../assets/images/spirit/pet_tired.png';
import spiritPetSad from '../assets/images/spirit/pet_sad.png';
import spiritPetAngry from '../assets/images/spirit/pet_angry.png';
import spiritPetSick from '../assets/images/spirit/pet_sick.png';
import spiritPetBored from '../assets/images/spirit/pet_bored.png';

import lightPetHappy from '../assets/images/light/pet_happy.png';
import lightPetExcited from '../assets/images/light/pet_excited.png';
import lightPetNeutral from '../assets/images/light/pet_neutral.png';
import lightPetTired from '../assets/images/light/pet_tired.png';
import lightPetSad from '../assets/images/light/pet_sad.png';
import lightPetAngry from '../assets/images/light/pet_angry.png';
import lightPetSick from '../assets/images/light/pet_sick.png';
import lightPetBored from '../assets/images/light/pet_bored.png';

import darkPetHappy from '../assets/images/dark/pet_happy.png';
import darkPetExcited from '../assets/images/dark/pet_excited.png';
import darkPetNeutral from '../assets/images/dark/pet_neutral.png';
import darkPetTired from '../assets/images/dark/pet_tired.png';
import darkPetSad from '../assets/images/dark/pet_sad.png';
import darkPetAngry from '../assets/images/dark/pet_angry.png';
import darkPetSick from '../assets/images/dark/pet_sick.png';
import darkPetBored from '../assets/images/dark/pet_bored.png';

import lightningPetHappy from '../assets/images/lightning/pet_happy.png';
import lightningPetExcited from '../assets/images/lightning/pet_excited.png';
import lightningPetNeutral from '../assets/images/lightning/pet_neutral.png';
import lightningPetTired from '../assets/images/lightning/pet_tired.png';
import lightningPetSad from '../assets/images/lightning/pet_sad.png';
import lightningPetAngry from '../assets/images/lightning/pet_angry.png';
import lightningPetSick from '../assets/images/lightning/pet_sick.png';
import lightningPetBored from '../assets/images/lightning/pet_bored.png';

import airPetHappy from '../assets/images/air/pet_happy.png';
import airPetExcited from '../assets/images/air/pet_excited.png';
import airPetNeutral from '../assets/images/air/pet_neutral.png';
import airPetTired from '../assets/images/air/pet_tired.png';
import airPetSad from '../assets/images/air/pet_sad.png';
import airPetAngry from '../assets/images/air/pet_angry.png';
import airPetSick from '../assets/images/air/pet_sick.png';
import airPetBored from '../assets/images/air/pet_bored.png';

// Define pet variations for each category
export const petVariations: Record<Category, Array<{ variant: string; images: Record<Mood, any> }>> = {
  Fire: [
    {
      variant: 'pet',
      images: {
        Happy: firePetHappy,
        Excited: firePetExcited,
        Neutral: firePetNeutral,
        Tired: firePetTired,
        Sad: firePetSad,
        Angry: firePetAngry,
        Sick: firePetSick,
        Bored: firePetBored,
      },
    },
    // Add more Fire pets here in the future, e.g.:
    // {
    //   variant: 'pet2',
    //   images: {
    //     Happy: firePet2Happy,
    //     Excited: firePet2Excited,
    //     ...
    //   },
    // },
  ],
  Water: [
    {
      variant: 'pet',
      images: {
        Happy: waterPetHappy,
        Excited: waterPetExcited,
        Neutral: waterPetNeutral,
        Tired: waterPetTired,
        Sad: waterPetSad,
        Angry: waterPetAngry,
        Sick: waterPetSick,
        Bored: waterPetBored,
      },
    },
  ],
  Electric: [
    {
      variant: 'pet',
      images: {
        Happy: electricPetHappy,
        Excited: electricPetExcited,
        Neutral: electricPetNeutral,
        Tired: electricPetTired,
        Sad: electricPetSad,
        Angry: electricPetAngry,
        Sick: electricPetSick,
        Bored: electricPetBored,
      },
    },
  ],
  Ice: [
    {
      variant: 'pet',
      images: {
        Happy: icePetHappy,
        Excited: icePetExcited,
        Neutral: icePetNeutral,
        Tired: icePetTired,
        Sad: icePetSad,
        Angry: icePetAngry,
        Sick: icePetSick,
        Bored: icePetBored,
      },
    },
  ],
  Plant: [
    {
      variant: 'pet',
      images: {
        Happy: plantPetHappy,
        Excited: plantPetExcited,
        Neutral: plantPetNeutral,
        Tired: plantPetTired,
        Sad: plantPetSad,
        Angry: plantPetAngry,
        Sick: plantPetSick,
        Bored: plantPetBored,
      },
    },
  ],
  Spirit: [
    {
      variant: 'pet',
      images: {
        Happy: spiritPetHappy,
        Excited: spiritPetExcited,
        Neutral: spiritPetNeutral,
        Tired: spiritPetTired,
        Sad: spiritPetSad,
        Angry: spiritPetAngry,
        Sick: spiritPetSick,
        Bored: spiritPetBored,
      },
    },
  ],
  Light: [
    {
      variant: 'pet',
      images: {
        Happy: lightPetHappy,
        Excited: lightPetExcited,
        Neutral: lightPetNeutral,
        Tired: lightPetTired,
        Sad: lightPetSad,
        Angry: lightPetAngry,
        Sick: lightPetSick,
        Bored: lightPetBored,
      },
    },
  ],
  Dark: [
    {
      variant: 'pet',
      images: {
        Happy: darkPetHappy,
        Excited: darkPetExcited,
        Neutral: darkPetNeutral,
        Tired: darkPetTired,
        Sad: darkPetSad,
        Angry: darkPetAngry,
        Sick: darkPetSick,
        Bored: darkPetBored,
      },
    },
  ],
  Lightning: [
    {
      variant: 'pet',
      images: {
        Happy: lightningPetHappy,
        Excited: lightningPetExcited,
        Neutral: lightningPetNeutral,
        Tired: lightningPetTired,
        Sad: lightningPetSad,
        Angry: lightningPetAngry,
        Sick: lightningPetSick,
        Bored: lightningPetBored,
      },
    },
  ],
  Air: [
    {
      variant: 'pet',
      images: {
        Happy: airPetHappy,
        Excited: airPetExcited,
        Neutral: airPetNeutral,
        Tired: airPetTired,
        Sad: airPetSad,
        Angry: airPetAngry,
        Sick: airPetSick,
        Bored: airPetBored,
      },
    },
  ],
};