import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default allQuotes = (props) => {

  const [allQuotes, setAllQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let getAllQuotes = async () => {
      let allKeys = await AsyncStorage.getAllKeys()
      let quotesArr = allKeys.map(async key => {
        let quoteObj = await AsyncStorage.getItem(key)
        return JSON.parse(quoteObj)
      })
      setAllQuotes(quotesArr)
    }
    getAllQuotes()
    console.log(allQuotes)
    setLoading(false)
  }, [])

  return (

    < View style={styles.container}>
      {
        loading
          ?
          <Text style={styles.text}>Loading...</Text>
          :
          allQuotes.map(quote => {
            <Text>
              {quote.quote}
              {'\n'}
              {'\n'}
              - {quote.author}
            </Text>
          })
      }

      <Button
        onPress={props.viewQod}
        title="Today's Quote"
      />

      <StatusBar style="auto" />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
    marginTop: 150,
  },

});