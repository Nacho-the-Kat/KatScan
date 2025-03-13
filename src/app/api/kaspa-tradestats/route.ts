import { NextResponse } from 'next/server';
import { staticConfig } from '../config';

export const { dynamic, revalidate } = staticConfig;

export async function GET() {
    try {
        console.log('Fetching trade stats from API...');
        const response = await fetch('https://api.kaspa.com/api/krc721/trade-stats?timeFrame=1d', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response received:', response.status, response.statusText);
        
        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch trade stats: ${response.statusText}` }, { status: response.status });
        }
        
        const jsonData = await response.json();
        console.log('Parsed JSON:', jsonData);
        
        // Ensure the response contains 'collections' and it's an array
        if (!jsonData || !jsonData.collections || !Array.isArray(jsonData.collections)) {
            return NextResponse.json({ error: 'Unexpected API response format' }, { status: 500 });
        }
        
        return NextResponse.json({ result: jsonData.collections }, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
