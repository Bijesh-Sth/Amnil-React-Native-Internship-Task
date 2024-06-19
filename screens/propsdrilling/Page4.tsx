import React from 'react';
import {AppContext} from '../../context/AppContext';
import {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface Page4Props {
  message?: string;
}

// const Page4: React.FC<Page4Props> = ({message}) => {
  const Page4: React.FC = () => {
    const {message} = useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Page4</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 0,
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Page4;

// //using Redux Thunks

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import {RootState} from '../../store/store';

// const Page4: React.FC = () => {
//   const message = useSelector((state: RootState) => state.message.message);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Page 4</Text>
//       <Text style={styles.text}>{message}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 10,
//     backgroundColor: 'red',
//   },
//   text: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default Page4;
