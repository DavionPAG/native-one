import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AllQuotes from './allQuotes'


export default function App(props) {

  const [qod, setQod] = useState({})
  const [active, setActive] = useState('qod')

  const getQod = async () => {
    await fetch('https://quotes.rest/qod?language=en')
      .then(res => res.json())
      .then(res => setQod({
        author: res.contents.quotes[0].author,
        quote: res.contents.quotes[0].quote
      })
      )
      .catch(err => console.log(err));
  }

  const addQoute = async () => {
    await AsyncStorage.setItem(`${qod.author}`, JSON.stringify(qod))
    alert(`Added Quote By "${qod.author}" to your Favorites`)
  }

  const viewAllQoutes = () => {   
    setActive('faves')
  }

  const viewQod = () => setActive('qod');

  useEffect(() => {
    getQod();
  }, [])

  return (

    active === 'qod' ?
      < View style={styles.container} >

        <Button
          onPress={viewAllQoutes}
          title='View Favorites'
        />
        <Text style={styles.text}>
          {qod.quote}
        </Text>
        <Text style={styles.author}>
          - {qod.author}
        </Text>

        <Button
          onPress={addQoute}
          title="Add To Favorites"
        />
        <StatusBar style="auto" />
      </View >
      :
      <AllQuotes viewQod={viewQod}/>

  );
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
  author: {
    marginBottom: 20,
  }

});


