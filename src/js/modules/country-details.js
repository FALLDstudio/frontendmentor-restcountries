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

        name.textContent = countries[index].name;
        native.textContent = countries[index].nativeName;
        pop.textContent = spaceNumber(countries[index].population);
        region.textContent = countries[index].region;
        subRegion.textContent = countries[index].subregion;
        capital.textContent = countries[index].capital;
        curr.textContent = lang.textContent = domain.textContent = '';
        
        countries[index].topLevelDomain.forEach((c,i)=>{
            domain.textContent += c;
            if(countries[index].topLevelDomain.length > 1 && i < countries[index].topLevelDomain.length - 1) domain.textContent += ', ';
        });

        countries[index].currencies.forEach((c,i)=>{
            if(c.code !== '(none)'){
                curr.textContent += c.code;
                if(countries[index].currencies.length > 1 && i < countries[index].currencies.length - 1 && countries[index].currencies[i+1].code !== '(none)') curr.textContent += ', ';
            }
        });

        countries[index].languages.forEach((c,i)=>{
            lang.textContent += c.name;
            if(countries[index].languages.length > 1 && i < countries[index].languages.length - 1) lang.textContent += ', ';
        });

        if(countries[index].borders.length > 0){

            border.parentElement.style.removeProperty('display');

            countries[index].borders.forEach(b=>{
                let div = document.createElement('div');
                div.classList.add('card');
                let p = document.createElement('p');
                let borderCountry = countries.find(c=> c.alpha3Code === b);
                let str = borderCountry.name;

                if(str === 'Congo (Democratic Republic of the)'){
                    p.textContent = 'Congo (RD)';
                }else{
                    p.textContent = str.replace(/\((.*?)\)/,'').trim();
                }

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
