

'use client'

import { useRaceContext } from "@/app/context/RaceContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion"
import {HomeIcon, Activity, ArrowDown, Flag, User, Clock, Scale, Trophy } from "lucide-react"

export default function Race({params}: {params: {id: number}}) {
  const { races, setRaces } = useRaceContext();
  const searchParams = useSearchParams();
  const horseId = searchParams.get('horseId');
  const race = races[params.id]
  const horse = race?.horse?.[Number(horseId)]
  
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
    return <p className="text-center text-white text-2xl mt-10">該当のレースが見つかりません。</p>;
  }

  return (
    <div>
    
    
    <div className="fixed top-4 left-4"> {/* 画面の左上に固定 */}
      <Link href="/" className="text-gray-800 hover:text-blue-600"> {/* ホームページへのリンク */}
        <HomeIcon className="w-8 h-8" /> {/* アイコンのサイズ設定 */}
      </Link>
    </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
    <br></br>
    <br></br>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-xl max-w-xl w-full mx-4"
 >
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
         >
           <Activity className="w-20 h-20 mx-auto text-white mb-6" />
         </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Horse Information
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link 
            href="/info/horse" 
            className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
          >
            Go back to the Horse Page
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-white text-center"
        >
          <ArrowDown className="w-8 h-8 mx-auto" />
                    <p className="text-lg font-semibold">Learn More About The Horses</p>
        </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-4xl w-full mx-4"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{race.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <InfoItem  label="コース" value={race.course} />
            <InfoItem  label="馬名" value={horse.horse} />
            <InfoItem  label="着順" value={horse.rank} />
            <InfoItem  label="騎手名" value={horse.jockey} />
            <InfoItem  label="調教師名" value={horse.trainer} />
            <InfoItem  label="タイム" value={horse.time} />
          </div>
          <div className="space-y-4">
            <InfoItem  label="負担重量" value={`${horse.weight}kg`} />
            <InfoItem label="枠" value={horse.waku} />
            <InfoItem label="馬番" value={horse.umaban} />
            <InfoItem label="性齢" value={horse.age} />
            <InfoItem label="着差" value={horse.margin} />
            <InfoItem label="コーナー通過順位" value={`${horse.corner.join('-')}`} />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <InfoItem label="推定上り" value={`${horse.f_time}秒`} />
          <InfoItem label="馬体重" value={`${horse.h_weight}kg (${horse.h_weight_zougen})`} />
          <InfoItem label="単勝人気" value={horse.pop} />
        </div>
        <div className="mt-8 text-center">
          <a 
            href={race.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-800 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            詳細を見る
          </a>
        </div>
      </motion.div>
    </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon?: React.ElementType, label: string, value: string | number }) {
  return (
    <div className="flex items-center space-x-3 text-white">
      {Icon && <Icon className="w-5 h-5 text-purple-300" />}
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  )
}