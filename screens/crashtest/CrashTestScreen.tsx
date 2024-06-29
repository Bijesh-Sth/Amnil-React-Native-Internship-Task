import { StyleSheet, Text, Button, View, } from 'react-native'
import React, {useEffect} from 'react'
import crashlytics from '@react-native-firebase/crashlytics';

async function onSignIn(user: any) {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
  }

const CrashTestScreen = () => {
    useEffect(() => {
        crashlytics().log('App mounted.');
      }, []);
  return (
    <View>
      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
    </View>
  )
}

export default CrashTestScreen

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },

})