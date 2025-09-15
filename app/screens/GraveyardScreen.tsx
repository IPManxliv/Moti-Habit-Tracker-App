import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { getDeadHabits } from '../data/habits';
import { DeadHabit } from '../types/index';
import DeadCreatureCard from './DeadCreatureScreen';

export default function GraveyardScreen() {
  const [deadHabits, setDeadHabits] = useState<DeadHabit[]>([]);

  useEffect(() => {
    async function loadDeadHabits() {
      const habits = await getDeadHabits();
      console.log('Loaded dead habits in GraveyardScreen:', habits); // Debug log
      // Only filter out undefined habits
      const validHabits = habits.filter(habit => habit !== undefined && habit !== null);
      if (habits.length !== validHabits.length) {
        console.warn('Some dead habits were undefined/null and filtered out:', {
          originalCount: habits.length,
          validCount: validHabits.length,
          invalidHabits: habits.filter(habit => habit === undefined || habit === null),
        });
      }
      setDeadHabits(validHabits);
    }
    loadDeadHabits();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Graveyard ⚰️</Text>
      <FlatList
        data={deadHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DeadCreatureCard deadHabit={item} isGrid={true} />}
        numColumns={2}
        ListEmptyComponent={<Text style={styles.noHabits}>No fallen pets yet.</Text>}
        scrollEnabled={false} // Disable FlatList scrolling since ScrollView handles it
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff4500',
  },
  noHabits: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});