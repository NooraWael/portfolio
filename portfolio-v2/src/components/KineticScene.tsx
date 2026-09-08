import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function randomFactory(seed = 481516) {
  let value = seed >>> 0;
  return () => ((value = (Math.imul(1664525, value) + 1013904223) >>> 0) / 4294967296);
}

function makeSculpture(count: number, random: () => number) {
  const data = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const family = index % 3;
    const turn = random() * Math.PI * 2;
    const phase = family * 2.08;
    const tube = (random() - 0.5) * (0.38 - family * 0.055);
    const curl = turn * (2 + family * 0.5) + phase;
    const radius = 1.55 + 0.26 * Math.sin(turn * 3 + phase) + family * 0.14;
    data[index * 3] = Math.cos(turn + phase * 0.055) * radius + Math.cos(curl) * tube;
    data[index * 3 + 1] = Math.sin(turn * 1.08 + phase * 0.08) * (0.92 + family * 0.16) + Math.sin(curl) * tube;
    data[index * 3 + 2] = Math.sin(turn * 2 + phase) * (0.58 + family * 0.1) + (random() - 0.5) * 0.24;
  }
  return data;
}

function makeLetters(count: number, random: () => number) {
  const canvas = document.createElement('canvas');
  canvas.width = 1100;
  canvas.height = 430;
  const context = canvas.getContext('2d');
  if (!context) return new Float32Array(count * 3);
  context.fillStyle = '#fff';
  context.font = '900 330px Arial Black, Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('NQ.', 550, 220);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const samples: [number, number][] = [];
  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      if (pixels[(y * canvas.width + x) * 4 + 3] > 120) samples.push([x, y]);
    }
  }
  const data = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const point = samples[Math.floor(random() * samples.length)];
    data[index * 3] = (point[0] / canvas.width - 0.5) * 5.1;
    data[index * 3 + 1] = -(point[1] / canvas.height - 0.5) * 2;
    data[index * 3 + 2] = (random() - 0.5) * 0.12;
  }
  return data;
}

export default function KineticScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;
    const host = mount.current;
    const count = window.innerWidth < 700 ? 7000 : 18000;
    const random = randomFactory();
    const sculpture = makeSculpture(count, random);
    const letters = makeLetters(count, random);
    const positions = new Float32Array(sculpture);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 7.4;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const colors = new Float32Array(count * 3);
    const cream = new THREE.Color('#f4efe9');
    const cobalt = new THREE.Color('#0501de');
    const orange = new THREE.Color('#fc5100');
    for (let index = 0; index < count; index += 1) {
      const color = index % 41 === 0 ? orange : index % 17 === 0 ? cobalt : cream;
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uSize: { value: window.innerWidth < 700 ? 1.85 : 1.45 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.6) } },
      vertexShader: 'uniform float uSize; uniform float uPixelRatio; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=uSize*uPixelRatio*(9./-mv.z);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'varying vec3 vColor;void main(){float d=distance(gl_PointCoord,vec2(.5));float a=smoothstep(.48,.12,d);gl_FragColor=vec4(vColor,a*.72);}',
    });
    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.12;
    scene.add(points);

    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;
    let animationFrame = 0;
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / innerWidth - 0.5;
      pointerY = event.clientY / innerHeight - 0.5;
    };
    const onScroll = () => {
      const section = host.closest('.grain-story');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - innerHeight);
      scrollProgress = Math.min(1, Math.max(0, -rect.top / distance));
    };
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const render = (time: number) => {
      const morph = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      const array = geometry.attributes.position.array as Float32Array;
      for (let index = 0; index < count; index += 1) {
        const point = index * 3;
        const breath = Math.sin(time * 0.00055 + index * 0.013) * 0.016 * (1 - morph);
        array[point] = THREE.MathUtils.lerp(sculpture[point], letters[point], morph) + breath;
        array[point + 1] = THREE.MathUtils.lerp(sculpture[point + 1], letters[point + 1], morph) + breath;
        array[point + 2] = THREE.MathUtils.lerp(sculpture[point + 2], letters[point + 2], morph);
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y += (pointerX * 0.3 - points.rotation.y) * 0.035;
      points.rotation.x += (-0.12 + pointerY * 0.12 - points.rotation.x) * 0.035;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      host.replaceChildren();
    };
  }, []);

  return <div className="particle-field"><div className="particle-canvas" ref={mount} /></div>;
}
