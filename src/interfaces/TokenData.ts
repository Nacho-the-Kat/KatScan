export type TokenData = {
    tick: string
    max: number
    lim: string
    pre: string
    to: string
    dec: number
    minted: number
    opScoreAdd: string
    opScoreMod: string
    state: string
    hashRev: string
    mtsAdd: number
}

export type TokenSearchResult = TokenData & {
    holderTotal: string
    transferTotal: string
    mintTotal: string
    holder: Holder[]
}

type Holder = {
    address: string
    amount: number
}
