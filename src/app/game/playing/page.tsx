"use client";
import { useEffect, useState } from "react";
import { Activity, HomeIcon } from "lucide-react";
import { motion } from "framer-motion"
import Link from "next/link"

import type { Response } from "@/app/api/game/route";

export default function Page() {
    const [randomRaceData, setRandomRaceData] = useState<Response>()
    const [hp] = useState(20);
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");

    useEffect(() => {
        const fetchRandomRaceData = async () => {
            try {
                const response = await fetch('/api/game', {
                    method: "POST"
                });
                if (!response.ok) {
                    throw new Error(`HTTPのエラー: ${response.status}`);
                }
                const res: Response = await response.json();
                const { data } = res;
                setRandomRaceData(res);
                setFirst(data.horse[0].horse ?? "");
                setSecond(data.horse[1].horse ?? "");
                setThird(data.horse[2].horse ?? "");
            } catch (error) {
                console.error('データの取得に失敗しました:', error);
            }
        };
    
        fetchRandomRaceData();
    }, []);    

    function viewResult() {
        if (!randomRaceData) {
            alert("データが読み込まれていません")
            return;
        }
        console.log(first, second, third)
    };

    return (
        <div>
            <div>
                <div className="fixed top-4 left-4"> {/* 画面の左上に固定 */}
                    <Link href="/" className="text-gray-800 hover:text-blue-600"> {/* ホームページへのリンク */}
                        <HomeIcon className="w-8 h-8" /> {/* アイコンのサイズ設定 */}
                    </Link>
                </div>
                <div className="fixed bottom-3 right-3">
                    <p className="text-white">HP: {hp}</p>
                </div>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-green-900 to-green-600">
                    {(() => {
                        if (randomRaceData) {
                            return (
                                <div>
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
                                        <br></br>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 10 }}
                                            transition={{ delay: 1, duration: 0.5 }}
                                            className="mt-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
                                        >
                                            <p className="text-lg md:text-base font-bold text-white">ルール説明は<Link target="_blank" rel="noopener noreferrer" className="underline" href="/game/rule">こちら</Link></p>
                                        </motion.div>
                                        <div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 10 }}
                                                transition={{ delay: 1, duration: 0.5 }}
                                                className="mt-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
                                            >
                                                <p className="text-4xl md:text-2xl font-bold text-white mb-4">{randomRaceData.data.title}</p>
                                                <p className="text-4xl md:text-xl font-bold text-white mb-4">{randomRaceData.data.course}</p>
                                                <a href={randomRaceData.data.url} className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200">{randomRaceData.data.url}</a>
                                            </motion.div>
                                            {randomRaceData.data.horse.map((horse, index) => {
                                                return (
                                                    <div key={index} >
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 1, duration: 0.5 }}
                                                            className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl  mx-4"
                                                        >
                                                            <h3 className='text-xl font-bold text-white'>{horse.horse}</h3>
                                                            <div>
                                                                <p>枠: {horse.waku}</p>
                                                                <p>馬番: {horse.umaban}</p>
                                                                <p>年齢: {horse.age}</p>
                                                                <p>斤量: {horse.weight}</p>
                                                                <p>騎手: {horse.jockey}</p>
                                                                <p>タイム: {horse.time}</p>
                                                                <p>差: {horse.margin || "なし"}</p>
                                                                <p>馬体重: {horse.h_weight}kg</p>
                                                                <p>増減: {horse.h_weight_zougen}kg</p>
                                                                {/* <p>上がり3Fタイム: {horse.f_time}</p> */}
                                                                <p>調教師: {horse.trainer}</p>
                                                                <p>人気: {horse.pop}</p>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl max-w-2xl w-full mx-4"
                                    >
                                        <div>
                                            <p>予想をしてみよう</p>
                                            <div>
                                                <div>
                                                    <p>1位</p>
                                                    <select value={first} onChange={e => setFirst(e.target.value)}>
                                                        {randomRaceData.data.horse.map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <p>2位</p>
                                                    <select value={second} onChange={e => setSecond(e.target.value)}>
                                                        {randomRaceData.data.horse.map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <p>3位</p>
                                                    <select value={third} onChange={e => setThird(e.target.value)}>
                                                        {randomRaceData.data.horse.map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105"
                                                    onClick={viewResult}
                                                >答えを決定</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center p-10 bg-white bg-opacity-20 mt-6 backdrop-blur-lg rounded-xl max-w-2xl w-full mx-4"
                                    >
                                        <div>
                                            結果表示欄(概説 スコア,AIの予測, それぞれの予測の一致率)
                                        </div>
                                    </motion.div>
                
                                    <div id="result" className="hidden">
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-center p-6 sm:p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl max-w-lg sm:max-w-2xl w-full mx-4 mt-10"
                                        >
                                            <div className="text-white font-bold text-3xl">詳細解答</div>
                                            <div>
                                                <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 10 }}
                                                transition={{ delay: 1, duration: 0.5 }}
                                                className="mt-4 p-6 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl max-w-3xl  mx-4"
                                                >
                                                    <p className="text-2xl md:text-2xl font-bold text-white mb-4"
                                                    >{randomRaceData.data.title}</p>
                                                    <p className="text-xl md:text-xl font-bold text-white mb-4"
                                                    >{randomRaceData.data.course}</p>
                                                    <a href={randomRaceData.data.url} className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200">{randomRaceData.data.url}</a>
                                                </motion.div>
                                                <div className="mt-5">
                                                    {randomRaceData.data.horse.map((horse, index) => (
                                                        <div className="text-left" key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
                                                            <p className="text-xl md:text-xl font-bold text-white inline-block mr-2">{horse.rank}:</p>
                                                            <p className="text-xl md:text-xl font-bold text-white inline-block">{horse.horse}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <br />
                                    <Link
                                        href="/game"
                                        className="max-w-xl w-full text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105 mt-5"
                                    >
                                        次へ進む
                                    </Link>
                                    <br></br>
                                    <br></br>
                                </div>
                            )
                        } else {
                            return (
                                <p>データ読み込み中</p>
                            )
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}
