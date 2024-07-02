import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, Dimensions, StyleSheet, ViewToken } from 'react-native';

interface ImageData {
  id: number;
  name: string;
  description: string;
  source: any; 
}

interface Props {
  data: ImageData[];
  onIndexChanged: (index: number) => void;
}

const Carousel: React.FC<Props> = ({ data, onIndexChanged }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    onIndexChanged(currentIndex);
  }, [currentIndex, onIndexChanged]);

  const renderItemAtPosition = (index: number) => {
    const item = data[index];

    let imageStyle: any = styles.smallImage;
    if (index === currentIndex - 1) {
      imageStyle = styles.neighbourImage;
    } else if (index === currentIndex) {
      imageStyle = styles.mainImage;
    } else if (index === currentIndex + 1) {
      imageStyle = styles.neighbourImage;
    }

    return (
      <View style={styles.imageContainer}>
        <Image
          source={item.source}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderItem = ({ index }: { index: number }) => {
    return renderItemAtPosition(index);
  };

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<ImageData>[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: Dimensions.get('window').width, height: 300 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  mainImage: {
    width: Dimensions.get('window').width * 0.8,
    height: 250,
    marginLeft: '10%',
    marginRight: '5%',
  },
  smallImage: {
    width: Dimensions.get('window').width * 0.4,
    height: 200,
    marginLeft: '5%',
    marginRight: '5%',
  },
  neighbourImage: {
    width: Dimensions.get('window').width * 0.3,
    height: 150,
    marginLeft: '2%',
    marginRight: '2%',
  },
});

export default Carousel;
