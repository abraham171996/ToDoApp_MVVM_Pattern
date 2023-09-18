import '../styles/main.css';
import Model from './Model';
import ViewModel from './ViewModel';

const init = ()=> {
    const showViewModel = new ViewModel(new Model());

    showViewModel.init()
}

document.addEventListener("DOMContentLoaded",init)