import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';

const ManualInputScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {items = []} = route.params || {};
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const handleNext = () => {
    if (isNaN(Number(numberOfPeople)) || Number(numberOfPeople) <= 0) {
      Alert.alert('Please enter a valid number of people.');
      return;
    }

    navigation.navigate('SplitDetailsScreen', {
      numberOfPeople: Number(numberOfPeople),
      items,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt Items</Text>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Item: {item.item}</Text>
              <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemText}>
                Price: ${item.price.toFixed(2)}
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.manualInput}>
          <Text>No items found. Please enter items manually.</Text>
          {/* Add manual input fields for items */}
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Number of People:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          placeholder="e.g., 4"
        />
      </View>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  manualInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default ManualInputScreen;
