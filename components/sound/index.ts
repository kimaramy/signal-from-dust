'use client';

import * as Tone from 'tone';

export const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const addOctaveNumbers = (
  scale: Tone.Unit.Frequency[],
  octaveNumber: number
) => {
  return scale.map((note) => {
    const firstOctaveNoteIndex =
      scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#');
    const noteOctaveNumber =
      scale.indexOf(note) < firstOctaveNoteIndex
        ? octaveNumber - 1
        : octaveNumber;
    return `${note}${noteOctaveNumber}`;
  });
};

const constructMajorChord = (
  scale: Tone.Unit.Frequency[],
  octaveNumber: number,
  rootNote: string
) => {
  const scaleWithOctave = addOctaveNumbers(scale, octaveNumber);

  const getNextChordNote = (
    note: Tone.Unit.Frequency,
    nextNoteNumber: number
  ) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note as string) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== 'undefined') {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNextChordNote(rootNote, 3);
  const fifthNote = getNextChordNote(rootNote, 5);
  const chord = [rootNote, thirdNote, fifthNote];

  return chord;
};

const constructChords = (
  scale: Tone.Unit.Frequency[],
  octaveNumber: number
) => {
  const scaleWithOctave = addOctaveNumbers(scale, octaveNumber);

  const getNextChordNote = (note: string, nextNoteNumber: number) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== 'undefined') {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 6];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const chordArray = scaleWithOctave.map((note) => {
    let thirdNote = getNextChordNote(note, 3);
    let fifthNote = getNextChordNote(note, 5);

    const chord = [note, thirdNote, fifthNote];

    return chord;
  });

  return chordArray;
};

const IChord = constructMajorChord(AMinorScale, 4, 'A3');
const VChord = constructMajorChord(AMinorScale, 4, 'E4');
const VIChord = constructMajorChord(AMinorScale, 3, 'F3');
const IVChord = constructMajorChord(AMinorScale, 3, 'D3');

IChord.push('A2', 'G4');
VChord.push('E2', 'G3');
VIChord.push('F2', 'E4');
IVChord.push('D2', 'C4');

console.log(IChord);
console.log(VChord);
console.log(VIChord);
console.log(IVChord);

const synth = new Tone.PolySynth(Tone.Synth, {
  volume: -5,
  oscillator: {
    type: 'sawtooth',
  },
}).toDestination();

const mainChords = [
  { time: 0, note: IChord, duration: '2n.' },
  { time: '0:3', note: VChord, duration: '4n' },
  { time: '1:0', note: VIChord, duration: '2n.' },
  { time: '1:3', note: VChord, duration: '4n' },
  { time: '2:0', note: IVChord, duration: '2n.' },
  { time: '2:3', note: VChord, duration: '4n' },
  // { time: '3:0', note: VIChord, duration: '2n' },
  // { time: '3:2', note: VChord, duration: '4n' },
  // { time: '3:3', note: IVChord, duration: '4n' },
  // { time: '4:0', note: IChord, duration: '2n.' },
  // { time: '4:3', note: VChord, duration: '4n' },
  // { time: '5:0', note: VIChord, duration: '2n.' },
  // { time: '5:3', note: VChord, duration: '4n' },
  // { time: '6:0', note: IVChord, duration: '2n.' },
  // { time: '6:3', note: VChord, duration: '4n' },
  // { time: '7:0', note: VIChord, duration: '2n' },
  // { time: '7:2', note: VChord, duration: '4n' },
  // { time: '7:3', note: IVChord, duration: '4n' },
];

// const part = new Tone.Part(function (time, note) {
//   synth.triggerAttackRelease(note.note, note.duration, time);
// }, mainChords).start(0);

const IChord1 = constructMajorChord(AMinorScale, 5, 'A4');
const VChord1 = constructMajorChord(AMinorScale, 5, 'E5');
const VIChord1 = constructMajorChord(AMinorScale, 4, 'F4');
const IVChord1 = constructMajorChord(AMinorScale, 4, 'D4');

IChord.push('A3', 'G5');
VChord.push('E3', 'D5');
VIChord.push('F3', 'E5');
IVChord.push('D3', 'C5');

