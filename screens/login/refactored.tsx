import React, {FC, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';

interface IProps {}

const Root: FC<IProps> = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const fetchedToken = await AsyncStorage.getItem('access_token');
        setToken(fetchedToken);
      } catch (error) {
        console.log('Error fetching access token', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return token ? <RootNavigation /> : <LoginScreen />;
};

export default Root;
