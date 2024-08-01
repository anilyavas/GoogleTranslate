import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useState } from 'react';

export default function AudioRecording({
  onNewRecording,
}: {
  onNewRecording: (uri: string) => void;
}) {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    if (uri) {
      onNewRecording(uri);
    }
  }
  if (recording) {
    return <FontAwesome6 name="stop-circle" color="dimgray" size={18} onPress={stopRecording} />;
  }
  return <FontAwesome onPress={startRecording} name="microphone" color="dimgrey" size={18} />;
}
