import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CameraScreen = () => {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission === RESULTS.GRANTED) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setImage(image.path);
      }).catch(error => {
        Alert.alert('Error', error.message);
      });
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
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

export default CameraScreen;