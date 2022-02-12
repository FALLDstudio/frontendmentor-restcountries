import gsap from 'gsap';
import { 
    detailsContainer,
    mainContent,
    detailsIMG,
    detailsTXT,
    backButton,
    name,
    native,
    pop,
    region,
    subRegion,
    capital,
    domain,
    curr,
    lang,
    border
 } from './dom-variables';
import { spaceNumber } from './utils';

export const countryDetails = {

    open : function(elt, countries){

        let nodeIMG = elt.querySelector('img');
        let index = elt.getAttribute('data-index');

        detailsIMG.append(nodeIMG.cloneNode(true));

        detailsContainer.style.display = 'block';

        mainContent.style.pointerEvents = 'none';

        name.textContent = countries[index].name.common;
        native.textContent = Object.values(countries[index].name.nativeName)[0].common;
        pop.textContent = spaceNumber(countries[index].population);
        region.textContent = countries[index].region;
        subRegion.textContent = countries[index].subregion;
        capital.textContent = countries[index].capital;
        curr.textContent = lang.textContent = domain.textContent = '';
        
        countries[index].tld.forEach((c,i)=>{
            domain.textContent += c;
            if(countries[index].tld.length > 1 && i < countries[index].tld.length - 1) domain.textContent += ', ';
        });

        let currCodes = Object.keys(countries[index].currencies);

        currCodes.forEach((c,i)=>{
            curr.textContent += c;
            if(currCodes.length > 1 && i < currCodes.length - 1) curr.textContent += ', ';
        });

        let languages = Object.values(countries[index].languages);

        languages.forEach((c,i)=>{
            lang.textContent += c;
            if(languages.length > 1 && i < languages.length - 1) lang.textContent += ', ';
        });

        if(countries[index].hasOwnProperty("borders") && countries[index].borders.length > 0){

            border.parentElement.style.removeProperty('display');

            countries[index].borders.forEach(b=>{
                let div = document.createElement('div');
                div.classList.add('card');
                let p = document.createElement('p');
                let borderCountry = countries.find(c=> c.cca3 === b);
                p.textContent = borderCountry.name.common;
            
                div.appendChild(p);
                border.appendChild(div);
            });

        }else{
            border.parentElement.style.display = 'none';
        }
    
        gsap.to(mainContent, {
            duration : 0.8,
            x : -window.innerWidth,
            ease : 'power3.out',
            clearProps : 'all',
            onComplete : ()=>{
                mainContent.style.display = 'none';
            }
        });
    
        gsap.from(detailsIMG,{
            delay : 0.3,
            duration : 1.2,
            opacity : 0,
            x : window.innerWidth/6,
            ease : 'power3.out'
        });
    
        gsap.from(detailsTXT,{
            delay : 0.8,
            duration : 0.7,
            opacity : 0,
            y : 100,
            ease : 'power4.out'
        });
    
        gsap.from(backButton,{
            delay : 0.8,
            duration : 0.7,
            opacity : 0,
            x : -(backButton.offsetLeft + backButton.offsetWidth),
            ease : 'power4.out'
        });
    },

    close : function(){

        gsap.to(backButton,{
            duration : 0.8,
            opacity : 0,
            x : -(backButton.offsetLeft + backButton.offsetWidth),
            ease : 'power4.out'        
        });

        gsap.to(detailsTXT,{
            duration : 0.8,
            opacity : 0,
            x : window.innerWidth - detailsTXT.offsetLeft,
            ease : 'power4.out'
        });

        gsap.to(detailsIMG,{
            duration : 0.8,
            opacity : 0,
            x : window.innerWidth - detailsIMG.offsetLeft,
            ease : 'power3.inOut'
        });

        mainContent.style.removeProperty('display');

        gsap.from(mainContent,{
            delay : 0.4,
            duration : 0.6,
            opacity : 1,
            x : -window.innerWidth,
            ease : 'power3.out',
            onComplete : ()=>{
                mainContent.style.removeProperty('pointer-events');
                detailsContainer.style.removeProperty('display');
                detailsIMG.innerHTML = border.innerHTML = '';
                gsap.set([detailsContainer, mainContent,detailsIMG, detailsTXT, backButton], {opacity : 1, x : 0, y : 0});
            }
        });
    }
};

backButton.addEventListener('click', countryDetails.close);
