import { Entypo, Feather, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = async (text: string) => {
    const { data } = await supabase.functions.invoke('translate', {
      body: JSON.stringify({ input, from: 'English', to: 'Turkish' }),
    });
    return data?.content || 'Something went wrong';
  };

  const onTranslate = async () => {
    const translation = await translate(input);
    setOutput(translation);
  };

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
            placeholder="Enter your text here!"
            style={styles.input}
            multiline
            maxLength={5000}
          />
          <Feather onPress={onTranslate} name="arrow-right-circle" color="royalblue" size={18} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FontAwesome name="microphone" color="dimgrey" size={18} />
          <Text style={{ fontWeight: 'bold', color: 'grey' }}>{input?.length}/1000</Text>
        </View>
      </View>
      {output && (
        <View style={styles.outputContainer}>
          <View>
            <Text style={styles.output}>{output}</Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome6 name="volume-high" size={18} color="dimgray" />
              <FontAwesome5 name="copy" size={18} color="dimgray" />
            </View>
          </View>
        </View>
      )}
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
    color: 'royalblue',
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
  outputContainer: {
    padding: 20,
    gap: 5,
  },
  output: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    minHeight: 200,
    paddingRight: 5,
  },
});
