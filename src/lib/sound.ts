import { Howl } from 'howler'

const SAMPLE_RATE = 44100

type ToneShape = 'sine' | 'triangle' | 'square'

interface ToneSpec {
  freqStart: number
  freqEnd?: number
  duration: number
  shape?: ToneShape
  gain?: number
  noiseMix?: number
}

function shapeSample(shape: ToneShape, phase: number): number {
  const p = phase % 1
  switch (shape) {
    case 'triangle':
      return 4 * Math.abs(p - 0.5) - 1
    case 'square':
      return p < 0.5 ? 1 : -1
    default:
      return Math.sin(2 * Math.PI * p)
  }
}

function synthesizeWav(spec: ToneSpec): ArrayBuffer {
  const { freqStart, freqEnd = freqStart, duration, shape = 'sine', gain = 0.35, noiseMix = 0 } = spec
  const numSamples = Math.floor(SAMPLE_RATE * duration)
  const data = new Int16Array(numSamples)
  let phase = 0

  for (let i = 0; i < numSamples; i++) {
    const t = i / numSamples
    const freq = freqStart + (freqEnd - freqStart) * t
    phase += freq / SAMPLE_RATE

    const envelope = Math.sin(Math.PI * t) ** 0.6
    const tone = shapeSample(shape, phase)
    const noise = noiseMix > 0 ? (Math.random() * 2 - 1) * noiseMix : 0

    const sample = (tone * (1 - noiseMix) + noise) * envelope * gain
    data[i] = Math.max(-1, Math.min(1, sample)) * 0x7fff
  }

  const blockAlign = 2
  const byteRate = SAMPLE_RATE * blockAlign
  const buffer = new ArrayBuffer(44 + data.byteLength)
  const view = new DataView(buffer)

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeStr(0, 'RIFF')
  view.setUint32(4, 36 + data.byteLength, true)
  writeStr(8, 'WAVE')
  writeStr(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, SAMPLE_RATE, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, 16, true)
  writeStr(36, 'data')
  view.setUint32(40, data.byteLength, true)

  new Int16Array(buffer, 44).set(data)
  return buffer
}

function toneToBlobUrl(spec: ToneSpec): string {
  const buffer = synthesizeWav(spec)
  const blob = new Blob([buffer], { type: 'audio/wav' })
  return URL.createObjectURL(blob)
}

export type SfxName = 'hover' | 'click' | 'whoosh' | 'ambient' | 'toggle'

class SoundEngine {
  private howls = new Map<SfxName, Howl>()
  private muted = true
  private ambientId: number | null = null

  constructor() {
    this.register('hover', { freqStart: 720, freqEnd: 980, duration: 0.09, shape: 'sine', gain: 0.14 })
    this.register('click', { freqStart: 260, freqEnd: 140, duration: 0.14, shape: 'triangle', gain: 0.28 })
    this.register('toggle', { freqStart: 440, freqEnd: 660, duration: 0.2, shape: 'sine', gain: 0.22 })
    this.register('whoosh', { freqStart: 180, freqEnd: 40, duration: 0.9, shape: 'sine', gain: 0.2, noiseMix: 0.35 })
    this.register('ambient', { freqStart: 55, freqEnd: 58, duration: 6, shape: 'sine', gain: 0.05, noiseMix: 0.06 })
  }

  private register(name: SfxName, spec: ToneSpec) {
    const src = toneToBlobUrl(spec)
    const howl = new Howl({ src: [src], format: ['wav'], loop: name === 'ambient', volume: name === 'ambient' ? 0.4 : 0.6 })
    this.howls.set(name, howl)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (muted) {
      this.stopAmbient()
    }
  }

  play(name: SfxName) {
    if (this.muted) return
    const howl = this.howls.get(name)
    howl?.play()
  }

  startAmbient() {
    if (this.muted || this.ambientId !== null) return
    const howl = this.howls.get('ambient')
    if (howl) this.ambientId = howl.play()
  }

  stopAmbient() {
    const howl = this.howls.get('ambient')
    if (howl && this.ambientId !== null) {
      howl.stop(this.ambientId)
      this.ambientId = null
    }
  }
}

export const soundEngine = new SoundEngine()
