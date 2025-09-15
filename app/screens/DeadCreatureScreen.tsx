import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { DeadHabit, Mood, Category } from '../types/index';
import { useRouter } from 'expo-router';
import { getPetImage } from '../utils/images';

// Fallback image (using egg.png as a placeholder)
const defaultImage = require('../assets/images/egg.png');

interface Props {
  deadHabit?: DeadHabit; // Make deadHabit optional to handle undefined cases
  isGrid?: boolean;
}

const DeadCreatureCard: React.FC<Props> = ({ deadHabit, isGrid = false }) => {
  const router = useRouter();

  // Only render fallback UI if deadHabit is completely undefined
  if (!deadHabit) {
    return (
      <View style={[styles.card, isGrid && styles.gridCard]}>
        <View style={styles.iconBox}>
          <Image source={defaultImage} style={[styles.icon, { tintColor: 'gray' }]} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.petName}>Unknown Pet ⚰️</Text>
          <Text style={styles.habitName}>Unknown Habit</Text>
          <Text style={styles.moodText}>Final Mood: Unknown 😐</Text>
        </View>
      </View>
    );
  }

  const getMoodEmoji = () => {
    switch (deadHabit.finalMood) {
      case 'Happy':
        return '😊';
      case 'Excited':
        return '🤩';
      case 'Neutral':
        return '😐';
      case 'Tired':
        return '😴';
      case 'Sad':
        return '😢';
      case 'Angry':
        return '😡';
      case 'Sick':
        return '🤒';
      case 'Bored':
        return '😑';
      default:
        return '😐';
    }
  };

  const handlePress = () => {
    const habitIdString = String(deadHabit.id); // Ensure habitId is a string
    console.log('Navigating to DeadCreatureDetailsScreen with habitId:', habitIdString); // Debug log
    router.push({ pathname: '/screens/DeadCreatureScreen', params: { habitId: habitIdString } });
  };

  return (
    <TouchableOpacity style={[styles.card, isGrid && styles.gridCard]} onPress={handlePress}>
      <View style={styles.iconBox}>
        <Image
          source={getPetImage(false, deadHabit.category as Category, deadHabit.finalMood as Mood)}
          style={[styles.icon, { tintColor: 'gray' }]} // Apply grayscale effect
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.petName}>
          {deadHabit.petName || 'Unnamed Pet'} ⚰️
        </Text>
        <Text style={styles.habitName}>{deadHabit.habitName || 'Unnamed Habit'}</Text>
        <Text style={styles.moodText}>
          Final Mood: {deadHabit.finalMood || 'Unknown'} {getMoodEmoji()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  gridCard: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
    marginHorizontal: 4,
    marginBottom: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  habitName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  moodText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DeadCreatureCard;