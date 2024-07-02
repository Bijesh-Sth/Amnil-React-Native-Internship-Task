import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Carousel } from '../../components';

const CarouselScreen: React.FC = () => {
  const images = [
    { id: 1, name: 'Image 1', description: 'Description for Image 1', source: require('../../assets/apple.png') },
    { id: 2, name: 'Image 2', description: 'Description for Image 2', source: require('../../assets/apple.png') },
    { id: 3, name: 'Image 3', description: 'Description for Image 3', source: require('../../assets/apple.png') },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleIndexChanged = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Carousel data={images} onIndexChanged={handleIndexChanged} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {images[currentIndex].name}
        </Text>
        <Text style={styles.text}>
          {images[currentIndex].description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,   

  },
  textContainer: {
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, 
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default CarouselScreen;
