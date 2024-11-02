"use client";
import { div, p } from "framer-motion/client";
import { useEffect, useState } from "react";

import Link from "next/link"
import { HomeIcon, ArrowDown, Activity } from "lucide-react"
import { motion } from "framer-motion"
export default function gameStartPage() {
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
            <div>
            <div>
              <br></br>
              <div className="text-xl md:text-2xl font-bold text-white mb-4"
              >以下のレースデータをもとに予測を行ってください！</div>
              { randomRaceData.length > 0 ? (
                randomRaceData.map((raceData, index) => (
                  <div key={index}>
                    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 10}}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
    >
                    <p className="text-4xl md:text-2xl font-bold text-white mb-4"
                    >{raceData.title}</p>
                    <p className="text-4xl md:text-xl font-bold text-white mb-4"
                    >{raceData.course}</p>
                    <a href={raceData.url} className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200">{raceData.url}</a>
                    </motion.div>
                    <div>
        {raceData.horse.map((horse:any, index:any) => (
          <div key={index} >
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl  mx-4"
        >
                      <h3>{horse.horse}</h3>
                        
            <p>枠: {horse.waku}</p>
            <p>馬番: {horse.umaban}</p>
            <p>年齢: {horse.age}</p>
            <p>斤量: {horse.weight}</p>
            <p>騎手: {horse.jockey}</p>
            <p>タイム: {horse.time}</p>
            <p>差: {horse.margin || "なし"}</p>
            <p>馬体重: {horse.h_weight}kg</p>
            <p>増減: {horse.h_weight_zougen}kg</p>
            <p>上がり3Fタイム: {horse.f_time}</p>
            <p>調教師: {horse.trainer}</p>
            <p>人気: {horse.pop}</p>
            </motion.div>
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
            <div>
            
                予想入力欄
            </div>
            <div>
                結果表示欄(概説 スコア,AIの予測, それぞれの予測の一致率)
            </div>
            <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
       <br></br>
       <br></br>
       <motion.div 
         initial={{ opacity: 0, y: 0 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="text-center p-6 sm:p-8 bg-black bg-opacity-30 backdrop-blur-lg rounded-xl max-w-lg sm:max-w-2xl w-full mx-4"
       >
                予測入力のボタンが押されたらこれが表示されるようにしたい
                { randomRaceData.length > 0 ? (
                randomRaceData.map((raceData, index) => (
                  <div key={index}>
                    
                    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 10}}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
    >
                    <p className="text-4xl md:text-2xl font-bold text-white mb-4"
                    >{raceData.title}</p>
                    <p className="text-4xl md:text-xl font-bold text-white mb-4"
                    >{raceData.course}</p>
                    <a href={raceData.url} className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200">{raceData.url}</a>
                    </motion.div>
                    
                    <div>
        {raceData.horse.map((horse:any, index:any) => (
          <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3 className="text-xl md:text-xl font-bold text-white mb-4"
            >{horse.horse}</h3>
            <p className="text-xl md:text-xl font-bold text-white mb-4"
            >順位: {horse.rank}</p>            
                      </div>
        ))}
        </div>
                  </div>
                ))
              ) : (
                <p>データを読み込み中...</p>
              )}
              </motion.div>
            </div>
            </div>
            
            <Link 
                href="/game" 
                className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
                >
                retry
            </Link>
            
            
        </div>
        </div>
    )
}
