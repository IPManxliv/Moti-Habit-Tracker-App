import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { addHabit, getHabits } from '../data/habits';
import { HabitContext } from '../_layout';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddHabitScreen() {
  const { setHabits } = useContext(HabitContext);
  const [habitName, setHabitName] = useState('');
  const router = useRouter();
  const { fromInitialLoad } = useLocalSearchParams<{ fromInitialLoad: string }>();

  const handleSubmit = async () => {
    if (habitName.trim()) {
      await addHabit({habitName});
      const updatedHabits = await getHabits();
      setHabits(updatedHabits);
      setHabitName('');
      // If coming from initial load, replace to prevent going back to Add Habit Screen
      if (fromInitialLoad === 'true') {
        router.replace('./index');
      } else {
        router.back();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Habit Name (e.g., Drink Water)"
        value={habitName}
        onChangeText={setHabitName}
      />
      <Text style={styles.note}>You'll get to name your pet after it hatches in 3 days.</Text>
      <Text style={styles.note}>Pet category will be randomly assigned upon hatching!</Text>

      <Button title="Add Pet" onPress={handleSubmit} color="#ff4500" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff4500',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});