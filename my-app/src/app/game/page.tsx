"use client";

import Link from "next/link"
import { HomeIcon, ArrowDown, Activity } from "lucide-react"
import { motion } from "framer-motion"
import { div, p } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function Game() {
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
            <div className="fixed top-4 left-4"> {/* 画面の左上に固定 */}
            <Link href="/" className="text-gray-800 hover:text-blue-600"> {/* ホームページへのリンク */}
                <HomeIcon className="w-8 h-8" /> {/* アイコンのサイズ設定 */}
            </Link>
            </div>

       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
       <br></br>
       <br></br>
       <motion.div 
         initial={{ opacity: 0, y: 0 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
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
           transition={{ delay: 0.2, duration: 0.3 }}
         >
           VS AI
         </motion.h1>
          
         
       </motion.div>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
       >
         <h2 className="text-2xl font-bold text-white mb-4">ルール説明</h2>
         <p className="text-white text-lg leading-relaxed">
                  </p>ここにルールを書く、以下からゲームへ
         <p className="text-white text-lg leading-relaxed mt-4">      
        </p>
       </motion.div>
            
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
      >
            <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center p-4"
            >
            <Link 
            href="/game/game_start" 
            className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
            >
                Start VS AI
            </Link>
            
        </motion.div>
        </motion.div>
        </div>
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
        </div>
    )
}
