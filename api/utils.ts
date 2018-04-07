type NoiseRange = number | { low: number; high: number };

interface NoiseOptions {
  baserange: NoiseRange;
  spikerange?: NoiseRange;
  spikechance?: number;
}

function calculateNoise(n: number, r: NoiseRange) {
  let rt: number;
  let rb: number;
  if (typeof r === 'number') {
    rt = rb = r * n;
  } else {
    rt = r.high * n;
    rb = r.low * n;
  }
  return (rb + rt) * Math.random() - rb;
}

function calculateNoiseDelta(n: number, noiseOptions: NoiseOptions): number {
  let { baserange, spikechance = 0, spikerange = 0 } = noiseOptions;
  if (Math.random() > spikechance) {
    return calculateNoise(n, baserange);
  }
  return calculateNoise(n, baserange) + calculateNoise(n, spikerange);
}

export function valueWithNoise(n: number, noiseOptions: NoiseOptions | number): number {
  if (typeof noiseOptions === 'number') {
    return n + calculateNoiseDelta(n, { baserange: noiseOptions });
  } else {
    return n + calculateNoiseDelta(n, noiseOptions);
  }
}
