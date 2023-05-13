import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const uri = new URL(request.url);
    const title = uri.searchParams.get('title');    
  
  
  if (!title) {
    return NextResponse.json({ message: 'Title is required.' });
  }

  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${encodeURIComponent(title)}&country=us&output_language=en`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST as string
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong.' });
  }
}
