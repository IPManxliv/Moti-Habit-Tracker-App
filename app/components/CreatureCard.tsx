import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Habit } from '../types/index';
import { useRouter } from 'expo-router';
import { getPetImage } from '../utils/images';

interface Props {
  habit: Habit;
  isGrid?: boolean;
}

const CreatureCard: React.FC<Props> = ({ habit, isGrid = false }) => {
  const router = useRouter();
  const isEggMode = (habit.hatchProgress || 0) < 3;

  const getMoodEmoji = () => {
    switch (habit.mood) {
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
    router.push({ pathname: '/screens/CreatureDetailsScreen', params: { habitId: habit.id } });
  };

  return (
    <TouchableOpacity style={[styles.card, isGrid && styles.gridCard]} onPress={handlePress}>
      <View style={styles.iconBox}>
        <Image
          source={getPetImage(isEggMode, habit.category, habit.mood)}
          style={styles.icon}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.petName}>
          {isEggMode ? 'Egg' : (habit.petName || 'Unnamed Pet')}
        </Text>
        <Text style={styles.habitName}>{habit.habitName || 'Unnamed Habit'}</Text>
        <Text style={styles.moodText}>
          {habit.mood || 'Neutral'} {getMoodEmoji()}
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
    width: '45%',
    margin: 5,
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

export default CreatureCard;