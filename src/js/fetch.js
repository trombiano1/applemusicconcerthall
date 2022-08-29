"use strict";

var $ = require('jquery');
window.$ = $;

const developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYyMTM3MzE5LCJpYXQiOjE2NjE1MzI1MTl9.C428yZYJjwSNd2z9llG68eWsfFfG8hMTmus7YqDFzs8BqWNGIXKOCiM8CWV_0pETSvhFz1nPfXIPm9b4wvOpBg"

let searchedAlbumNames = {}
let composerIdHistory = {}
let pieceNameHistory = {}

$('searchButton').off();
$('#searchButton').on('click', () => {
    // const queryComposerId = '186'; // Sibelius
    // const queryPieceId = '76'; // Tchaikovsky
    // const queryPieceId = '22016'; // Sibelius 5
    const queryPieceId = '7638'; // Tchaikovsky 5
    getAllSongCandidates().then(
        function(value){
            let albums = value;
            albums.forEach(album => {
                let guesserAPIArray = [];
                let funcs = [];
                album['songs'].forEach(song =>{
                    const composerName = song['composerName'];
                    const pieceName = song['name'].split(":")[0];
                    if (typeof pieceNameHistory[pieceName] === "undefined"){
                        guesserAPIArray.push({'composer': composerName, 'title': pieceName});// .split(", FP")[0]});
                        pieceNameHistory[pieceName] = true;
                        if (guesserAPIArray.length >= 10){
                            funcs.push(guessWorks(JSON.stringify(guesserAPIArray), queryPieceId));
                            guesserAPIArray = [];
                        }
                    }
                });
                funcs.push(guessWorks(JSON.stringify(guesserAPIArray), queryPieceId));
                Promise.all(funcs).then((values) => {
                    // console.log(values);
                    for (let i = 0; i < values.length; i++){
                        if (values[i]) {
                            console.log(album['url']);
                            return;
                        }
                    }
                    console.log("done");
                });
            });
        }
    );
});

function guessWorks(guesserAPIString, queryPieceId){
    return new Promise(function(resolve){
        console.log(guesserAPIString, queryPieceId);
        const url = `https://api.openopus.org/dyn/work/guess?works=${guesserAPIString}`
        let request = new XMLHttpRequest();
        // request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        request.open("POST", url, true);
        request.send();

        let found = false;

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                if (data['works'] !== null){
                    for (let i = 0; i < data['works'].length; i++){
                        const element = data['works'][i];
                        if (queryPieceId == element['guessed']['id']){
                            found = true;
                            break;
                        }
                    }
                }
                resolve(found);
            }
        }
    });
}

function getComposerId(string){
    return new Promise(function(resolve){
        // if already exists, return history
        if (typeof composerIdHistory[string] !== "undefined"){
            resolve(composerIdHistory[string]);
        }

        // ask API
        const url = `https://api.openopus.org/composer/list/search/${string}.json`
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();

        request.onreadystatechange = function () {
            if (request.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                const composerId = data['composers'][0]['id'];
                composerIdHistory[string] = composerId;
                // Return first hit
                resolve(data['composers'][0]['id'])
            }
        };
    });
}

function getAllSongCandidates(offset){
    return new Promise(function(resolve){
        let albums = [];
        // ループ処理（再帰的に呼び出し）
        function loop(i) {
            // 非同期処理なのでPromiseを利用
            getSongCandidates(i).then(function(value) {
                // console.log(value);
                albums = albums.concat(value[0]);
                if (value[1]) {
                    loop(i+25);
                } else {
                    resolve(albums);
                }
            });
        }
        // 初回実行
        loop(0);
    });
}

function getSongCandidates(offset){
    return new Promise(function(resolve){
        console.log(offset);
        // const url = 'https://api.music.apple.com/v1/catalog/us/search?limit=25&types=albums&term=Tchaikovsky+Symphony+1'
        // const url = 'https://api.music.apple.com/v1/catalog/us/search?limit=5&types=songs&term=poulenc+trio'
        const url = `https://api.music.apple.com/v1/catalog/us/search?offset=${offset}&limit=25&term=tchaikovsky+symphony+5&types=albums`

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Authorization', "Bearer "+developerToken);
        request.send();

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                let funcs = [];
                let cnt;
                if (data['meta']['results']['order']['length'] == 0){
                    cnt = false;
                } else {
                    if (data['results'].hasOwnProperty('songs') && data['results']['songs'].hasOwnProperty('next')){
                        cnt = true;
                    } else {
                        cnt = false;
                    }
                    // for debug; cuts off at 100
                    // if (offset > 100){
                    //     cnt = false;
                    // }
                    data['results']['songs']['data'].forEach(element => {
                        const id = element['id'];
                        const albumName = element['attributes']['albumName'];
                        if (!searchedAlbumNames[albumName]){
                            // getAlbum(id).then( // getAlbumが解消
                            //     function(value){
                            //         albums.push(getAlbum(id));
                            //         resolve(albums);
                            //     }
                            // );
                            funcs.push(getAlbum(id));
                        }
                        searchedAlbumNames[albumName] = true;
                    });
                }
                Promise.all(funcs).then(
                    function(values){
                        resolve([values, cnt]);
                    }
                )
            }
        };
    });
}

function getAlbum(songId){
    return new Promise(function(resolve){
        const url = `https://api.music.apple.com/v1/catalog/us/songs/${songId}/albums`

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Authorization', "Bearer "+developerToken);
        request.send();

        let album = {}

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                let data = JSON.parse(this.responseText);

                album["id"] = data['data'][0]['id'];
                album["name"] = data['data'][0]['attributes']['name'];
                album["releaseDate"] = data['data'][0]['attributes']['releaseDate'];
                album["recordLabel"] = data['data'][0]['attributes']['recordLabel'];
                album["url"] = data['data'][0]['attributes']['url'];

                getSongsInAlbum(album["id"]).then(
                    function(value){
                        album["songs"] = value;
                        resolve(album);
                    }
                );
            }
        }
    });
}

function getSongsInAlbum(albumId){
    return new Promise(function(resolve){
        // const url = 'https://api.music.apple.com/v1/catalog/us/songs/' + id + '/albums'
        const url = `https://api.music.apple.com/v1/catalog/us/albums/${albumId}/tracks`

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Authorization', `Bearer ${developerToken}`);
        request.send();

        let songsInAlbum = [];

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                data['data'].forEach(element => {
                    let songInAlbum = {};
                    songInAlbum["artistName"] = element['attributes']['artistName'];
                    songInAlbum["attribution"] = element['attributes']['attribution'];
                    songInAlbum["composerName"] = element['attributes']['composerName'];
                    songInAlbum["movementCount"] = element['attributes']['movementCount'];
                    songInAlbum["movementName"] = element['attributes']['movementName'];
                    songInAlbum["movementNumber"] = element['attributes']['movementNumber'];
                    songInAlbum["name"] = element['attributes']['name'];
                    songsInAlbum.push(songInAlbum);
                });
                resolve(songsInAlbum);
            }
        }
    });
}