// // using props drilling
// import React from 'react';
// import {Page2} from '../';
// import {Text, View, StyleSheet} from 'react-native';

// const Page1: React.FC = () => {
//   const message = 'Hello from Page1!';

//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <Text style={styles.text}>Page1</Text>
//         <Page2 message={message} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 10,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     height: '60%',
//   },
//   text: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default Page1;

//using useContext

import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppContext} from '../../context';
import {Page4} from '../';

const Page1: React.FC = () => {
  const {setMessage} = useContext(AppContext);

  useEffect(() => {
    setMessage('Hello from Page1!');
  }, [setMessage]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page 1</Text>
      <Page4 />
    </View>
  );
};

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

export default Page1;

// //Using Redux
// import React, {useEffect} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {fetchMessage} from '../../store/messageThunks';
// import Page4 from './Page4';

// const Page1: React.FC = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMessage());
//   }, [dispatch]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Page 1</Text>
//       <Page4 />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 16,
//   },
// });

// export default Page1;
