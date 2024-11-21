"use client";
import { useEffect, useState } from "react";
import { Activity, HomeIcon } from "lucide-react";
import { motion } from "framer-motion"
import Link from "next/link"

import type { Horse, Response } from "@/app/api/game/route";
import type { RankingApiResponse } from "@/app/api/ranking/route";

export default function Page() {
    const [randomRaceData, setRandomRaceData] = useState<Response>()
    const [hp, setHp] = useState(20);
    const [score, setScore] = useState(0);
    const [showRankingPanel, setShowRankingPanel] = useState(false);
    const [username, setUsername] = useState("");
    const [nextStage, setNextStage] = useState(false);
    const [viewInfo, setViewInfo] = useState<string[]>([]);
    const [userPt, setUserPt] = useState(0);
    const [aiPt, setAiPt] = useState(0);
    const [aiPredictionResult, setAiPredictionResult] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [aiFirst, setAiFirst] = useState("");
    const [aiSecond, setAiSecond] = useState("");
    const [aiThird, setAiThird] = useState("");

    useEffect(() => {
        fetchRandomRaceData();
    }, []);

    async function fetchRandomRaceData() {
        try {
            const response = await fetch('/api/game', {
                method: "POST"
            });
            if (!response.ok) {
                throw new Error(`HTTPのエラー: ${response.status}`);
            }
            const res: Response = await response.json();
            const { prediction } = res;
            setRandomRaceData(res);

            setAiFirst(prediction.horse[0].name ?? "")
            setAiSecond(prediction.horse[1].name ?? "")
            setAiThird(prediction.horse[2].name ?? "")
        } catch (error) {
            console.error('データの取得に失敗しました:', error);
        }
    };

    function getTop3(horses: Horse[]) {
        const result = ["", "", ""];
        for (const horse of horses) {
            if (horse.rank <= 3) {
                result[horse.rank - 1] = horse.horse;
            }
        }
        return result;
    }
    function getPT(f: string, s: string, t: string) {
        if (!randomRaceData) {
            alert("データが読み込まれていません")
            return 0;
        }
        let pt = 0;
        const top3 = getTop3(randomRaceData.data.horse);
        const same: string[] = [];
        if (top3[0] === f) same.push(f)
        if (top3[1] === s) same.push(s)
        if (top3[2] === t) same.push(t)
        switch (same.length) {
            case 3:
                pt += 10;
            case 2:
                pt += 5;
            case 1:
                pt += 3;
        }
        return pt
    }

    function culcHp(user: number, ai: number): number {
        const minus = user - ai;
        const content = hp - minus;
        if (content > 20) {
            return 20;
        }
        if (0 > content) {
            return 0;
        }
        return content;
    }

    function viewResult() {
        if (!randomRaceData) {
            alert("データが読み込まれていません")
            return;
        }
        const ai = getPT(aiFirst, aiSecond, aiThird);
        const user = getPT(first, second, third);
        setAiPt(ai);
        setUserPt(user);
        setHp(culcHp(user, ai));
        setScore(score + user);

        setAiPredictionResult(true);
        setAnswer(true);
        setNextStage(true);
    };

    function viewMoreInfo(horse: string) {
        return () => {
            if (viewInfo.includes(horse)) {
                setViewInfo(viewInfo.filter(value => value !== horse))
            } else {
                setViewInfo([...viewInfo, horse])
            }
        }
    }

    async function gotoNextStage() {
        if (0 >= hp) {
            alert("次のステージへ進むことが出来ません");
            return;
        }
        setAiPt(0);
        setUserPt(0);
        setAiPredictionResult(false);
        setAnswer(false);
        setNextStage(false);
        await fetchRandomRaceData();
    }

    async function sendData() {
        const response = await fetch("/api/ranking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                score,
            }),
        });
        if (response.ok) {
            const json: RankingApiResponse = await response.json();
            alert(`あなたは${json.rank}位でした。この画面を閉じるとページが再ロードされます。`)
            location.href = "/game";
        } else {
            alert("上手く送信できませんでした。再度ボタンを押してください。")
        }
    }

    function showEndPage() {
        setShowRankingPanel(true);
    }

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
                    <p className="text-white">SCORE: {score}</p>
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
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1, duration: 0.5 }}
                                            className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full mx-4"
                                        >
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
                                                {randomRaceData.data.horse.sort((a, b) => a.umaban - b.umaban).map((horse, _index) => {
                                                    return (
                                                        <div key={_index} >
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 1, duration: 0.5 }}
                                                                className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl  mx-4"
                                                            >
                                                                <h3 className='text-xl font-bold text-white cursor-pointer' onClick={viewMoreInfo(horse.horse)}>{horse.horse}</h3>
                                                                <div className={viewInfo.includes(horse.horse) ? "block" : "hidden"}>
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
                                        </motion.div>
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
                                                        <option value="">選択してください</option>
                                                        {randomRaceData.data.horse.sort((a, b) => a.umaban - b.umaban).map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <p>2位</p>
                                                    <select value={second} onChange={e => setSecond(e.target.value)}>
                                                        <option value="">選択してください</option>
                                                        {randomRaceData.data.horse.sort((a, b) => a.umaban - b.umaban).map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <p>3位</p>
                                                    <select value={third} onChange={e => setThird(e.target.value)}>
                                                        <option value="">選択してください</option>
                                                        {randomRaceData.data.horse.sort((a, b) => a.umaban - b.umaban).map((horse, _index) => (
                                                            <option key={_index} value={horse.horse}>{horse.horse}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-3">
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
                                        className={`text-center p-10 bg-white bg-opacity-20 mt-6 backdrop-blur-lg rounded-xl max-w-2xl w-full mx-4 ${aiPredictionResult ? "block" : "hidden"}`}
                                    >
                                        <div>
                                            <h1>AI予想結果</h1>
                                            <div>
                                                <p>1位: {aiFirst}</p>
                                                <p>2位: {aiSecond}</p>
                                                <p>3位: {aiThird}</p>
                                            </div>
                                            <h1 className="mt-2">ポイント</h1>
                                            <div>
                                                <p>AIのポイント: {aiPt}</p>
                                                <p>Userのポイント: {userPt}</p>
                                            </div>
                                            <h1 className="mt-2">結果</h1>
                                            <div>
                                                <p>残りHPは{hp}です。</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className={answer ? "block" : "hidden"}>
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
                                    <div className={nextStage ? "block" : "hidden"}>
                                        <button
                                            className="max-w-xl w-full text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105 mt-5"
                                            onClick={gotoNextStage}
                                        >次のゲームへ進む</button>
                                        <button
                                            className="max-w-xl w-full text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105 mt-5"
                                            onClick={showEndPage}
                                        >ここでゲームをやめる</button>
                                    </div>
                                    <div className={`text-center p-6 sm:p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl max-w-lg sm:max-w-2xl w-full mx-4 mt-10 ${showRankingPanel ? "block" : "hidden"}`}>
                                        <input className="block font-bold text-3xl w-full" value={username} onChange={e => setUsername(e.target.value)} placeholder="ユーザー名を入力してください" type="text" />
                                        <button className="block max-w-xl w-full text-center font-bold bg-white text-green-800 border border-green-800 rounded-lg p-4 transition transform hover:scale-105 mt-5" onClick={sendData}>ランキング登録</button>
                                    </div>
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
