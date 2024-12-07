import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

const ManualInputScreen = ({navigation}: {navigation: any}) => {
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');

  const handleNext = () => {
    const numPeople = parseInt(numberOfPeople, 10);

    if (isNaN(numPeople) || numPeople < 1 || numPeople > 4) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 4.');
      return;
    }

    // Navigate to the next screen with the number of people
    navigation.navigate('SplitDetailsScreen', {numberOfPeople: numPeople});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How many people to split the bill with?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number (1-4)"
        keyboardType="number-pad"
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
        maxLength={1} // To ensure single-digit input
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

export default ManualInputScreen;
