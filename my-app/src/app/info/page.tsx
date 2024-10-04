"use client";

import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap, HomeIcon } from "lucide-react"

export default function Info() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-500">
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
          Info Page
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </Link>
        </motion.div>
      </motion.div>

      <br></br>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl max-w-2xl w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to Our Info Page</h2>
        <p className="text-white text-lg leading-relaxed">
          ここはインフォメーションページです。以下のリンクから予想に利用した馬やレースについての情報にアクセスすることができます。
        </p>
        <p className="text-white text-lg leading-relaxed mt-4">
        <Link 
            href="/info/horse" 
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            horse情報にアクセス
          </Link>
          <br></br>
          <br></br>
          <Link 
            href="/info/race" 
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            race情報にアクセス
          </Link>          
        </p>
      </motion.div>
    </div>
  )
}
  
