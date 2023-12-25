// this funtion controls the main navigation menu (bars icon)
function show_hide_menu(level, storage, display) { 
    var show_main_status = localStorage.getItem(storage)
    if (show_main_status == 0 || show_main_status == undefined){
        var to_show = Array.from(document.getElementsByClassName(level));
        to_show.forEach(element => {
        element.style.display= display;
        });
        localStorage.setItem(storage, 1);
        
    } else {
        var to_show = Array.from(document.getElementsByClassName(level));
        to_show.forEach(element => {
        element.style.display= 'none';
        });
        localStorage.setItem(storage, 0);
        }
    }
// this funtion return menu values to 0 by default
function set_menus_off(){
    localStorage.setItem('dropdown-child_root_storage', 0);
    localStorage.setItem('dropdown-child_notebooks_storage', 0);
    localStorage.setItem('dropdown-child_yt_storage', 0);
    }

// this funtion works with the buttons ESP / ENG
function change_language(show,hide) { 
    var to_show = Array.from(document.getElementsByClassName(show));
    to_show.forEach(element => {
        element.style.display= 'block';
        });
        
    var to_hide = Array.from(document.getElementsByClassName(hide));
    to_hide.forEach(element => {
        element.style.display = 'none';
        });  
    
    active_button = document.getElementById('to_' + show);
    active_button.style.opacity = "1"

    //will change to array after introducing french 
    inactive_button = document.getElementById('to_' + hide); 
    inactive_button.style.opacity = "0.6"

    var selected_lan = show;
    var hide_lan = hide;
    localStorage.setItem("selected_lan", selected_lan);
    localStorage.setItem("hide_lan", hide_lan);
    localStorage.setItem("active_button_lan", 'to_'+show);
    }
//This funtion works when the page is loaded and relies on the last button selection (funtion change_language())
function load_language(){
    if(localStorage.getItem("selected_lan") == undefined){
        var selected_lan = 'eng';
        var hide_lan = 'esp';
        var active_button_lan = 'to_eng';
    } else{
        var selected_lan = localStorage.getItem("selected_lan");
        var hide_lan = localStorage.getItem("hide_lan");
        var active_button_lan = localStorage.getItem("active_button_lan");
    }
    
    var to_show = Array.from(document.getElementsByClassName(selected_lan));
    to_show.forEach(element => {
        element.style.display= 'block';
        });
        
    var to_hide = Array.from(document.getElementsByClassName(hide_lan));
    to_hide.forEach(element => {
        element.style.display = 'none';
        });  
        
    active_button = document.getElementById(active_button_lan);
    active_button.style.opacity = "1"
}
//This changes the banner backgroud images, changes the color used on side navigation, table headers and titles
function update_theme(){
    var now = new Date();
    var current = now.getHours();
    switch(true){
        case (current >= 0 && current < 4):
            img = 'img/Montreal.jpg'; 
            color = 'rgb(48, 68, 236)';
            break;
        case (current >= 4 && current < 8):
            img = 'img/real_monte1.jpg';
            color = 'rgb(156, 184, 203)';
            break;
        case (current >= 8 && current < 12):
            img = 'img/real_monte2.jpg';
            color = 'rgb(156, 184, 203)';
            break;
        case (current >= 12 && current < 16):
            img = 'img/Seoul.jpg';
            color = 'rgb(95, 124, 255)';  
            break;
        case (current >= 16 && current < 20):
            img = 'img/real_monte4.jpeg';
            color = 'rgb(147, 17, 34)';
            break;
        case (current >= 20 && current < 24):
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
