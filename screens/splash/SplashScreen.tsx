import React, {useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppContext} from '../../context';

type RootStackParamList = {
  Splash: undefined;
  Tab: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {setQuotes, setLoading, loading} = useContext(AppContext);

  const fetchQuote = () => {
    fetch('https://dummyjson.com/quotes/random/?delay=5000')
      .then(response => response.json())
      .then(data => {
        setQuotes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (!loading) {
      navigation.replace('Tab');
    }
  }, [loading, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Amnil Task</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
});
