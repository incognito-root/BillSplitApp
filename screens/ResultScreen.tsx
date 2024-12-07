import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const ResultScreen = ({route}: {route: any}) => {
  const {billItems, splits} = route.params;

  // Calculate total bill amount
  const totalBill = billItems.reduce((sum: number, item: any) => {
    const price = parseFloat(item.price || '0');
    const quantity = parseFloat(item.quantity || '0');
    return sum + price * quantity;
  }, 0);

  // Calculate individual shares
  const results = splits.map((split: any) => {
    const percentage = parseFloat(split.percentage || '0');
    const share = (totalBill * percentage) / 100;
    return {name: split.name, share};
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.totalBill}>Total Bill: ${totalBill.toFixed(2)}</Text>
      <FlatList
        data={results}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View style={styles.resultRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.share}>${item.share.toFixed(2)}</Text>
          </View>
        )}
      />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  totalBill: {
    fontSize: 16,
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
  },
  share: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
