'use client'
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { useRaceContext } from '@/app/context/RaceContext';
import { div } from 'framer-motion/client';
import Link from 'next/link';

interface horse {
  rank?: number;
  wake?: string;
  umaban?: number;
  horse?: string;
  age?: string;
  weight?: string;
  jockey?: string;
  time?: string;
  margin?: string;
  h_weight?: number;
  h_weight_zougen?: number;
  f_time?: string;
  trainer?: string;
  pop?: string;
  corner?: object;
}

export default function Home() {
  const { races, setRaces } = useRaceContext();

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch('/api/race');
        if (!response.ok) {
          throw new Error(`HTTPのエラー: ${response.status}`);
        }
        const data = await response.json();
        console.log("取得したデータ:", data);
        setRaces(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchRaceData();
  }, []);

  return (
    <div>
      <div>
      {races.length > 0 ? (
          races.map((raceData, index) => (
            <div key={index}>
              {raceData.horse?.map((horseData: { horse: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, horseIndex: Key | null | undefined) => (
                <div key={horseIndex}>
                  <Link href={`/info/horse/${index}?horseId=${horseIndex}`}>
                    {horseData.horse}
                  </Link>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
    </div>
  )
}
