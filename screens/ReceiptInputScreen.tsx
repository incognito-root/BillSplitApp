import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const ReceiptInputScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const navigation = useNavigation();

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      } else {
        Alert.alert('Error', 'No image selected.');
      }
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('Error', 'Failed to select an image.');
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      name: 'receipt.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('http://10.0.2.2:8000/api/ocr/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const jsonResponse = await response.json();

      if (response.ok && jsonResponse.result) {
        navigation.navigate('ManualInput', {items: jsonResponse.result});
      } else {
        Alert.alert('Error', 'Failed to upload the image or process response.');
      }
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to upload the image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Receipt Input Screen</Text>
      <Button title="Select Image" onPress={selectImage} />
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.image} />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
      {apiResponse && (
        <Text style={styles.responseText}>
          Response: {JSON.stringify(apiResponse)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default ReceiptInputScreen;
