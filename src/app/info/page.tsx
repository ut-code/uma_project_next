"use client";

import Link from "next/link"
import { motion } from "framer-motion"
import { HomeIcon } from "lucide-react"
import { ArrowDown, Activity } from "lucide-react"
export default function Info() {
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
           Info Page
         </motion.h1>
          
         
       </motion.div>
       
       <motion.div
   initial={{ opacity: 0, rotateY: 0 }} // 初期状態
   animate={{ opacity: 1, rotateY: 360 }} // 360度のY軸回転
   transition={{ 
     delay: 0.7, 
     duration: 0.5, 
     type: "spring", 
     stiffness: 100, 
     damping: 10 
   }}
   className="mt-8 text-white text-center"
 >
 <ArrowDown className="w-8 h-8 mx-auto" />
   <p className="text-lg font-semibold">More Info</p>
 </motion.div>
 
 
 
 
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
       >
         <h2 className="text-2xl font-bold text-white mb-4">Welcome to Our Info Page</h2>
         <p className="text-white text-lg leading-relaxed">
         ここはインフォメーションページです。以下のリンクから予想に利用した馬やレースについての情報にアクセスすることができます。
         </p>
         <p className="text-white text-lg leading-relaxed mt-4">
           競馬AIでどのような情報を用いて予想を行なっているか詳しく知りたい場合は上記の&quot;Info Page&quot;からinformationページに飛んでください。
         </p>
         <p className="text-white text-lg leading-relaxed mt-4">
         <br></br>
        <Link 
            href="/info/horse" 
            className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
          >
            horse情報にアクセス
          </Link>
          <br></br>
          
          <Link 
            href="/info/race" 
            className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
          >
            race情報にアクセス
          </Link>          
        </p>
       </motion.div>
       
       
 
       <br></br>
     </div>
     </div>
  )
}
  
