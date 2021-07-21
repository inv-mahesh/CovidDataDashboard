export interface Country {
    name: string;
    flag: string;
    case: number;
    deaths: number;
    recovered: number;
    tests: number;
    population: number;
}

export interface CountryList extends Array<Country>{
    
}