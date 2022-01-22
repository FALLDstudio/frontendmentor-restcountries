import { getIMG } from './utils';

export default function getData(){

    return new Promise((success, error)=>{
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200) {

                let countries = this.response;

                getIMG(countries)
                .then(flags=>{
                    success({countries, flags});
                });

            }else if (this.readyState === 4 && this.status !== 200){
                error('Unable to get countries data');
            };
        });
        xhr.addEventListener('error',function(){
            if(this.readyState !== 4) error('Unable to get countries data');
        })
        xhr.open('GET', 'https://restcountries.com/v3.1/all', true);
        xhr.responseType = "json";
        xhr.send();
    });
    
};
