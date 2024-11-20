"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-xl max-w-xl w-full mx-4 mt-10"
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
          Welcome to 競馬AI
        </motion.h1>
      </motion.div>

      {/* Game Page Button */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl max-w-xl w-full mx-4 mt-8"
      >
        <Link
          href="/game"
          className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
        >
          Game Page
        </Link>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-4">About Our Site</h2>
        <p className="text-white text-lg leading-relaxed">
          競馬AIへようこそ。競馬AIは機械学習や人工知能（AI）の技術を利用して、競馬の予測や分析を行うシステムです。競馬は多くの要因（馬の能力、騎手の技術、コースのコンディション、天気など）が結果に影響を与えるため、競馬AIはそれらのデータを分析し、レースの結果を予測します。競馬AIの目的は、従来の人間の経験や勘に依存した予測を補完し、より正確な判断を行うことです。
        </p>
        <p className="text-white text-lg leading-relaxed mt-4">
          競馬AIでどのような情報を用いて予想を行なっているか詳しく知りたい場合は下記の&quot;Info Page&quot;から情報ページに飛んでください。
        </p>
      </motion.div>

      {/* Info Page Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <Link
          href="/info"
          className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
        >
          Info Page
        </Link>
      </motion.div>
    </div>
  );
}
