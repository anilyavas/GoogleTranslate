import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';

export default function Home() {
  const [input, setInput] = useState<string | undefined>();
  const [output, setOutput] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Translate' }} />
      <View style={styles.languageContainer}>
        <Text style={styles.language}>English</Text>
        <Pressable>
          <Entypo name="swap" color="black" size={24} />
        </Pressable>
        <Text style={styles.language}>Turkish</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter here!"
            placeholderTextColor="black"
            style={styles.input}
            multiline
            maxLength={5000}
          />
          <Feather name="arrow-right-circle" color="royalblue" size={24} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FontAwesome name="microphone" color="black" size={24} />
          <Text style={{ fontWeight: 'bold', color: 'grey' }}>{input?.length}/1000</Text>
        </View>
      </View>
      <View style={styles.outputContainer} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
  },
  language: {
    fontSize: 18,
    fontWeight: '500',
    color: 'blue',
  },
  inputContainer: {
    padding: 20,
    gap: 5,
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    minHeight: 200,
    paddingRight: 5,
  },
});
