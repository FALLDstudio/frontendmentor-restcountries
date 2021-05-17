import run from './js/main';
import './sass/index.scss';

window.addEventListener('load',run);

if(module.hot){
    module.hot.accept();
}