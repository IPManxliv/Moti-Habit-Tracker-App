import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { HabitContext } from './_layout';
import CreatureCard from './components/CreatureCard';
import { useRouter } from 'expo-router';
import { Habit } from './types/index';
import { getPetImage } from './utils/images';

export default function HomeScreen() {
  const { habits } = useContext(HabitContext);
  const router = useRouter();

  // Sort habits by the most recent timestamp (lastFedAt or createdAt, descending) and take the top 5
  const recentHabits = [...habits]
    .sort((a, b) => {
      // Use lastFedAt if available (non-zero), otherwise fall back to createdAt
      const aTimestamp = a.lastFedAt || a.createdAt;
      const bTimestamp = b.lastFedAt || b.createdAt;
      return bTimestamp - aTimestamp; // Descending order
    })
    .slice(0, 5);

  // Get the most recently fed or created habit and the remaining 4
  const mostRecentHabit = recentHabits.length > 0 ? recentHabits[0] : null;
  const remainingHabits = recentHabits.slice(1);

  const handleMostRecentPress = () => {
    if (mostRecentHabit) {
      router.push({ pathname: '/screens/CreatureDetailsScreen', params: { habitId: mostRecentHabit.id } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moti</Text>

      {/* Most Recently Fed or Created Habit */}
      {mostRecentHabit ? (
        <TouchableOpacity style={styles.mostRecentContainer} onPress={handleMostRecentPress}>
          <View style={styles.imageBox}>
            <Image
              source={getPetImage(
                mostRecentHabit.hatchProgress < 3,
                mostRecentHabit.category,
                mostRecentHabit.mood
              )}
              style={styles.image}
            />
          </View>
          <Text style={styles.mostRecentName}>
            {mostRecentHabit.hatchProgress < 3 ? 'Egg' : mostRecentHabit.petName || 'Unnamed Pet'}
          </Text>
          <Text style={styles.mostRecentHabit}>Habit: {mostRecentHabit.habitName || 'Unnamed Habit'}</Text>
        </TouchableOpacity>
      ) : null}

      {/* Remaining 4 Habits in Grid */}
      <FlatList
        data={remainingHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CreatureCard habit={item} isGrid={true} />}
        numColumns={2}
        ListEmptyComponent={
          habits.length === 0 ? (
            <Text style={styles.noHabits}>No pets yet! Add a pet to get started.</Text>
          ) : (
            <Text style={styles.noHabits}>Feed more pets to see them here!</Text>
          )
        }
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Add New Pet" onPress={() => router.push('/screens/AddHabitScreen')} color="#ff4500" />
        <Button title="Pet Gallery" onPress={() => router.push('/screens/HabitsGalleryScreen')} color="#ff4500" />
        <Button title="Visit Graveyard" onPress={() => router.push('/screens/GraveyardScreen')} color="#ff4500" />
      </View>
    </View>
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
  mostRecentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  image: {
    width: 80,
    height: 80,
  },
  mostRecentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4500',
    marginBottom: 5,
  },
  mostRecentHabit: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  noHabits: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
});