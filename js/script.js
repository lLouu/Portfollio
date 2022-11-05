let is_fr = 1;
const update_header = async (lang) => {
    document.querySelector('header').style.color = '#ffffff00';
    setTimeout(() => {
        let header = document.querySelector('header').children;
        header[1].innerHTML = content['header'][lang][0];
        header[2].innerHTML = content['header'][lang][1];
        header[3].innerHTML = content['header'][lang][2];
        header[4].innerHTML = content['header'][lang][3];
        document.querySelector('header').style.color = 'black';
    }, 15);   
}
const update_selector = async (lang) => {
    document.getElementById('selector').style.color = '#ffffff00';
    setTimeout(() => {
        let selector = document.getElementById('selector').children;
        selector[0].children[1].innerHTML = content['selector'][lang][0];
        selector[1].children[1].innerHTML = content['selector'][lang][1];
        selector[2].children[1].innerHTML = content['selector'][lang][2];
        selector[3].children[1].innerHTML = content['selector'][lang][3];
        document.getElementById('selector').style.color = 'black';
    }, 15);   
}
const update_cnav = async (lang) => {
    document.getElementById('c_nav').style.color = '#ffffff00';
    setTimeout(() => {
        let cnav = document.getElementById('c_nav').children;
        cnav[0].children[0].innerHTML = content['c_nav'][lang][0];
        cnav[0].children[1].innerHTML = content['c_nav'][lang][1];
        cnav[1].children[0].innerHTML = content['c_nav'][lang][2];
        cnav[1].children[1].innerHTML = content['c_nav'][lang][3];
        cnav[1].children[2].innerHTML = content['c_nav'][lang][4];
        document.getElementById('c_nav').style.color = 'black';
    }, 15);   
}
const update_raison = async (lang) => {
    document.getElementById('raison').style.color = '#ffffff00';
    setTimeout(() => {
        let raison = document.getElementById('raison').children;
        raison[0].innerHTML = content['raison'][lang][0];
        raison[1].innerHTML = content['raison'][lang][1];
        raison[2].innerHTML = content['raison'][lang][2];
        raison[3].innerHTML = content['raison'][lang][3];
        raison[4].innerHTML = content['raison'][lang][4];
        document.getElementById('raison').style.color = 'black';
    }, 15);   
}
const update_footer = async (lang) => {
    document.getElementById('footer').style.color = '#ffffff00';
    setTimeout(() => {
        let footer = document.getElementById('footer').children;
        footer[0].children[0].innerHTML = content['footer'][lang][0];
        footer[0].children[1].innerHTML = content['footer'][lang][1];
        footer[0].children[2].innerHTML = content['footer'][lang][2];
        footer[1].innerHTML = content['footer'][lang][3];
        document.getElementById('footer').style.color = 'black';
    }, 15);   
}
const update_ids = async (lang, ele) => {
    let d = document.getElementById(ele[0]);
    d.style.color = '#ffffff00';
    setTimeout(() => {
        d.innerHTML = ele[1][lang];
        d.style.color = 'black';
    }, 15);   
}
const update_placeholder = async (lang, ele) => {
    let d = document.getElementById(ele[0]);
    d.style.color = '#ffffff00';
    setTimeout(() => {
        d.placeholder = ele[1][lang];
        d.style.color = 'black';
    }, 15);   
}

const update_lang = async () => {
    let lang = is_fr ? 'fr' : 'en';

    update_header(lang);
    update_selector(lang);
    update_cnav(lang);
    update_raison(lang);
    update_footer(lang);
    
    Object.entries(content['ids']).forEach(ele => {
        update_ids(lang, ele);
    })
    Object.entries(content['placeholders']).forEach(ele => {
        update_placeholder(lang, ele);
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    update_lang();
    document.getElementById('lang').onclick = (e) => {
        let flags = document.getElementById('lang').children;
        flags[is_fr].classList.remove('grayed');
        is_fr = (is_fr + 1) % 2;
        flags[is_fr].classList.add('grayed');
        update_lang();
    }
});