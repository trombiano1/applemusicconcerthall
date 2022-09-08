"use strict";
import dt from 'datatables.net';

var $ = require('jquery');
window.$ = $;

var table = $('#myTable').DataTable({searching: false});
const developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYzMjA2NzgxLCJpYXQiOjE2NjI2MDE5ODF9.oZQ1czou1KMZXCuhaXZlv5pMV5t4HGOyVDrbcJSELY3IWvUIDGzBC6KGm8P2oIt4_benZlLR1dOunREzRazhgA"

let searchedAlbumNames = {}
let composerIdHistory = {}

$('searchButton').off();
$('#searchButton').on('click', () => {
    const queryComposerName = 'Tchaikovsky';
    // const queryComposerId = '186'; // Sibelius
    const queryPieceId = '7638'; // Tchaikovsky 5
    // const queryComposerName = 'Sibelius'; 
    // const queryComposerId = '186'; // Sibelius
    // const queryPieceId = '22016'; // Sibelius 5
    getAllSongCandidates().then(
        function(value){
            console.log("Albums retrieved");
            let albums = value;
            let funcs = [];
            let trackNumbers = [];
            let remember = [];
            // for each album
            albums.forEach(album => {
                let guesserAPIArray = [];
                let pieceNameHistory = {};
                let albumTrackNumbers = [];
                // for each song
                album['songs'].forEach(song => {
                    const composerName = song['composerName'];
                    const tracknumber = song['trackNumber'];
                    let pieceName = song['name'].split(":")[0];

                    // name shenanigans
                    pieceName = pieceName.replace("No ", "No. ");
                    
                    // create guesserAPIArray for the album
                    if (typeof composerName === "undefined" ){
                        // composerNameが定義されていないCD
                        // console.log(song["name"], album);
                        // アルバムタイトルにcomposerNameが入っていないか確認
                        if (album["name"].toLowerCase().includes(queryComposerName.toLowerCase())){
                            guesserAPIArray.push({'composer': queryComposerName, 'title': pieceName});// .split(", FP")[0]});
                            albumTrackNumbers.push(tracknumber);
                            pieceNameHistory[pieceName] = true;
                        }
                    } else {
                        if (typeof pieceNameHistory[pieceName] === "undefined"){
                            guesserAPIArray.push({'composer': composerName, 'title': pieceName});// .split(", FP")[0]});
                            albumTrackNumbers.push(tracknumber);
                            pieceNameHistory[pieceName] = true;
                        }
                    }
                });
                // console.log(album, guesserAPIArray);
                funcs.push(guessWorks(JSON.stringify(guesserAPIArray), queryPieceId));
                trackNumbers.push(albumTrackNumbers);
                remember.push(guesserAPIArray);
            });
            Promise.all(funcs).then((values) => {
                // console.log(values);
                // console.log("Guesses retrieved");
                table.row().remove();
                for (let i = 0; i < albums.length; i++){
                    if (values[i] != -1 && albums[i]['songs'].length > trackNumbers[i][values[i]]) {
                        // console.log(albums[i], trackNumbers[i][values[i]] - 1, trackNumbers[i], remember[i]);
                        getRoles(albums[i]['songs'][trackNumbers[i][values[i]] - 1]['artistName']).then((roles) => {
                            table.row.add([
                                `<img src=${albums[i]['artworkUrl'].replace('{w}x{h}', '150x150')}/>`,
                                albums[i]['name'],
                                roles['Orchestra'],
                                roles['Conductor'],
                                roles[''],
                                albums[i]['releaseDate'],
                                `<a href='${albums[i]['url']}'>Link</a>`
                            ]).draw(false);
                            console.log("a");
                            // $('#myTable tr:last').after(`
                            // <tr>
                            //     <td><img src=${albums[i]['artworkUrl'].replace('{w}x{h}', '150x150')}/></td>
                            //     <td>${albums[i]['name']}</td>
                            //     <td>${roles['Orchestra']}</td>
                            //     <td>${roles['Conductor']}</td>
                            //     <td>${roles['']}</td>
                            //     <td>${albums[i]['releaseDate']}</td>
                            //     <td><a href='${albums[i]['url']}'>Link</a></td>
                            // </tr>`);
                        });
                    } else {
                        // console.log("false", albums[i]);
                    }
                }
            });
        }
    );
});

