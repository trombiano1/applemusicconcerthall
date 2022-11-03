import '../scss/styles.scss'
import 'datatables.net-bs5'

var $ = require('jquery');
window.$ = $;

// const __ = require('multi-lang')();
  
// const fs = require('fs');
// let student = JSON.parse(rawdata);

// console.log(student);

$.getJSON('lang.json', (data) => {
    var language_dict = JSON.parse(JSON.stringify(data));
    for (var key of Object.keys(language_dict)) {

        // console.log(__("{{Apple Music Concerthall}}"));
        // console.log(__`${result[0].toString()}`);

        document.body.innerHTML = document.body.innerHTML.replace("{{" + key + "}}", language_dict[key]);

        // console.log(key);
    }
    require('./fetch.js');
    // document.body.innerHTML = document.body.innerHTML.replaceAll("{{Apple Music Concerthall}}", 'hi');
});

// document.body.innerHTML = document.body.innerHTML.replaceAll("{{Apple Music Concerthall}}", 'hi');

// var reg = /{{.*}}/g;
// var result;
// while((result = reg.exec(document.body.innerHTML)) !== null) {
//     console.log(__("{{Apple Music Concerthall}}"));
//     console.log(__`${result[0].toString()}`);
//     // document.body.innerHTML = document.body.innerHTML.replaceAll(result[0], __("{{Apple Music Concerthall}}"));
// }