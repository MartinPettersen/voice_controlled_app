import * as Speech from 'expo-speech';


const speak = (text: string) => {
    const thingToSay = 'Welcome to this app for people with vision imparement. If you want to read emails click on the upper part of the screen. If you want to dictate emails click on the bottom part of the screen';
    Speech.speak(thingToSay);
};

export default speak