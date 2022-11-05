const scroll_array = ['start', 'parcoure', 'competences', 'portfolio', 'contact']
let scroll_pos = 0;
let is_fr = 1;
let parcoure_sel = 0;
let comp_sel = 0;
let comp_animation = 300;
let comp_auto_scroll = 3500;
const update_scrollbar = (id) => {
    if(id != scroll_pos){
        document.getElementById('scroll').children[scroll_pos].classList.remove('here');
        document.getElementById('scroll').children[id].classList.add('here');
        scroll_pos = id;
    }
}
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
    update_parcoure(parcoure_sel);
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
const update_parcoure = async (n) => {
    let c = document.getElementById('selector').children;
    c[parcoure_sel].classList.remove('selected');
    parcoure_sel = n;
    c[parcoure_sel].classList.add('selected');
    let lang = is_fr ? 'fr' : 'en';
    document.getElementById('details_title').innerHTML = content['parcoure'][lang][parcoure_sel][0];
    document.getElementById('details').innerHTML = content['parcoure'][lang][parcoure_sel][1];
}
const update_competence = (go_right) => {
    let d = document.getElementById('c_content');
    d.style.display = "none";
    setTimeout(() => {d.style.display = "grid";}, comp_animation)
    document.getElementById('c_nav').children[comp_sel < 2 ? 0 : 1].children[comp_sel < 2 ? comp_sel : comp_sel - 2].classList.remove('sel');
    comp_sel = go_right ? (comp_sel + 1) % 5 : (comp_sel + 4) % 5;
    document.getElementById('c_nav').children[comp_sel < 2 ? 0 : 1].children[comp_sel < 2 ? comp_sel : comp_sel - 2].classList.add('sel');
    d.innerHTML = '';
    let count = 0;
    for(let i = 0; i < 9; i++){
        if(content['comp'][comp_sel]['template'][i]){
            let c = document.createElement('div');
            c.style.gridRow = (Math.floor(i/3) + 1) * 2;
            c.style.gridColumn = (i%3 + 1) * 2;
            c.style.display = 'flex';
            c.style.flexDirection = 'column';
            c.style.alignItems = 'center';
            c.style.justifyContent = 'space-evenly';
            let im = document.createElement('img');
            im.src = content['comp'][comp_sel]['src'][count];
            c.appendChild(im);
            let t = document.createElement('div');
            t.innerHTML = content['comp'][comp_sel]['desc'][is_fr ? 'fr' : 'en'][count];
            t.style.textAlign = 'center'
            count = count + 1;
            c.appendChild(t);
            d.appendChild(c);
        }
    }
}
let competence_auto_scroll = setInterval(() => {update_competence(true)}, comp_auto_scroll);


window.addEventListener('DOMContentLoaded', (event) => {
    update_lang();
    update_competence(true);
    document.querySelectorAll('.button').forEach(ele => {ele.onclick = (e) => {
        document.getElementById('main').scrollBy({
            top : document.getElementById(e.target.dataset.goto).getBoundingClientRect().y - 50,
            behavior : 'smooth'
        });
    }});
    document.getElementById('lang').onclick = (e) => {
        let flags = document.getElementById('lang').children;
        flags[is_fr].classList.remove('grayed');
        is_fr = (is_fr + 1) % 2;
        flags[is_fr].classList.add('grayed');
        update_lang();
    }
    document.getElementById('left_arrow').onclick = (e) => {clearInterval(competence_auto_scroll); update_competence(false); competence_auto_scroll = setInterval(() => {update_competence(true)}, comp_auto_scroll);};
    document.getElementById('right_arrow').onclick = (e) => {clearInterval(competence_auto_scroll); update_competence(true); competence_auto_scroll = setInterval(() => {update_competence(true)}, comp_auto_scroll);};
    
    document.getElementById('main').addEventListener('scroll', (e) => {
        update_scrollbar(scroll_array.indexOf(document.elementFromPoint(0, document.documentElement.scrollTop + document.documentElement.scrollHeight / 2).id));
    });
    document.getElementById('main').addEventListener('wheel', (e) => {
        if(scroll_pos == 1){
            let freeze = false;
            if(e.deltaY > 0 && parcoure_sel < 3){
                freeze = true;
                update_parcoure(parcoure_sel + 1);
            }
            if(e.deltaY < 0 && parcoure_sel > 0){
                freeze = true;
                update_parcoure(parcoure_sel - 1);
            }
            if(freeze){
                e.preventDefault();
                document.getElementById('main').scrollBy({
                    top : document.getElementById('parcoure').getBoundingClientRect().y - 50,
                    behavior : 'smooth'
                });
            }
        }
    })
    Array.from(document.getElementById('selector').children).forEach(ele => {ele.onclick = (e) => {
        update_parcoure(e.target.dataset.id);
    }});
});