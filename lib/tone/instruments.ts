import * as Tone from 'tone';

export class Instrument {
  static createCymbal() {
    return new Tone.MetalSynth({
      //   frequency: 300,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01,
      },
      harmonicity: 0.1,
      modulationIndex: 0,
      resonance: 6000,
      octaves: 1.5,
    }).toDestination();
  }
  static createClap() {
    return new Tone.NoiseSynth({
      noise: {
        type: 'white',
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
      },
    }).toDestination();
  }
  static createKick() {
    return new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 10,
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: 'exponential',
      },
    }).toDestination();
  }
}
