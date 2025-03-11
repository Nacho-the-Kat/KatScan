import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Fetching hot mints from API...');
        const response = await fetch('https://api.kaspa.com/api/hot-mints', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // console.log('Response received:', response.status, response.statusText);
        
        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch hot mints: ${response.statusText}` }, { status: response.status });
        }
        
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
            return NextResponse.json({ error: 'Unexpected API response format' }, { status: 500 });
        }
        
        return NextResponse.json(jsonData, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
