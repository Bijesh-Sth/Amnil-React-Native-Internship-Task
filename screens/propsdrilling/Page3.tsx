import React from 'react';
import {Page4} from '../';
import {Text, View, StyleSheet} from 'react-native';

interface Page3Props {
  message?: string;
}

const Page3: React.FC<Page3Props> = ({message}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Page3</Text>
        <Page4 message={message} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    minHeight: 0,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Page3;
