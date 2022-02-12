import getData from './modules/get-data';
import insertCountries from './modules/insert-countries';
import { loadingColorSwap, resizeCountriesElt, setRegionMenu, setSelectedRegion, CookieManager } from './modules/utils';
import filterCountries from './modules/filter-countries';
import Scrollbar from 'smooth-scrollbar';
import {
    filterOptions,
    filterButton,
    loadedCountries,
    scrollable,
    modeButton,
    searchInput,
    selectRegion,
    detailsContainer,
    loadingState
} from './modules/dom-variables';

let Countries;

let loadOptions = {
    countries : null,
    flags : null,
    availableCountries : 'all',
    index : 0,
    lines : 8,
    anime : false
};

export default function run() {

    const cookies = new CookieManager();
    
    if(cookies.isDefined('darkTheme')){

        if(cookies.get('darkTheme') === true){
            document.body.classList.add('dark-theme');
        }

    }else{
        cookies.set({name : 'darkTheme', value : false, samesite : 'lax', maxAge : 100*365*24*60*60});
    }

    loadingColorSwap.start();

    Scrollbar.init(scrollable, {renderByPixels : true, continuousScrolling : true});
    Scrollbar.init(detailsContainer, {renderByPixels : true, continuousScrolling : true});
    const mainScroll = Scrollbar.get(scrollable);

    const onScrollChange = function(s){

        let test = loadOptions.availableCountries.length;
        if(loadOptions.availableCountries === 'all') test = Countries.length;

        if(s.offset.y >= s.limit.y - 10 && Array.from(loadedCountries).length < test){

            loadOptions.index = Array.from(loadedCountries).length;
            loadOptions.anime = true;
            loadOptions.lines = 2;

            insertCountries(loadOptions)
        };
    }

    mainScroll.addListener(onScrollChange);

    const init = function(){

        getData()
        .then(v=>{

            loadOptions.countries = Countries = v.countries;
            loadOptions.flags = v.flags;

            insertCountries(loadOptions)
            .then(()=>{
                loadingState.innerText = 'Success !';
                window.addEventListener('resize', resizeCountriesElt);
                setTimeout(() => {
                    loadingColorSwap.stop();
                    document.body.classList.remove('boot');
                }, 1000);
            });
          
        })
        .catch(err=>{
            throw new Error(err);
        });
    };
    init();

    modeButton.addEventListener('click',()=>{

        document.body.classList.add('freeze');
        document.body.offsetHeight;
        document.body.classList.toggle('dark-theme');
        document.body.offsetHeight;
        document.body.classList.remove('freeze');

        if(document.body.classList.contains('dark-theme')){
            cookies.setValue('darkTheme', true);
        }else{
            cookies.setValue('darkTheme', false);
        }
    });

    filterButton.addEventListener('click',setRegionMenu.auto);

    const applyFilter = function(){

        Array.from(loadedCountries).forEach(c=>c.remove());

        loadOptions.availableCountries = filterCountries({
            countries : Countries,
            searchStr : searchInput.value,
            regionStr : selectRegion.options[selectRegion.selectedIndex].innerText
        });
        loadOptions.index = 0;
        loadOptions.anime = false;
        loadOptions.lines = 8;

        mainScroll.removeListener(onScrollChange);

        insertCountries(loadOptions)
        .then(()=>{
            mainScroll.scrollTop = 0;
            mainScroll.addListener(onScrollChange);
            if(filterOptions.getAttribute('data-state') === 'opened') setRegionMenu.close();
        })
    }

    searchInput.addEventListener('input', applyFilter);

    document.addEventListener('click', function(e){

        if(filterOptions.getAttribute('data-state') === 'opened' 
        && e.target !== filterOptions
        && !filterOptions.contains(e.target)  
        && e.target !== filterButton
        && !filterButton.contains(e.target)
        && e.target !== modeButton
        && !modeButton.contains(e.target)){
            setRegionMenu.close();
        };
    });

    const options = filterOptions.querySelectorAll('.search-tools__filter__option');

    options.forEach(opt=>{
        opt.addEventListener('click', function(){

            if(this.getAttribute('data-value') !== selectRegion.selectedIndex.toString()){
                setSelectedRegion(this);
                applyFilter();
            }else{
                setRegionMenu.close();
            }
        })
    })
};

