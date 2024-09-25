'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [races, setRaces] = useState([]);

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
              <p>{raceData}</p>
            </div>
          ))
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
    </div>
  )
}
