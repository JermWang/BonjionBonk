import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  console.log('API called for folder:', folder);

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const publicDir = path.join(process.cwd(), 'public', 'images', 'characters', folder);
    console.log('Looking in directory:', publicDir);
    
    const files = await fs.readdir(publicDir);
    console.log('Found files:', files);
    
    const imageFiles = files.filter(file => /\.(png|jpe?g|svg)$/i.test(file));
    console.log('Filtered image files:', imageFiles);
    
    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
} 