

'use client'

import { useRaceContext } from "@/app/context/RaceContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion"
import { GraduationCap, ChevronDown, Flag, User, Clock, Scale, Trophy } from "lucide-react"

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl max-w-2xl w-full mx-4 mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <GraduationCap className="w-16 h-16 mx-auto text-white mb-6" />
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
            className="inline-block px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Go back to the Horse Page
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-8 text-white text-center"
      >
        <ChevronDown className="w-6 h-6 mx-auto mb-4 animate-bounce" />
        <p className="text-lg font-semibold">Learn More About The Horse</p>
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
            <InfoItem icon={Flag} label="コース" value={race.course} />
            <InfoItem  label="馬名" value={horse.horse} />
            <InfoItem icon={Trophy} label="着順" value={horse.rank} />
            <InfoItem icon={User} label="騎手名" value={horse.jockey} />
            <InfoItem icon={User} label="調教師名" value={horse.trainer} />
            <InfoItem icon={Clock} label="タイム" value={horse.time} />
          </div>
          <div className="space-y-4">
            <InfoItem icon={Scale} label="負担重量" value={`${horse.weight}kg`} />
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
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            詳細を見る
          </a>
        </div>
      </motion.div>
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