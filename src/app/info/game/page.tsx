'use client'
import { div, p } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function Game () {
  const [randomRaceData, setRandomRaceData] = useState<any[]>([])

  useEffect(() => {
    const fetchRandomRaceData = async() => {
      try {
        const response = await fetch('/api/game');
        if (!response.ok) {
          throw new Error(`HTTPのエラー: ${response.status}`);
        }
        const data = await response.json();
        console.log("取得したデータ:", data);
        setRandomRaceData(prevData => [...prevData, data]);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchRandomRaceData();
    fetchRandomRaceData();
    fetchRandomRaceData();
    console.log('randomRaceData:', randomRaceData)
    }, [])

    useEffect(() => {
      console.log('randomRaceData:', randomRaceData);
    }, [randomRaceData]);


  return(
    <div>
      { randomRaceData.length > 0 ? (
        randomRaceData.map((raceData, index) => (
          <div key={index}>
            <p>{raceData.title}</p>
            <p>{raceData.course}</p>
            <a href={raceData.url}>{raceData.url}</a>
          </div>
        ))
      ) : (
        <p>データを読み込み中...</p>
      )}
    </div>
  )
}