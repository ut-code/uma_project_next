import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export type Response = Record<string, {
  rank: string
  waku: string
  umaban: number
  horse: string
  age: string
  weight: string
  jockey: string
  time: string
  margin: string
  h_weight: number
  h_weight_zougen: number
  f_time: string
  trainer: string
  pop: string
  corner: number[]
  title: string
}[]>;

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), 'db/horse/');
    const files = fs.readdirSync(directoryPath);
    const raceData: Response = {};
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const name = file.replaceAll(".json", "");
          const fileContent = fs.readFileSync(path.join(directoryPath, file), 'utf8');
          const fileData = JSON.parse(fileContent);
          raceData[name] = fileData;
        } catch (error) {
          console.error(`ファイル "${file}" の読み込みまたはパース中にエラーが発生しました:`, error);
          throw new Error(`${file} の読み込み中にエラーが発生しました。`);
        }
      } else {
        console.log(`JSONファイルではないため無視: ${file}`);
      }
    }
    return NextResponse.json(raceData);
  } catch (error) {
    console.error('API処理中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'データの読み込みに失敗しました。' }, { status: 500 });
  }
}
