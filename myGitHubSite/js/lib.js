function change_language(show,hide) {
    var to_show = Array.from(document.getElementsByClassName(show));
    to_show.forEach(element => {
        element.style.display= 'block';
        });
        
    var to_hide = Array.from(document.getElementsByClassName(hide));
    to_hide.forEach(element => {
        element.style.display = 'none';
        });  
    
    var selected_lan = show;
    var hide_lan = hide;
    localStorage.setItem("selected_lan", selected_lan);
    localStorage.setItem("hide_lan", hide_lan);
    }

function load_language(){
    if(localStorage.getItem("selected_lan") == undefined){
        var selected_lan = 'eng';
        var hide_lan = 'esp';
    } else{
        var selected_lan = localStorage.getItem("selected_lan");
        var hide_lan = localStorage.getItem("hide_lan");
    }
    
    var to_show = Array.from(document.getElementsByClassName(selected_lan));
    to_show.forEach(element => {
        element.style.display= 'block';
        });
        
    var to_hide = Array.from(document.getElementsByClassName(hide_lan));
    to_hide.forEach(element => {
        element.style.display = 'none';
        });  
}

function update_theme(){
    var now = new Date();
    var current = now.getHours();
    switch(true){
        case (current >= 0 && current < 6):
            img = 'img/Montreal.jpg'; 
            color = 'rgb(48, 68, 236)';
            break;
        case (current >= 6 && current < 12):
            img = 'img/real_monte1.jpg';
            color = 'rgb(156, 184, 203)';
            break;
        case (current >= 12 && current < 18):
            img = 'img/Seoul.jpg';
            color = 'rgb(95, 124, 255)';  
            break;
        case (current >= 18 && current < 24):
            img = 'img/view_home1.jpg';
            color = 'rgb(33, 54, 22 )';
            break;
    }

    document.getElementsByTagName('header')[0].style.backgroundImage = 'url('+img+')';

    nav_elements = Array.from(document.getElementsByClassName("main_nav"));
    nav_elements.forEach(element => {
        element.style.backgroundImage = 'linear-gradient(to right,'+ color +',rgb(255, 255, 255)';
        });
        
    h1_elements = Array.from(document.getElementsByTagName("h1"));
    h1_elements.forEach(element => {
        element.style.color = color;
        });
    
    th_elements = Array.from(document.getElementsByTagName("th"));
    th_elements.forEach(element => {
        element.style.backgroundColor = color;
        });
    }
