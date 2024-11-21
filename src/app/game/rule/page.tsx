"use client";

import Link from "next/link"
import { motion } from "framer-motion"
import { HomeIcon } from "lucide-react";

export default function Page() {
    return (
        <div>
            <title key="title">ゲームルール / 競馬AI</title>
            <div className="fixed top-4 left-4"> {/* 画面の左上に固定 */}
                <Link href="/game" className="text-gray-800 hover:text-blue-600"> {/* ホームページへのリンク */}
                    <HomeIcon className="w-8 h-8" /> {/* アイコンのサイズ設定 */}
                </Link>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 10 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
                >
                    <p className="text-xl md:text-2xl font-bold text-white mb-4">ルール説明</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">HPがゼロになるまでAI相手と予想勝負をしてもらいます。</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">あなたとAIそれぞれに1位2位3位を予想してもらいます。</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">ポイント配分は1つあっていた場合5pt、2つは8pt、3つあっていた場合は18ptです。</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">AIのポイントからあなたのポイントを引いた数をあなたのHPにプラスします。</p>
                    <p className="text-sm md:text-xs font-bold text-white mb-4">上記の予想勝負をHPをゼロになるまで繰り返えします。</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">またこのゲームにはスコア機能がありターンが進むごとにスコアがプラスされます。</p>
                    <p className="text-lg md:text-base font-bold text-white mb-4">そしてゲーム終了時のスコアがランキング上位だった場合はスコアボードに名前を載せることが出来ます。</p>
                    <p className="text-3xl md:text-xl font-bold text-white mb-4">ハイスコア目指して頑張ってください!!!!!!!</p>
                </motion.div>
            </div>
        </div>
    )
}
