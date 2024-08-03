import 'expo-router/entry';

import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;
