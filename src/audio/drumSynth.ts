/**
 * Studio-Grade Web Audio Drum Synthesizer for DRUMVERSE
 * Uses physical-modeling synthesis and noise burst filtering
 * to generate acoustic and electronic drum sounds with zero network latency.
 */

class DrumAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public ensureUnlocked() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : clamped, this.ctx.currentTime);
    }
  }

  // --- INDIVIDUAL INSTRUMENT SYNTHESIS ---

  // 1. Kick Drum: Pitch sweep sine wave with punch transient
  public playKick(timeOffset = 0, pitchMod = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 145 * pitchMod;
    const endFreq = 38 * pitchMod;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.12);

    // Click click transient
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.46);
  }

  // 2. Snare Drum: Tuned body tone + high-passed noise burst
  public playSnare(timeOffset = 0, snap = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;

    // Snare tone body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(185, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.08);

    oscGain.gain.setValueAtTime(0.7 * snap, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.2);

    // Snare wire rattle noise
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(950, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85 * snap, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.26);
  }

  // 3. Hi-Hat: Metallic high-frequency filtered noise (closed or open)
  public playHiHat(open = false, timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const duration = open ? 0.38 : 0.07;

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(8500, t);
    bandpass.Q.setValueAtTime(3.5, t);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(7000, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration + 0.01);
  }

  // 4. Toms: Resonant decaying sine waves with pitch drop
  public playTom(pitch: 'high' | 'mid' | 'floor' = 'mid', timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const freqs = {
      high: { start: 200, end: 110, dur: 0.35 },
      mid: { start: 160, end: 85, dur: 0.42 },
      floor: { start: 115, end: 60, dur: 0.55 }
    };
    const cfg = freqs[pitch];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(cfg.start, t);
    osc.frequency.exponentialRampToValueAtTime(cfg.end, t + cfg.dur);

    gain.gain.setValueAtTime(0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + cfg.dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + cfg.dur + 0.01);
  }

  // 5. Crash Cymbal: Dense explosive high-frequency shimmering wash
  public playCrash(timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const duration = 1.6;

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.85, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration + 0.01);
  }

  // 6. Ride Cymbal: Clear ping attack with subtle wash
  public playRide(timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const duration = 1.1;

    // Metallic ping oscillator
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200, t);
    oscGain.gain.setValueAtTime(0.4, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.26);

    // Shimmering wash
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(7500, t);
    filter.Q.setValueAtTime(4, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.45, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration + 0.01);
  }

  // 7. World Percussion: Cajon (Bass vs Slap)
  public playCajon(type: 'bass' | 'slap' = 'bass', timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;

    if (type === 'bass') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(95, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.2);
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.36);
    } else {
      // Crisp corner slap
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.06);
      oscGain.gain.setValueAtTime(0.8, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.13);
    }
  }

  // 8. World Percussion: Conga (Open tone vs Slap)
  public playConga(tone: 'open' | 'slap' = 'open', timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freq = tone === 'open' ? 245 : 390;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.75, t + (tone === 'open' ? 0.28 : 0.08));

    gain.gain.setValueAtTime(0.95, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (tone === 'open' ? 0.32 : 0.12));

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // 9. Studio Metronome Click (High pitch downbeat accent vs regular click)
  public playMetronomeClick(isAccent = false, timeOffset = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1350 : 850, t);

    gain.gain.setValueAtTime(isAccent ? 0.75 : 0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Generic dispatcher for instrument cards
  public playInstrumentSound(soundType: string) {
    switch (soundType) {
      case 'kick':
        this.playKick();
        break;
      case 'snare':
        this.playSnare();
        break;
      case 'hihat':
        this.playHiHat(false);
        break;
      case 'tom':
        this.playTom('mid');
        break;
      case 'crash':
        this.playCrash();
        break;
      case 'ride':
        this.playRide();
        break;
      case 'cajon':
        this.playCajon('slap');
        break;
      case 'conga':
        this.playConga('open');
        break;
      default:
        this.playSnare();
        break;
    }
  }
}

export const drumSynth = new DrumAudioEngine();
