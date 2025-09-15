import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { HabitContext } from '../_layout';
import { Habit } from '../types';
import { feedHabit, getHabits, isSameDay, updatePetName } from '../data/habits';
import { useLocalSearchParams } from 'expo-router';
import { getPetImage } from '../utils/images';

export default function CreatureDetailsScreen() {
  const { habits, setHabits } = useContext(HabitContext);
  const { habitId } = useLocalSearchParams();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [petNameInput, setPetNameInput] = useState('');

  useEffect(() => {
    const foundHabit = habits.find((h) => String(h.id) === String(habitId));
    if (foundHabit) {
      setHabit(foundHabit);
    }
  }, [habits, habitId]);

  const hasBeenFedToday = habit && habit.lastFedAt !== 0 ? isSameDay(habit.lastFedAt, Date.now()) : false;

  const handleFeed = async () => {
    if (!habit || hasBeenFedToday) {
      return;
    }

    try {
      await feedHabit(habit.id);
      const updatedHabits = await getHabits();
      setHabits([...updatedHabits]);
      const updatedHabit = updatedHabits.find((h) => String(h.id) === String(habit.id));
      if (updatedHabit) {
        setHabit(updatedHabit);
      } else {
        console.warn('Habit not found after feeding:', habit.id);
      }
    } catch (error) {
      console.error('Error in handleFeed:', error);
    }
  };

  const handleSetPetName = async () => {
    if (!habit || !petNameInput.trim()) return;

    try {
      await updatePetName(habit.id, petNameInput.trim());
      const updatedHabits = await getHabits();
      setHabits([...updatedHabits]);
      const updatedHabit = updatedHabits.find((h) => String(h.id) === String(habit.id));
      if (updatedHabit) {
        setHabit(updatedHabit);
      }
      setPetNameInput('');
    } catch (error) {
      console.error('Error setting pet name:', error);
    }
  };

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pet Not Found</Text>
      </View>
    );
  }

  const isEggMode = habit.hatchProgress < 3;
  const ageInDays = Math.floor((Date.now() - habit.createdAt) / (1000 * 60 * 60 * 24));
  const daysSinceLastFed = habit.lastFedAt === 0 ? ageInDays : Math.floor((Date.now() - habit.lastFedAt) / (1000 * 60 * 60 * 24));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEggMode ? 'Egg' : habit.petName || 'Unnamed Pet'}
      </Text>
      <View style={styles.imageBox}>
        <Image
          source={getPetImage(isEggMode, habit.category, habit.mood)}
          style={styles.image}
        />
      </View>

      {isEggMode && (
        <Text style={styles.hatchText}>
          Days Until Hatch: {3 - habit.hatchProgress}
        </Text>
      )}

      {!isEggMode && !habit.petName && (
        <View style={styles.nameInputContainer}>
          <Text style={styles.namePrompt}>Your egg has hatched! Name your pet:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet name"
            value={petNameInput}
            onChangeText={setPetNameInput}
          />
          <TouchableOpacity
            style={styles.nameButton}
            onPress={handleSetPetName}
          >
            <Text style={styles.nameButtonText}>Set Name</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Habit: {habit.habitName}</Text>
        <Text style={styles.infoText}>Category: {habit.category}</Text>
        {habit.petName && (
          <Text style={styles.infoText}>Pet Name: {habit.petName}</Text>
        )}
        <Text style={styles.infoText}>Streak: {habit.streak}</Text>
        <Text style={styles.infoText}>Longest Streak: {habit.longestStreak}</Text>
        <Text style={styles.infoText}>Mood: {habit.mood}</Text>
        <Text style={styles.infoText}>
          Last Fed: {habit.lastFedAt === 0 ? 'Never' : daysSinceLastFed === 0 ? 'Today' : `${daysSinceLastFed} day${daysSinceLastFed === 1 ? '' : 's'} ago`}
        </Text>
        <Text style={styles.infoText}>Age: {ageInDays} day{ageInDays === 1 ? '' : 's'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.feedButton, hasBeenFedToday && styles.feedButtonDisabled]}
        onPress={handleFeed}
        disabled={hasBeenFedToday}
      >
        <Text style={styles.feedButtonText}>Feed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff4500',
  },
  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  image: {
    width: 100,
    height: 100,
  },
  hatchText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameInputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  namePrompt: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ffd700',
    width: '80%',
  },
  nameButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nameButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  feedButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  feedButtonDisabled: {
    backgroundColor: '#ccc',
  },
  feedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});