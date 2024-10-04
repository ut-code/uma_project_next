'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRaceContext } from '@/app/context/RaceContext';


export default function Home() {
  const { races, setRaces } = useRaceContext();

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch('/api/race');
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
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
              <Link href={`/info/race/${index}`}>
                {raceData.title}
              </Link>
            </div>
          ))
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
    </div>
  )
}
