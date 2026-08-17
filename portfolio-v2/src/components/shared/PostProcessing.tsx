import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { Vector2 } from 'three';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.9} intensity={0.3} mipmapBlur />
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
      <Noise opacity={0.08} />
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  );
}
