'use client'
import { useRaceContext } from "@/app/context/RaceContext";
import { useEffect } from "react";

export default function Race ({params}: {params: {id: number}}) {
  const { races, setRaces } = useRaceContext();
  const race = races[params.id]

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
  
  if (!race) {
    return <p>該当のレースが見つかりません。</p>;
  }

  return (
    <div>
      <h1>レース名:{race.title}</h1>
      <p>{race.course}</p>
      <a href={race.url}>{race.url}</a>
    </div>
  )
};