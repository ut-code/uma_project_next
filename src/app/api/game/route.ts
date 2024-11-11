import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const directoryPath = path.join(process.cwd(), 'db/jra/');
    const predictionsDirectoryPath = path.join(process.cwd(), "db/predictions/");
    const files = fs.readdirSync(directoryPath);

    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if(jsonFiles.length === 0){
      return NextResponse.json({ error: 'JSONファイルが見つかりませんでした。' }, { status: 404 })
    }

    const randomFile = jsonFiles[Math.floor(Math.random() * jsonFiles.length)]
    const fileContent = JSON.parse(fs.readFileSync(path.join(directoryPath, randomFile), 'utf8'));
    const predictionContent = JSON.parse(fs.readFileSync(path.join(predictionsDirectoryPath, randomFile), "utf8"));

    return NextResponse.json({
      data: fileContent,
      prediction: predictionContent,
    });
  } catch (error) {
    console.error('API処理中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'データの読み込みに失敗しました。' }, { status: 500 });
  }
}
