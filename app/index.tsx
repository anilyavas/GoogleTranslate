import { Entypo, Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native';

import { languages } from '~/assets/languages';
import AudioRecording from '~/components/AudioRecording';
import { audioToText, textToSpeeh, translate } from '~/utils/translation';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [languageFrom, setLanguageFrom] = useState('English');
  const [languageTo, setLanguageTo] = useState('Turkish');
  const [selectLanguageMode, setSelectLanguageMode] = useState<'from' | 'to' | null>();

  const onTranslate = async () => {
    const translation = await translate(input, languageFrom, languageTo);
    setOutput(translation);
  };

  const speechToText = async (uri: string) => {
    const text = await audioToText(uri);
    setInput(text);
    const translation = await translate(text, languageFrom, languageTo);
    setOutput(translation);
  };

  if (selectLanguageMode) {
    return (
      <FlatList
        data={languages}
        contentContainerStyle={styles.languageList}
        numColumns={5}
        renderItem={({ item }) => (
          <Text
            onPress={() => {
              if (selectLanguageMode === 'from') {
                setLanguageFrom(item.name);
              } else {
                setLanguageTo(item.name);
              }
              setSelectLanguageMode(null);
            }}
            style={styles.languageName}>
            {item.name}
          </Text>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Translate' }} />
      <View style={styles.languageContainer}>
        <Text onPress={() => setSelectLanguageMode('from')} style={styles.language}>
          {languageFrom}
        </Text>
        <Entypo
          name="swap"
          color="black"
          size={24}
          onPress={() => {
            setLanguageFrom(languageTo);
            setLanguageTo(languageFrom);
          }}
        />
        <Text onPress={() => setSelectLanguageMode('to')} style={styles.language}>
          {languageTo}
        </Text>
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
          <AudioRecording onNewRecording={(uri) => speechToText(uri)} />
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
              <FontAwesome6
                onPress={() => textToSpeeh(output)}
                name="volume-high"
                size={18}
                color="dimgray"
              />
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
    backgroundColor: 'gainsboro',
  },
  output: {
    fontSize: 16,
    fontWeight: '400',
    minHeight: 200,
    paddingRight: 5,
  },
  languageList: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  languageName: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
