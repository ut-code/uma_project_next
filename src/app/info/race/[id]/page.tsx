'use client'
import { useRaceContext } from "@/app/context/RaceContext";
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { div } from 'framer-motion/client';
import Link from 'next/link';
import { motion } from "framer-motion"
import { Activity, ArrowDown, HomeIcon } from "lucide-react"
import { Flag, Link as LinkIcon } from "lucide-react"

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
              href="/info/race" 
              className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
            >
              Go back to the Race Page
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
          <p className="text-lg font-semibold">Learn More About The Races</p>
        </motion.div>
  
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
    >
      <div className="text-white">
        <h3 className="text-3xl font-bold mb-6 text-center">{race.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-green-50" />
              <span className="font-semibold"></span>
              <span>{race.course}</span>
            </div>
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-5 h-5 text-green-50" />
              <span className="font-semibold">詳細:</span>
              <Link 
                href={race.url} 
                className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                レース情報を見る
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-green-700 bg-opacity-50 p-4 rounded-lg"
            >
              <h4 className="text-lg font-semibold mb-2">レース概要</h4>
              <p className="text-sm">
                このレースは{race.course}で行われる{race.title}です。
                詳細な情報は公式サイトでご確認ください。
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      </motion.div>
      </div>
      </div>
  )
};