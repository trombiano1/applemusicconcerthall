import '../scss/styles.scss'
import 'datatables.net-bs5'

var $ = require('jquery');
window.$ = $;

// const __ = require('multi-lang')();
  
// const fs = require('fs');
// let student = JSON.parse(rawdata);

// console.log(student);

console.log(window.location.pathname);

$("body").css("display", "none");

$.getJSON('lang.json', (data) => {
    var language_dict = JSON.parse(JSON.stringify(data));
    for (var key of Object.keys(language_dict)) {

        // console.log(__("{{Apple Music Concerthall}}"));
        // console.log(__`${result[0].toString()}`);
        
        if (window.location.pathname == "/jp.html") {
            document.body.innerHTML = document.body.innerHTML.replace("{{" + key + "}}", language_dict[key]);
        } else {
            document.body.innerHTML = document.body.innerHTML.replace("{{" + key + "}}", key);
        }

        // console.log(key);
    }
    require('./fetch.js');
    if (window.location.pathname == "/jp.html") {
        document.getElementById("navbarDropdown").innerHTML = "  日本語  ";
    } else {
        document.getElementById("navbarDropdown").innerHTML = "  English  ";
    }
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    // $(window).bind("load", function() {
    // $("body").fadeIn(100);
    //  });
    // document.body.innerHTML = document.body.innerHTML.replaceAll("{{Apple Music Concerthall}}", 'hi');
});

$.get("./composers_en.html", function(result)
{
    if (window.location.pathname != "/jp.html") {
        $("#composer").html(result)
    }
});

$.get("./composers_jp.html", function(result)
{
    if (window.location.pathname == "/jp.html") {
        $("#composer").html(result)
    }
});

// document.body.innerHTML = document.body.innerHTML.replaceAll("{{Apple Music Concerthall}}", 'hi');

// var reg = /{{.*}}/g;
// var result;
// while((result = reg.exec(document.body.innerHTML)) !== null) {
//     console.log(__("{{Apple Music Concerthall}}"));
//     console.log(__`${result[0].toString()}`);
//     // document.body.innerHTML = document.body.innerHTML.replaceAll(result[0], __("{{Apple Music Concerthall}}"));
// }