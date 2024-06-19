import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Ionicons';

const TtsButton = ({text}: {text: string}) => {
  const speak = () => {
    Tts.speak(text);
  };

  return (
    <TouchableOpacity onPress={speak} style={styles.button}>
      <Text>
        <Icon name="volume-high" size={24} color="black" />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TtsButton;
