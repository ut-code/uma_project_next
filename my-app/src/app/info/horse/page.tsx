'use client'
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { useRaceContext } from '@/app/context/RaceContext';
import { div } from 'framer-motion/client';
import Link from 'next/link';
import { motion } from "framer-motion"
import { GraduationCap, ChevronDown } from "lucide-react"


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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">

              <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl max-w-2xl w-full mx-4"
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
              href="/info" 
              className="inline-block px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Go back to the Info Page
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-white text-center"
        >
          <ChevronDown className="w-6 h-6 mx-auto mb-4 animate-bounce" />
          <p className="text-lg font-semibold">Learn More About The Horses</p>
        </motion.div>
  
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
        >
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">馬一覧</div>
            <div>
      {races.length > 0 ? (
          races.map((raceData, index) => (
            <div className="p-3 border rounded-lg shadow-md bg-gray-100 max-w-lg mx-auto">
              
            <div key={index}>
              {raceData.horse?.map((horseData: { horse: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, horseIndex: Key | null | undefined) => (
                <div key={horseIndex}>
                  <Link href={`/info/horse/${index}?horseId=${horseIndex}`}>
                    {horseData.horse}
                  </Link>
                </div>
              ))}
            </div>

            </div>
          ))
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
        </div>
          </motion.div>
      
    </div>
  )
}