function getRoles(rolesString){
    return new Promise(function(resolve){
        let rolesAPIString = JSON.stringify(rolesString.split(/ and | & |\/|, /));
        // console.log(rolesAPIString);
        const url = `https://api.openopus.org/dyn/performer/list?names=${rolesAPIString}`;
        let request = new XMLHttpRequest();
        let result = {"Orchestra": [], "Conductor": [], "": []};
        request.open("POST", url, true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                data['performers']['readable'].forEach(element => {
                    if (element['role'] == "Orchestra"){
                        result["Orchestra"] = element['name'];
                    } else if (element['role'] == "Conductor") {
                        result["Conductor"] = element['name'];
                    } else {
                        result[""].push(element['name']);
                    }
                });
                // console.log(result);
                
                resolve(result);
            }
        }
    });
}

function guessWorks(guesserAPIString, queryPieceId){
    return new Promise(function(resolve){
        // console.log(guesserAPIString, queryPieceId);
        const url = `https://api.openopus.org/dyn/work/guess?works=${guesserAPIString}`
        let request = new XMLHttpRequest();
        // request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        request.open("POST", url, true);
        request.send();

        let found = -1;

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                // console.log(data, guesserAPIString)
                if (data['works'] !== null){
                    for (let i = 0; i < data['works'].length; i++){
                        const element = data['works'][i];
                        if (queryPieceId == element['guessed']['id']){
                            found = i;
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
                if (value[1]) {
                    albums = albums.concat(value[0]);
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
        const url = `https://api.music.apple.com/v1/catalog/us/search?offset=${offset}&limit=25&term=Tchaikovsky+symphony+5&types=albums`

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Authorization', "Bearer "+developerToken);
        request.send();
        
        let albums = [];

        request.onreadystatechange = function () {
            if (request.readyState==4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                let funcs = [];
                let cnt = true;

                if (data['meta']['results']['order']['length'] == '0'){
                    cnt = false;
                    resolve([],cnt);
                } else {
                    // for debug; cuts off at 100
                    if (offset > 10){
                        cnt = false;
                    }

                    data['results']['albums']['data'].forEach(element => {
                        let album = {};
                        album["id"] = element['id'];
                        album["name"] = element['attributes']['name'];
                        album["releaseDate"] = element['attributes']['releaseDate'];
                        album["recordLabel"] = element['attributes']['recordLabel'];
                        album["url"] = element['attributes']['url'];
                        album["artworkUrl"] = element['attributes']['artwork']['url'];
                        funcs.push(getSongsInAlbum(album));
                    });
                    Promise.all(funcs).then(
                        function(values){
                            resolve([values, cnt]);
                        }
                    )
                }
            }
        };
    });
}

// function getAlbum(songId){
//     return new Promise(function(resolve){
//         const url = `https://api.music.apple.com/v1/catalog/us/songs/${songId}/albums`

//         let request = new XMLHttpRequest();
//         request.open("GET", url, true);
//         request.setRequestHeader('Authorization', "Bearer "+developerToken);
//         request.send();

//         let album = {}

//         request.onreadystatechange = function () {
//             if (request.readyState==4 && this.status == 200) {
//                 let data = JSON.parse(this.responseText);

//                 album["id"] = data['data'][0]['id'];
//                 album["name"] = data['data'][0]['attributes']['name'];
//                 album["releaseDate"] = data['data'][0]['attributes']['releaseDate'];
//                 album["recordLabel"] = data['data'][0]['attributes']['recordLabel'];
//                 album["url"] = data['data'][0]['attributes']['url'];

//                 getSongsInAlbum(album["id"]).then(
//                     function(value){
//                         album["songs"] = value;
//                         resolve(album);
//                     }
//                 );
//             }
//         }
//     });
// }

function getSongsInAlbum(album){
    return new Promise(function(resolve){
        const albumId = album["id"];
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
                    // console.log(element['attributes']);
                    songInAlbum["artistName"] = element['attributes']['artistName'];
                    songInAlbum["attribution"] = element['attributes']['attribution'];
                    songInAlbum["composerName"] = element['attributes']['composerName'];
                    songInAlbum["movementCount"] = element['attributes']['movementCount'];
                    songInAlbum["movementName"] = element['attributes']['movementName'];
                    songInAlbum["movementNumber"] = element['attributes']['movementNumber'];
                    songInAlbum["trackNumber"] = element['attributes']['trackNumber'];
                    songInAlbum["name"] = element['attributes']['name'];
                    songsInAlbum.push(songInAlbum);
                });
                album['songs'] = songsInAlbum;
                resolve(album);
            }
        }
    });
}