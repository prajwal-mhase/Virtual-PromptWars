interface SpeechRecognitionResult {
  readonly [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition {
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start(): void;
}
