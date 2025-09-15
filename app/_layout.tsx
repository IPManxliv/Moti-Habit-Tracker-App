import { Stack, Redirect, useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import { checkForDeadHabits, getHabits } from './data/habits';

export const HabitContext = createContext<{
  habits: any[];
  setHabits: React.Dispatch<React.SetStateAction<any[]>>;
}>({ habits: [], setHabits: () => null });

export default function Layout() {
  const [habits, setHabits] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function initializeHabits() {
      const loadedHabits = await getHabits();
      setHabits(loadedHabits);

      // Check for dead habits on app start
      await checkForDeadHabits();

      // Redirect to add-habit-screen if no habits exist
      if (loadedHabits.length === 0) {
        router.replace('./screens/AddHabitScreen.tsx?fromInitialLoad=true');
      }
    }

    initializeHabits();

    // Set up a timer to check for dead habits every hour
    const interval = setInterval(async () => {
      await checkForDeadHabits();
      const updatedHabits = await getHabits();
      setHabits(updatedHabits);
    }, 60 * 60 * 1000); // Every hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, [router]);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0f8ff',
          },
          headerTintColor: '#ff4500',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="screens/AddHabitScreen" options={{ title: 'Add New Pet' }} />
        <Stack.Screen name="screens/HabitsGalleryScreen" options={{ title: 'Pet Gallery' }} />
        <Stack.Screen name="screens/CreatureDetailsScreen" options={{ title: 'Pet Details' }} />
        <Stack.Screen name="screens/GraveyardScreen" options={{ title: 'Graveyard' }} />
        <Stack.Screen name="screens/DeadCreatureScreen" options={{ title: 'Fallen Pet Details' }} />
      </Stack>
    </HabitContext.Provider>
  );
};