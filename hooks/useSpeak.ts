import * as Speech from 'expo-speech';


const speak = (text: string) => {
    Speech.speak(text);
};

export default speak