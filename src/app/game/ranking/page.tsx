import { useEffect, useState } from "react"

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
                {datas.map((data, _index) => (
                    <div key={_index}>
                        <p>{data.name}</p>
                        <p>{data.score}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