const mainChordPart = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    count: 6,
    spread: 80,
    type: 'fatsawtooth',
  },
}).toDestination();

const highOctaveChords = [
  { time: 0, note: IChord1, duration: '2n.' },
  { time: '0:3', note: VChord1, duration: '4n' },
  { time: '1:0', note: VIChord1, duration: '2n.' },
  { time: '1:3', note: VChord1, duration: '4n' },
  { time: '2:0', note: IVChord1, duration: '2n.' },
  { time: '2:3', note: VChord1, duration: '4n' },
  // { time: '3:0', note: VIChord1, duration: '2n' },
  // { time: '3:2', note: VChord1, duration: '4n' },
  // { time: '3:3', note: IVChord1, duration: '4n' },
  // { time: '4:0', note: IChord1, duration: '2n.' },
  // { time: '4:3', note: VChord1, duration: '4n' },
  // { time: '5:0', note: VIChord1, duration: '2n.' },
  // { time: '5:3', note: VChord1, duration: '4n' },
  // { time: '6:0', note: IVChord1, duration: '2n.' },
  // { time: '6:3', note: VChord1, duration: '4n' },
  // { time: '7:0', note: VIChord1, duration: '2n' },
  // { time: '7:2', note: VChord1, duration: '4n' },
  // { time: '7:3', note: IVChord1, duration: '4n' },
];

const highSynth = new Tone.PolySynth(Tone.Synth, {
  volume: -16,
  oscillator: {
    count: 6,
    spread: 80,
    type: 'fatsawtooth',
  },
}).toDestination();

// const now = Tone.now();

// const highOctaveChordPart = new Tone.Part(
//   function (time, note) {
//     highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
//   },
//   [
//     new Array(7).fill('C4').map((note, i) => ({
//       note,
//       duration: i % 2 === 0 ? '2n' : '8n',
//       time: now + i,
//     })),
//   ]
// ).start(0);

const mainMelody = [
  { time: 0, note: 'G4', duration: '8n' },
  { time: '0:0:2', note: 'F4', duration: '8n' },
  { time: '0:1', note: 'D4', duration: '8n.' },
  { time: '0:2', note: 'D4', duration: '8n' },
  { time: '0:2:2', note: 'F4', duration: '8n.' },
  { time: '0:3', note: 'G4', duration: '8n' },
  { time: '0:3:2', note: 'A4', duration: '2n' },
  { time: '2:0', note: 'A4', duration: '8n' },
  { time: '2:0:2', note: 'G4', duration: '8n' },
  { time: '2:1', note: 'F4', duration: '8n' },
  { time: '2:2', note: 'A4', duration: '8n' },
  { time: '2:2:2', note: 'G4', duration: '8n' },
  { time: '2:3', note: 'E4', duration: '8n' },
  { time: '2:3:2', note: 'F4', duration: '2n' },
  { time: '4:0', note: 'G4', duration: '8n' },
  { time: '4:0:2', note: 'F4', duration: '8n' },
  { time: '4:1', note: 'D4', duration: '8n' },
  { time: '4:2', note: 'F4', duration: '8n' },
  { time: '4:2:2', note: 'A4', duration: '8n' },
  { time: '4:3', note: 'G4', duration: '8n' },
  { time: '4:3:2', note: 'A4', duration: '2n' },
  { time: '5:2:2', note: 'G4', duration: '8n' },
  { time: '5:3', note: 'A4', duration: '8n' },
  { time: '5:3:2', note: 'B4', duration: '8n' },
  { time: '6:0', note: 'C5', duration: '8n' },
  { time: '6:1', note: 'B4', duration: '8n' },
  { time: '6:1:2', note: 'A4', duration: '8n' },
  { time: '6:2', note: 'B4', duration: '8n' },
  { time: '6:2:2', note: 'A4', duration: '8n' },
  { time: '6:3', note: 'G4', duration: '8n' },
  { time: '6:3:2', note: 'A4', duration: '1n' },
];

const synth2 = new Tone.Synth({
  oscillator: {
    volume: 5,
    count: 3,
    spread: 40,
    type: 'fatsawtooth',
  },
}).toDestination();

