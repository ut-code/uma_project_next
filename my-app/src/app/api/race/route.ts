import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), 'db/jra/');
    const files = fs.readdirSync(directoryPath);
    const raceData = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const fileContent = fs.readFileSync(path.join(directoryPath, file), 'utf8');
          const fileData = JSON.parse(fileContent);
          raceData.push(fileData);
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
