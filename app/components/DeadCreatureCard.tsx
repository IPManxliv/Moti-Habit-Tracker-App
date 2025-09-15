import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DeadHabit } from '../types/index';
import { useRouter } from 'expo-router';

interface Props {
  habit: DeadHabit;
}

const DeadCreatureCard: React.FC<Props> = ({ habit }) => {
  const router = useRouter();
  const dob = new Date(habit.createdAt).toLocaleDateString();
  const dod = new Date(habit.diedAt).toLocaleDateString();
  const ageInDays = Math.floor((habit.diedAt - habit.createdAt) / (24 * 60 * 60 * 1000));

  const getPetEmoji = () => {
    switch (habit.category) {
      case 'Fire':
        return '🔥';
      case 'Water':
        return '💧';
      case 'Electric':
        return '⚡';
      case 'Ice':
        return '❄️';
      case 'Plant':
        return '🌿';
      case 'Spirit':
        return '👻';
      case 'Light':
        return '🌟';
      case 'Dark':
        return '🌙';
      case 'Lightning':
        return '🌩️';
      case 'Air':
        return '💨';
      default:
        return '🧸';
    }
  };

  const handlePress = () => {
    router.push({ pathname: '/screens/DeadCreatureScreen', params: { habitId: habit.id } });
  };

  return (
    <TouchableOpacity
      style={styles.gridCard}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>{getPetEmoji()}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.petName}>{habit.petName} ⚰️</Text>
        <Text style={styles.habitName}>{habit.habitName}</Text>
        <Text style={styles.ripText}>
          💔 RIP, {dob} - {dod}, Age: {ageInDays} days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
    margin: '1%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 24,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'center',
  },
  habitName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    textAlign: 'center',
  },
  ripText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default DeadCreatureCard;