// const mainMelodyPart = new Tone.Part(function (time, note) {
//   synth2.triggerAttackRelease(note.note, note.duration, time);
// }, mainMelody).start(0);

const lowPass = new Tone.Filter({
  frequency: 8000,
}).toDestination();

// Snare Drum

const snareDrum = new Tone.NoiseSynth({
  noise: {
    type: 'white',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0.15,
    release: 0.03,
  },
}).connect(lowPass);

const snares: { time: Tone.Unit.Time }[] = [
  { time: '0:2' },
  { time: '1:2' },
  { time: '2:2' },
  { time: '3:2' },
  // { time: '4:2' },
  // { time: '5:2' },
  // { time: '6:2' },
  // { time: '7:2' },
];

const initSnarePart = (now: number = 0) =>
  new Tone.Part(function (time) {
    snareDrum.triggerAttackRelease('4n', time);
  }, snares).start(now);

// Kick Drum

const kickDrum = new Tone.MembraneSynth({
  volume: -10,
}).toDestination();

const kicks: { time: Tone.Unit.Time }[] = [
  { time: '0:0' },
  { time: '0:3:2' },
  { time: '1:1' },
  { time: '2:0' },
  { time: '2:1:2' },
  { time: '2:3:2' },
  // { time: '3:0:2' },
  // { time: '3:1:' },
  // { time: '4:0' },
  // { time: '4:3:2' },
  // { time: '5:1' },
  // { time: '6:0' },
  // { time: '6:1:2' },
  // { time: '6:3:2' },
  // { time: '7:0:2' },
  // { time: '7:1:' },
];

const initKickPart = (now: number = 0) =>
  new Tone.Part(function (time) {
    kickDrum.triggerAttackRelease('C1', '8n', time);
  }, kicks).start(now);

// Base Drum

const bassline = [
  { time: 0, note: 'A0', duration: '2n' },
  { time: '0:3', note: 'F1', duration: '2n.' },
  { time: '1:3', note: 'D1', duration: '2n.' },
  { time: '2:3', note: 'F1', duration: '1:1' },
];

// const distortion = new Tone.Distortion(0.8).toDestination();

const melodySynth = new Tone.Synth({
  oscillator: {
    type: 'triangle',
    volume: 10,
  },
}).toDestination();

const bassDrum = new Tone.MembraneSynth({
  oscillator: {
    volume: -5,
  },
}).toDestination();

const initBassPart = (now: number = 0) =>
  new Tone.Part(function (time, note) {
    bassDrum.triggerAttackRelease(note.note, note.duration, note.time);
  }, bassline).start(now);

const initMelodyPart = (binaries: number[], now: number = 0) => {
  const scale = addOctaveNumbers(AMinorScale, 3);

  const melodys = binaries
    .map((binary) => (binary === 1 ? '2n.' : '4n'))
    .map((duration, i, durations) => {
      const prevDurations = durations.slice(0, i);
      const time = prevDurations.reduce(
        (prev, curr) => prev + Tone.Time(curr).toSeconds(),
        now
      );
      return {
        note: scale[i],
        time,
        duration,
      };
    });

  console.log(binaries, melodys);

  return new Tone.Part(function (time, note) {
    melodySynth.triggerAttackRelease(note.note, note.duration, time);
  }, melodys).start(now);
};

export const initAudio = async () => await Tone.start();

export const toggleSoundPlay = async (
  binaries: number[],
  index: number,
  options?: {
    onStart?: () => void;
    onStop?: () => void;
  }
) => {
  if (typeof window !== 'undefined') {
    await Tone.start();
    const transport = Tone.Transport;
    transport.bpm.value = 150;
    // const now = Tone.now();Í

    if (Tone.Transport.state !== 'started') {
      initKickPart();
      initMelodyPart(binaries);
      initSnarePart();
      initBassPart();
      transport.start();
      options?.onStart?.();
    } else {
      transport.stop();
      options?.onStop?.();
    }
  }
};

export const stopSoundPlay = (onStop?: () => void) => {
  Tone.Transport.cancel();
  onStop?.();
};
