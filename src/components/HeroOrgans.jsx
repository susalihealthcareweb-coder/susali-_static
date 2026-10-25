
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

const HeroOrgansScene = dynamic(
  () => import('./HeroOrgansScene'),
  {
    ssr: false,
    loading: () => null,
  }
);

const ORGANS = [
  {
    key: 'heart',
    label: 'HEART',
    path: '/organs/heart.glb',
    image: '/organs/heart.webp',
  },
  {
    key: 'kidney',
    label: 'KIDNEYS',
    path: '/organs/kidney.glb',
    image: '/organs/kidney.webp',
  },
  {
    key: 'liver',
    label: 'LIVER',
    path: '/organs/liver.glb',
    image: '/organs/liver.webp',
  },
];

export default function HeroOrgans() {
  const [available, setAvailable] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      ORGANS.map(async ({ key, path }) => {
        try {
          const response = await fetch(path, {
            method: 'HEAD',
          });

          const contentType =
            response.headers.get('content-type') || '';

          return [
            key,
            response.ok &&
              !contentType.includes('text/html'),
          ];
        } catch {
          return [key, false];
        }
      })
    ).then((entries) => {
      if (!cancelled) {
        setAvailable(Object.fromEntries(entries));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasModel = (key) =>
    available?.[key] === true;

  const showCanvas =
    available &&
    Object.values(available).some(Boolean);

  return (
    <div
      className="susali-organ-stage"
      role="img"
      aria-label="Animated 3D heart, kidneys and liver"
    >
      {/* Soft medical glow */}
      <span
        className="susali-organ-aura"
        aria-hidden="true"
      />

      {/* Decorative orbit rings */}
      <span
        className="susali-organ-ring susali-organ-ring-one"
        aria-hidden="true"
      />

      <span
        className="susali-organ-ring susali-organ-ring-two"
        aria-hidden="true"
      />

      {/* Floating particles */}
      <span
        className="susali-organ-spark spark-one"
        aria-hidden="true"
      />

      <span
        className="susali-organ-spark spark-two"
        aria-hidden="true"
      />

      <span
        className="susali-organ-spark spark-three"
        aria-hidden="true"
      />

      {/* Real 3D GLB models */}
      {showCanvas && (
        <div
          className="susali-organ-webgl"
          aria-hidden="true"
        >
          <HeroOrgansScene
            available={available}
            reduceMotion={Boolean(reduceMotion)}
          />
        </div>
      )}

      {/* Animated 3D-rendered image fallback */}
      {ORGANS.filter(
        (organ) => !hasModel(organ.key)
      ).map(({ key, image }) => (
        <div
          key={key}
          className={
            `susali-organ-placeholder ` +
            `susali-organ-placeholder-${key}`
          }
          aria-hidden="true"
        >
          <Image
            src={image}
            alt=""
            fill
            priority={key === 'heart'}
            sizes="(max-width: 620px) 45vw, (max-width: 850px) 30vw, 230px"
            className="susali-organ-image"
          />
        </div>
      ))}

      {/* Organ labels */}
      {/* <span className="susali-organ-caption caption-heart">
        Heart
      </span>

      <span className="susali-organ-caption caption-kidney">
        Kidneys
      </span>

      <span className="susali-organ-caption caption-liver">
        Liver
      </span> */}
    </div>
  );
}
