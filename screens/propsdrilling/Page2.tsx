import React from 'react';
import {Page3} from '../';
import {Text, View, StyleSheet} from 'react-native';

interface Page2Props {
  message?: string;
}

const Page2: React.FC<Page2Props> = ({message}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Page2</Text>
        <Page3 message={message} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 0,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Page2;
