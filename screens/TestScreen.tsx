import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {AppContext} from '../context';
import {TtsButton} from '../components/'; // Adjust the path as necessary

const TestScreen = () => {
  const {quotes, setQuotes, loading, setLoading} = useContext(AppContext);

  const fetchQuote = () => {
    setLoading(true);
    fetch('https://dummyjson.com/quotes/random')
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quotes</Text>
      <View style={styles.quoteContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          quotes && (
            <>
              <Text style={styles.quoteText}>"{quotes.quote}"</Text>
              <Text style={styles.authorText}>- {quotes.author}</Text>
            </>
          )
        )}
      </View>

      <Button title="Show New Quote" onPress={fetchQuote} />

      {!loading && quotes && <TtsButton text={quotes.quote} />}
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  quoteContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  authorText: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
});
