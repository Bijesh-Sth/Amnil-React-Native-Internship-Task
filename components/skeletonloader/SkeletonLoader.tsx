import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View, StyleSheet} from 'react-native';

const SkeletonLoader: React.FC = () => (
  <SkeletonPlaceholder>
    <>
      <View style={styles.profileImage} />
      <View style={styles.textContainer}>
        <View style={styles.textLine} />
        <View style={styles.textLineShort} />
      </View>
      <View style={styles.input} />
      <View style={styles.input} />
      <View style={styles.input} />
      <View style={styles.input} />
      <View style={styles.button} />
    </>
  </SkeletonPlaceholder>
);

export default SkeletonLoader;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textLine: {
    width: 120,
    height: 20,
    borderRadius: 4,
    marginVertical: 5,
  },
  textLineShort: {
    width: 80,
    height: 20,
    borderRadius: 4,
    marginVertical: 5,
  },
  input: {
    height: 50,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  button: {
    height: 50,
    borderRadius: 4,
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
