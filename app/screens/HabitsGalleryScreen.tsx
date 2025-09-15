import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { HabitContext } from '../_layout';
import CreatureCard from '../components/CreatureCard';

export default function HabitsGalleryScreen() {
  const { habits } = useContext(HabitContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Gallery</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CreatureCard habit={item} isGrid={true} />}
        numColumns={2}
        ListEmptyComponent={<Text style={styles.noHabits}>No pets yet!</Text>}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff4500',
  },
  noHabits: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});