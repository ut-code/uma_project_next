import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { db } from "@/server/database";

export async function GET() {
    const datas = await db.ranking.findMany({
        orderBy: {
            score: "desc"
        },
        take: 40,
    });
    return NextResponse.json(datas);
}
