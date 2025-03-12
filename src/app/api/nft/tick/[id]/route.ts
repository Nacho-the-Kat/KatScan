import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";
const PAGE_SIZE = 1000; // Default page size from the API

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop(); // Get last part of URL
    const { searchParams } = new URL(req.url);
    
    // Get page parameters from request
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || String(PAGE_SIZE), 10);
    const fetchAll = searchParams.get("fetchAll") === "true";
    
    // Get filter parameters if any
    const filterParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "pageSize" && key !== "fetchAll") {
        filterParams[key] = value;
      }
    });


    if (!id) {
      return NextResponse.json({ status: 400, message: "Invalid token ID" }, { status: 400 });
    }

    // Fetch tick info first to get the max number of NFTs
    const tickApiUrl = `${API_BASE_URL}/nfts/tick?tick=${id}`;
    console.log(`Fetching tick info from: ${tickApiUrl}`);
    
    const tickResponse = await fetch(tickApiUrl, { 
      method: "GET", 
      headers: { "Content-Type": "application/json" } 
    });

    if (!tickResponse.ok) {
      return NextResponse.json(
        { error: `Tick API request failed with status ${tickResponse.status}` },
        { status: tickResponse.status }
      );
    }

    const tickData = await tickResponse.json();
    const maxNFTs = tickData.result.max;
    const totalPages = Math.ceil(maxNFTs / pageSize);

    console.log(`Collection has ${maxNFTs} NFTs, requiring ${totalPages} pages of size ${pageSize}`);

    let allEntries: any[] = [];

    if (fetchAll) {
      // Fetch all pages of entries
      const fetchPromises = [];
      
      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const offset = (currentPage - 1) * pageSize;
        const entriesApiUrl = `${API_BASE_URL}/nfts/entries?tick=${id}&offset=${offset}`;
        console.log(`Fetching entries page ${currentPage}/${totalPages} from: ${entriesApiUrl}`);
        
        fetchPromises.push(
          fetch(entriesApiUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
          })
        );
      }
      
      const responses = await Promise.all(fetchPromises);
      
      for (const response of responses) {
        if (!response.ok) {
          return NextResponse.json(
            { error: `Entries API request failed with status ${response.status}` },
            { status: response.status }
          );
        }
        
        const data = await response.json();
        allEntries = [...allEntries, ...data.result];
      }
    } else {
      // Fetch just the requested page
      const offset = (page - 1) * pageSize;
      const entriesApiUrl = `${API_BASE_URL}/nfts/entries?tick=${id}&offset=${offset}`;
      console.log(`Fetching entries page ${page}/${totalPages} from: ${entriesApiUrl}`);
      
      const entriesResponse = await fetch(entriesApiUrl, { 
        method: "GET", 
        headers: { "Content-Type": "application/json" } 
      });
      
      if (!entriesResponse.ok) {
        return NextResponse.json(
          { error: `Entries API request failed with status ${entriesResponse.status}` },
          { status: entriesResponse.status }
        );
      }
      
      const entriesData = await entriesResponse.json();
      allEntries = entriesData.result;
    }

    // Apply filters if any
    if (Object.keys(filterParams).length > 0) {
      allEntries = allEntries.filter(entry => {
        return entry.attributes.every(({ trait_type, value }: { trait_type: string, value: string }) => {
          return !filterParams[trait_type] || filterParams[trait_type] === value;
        });
      });
    }

    return NextResponse.json({
      entries: allEntries,
      tickInfo: tickData.result,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: maxNFTs,
        hasMorePages: page < totalPages
      }
    });
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return NextResponse.json({ error: "Failed to fetch NFT data" }, { status: 500 });
  }
}
