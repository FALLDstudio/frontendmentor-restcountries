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

        domain.textContent = curr.textContent = lang.textContent = "";

        if(countries[index].hasOwnProperty("subregion")){
            subRegion.parentElement.style.removeProperty('display');
            subRegion.textContent = countries[index].subregion;
        }else{
            subRegion.parentElement.style.display = "none";
        }

        if(countries[index].hasOwnProperty("capital")){
            capital.parentElement.style.removeProperty('dsiplay');
            capital.textContent = countries[index].capital;
        }else{
            capital.parentElement.style.display = "none";
        }

        if(countries[index].hasOwnProperty("tld")){
            domain.parentElement.style.removeProperty("display");
            countries[index].tld.forEach((c,i)=>{
                domain.textContent += c;
                if(countries[index].tld.length > 1 && i < countries[index].tld.length - 1) domain.textContent += ', ';
            });
        }else{
            domain.parentElement.style.display = "none";
        }

        if(countries[index].hasOwnProperty("currencies")){
            curr.parentElement.style.removeProperty("display");
            let currCodes = Object.keys(countries[index].currencies);

            currCodes.forEach((c,i)=>{
                curr.textContent += c;
                if(currCodes.length > 1 && i < currCodes.length - 1) curr.textContent += ', ';
            });
        }else{
            curr.parentElement.style.display = "none";
        }

        if(countries[index].hasOwnProperty("languages")){
            lang.parentElement.style.removeProperty("display");
            let languages = Object.values(countries[index].languages);

            languages.forEach((c,i)=>{
                lang.textContent += c;
                if(languages.length > 1 && i < languages.length - 1) lang.textContent += ', ';
            });
        }else{
            lang.parentElement.style.display = "none";
        }

        if(countries[index].hasOwnProperty("borders")){

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

        let desktop = !window.matchMedia("only screen and (max-width : 1300px)").matches;

        gsap.fromTo(detailsContainer,
            {
                opacity: 0
            },
            {
                opacity: 1,
                ease : 'linear',
                duration: 0.2
            }
        );
    
        gsap.fromTo(detailsIMG,
            {
                y : desktop ? window.innerHeight - detailsIMG.offsetTop : 0,
                x : desktop ? 0 : window.innerWidth - detailsIMG.offsetLeft
            },
            {
                duration : 0.8,
                delay: 0.15,
                y : 0,
                x : 0,
                ease : 'power4.out'
            }
        );
    
        gsap.fromTo(detailsTXT,
            {
                x : desktop ? window.innerWidth - detailsTXT.offsetLeft : 0,
                y : desktop ? 0 : window.innerHeight - detailsTXT.offsetTop
            },
            {
                duration : 0.8,
                delay: 0.15,
                x : 0,
                y : 0,
                ease : 'power4.out'
            }
        );
    
        gsap.fromTo(backButton,
            {
                x : -(backButton.offsetLeft + backButton.offsetWidth)
            },
            {
                duration : 0.8,
                delay: 0.15,
                x : 0,
                ease : 'power4.out'
            }
        );


    },

    close : function(){

        let desktop = !window.matchMedia("only screen and (max-width : 1300px)").matches;

        gsap.to(detailsContainer,{
            opacity: 0,
            delay: 0.3,
            duration: 0.2,
            ease: "linear"
        });

        gsap.to(backButton,{
            duration : 0.6,
            x : -(backButton.offsetLeft + backButton.offsetWidth),
            ease : 'power3.inOut' ,
            onComplete : ()=>{
                mainContent.style.removeProperty('pointer-events');
                detailsContainer.style.removeProperty('display');
                detailsIMG.innerHTML = border.innerHTML = '';
            }       
        });

        gsap.to(detailsTXT,{
            duration : 0.6,
            x : desktop ? window.innerWidth - detailsTXT.offsetLeft : 0,
            y : desktop ? 0 : window.innerHeight - detailsTXT.offsetTop,
            ease : 'power3.inOut'
        });

        gsap.to(detailsIMG,{
            duration : 0.6,
            y : desktop ? window.innerHeight - detailsIMG.offsetTop : 0,
            x : desktop ? 0 : window.innerWidth - detailsIMG.offsetLeft,
            ease : 'power3.inOut'
        });

        mainContent.style.removeProperty('display');
    }
};

backButton.addEventListener('click', countryDetails.close);
