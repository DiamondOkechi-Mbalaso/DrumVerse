import { drumSynth } from './drumSynth';

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'buffering' | 'error';

class DrumHeroController {
  private bpm: number = 120;
  private state: PlaybackState = 'idle';
  private isMuted: boolean = true;
  private volume: number = 0.8;
  private intervalId: number | null = null;
  private current16thStep: number = 0;
  private listeners: Set<(state: PlaybackState, step: number, isMuted: boolean) => void> = new Set();

  public subscribe(cb: (state: PlaybackState, step: number, isMuted: boolean) => void) {
    this.listeners.add(cb);
    cb(this.state, this.current16thStep, this.isMuted);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.state, this.current16thStep, this.isMuted));
  }

  public getState() {
    return {
      state: this.state,
      isMuted: this.isMuted,
      volume: this.volume,
      step: this.current16thStep,
      bpm: this.bpm,
    };
  }

  public enableAudioAndPlay() {
    drumSynth.ensureUnlocked();
    this.isMuted = false;
    drumSynth.setMuted(false);
    drumSynth.setVolume(this.volume);
    this.play();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    drumSynth.setMuted(this.isMuted);
    this.notify();
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    drumSynth.setVolume(this.volume);
  }

  public play() {
    if (this.state === 'playing') return;
    drumSynth.ensureUnlocked();
    this.state = 'playing';

    // 16th note interval at 120 BPM: (60 / 120 / 4) * 1000 = 125ms
    const stepDuration = (60 / this.bpm / 4) * 1000;

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      this.tick();
    }, stepDuration);

    this.notify();
  }

  public pause() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state = 'paused';
    this.notify();
  }

  public stop() {
    this.pause();
    this.current16thStep = 0;
    this.state = 'idle';
    this.notify();
  }

  // 16-Step Classic Studio Rock Groove:
  // Step 0: Kick, Closed Hi-Hat, Crash (on step 0)
  // Step 2: Hi-Hat
  // Step 4: Snare, Hi-Hat
  // Step 6: Hi-Hat
  // Step 8: Kick, Hi-Hat
  // Step 10: Kick (syncopated), Hi-Hat
  // Step 12: Snare, Hi-Hat
  // Step 14: Hi-Hat (open on step 14!)
  private tick() {
    const s = this.current16thStep;

    if (!this.isMuted) {
      // Hi-Hats every 2 16th notes (8th notes: 0, 2, 4, 6, 8, 10, 12, 14)
      if (s % 2 === 0) {
        drumSynth.playHiHat(s === 14); // open hi-hat right before bar repeats
      }

      // Kick drum on 0, 8, 10
      if (s === 0 || s === 8 || s === 10) {
        drumSynth.playKick();
      }

      // Snare drum on 4 and 12 (Beats 2 and 4)
      if (s === 4 || s === 12) {
        drumSynth.playSnare();
      }

      // Accent Crash on step 0 every 4 bars
      // Optional subtle ghost snare on 15
      if (s === 15) {
        drumSynth.playSnare(0, 0.25);
      }
    }

    this.current16thStep = (s + 1) % 16;
    this.notify();
  }
}

export const drumHeroController = new DrumHeroController();
