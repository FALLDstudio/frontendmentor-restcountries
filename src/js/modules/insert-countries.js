import { countryDetails } from './country-details';
import gsap from 'gsap';
import { countriesContainer, loadedCountries } from './dom-variables';
import { resizeCountriesElt, spaceNumber } from './utils';

export default function insertCountries({
    countries,
    availableCountries, 
    flags, 
    index, 
    lines, 
    anime}){

    return new Promise(resolve=>{

        let createdLines = 0, lineElt = [], i = index, arr;

        if(availableCountries === 'all'){
            arr = Array.from(Array(countries.length).keys())
        }else if(Array.isArray(availableCountries)){
            arr = availableCountries
        }

        while(i < arr.length && createdLines < lines){

            countriesContainer.insertAdjacentHTML('beforeend',
                `<div class="countries__module__container" data-index="${arr[i]}">
                    <svg class="countries__module card pointer" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
                        <foreignObject x="0" y="0" width="300" height="400">
                            <figure>
                                <div class="countries__module__img"></div>
                                <figcaption class="countries__module__descr">
                                    <h3 class="countries__module__title">${countries[arr[i]].name.common}</h3>
                                    <div>
                                        <h4>Population : </h4>
                                        <p>${spaceNumber(countries[arr[i]].population)}</p>
                                    </div>
                                    <div>
                                        <h4>Region : </h4>
                                        <p>${countries[arr[i]].region}</p>
                                    </div>`
                                    + (countries[arr[i]].hasOwnProperty("capital") ? 
                                        `
                                        <div>
                                            <h4>Capital : </h4>
                                            <p>${countries[arr[i]].capital}</p>
                                        </div>
                                        `
                                    : '') +
                                    `
                                </figcaption>
                            </figure>
                        </foreignObject>
                    </svg>
                </div>`
            );
            
            let current = document.querySelector(`.countries__module__container[data-index="${arr[i]}"]`);
            current.querySelector('.countries__module__img').append(flags[arr[i]]);
            current.addEventListener('click', function(){
                countryDetails.open(this, countries);
            });

            lineElt.push(current);

            if(Array.from(loadedCountries).length > 1){

                let lastRect = current.getBoundingClientRect();
                let previousRect = current.previousElementSibling.getBoundingClientRect();
        
                if(lastRect.top !== previousRect.top){
    
                    createdLines++;

                };

                if(i >= arr.length - 1 || createdLines >= lines){
    
                    if(i < arr.length - 1){
                        current.remove();
                        lineElt.pop();
                    }else{
                        resizeCountriesElt(lineElt)
                    }
                   
                    if(anime) {
                        gsap.from(lineElt, 
                        {
                        opacity : 0, 
                        duration : 1, 
                        y : 200, 
                        ease : "expo.out"
                        }
                    )};
                }
            };
            i++;
        };

        resolve();
    });    
   
    
}