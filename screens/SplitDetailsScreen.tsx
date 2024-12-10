import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

interface PersonSplit {
  name: string;
  percentage: string;
}

const SplitDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {numberOfPeople, items} = route.params || {items: []};

  const [billItems, setBillItems] = useState(
    items.length > 0
      ? items.map((item: any) => ({
          name: item.item,
          quantity: item.quantity.toString(),
          price: item.price.toString(),
        }))
      : [{name: '', quantity: '', price: ''}],
  );

  const [splits, setSplits] = useState<PersonSplit[]>(
    Array.from({length: numberOfPeople}, (_, i) => ({
      name: `Person ${i + 1}`,
      percentage: '',
    })),
  );

  const handleAddItem = () => {
    setBillItems([...billItems, {name: '', quantity: '', price: ''}]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedItems = [...billItems];
    updatedItems[index][field as keyof (typeof updatedItems)[0]] = value;
    setBillItems(updatedItems);
  };

  const handleSplitChange = (index: number, field: string, value: string) => {
    const updatedSplits = [...splits];
    updatedSplits[index][field as keyof PersonSplit] = value;
    setSplits(updatedSplits);
  };

  const handleCalculate = () => {
    const totalPercentage = splits.reduce(
      (sum, split) => sum + parseFloat(split.percentage || '0'),
      0,
    );

    if (totalPercentage !== 100) {
      Alert.alert('Invalid Split', 'Total split percentages must equal 100%.');
      return;
    }

    navigation.navigate('ResultScreen', {billItems, splits});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bill Items</Text>
      {billItems.map((item: any, index: number) => (
        <View key={index} style={styles.itemRow}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={item.name}
            onChangeText={value => handleInputChange(index, 'name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={item.quantity}
            onChangeText={value => handleInputChange(index, 'quantity', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="decimal-pad"
            value={item.price}
            onChangeText={value => handleInputChange(index, 'price', value)}
          />
        </View>
      ))}
      <View style={styles.addItemButton}>
        <Button title="Add Another Item" onPress={handleAddItem} />
      </View>

      <Text style={styles.title}>Assign Splits</Text>
      {splits.map((split, index) => (
        <View key={index} style={styles.itemRow}>
          <Text>{split.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Percentage"
            keyboardType="decimal-pad"
            value={split.percentage}
            onChangeText={value =>
              handleSplitChange(index, 'percentage', value)
            }
          />
        </View>
      ))}

      <Button title="Calculate Split" onPress={handleCalculate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '30%',
    backgroundColor: '#fff',
  },
  addItemButton: {
    marginBottom: 16,
  },
});

export default SplitDetailsScreen;
