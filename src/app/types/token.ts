export interface Token {
    id: number;
    tick: string;
    max: number;
    lim: number;
    pre: number;
    mtsAdd: number;
    minted: number;
    holderTotal: number;
    mintTotal: number;
    transferTotal: number;
    dec: number;
    state: number;
    logo: string;
    socials: string | null; // JSON string, needs parsing
  }
  
  export interface TokenApiResponse {
    status: number;
    message: string | null;
    result: Token[];
  }
  