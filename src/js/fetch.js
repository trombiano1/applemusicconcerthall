"use strict";

var $ = require('jquery');
window.$ = $;

const developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYyMTM3MzE5LCJpYXQiOjE2NjE1MzI1MTl9.C428yZYJjwSNd2z9llG68eWsfFfG8hMTmus7YqDFzs8BqWNGIXKOCiM8CWV_0pETSvhFz1nPfXIPm9b4wvOpBg"

let searchedAlbumNames = {}
let composerIdHistory = {}
let pieceNameHistory = {}

$('searchButton').off();
$('#searchButton').on('click', () => {
    const queryComposerId = '186'; // Sibelius
    const queryPieceId = '22016'; // 22016
    getSongCandidates().then(
        function(value){
            let albums = value;
            albums.forEach(album => {
                let guesserAPIArray = []
                album['songs'].forEach(song =>{
                    const composerName = song['composerName'];
                    const pieceName = song['name'].split(":")[0];
                    if (typeof pieceNameHistory[pieceName] === "undefined"){
                        guesserAPIArray.push({'composer': composerName, 'title': pieceName});// .split(", FP")[0]});
                        pieceNameHistory[pieceName] = true;
                    }
                });
                const guesserAPIString = JSON.stringify(guesserAPIArray);
                guessWorks(guesserAPIString, queryPieceId).then((value) => {
                    if (value) {
                        console.log(album['url']);
                    }
                });
            });
        }
    );
});

function guessWorks(guesserAPIString, queryPieceId){
    return new Promise(function(resolve){
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

function getSongCandidates(){
    return new Promise(function(resolve){
        // const url = 'https://api.music.apple.com/v1/catalog/us/search?limit=25&types=albums&term=Tchaikovsky+Symphony+1'
        // const url = 'https://api.music.apple.com/v1/catalog/us/search?limit=5&types=songs&term=poulenc+trio'
        const url = 'https://api.music.apple.com/v1/catalog/us/search?limit=25&types=songs&term=sibelius+symphony+5'

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Authorization', "Bearer "+developerToken);
        request.send();

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                let funcs = []
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
                Promise.all(funcs).then(
                    function(values){
                        resolve(values);
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