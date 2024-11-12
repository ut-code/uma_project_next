'use client'
import Link from 'next/link';
import { useEffect } from 'react';
import { useRaceContext } from '@/app/context/RaceContext';
import { motion } from "framer-motion"
import { Activity, ArrowDown, HomeIcon } from "lucide-react"
import { Flag } from "lucide-react"

export default function Home() {
  const { races, setRaces } = useRaceContext();

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

  return (<div>
    <div className="fixed top-4 left-4"> {/* 画面の左上に固定 */}
      <Link href="/" className="text-gray-800 hover:text-blue-600"> {/* ホームページへのリンク */}
        <HomeIcon className="w-8 h-8" /> {/* アイコンのサイズ設定 */}
      </Link>
    </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
      <br></br>
      <br></br>        <motion.div
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
          Race Information
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/info"
            className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
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
        <ArrowDown className="w-8 h-8 mx-auto" />
        <p className="text-lg font-semibold">Learn More About The Horses</p>
      </motion.div>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">レース一覧</h2>
          <div className="space-y-4">
            {races && races.length > 0 ? (
              races.map((raceData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="p-4 border border-green-300 rounded-lg shadow-md bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
                >
                  <Link href={`/info/race/${raceData.title}`} className="block">
                    <div className="flex items-center space-x-3">
                      <Flag className="w-5 h-5 text-green-50" />
                      <p className="text-lg font-semibold text-white">
                        {raceData.title}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white text-lg"
              >
                データを読み込み中...
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  )
}


