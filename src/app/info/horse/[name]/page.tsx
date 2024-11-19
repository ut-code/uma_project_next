"use client"
import { useEffect, useState } from "react"
import { Activity, ArrowDown, HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import type { Response } from "@/app/api/horse/route"

export default function Page({ params }: { params: { name: string } }) {
    const name = decodeURIComponent(params.name);
    const [races, setRaces] = useState<Response>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/horse")
            if (response.ok) {
                const data: Response = await response.json();
                setRaces(data);
            }
        }
        fetchData()
    }, [])

    return races && races[name] ? (
        <div>
            {(() => {
                const data = races[name];
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
                                    Horse Information
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Link
                                        href="/info/horse"
                                        className="flex justify-center items-center text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 w-1/2 mx-auto transition transform hover:scale-105"
                                    >
                                        Go back to the Horse Page
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
                                className="p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-4xl w-full mx-4"
                            >
                                <h2 className="text-3xl font-bold text-white mb-6 text-center">{name}</h2>
                                {data.map((horse, index) => (
                                    <div key={index}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[80px]">
                                            <div className="space-y-4">
                                                <InfoItem label="レース名" value={horse.title} />
                                                <InfoItem label="着順" value={horse.rank} />
                                                <InfoItem label="騎手名" value={horse.jockey} />
                                                <InfoItem label="調教師名" value={horse.trainer} />
                                                <InfoItem label="タイム" value={horse.time} />
                                                <InfoItem label="負担重量" value={`${horse.weight}kg`} />
                                                <InfoItem label="枠" value={horse.waku} />
                                                <InfoItem label="馬番" value={horse.umaban} />
                                            </div>
                                            <div className="space-y-4">
                                                <InfoItem label="性齢" value={horse.age} />
                                                <InfoItem label="着差" value={horse.margin} />
                                                <InfoItem label="コーナー通過順位" value={`${horse.corner.join('-')}`} />
                                                <InfoItem label="推定上り" value={`${horse.f_time}秒`} />
                                                <InfoItem label="馬体重" value={`${horse.h_weight}kg (${horse.h_weight_zougen})`} />
                                                <InfoItem label="単勝人気" value={horse.pop} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                )
            })()}
        </div>
    ) : (
        <div>
            <p>データが見つかりませんでした。</p>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon?: React.ElementType, label: string, value: string | number }) {
    return (
      <div className="flex items-center space-x-3 text-white">
        {Icon && <Icon className="w-5 h-5 text-purple-300" />}
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
      </div>
    )
}
