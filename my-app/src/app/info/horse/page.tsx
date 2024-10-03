'use client'
import { useState, useEffect } from 'react';

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
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch('/api/horse');
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
          races.map((raceData: horse, index) => (
            <div key={index}>
              <p>{raceData.horse}</p>
            </div>
          ))
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
    </div>
  )
}
