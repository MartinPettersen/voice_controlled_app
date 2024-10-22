import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from "expo-speech-recognition";

type Props = {
    recognizingSpeech: boolean;
    setRecognizingSpeech: React.Dispatch<React.SetStateAction<boolean>>;
    dictation: string;
    setDictation: React.Dispatch<React.SetStateAction<string>>;
}

const useDictate = ( setDictation: React.Dispatch<React.SetStateAction<string>>,setRecognizingSpeech: React.Dispatch<React.SetStateAction<boolean>>, dictation: string) => {


    useSpeechRecognitionEvent("start", () => setRecognizingSpeech(true));
    useSpeechRecognitionEvent("end", () => setRecognizingSpeech(false));
    useSpeechRecognitionEvent("result", (event) => {
        // replace ' at ' med @
        const transcript = event.results[0]?.transcript;
        const newTranscript = transcript.replace(" at ", "@");
        setDictation(dictation + newTranscript);
    });
    useSpeechRecognitionEvent("error", (event) => {
        console.log("error", event.error, "error ", event.message);
    });

    const handleStart = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            console.log("need permission to use microphone", result);
            return;
        }
        ExpoSpeechRecognitionModule.start({
            lang: "en-US",
            interimResults: true,
            maxAlternatives: 1,
            continuous: true,
            requiresOnDeviceRecognition: false,
            addsPunctuation: false,
            contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
        });
    };

    return {handleStart};
}

export default useDictate