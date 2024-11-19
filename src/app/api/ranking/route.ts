import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/server/database";
import { structChecker } from "@/server/struct";

const _RequestZod = z.object({
    name: z.string(),
    score: z.number(),
})

export type Response = Array<{
    name: string
    score: number
}>

export async function GET() {
    const datas = await db.ranking.findMany({
        orderBy: {
            score: "desc"
        },
        take: 40,
    });
    return NextResponse.json(datas.map(({name, score}) => { return { name, score: Number(score) } }), { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = structChecker(req.body, _RequestZod);
    if (!body) {
        return NextResponse.json({
            content: "BODY_PARSE_ERR"
        }, { status: 400 });
    }
    const element = await db.ranking.findFirst({
        where: body,
    });
    if (!element) {
        await db.ranking.create({
            data: body
        })
    }
    const elements = await db.ranking.findMany({
        orderBy: {
            score: "desc"
        },
    });
    for (let i = 0; i < elements.length; i++) {
        const data = elements[i];
        if (data.name === body.name && data.score === BigInt(body.score)) {
            return NextResponse.json({
                rank: i + 1,
            }, { status: 200 })
        }
    }
    return NextResponse.json({
        rank: null,
    }, { status: 202 })
}
