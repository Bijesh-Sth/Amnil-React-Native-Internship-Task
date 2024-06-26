import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ImagePickerScreen = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const mediaPermission = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    if (mediaPermission === RESULTS.GRANTED) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setImage(image.path);
      }).catch(error => {
        Alert.alert('Error', error.message);
      });
    } else {
      Alert.alert('Permission Denied', 'Storage permission is required to access images.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 20,
  },
});

export default ImagePickerScreen;