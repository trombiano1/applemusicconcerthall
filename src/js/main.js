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

    console.log($("#historycards").html());
    if ($("#historycards").html() == "") {
        try {
            let history = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]));
            console.log(history);

            for (let i = 0; i < history.length; i++) {
                $("#historycards").html($("#historycards").html() + "<div queryComposerId='" + history[i][2] + "' queryComposerName='" + history[i][3] + "' queryPieceId = '" + history[i][4] + "' queryCatalogNumber='" + history[i][5] + "' query='" + history[i][6] + "' class=\"card card-body me-3\"><div class='cardPiece' style=\"cursor: pointer;\">" + history[i][1] + "</div><div style=\"cursor: pointer;\" class='cardComposer' style='color: #444 !important;'><small>" + history[i][0] + "</small></div><span class=\"close\"></span></div>");
            }
        } catch (error) {

        }
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
        $("#composerList").html(result)
    }

    $("#composerList a").each(function(index) {
        $(this).css("border-top-left-radius", "0px");
        $(this).css("border-top-right-radius", "0px");
        $(this).css("border-bottom-left-radius", "0px");
        $(this).css("border-bottom-right-radius", "0px");
        $(this).css("border-top", "none");
        $(this).css("border-left", "none");
        $(this).css("border-right", "none");

    });
});

$.get("./composers_jp.html", function(result)
{
    if (window.location.pathname == "/jp.html") {
        $("#composerList").html(result)
    }

    $("#composerList a").each(function(index) {
        $(this).css("border-top-left-radius", "0px");
        $(this).css("border-top-right-radius", "0px");
        $(this).css("border-bottom-left-radius", "0px");
        $(this).css("border-bottom-right-radius", "0px");
        $(this).css("border-top", "none");
        $(this).css("border-left", "none");
        $(this).css("border-right", "none");
    });

    // $("#composerList a").each(function(index) {
    //     if(index == 0){
    //         $(this).css("border-top-left-radius", "10px");
    //         $(this).css("border-top-right-radius", "10px");
    //         $(this).css("border-top", "1px solid #ddd");
    //     }
    //     if(index == $(".list-group-item:visible").length - 1){
    //         $(this).css("border-bottom-left-radius", "10px");
    //         $(this).css("border-bottom-right-radius", "10px");
    //     }
    // });
});
{/* <div class="card card-body">Card</div> */}

// document.body.innerHTML = document.body.innerHTML.replaceAll("{{Apple Music Concerthall}}", 'hi');

// var reg = /{{.*}}/g;
// var result;
// while((result = reg.exec(document.body.innerHTML)) !== null) {
//     console.log(__("{{Apple Music Concerthall}}"));
//     console.log(__`${result[0].toString()}`);
//     // document.body.innerHTML = document.body.innerHTML.replaceAll(result[0], __("{{Apple Music Concerthall}}"));
// }