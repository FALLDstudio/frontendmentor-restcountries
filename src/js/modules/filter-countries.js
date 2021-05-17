export default function filterCountries({
    countries,
    regionStr,
    searchStr
}){

    let results = [];

    countries.forEach((c,i)=>{

        let inclRegion;

        let inclSearch = c.name.toLowerCase().includes(searchStr.toLowerCase());

        if(regionStr !== 'Clear'){
            if(c.region === regionStr) inclRegion = true;
            else inclRegion = false
        }else inclRegion = true;

        if(inclRegion && inclSearch) results.push(i);

    });
    return results;

} 