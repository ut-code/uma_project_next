"use client";

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { Response } from "@/app/api/ranking/route";

export default function Page() {
    const [datas, setDatas] = useState<Response>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/ranking", {
                method: "GET",
            })
            if (!response.ok) {
                alert("データの取得に失敗しました。再ロードしてください");
                return;
            }
            const json: Response = await response.json();
            setDatas(json);
        };
        fetchData();
    }, [])

    return (
        <div>



         




            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
                <br></br>
          <br></br>
              <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-xl max-w-xl w-full mx-4"
        >


            <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Ranking
          </motion.h1>

          </motion.div>



          <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl w-full mx-auto"
    >
        <div className="space-y-6">
                
                {datas.map((data, _index) => (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="p-4 rounded-lg shadow-md bg-white bg-opacity-20 backdrop-blur-sm"
                    key={_index}>
                    <div key={_index}>
                    <div className="flex space-x-4">
                        <p className="text-2xl font-extrabold text-green-900">score</p>
                        <p className="text-2xl font-extrabold ">{data.score}</p>
                          
                    </div>
                    <div className="flex space-x-4">
                        <p className="text-xl font-bold text-green-900">player</p>  
                        <p className="text-xl font-bold ">{data.name}</p>    
                    </div>
                    </div>
                    </motion.div>
                ))}
</div>
</motion.div>
            </div>
        </div>
    )
}
