"use client";

import Link from "next/link"
import { Activity, HomeIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function Game() {
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
          <h1 className="text-2xl font-bold text-white mb-4">ルール説明</h1>
          <p className="text-lg md:text-base font-bold text-white mb-4">HPがゼロになるまでAI相手と予想勝負をしてもらいます。</p>
          <p className="text-lg md:text-base font-bold text-white mb-4">あなたとAIそれぞれに1位2位3位を予想してもらいます。</p>
          <p className="text-lg md:text-base font-bold text-white mb-4">ポイント配分は1つあっていた場合5pt、2つは8pt、3つあっていた場合は18ptです。</p>
          <p className="text-lg md:text-base font-bold text-white mb-4">AIのポイントからあなたのポイントを引いた数をあなたのHPにプラスします。</p>
          <p className="text-sm md:text-xs font-bold text-white mb-4">上記の予想勝負をHPをゼロになるまで繰り返えします。</p>
          <p className="text-lg md:text-base font-bold text-white mb-4">またこのゲームにはスコア機能がありターンが進むごとにスコアがプラスされます。</p>
          <p className="text-lg md:text-base font-bold text-white mb-4">そしてゲーム終了時のスコアがランキング上位だった場合はスコアボードに名前を載せることが出来ます。</p>
          <p className="text-3xl md:text-xl font-bold text-white mb-4">ハイスコア目指して頑張ってください!!!!!!!</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
        >
          <h1 className="text-2xl font-bold text-white mb-4">ランキング</h1>
          <p className="text-lg md:text-base font-bold text-white  mb-4">ランキングは<Link href="/game/ranking" target="_blank" rel="noopener noreferrer" className=" font-black underline text-blue-800">こちら</Link>から見ることが出来ます。</p>
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
              href="/game/playing"
              className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
            >
              Start VS AI
            </Link>

          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
