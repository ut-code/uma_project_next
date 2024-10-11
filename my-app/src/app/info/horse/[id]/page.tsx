'use client'
import { useRaceContext } from "@/app/context/RaceContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Race ({params}: {params: {id: number}}) {
  const { races, setRaces } = useRaceContext();
  const searchParams = useSearchParams();
  const horseId = searchParams.get('horseId');
  const race = races[params.id]
  const horse = race.horse?.[Number(horseId)]
  
  useEffect(() => {
    const savedRaces = localStorage.getItem('races');
    if (savedRaces) {
      setRaces(JSON.parse(savedRaces));
    }
  }, [setRaces]);

  useEffect(() => {
    if (races.length > 0) {
      localStorage.setItem('races', JSON.stringify(races));
    }
  }, [races]);
  if (!race || !horse) {
    return <p>該当のレースが見つかりません。</p>;
  }

  return (
    <div>
      <h1>レース情報</h1>
      <p>レース名:{race.title}</p>
      <p>{race.course}</p>
      <a href={race.url}>{race.url}</a>
      
      <p>馬名:{horse.horse}</p>
      <p>着順:{horse.rank}</p>
      <p>枠:{horse.waku}</p>
      <p>馬番:{horse.umaban}</p>
      <p>性齢:{horse.age}</p>
      <p>負担重量:{horse.weight}</p>
      <p>騎手名:{horse.jockey}</p>
      <p>タイム:{horse.time}</p>
      <p>着差:{horse.margin}</p>
      <p>コーナー通過順位:{horse.corner[0]}{horse.corner[1]}{horse.corner[2]}{horse.corner[3]}</p>
      <p>推定上り:{horse.f_time}</p>
      <p>馬体重:{horse.h_weight}</p>
      <p>体重増減:{horse.h_weight_zougen}</p>
      <p>調教師名:{horse.trainer}</p>
      <p>単勝人気:{horse.pop}</p>
    </div>
  )
};