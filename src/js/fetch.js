"use strict";
import dt from 'datatables.net';
import { Modal } from 'bootstrap'

const developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYzMjA2NzgxLCJpYXQiOjE2NjI2MDE5ODF9.oZQ1czou1KMZXCuhaXZlv5pMV5t4HGOyVDrbcJSELY3IWvUIDGzBC6KGm8P2oIt4_benZlLR1dOunREzRazhgA"

const COMPOSER_IDS = {'John Adams': 149, 'Thomas Adès': 130, 'Isaac Albéniz': 216, 'Tomaso Albinoni': 27, 'George Antheil': 108, 'Malcolm Arnold': 20, 'Milton Babbitt': 180, 'Johann Sebastian Bach': 87, 'Carl Philipp Emanuel Bach': 192, 'Johann Christian Bach': 109, 'Mily Balakirev': 21, 'Samuel Barber': 19, 'Béla Bartók': 125, 'Arnold Bax': 103, 'Ludwig van Beethoven': 145, 'Vincenzo Bellini': 51, 'Alban Berg': 210, 'Luciano Berio': 133, 'Hector Berlioz': 175, 'Leonard Bernstein': 135, 'Franz Berwald': 195, 'Heinrich Franz von Biber': 47, 'Harrison Birtwistle': 48, 'Georges Bizet': 68, 'Ernest Bloch': 106, 'Luigi Boccherini': 66, 'Alexander Borodin': 43, 'Pierre Boulez': 132, 'Joly Braga Santos': 153, 'Johannes Brahms': 80, 'Benjamin Britten': 169, 'Max Bruch': 184, 'Anton Bruckner': 2, 'Ferruccio Busoni': 84, 'Dietrich Buxtehude': 73, 'William Byrd': 86, 'John Cage': 56, 'Camargo Guarnieri': 159, 'Elliott Carter': 163, 'Emmanuel Chabrier': 123, 'Marc-Antoine Charpentier': 9, 'Ernest Chausson': 61, 'Carlos Chávez': 174, 'Luigi Cherubini': 120, 'Frédéric Chopin': 152, 'Aaron Copland': 170, 'Arcangelo Corelli': 139, 'John Corigliano': 144, 'François Couperin': 128, 'George Crumb': 31, 'César Cui': 71, "Vincent d'Indy": 127, 'Michael Daugherty': 81, 'Claude Debussy': 105, 'Léo Delibes': 193, 'Frederick Delius': 8, 'Josquin Des Prez': 50, 'Karl Ditters von Dittersdorf': 206, 'Ernst von Dohnányi': 112, 'Gaetano Donizetti': 89, 'John Dowland': 102, 'Guillaume Dufay': 82, 'Paul Dukas': 116, 'Maurice Duruflé': 91, 'Henri Dutilleux': 110, 'Antonín Dvořák': 189, 'Edward Elgar': 198, 'George Enescu': 38, 'Manuel de Falla': 37, 'Gabriel Fauré': 53, 'John Field': 74, 'César Franck': 12, 'Girolamo Frescobaldi': 58, 'George Gershwin': 136, 'Carlo Gesualdo': 14, 'Orlando Gibbons': 151, 'Alberto Ginastera': 32, 'Philip Glass': 95, 'Alexander Glazunov': 179, 'Reinhold Glière': 85, 'Mikhail Ivanovich Glinka': 156, 'Christoph Willibald von Gluck': 92, 'Karl Goldmark': 1, 'Antonio Carlos Gomes': 207, 'Henryk Górecki': 16, 'Morton Gould': 70, 'Charles Gounod': 29, 'Percy Grainger': 99, 'Enrique Granados': 76, 'Edvard Grieg': 162, 'Sofia Gubaidulina': 172, 'George Frideric Handel': 67, 'Howard Hanson': 42, 'Roy Harris': 201, 'Franz Joseph Haydn': 208, 'Hans Werner Henze': 155, 'Victor Herbert': 94, 'Paul Hindemith': 154, 'Vagn Holmboe': 158, 'Gustav Holst': 75, 'Arthur Honegger': 200, 'Johann Nepomuk Hummel': 30, 'Engelbert Humperdinck': 15, 'Jacques Ibert': 122, 'Charles Ives': 217, 'Leoš Janáček': 96, 'Clément Janequin': 23, 'Scott Joplin': 148, 'Dmitry Kabalevsky': 63, 'Aram Khachaturian': 218, 'Zoltán Kodály': 34, 'Erich Wolfgang Korngold': 7, 'Edouard Lalo': 59, 'Orlande de Lassus': 88, 'Ruggero Leoncavallo': 194, 'Léonin': 220, 'György Ligeti': 26, 'Franz Liszt': 197, 'Fernando Lopes-Graça': 119, 'Jean-Baptiste Lully': 10, 'Witold Lutoslawski': 142, 'Edward MacDowell': 114, 'Guillaume de Machaut': 157, 'Gustav Mahler': 77, 'Marin Marais': 204, 'Benedetto Marcello': 177, 'Alessandro Marcello': 187, 'Bohuslav Martinů': 11, 'Pietro Mascagni': 69, 'Jules Massenet': 124, 'Felix Mendelssohn': 147, 'Olivier Messiaen': 150, 'Francisco Mignone': 64, 'Darius Milhaud': 121, 'Ernest Moeran': 164, 'Claudio Monteverdi': 39, 'Wolfgang Amadeus Mozart': 196, 'Modest Mussorgsky': 181, 'Carl Nielsen': 52, 'Luigi Nono': 111, 'Jacob Obrecht': 28, 'Johannes Ockeghem': 117, 'Jacques Offenbach': 134, 'Carl Orff': 93, 'Johann Pachelbel': 115, 'Niccolò Paganini': 3, 'Giovanni Pierluigi da Palestrina': 214, 'Arvo Pärt': 5, 'Krzysztof Penderecki': 203, 'Giovanni Battista Pergolesi': 113, 'Pérotin': 219, 'Astor Piazzolla': 40, 'Francis Poulenc': 202, 'Michael Praetorius': 78, 'Sergei Prokofiev': 185, 'Giacomo Puccini': 146, 'Henry Purcell': 199, 'Sergei Rachmaninoff': 188, 'Jean-Philippe Rameau': 178, 'Einojuhani Rautavaara': 100, 'Maurice Ravel': 57, 'Max Reger': 72, 'Steve Reich': 176, 'Ottorino Respighi': 173, 'Wolfgang Rihm': 90, 'Nikolai Rimsky-Korsakov': 118, 'Joaquín Rodrigo': 215, 'Ned Rorem': 107, 'Gioachino Rossini': 60, 'Albert Roussel': 140, 'Camille Saint-Saëns': 45, 'Antonio Salieri': 143, 'Erik Satie': 104, 'Domenico Scarlatti': 97, 'Alessandro Scarlatti': 65, 'Franz Schmidt': 160, 'Alfred Schnittke': 137, 'Arnold Schoenberg': 62, 'Franz Schubert': 183, 'William Schuman': 24, 'Robert Schumann': 129, 'Heinrich Schütz': 191, 'Alexander Scriabin': 18, 'Dmitri Shostakovich': 46, 'Jean Sibelius': 186, 'Bedrich Smetana': 211, 'Fernando Sor': 212, 'Louis Spohr': 166, 'Carl Stamitz': 209, 'Wilhelm Stenhammar': 4, 'Karlheinz Stockhausen': 101, 'Richard Strauss': 171, 'Johann Strauss Jr': 165, 'Igor Stravinsky': 190, 'Josef Suk': 33, 'Jan Pieterszoon Sweelinck': 182, 'Karol Szymanowski': 49, 'Toru Takemitsu': 213, 'Thomas Tallis': 126, 'Giuseppe Tartini': 167, 'John Taverner': 54, 'Pyotr Ilyich Tchaikovsky': 79, 'Georg Philipp Telemann': 83, 'Michael Tippett': 13, 'Edgard Varèse': 22, 'Ralph Vaughan Williams': 36, 'Giuseppe Verdi': 35, 'Tomás Luis de Victoria': 205, 'Heitor Villa-Lobos': 55, 'Antonio Vivaldi': 98, 'Richard Wagner': 138, 'William Walton': 44, 'Carl Maria von Weber': 168, 'Anton Webern': 6, 'Kurt Weill': 131, 'Charles-Marie Widor': 41, 'Hugo Wolf': 161, 'Iannis Xenakis': 17, 'Eugene Ysaÿe': 141, 'Alexander von Zemlinsky': 25}

const performerTypes = {'Chamber' : ['Ensemble'], 'Orchestral':['Conductor', 'Orchestra'], 'Keyboard':['Solist'], 'Stage':['Conductor', 'Orchestra'], 'Concerto' : ['Solist', 'Conductor', 'Orchestra']};

var $ = require('jquery');
window.$ = $;

// history
let composerIdHistory = {};
let idHistory = {};

// query
let queryComposerName;
let queryComposerId;
let queryPieceName;
let queryPieceId;
let queryPieceRoles = [];

// progress bar
let totalAlbums;
let doneAlbums;
let totalGuesses;
let doneGuesses;
let totalRoles;
let doneRoles;

var resultTable = $('#resultTable').DataTable({
    searching: true,
    columnDefs: [
        {
            targets: 0,
            width: '100px',
            className: 'text-center align-middle',
        }, 
        {
            targets: 1,
            width: '50px',
            className: 'text-center align-middle',
        },
        {
            targets: 2,
            className: 'align-middle',
        },
        {
            targets: 3,
            className: 'align-middle',
        },
        {
            targets: 4,
            className: 'align-middle',
        },
        {
            targets: 5,
            className: 'align-middle',
        }
      ]
});

$(function() { 
    $("#progressbar").addClass("dark-red-background");
    $(".dataTables_length").addClass("w-100");
    $(".dataTables_filter").addClass("w-100");
 });

$(document.body).on('click', '.worklink' ,function(e){
    $('#worksCollapse').removeClass('show');
    $('#searchButton').removeClass('d-none');
    queryPieceId = parseInt($(this).attr('value'));
    queryPieceName = $(this).html();
    // set button name
    $('#selectedWork').html(queryPieceName);
});

$('#searchButton').on('click', () => {
    // show table container and progress
    $('#tableContainer').removeClass('d-none');
    $('#progressContainer').removeClass('d-none');
    $('#tableWrapper').addClass('d-none');

    console.log(queryPieceName);
    // get rid of 'in E major'
    if (queryPieceName.includes(' in ') && queryPieceName.includes(' major')){
        queryPieceName = queryPieceName.split(" in ")[0] + ' ' + queryPieceName.split(' major').pop();
    }
    if (queryPieceName.includes(' in ') && queryPieceName.includes(' minor')){
        queryPieceName = queryPieceName.split(" in ")[0] + ' ' + queryPieceName.split(' minor').pop();
    }
    if (queryPieceName.includes(' in ')){
        queryPieceName = queryPieceName.split(" in ")[0];
    }

    // get rid of 'no.'
    queryPieceName = queryPieceName.replace(" no. ", " ");

    // get rid of 'op. 42'
    queryPieceName = queryPieceName.split(" op.")[0];

    // get rid of comma
    queryPieceName = queryPieceName.replaceAll(",", " ");

    // get rid of double space
    queryPieceName = queryPieceName.replaceAll("  ", " ");

    //get rid of end space
    queryPieceName.replace(/\s+$/, '');
    
    $('#progressbar').attr('style', 'width: 2%;');
    $('#progressText').html('Looking for albums...');

    // disable buttons until finish
    $("#composer").attr('disabled', true);
    $("#genre").attr('disabled', true);
    $("#selectedWork").attr('data-bs-toggle', '');
    $("#selectedWork").attr('style', 'background-color: #EAECEF !important; text-decoration: none !important;');

    getResults();
});

$('#composer').on('input', () => {
    // hide others
    $('#genreContainer').addClass('d-none');
    $('#workContainer').addClass('d-none');
    $('#worksCollapse').removeClass('show');
    $('#searchButton').addClass('d-none');

    var val = document.getElementById("composer").value;
    var opts = document.getElementById('composersdatalist').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        // yourCallbackHere()
        queryComposerId = COMPOSER_IDS[opts[i].value];
        queryComposerName = opts[i].value.split(/ /).pop();

        getGenres();
        break;
      }
    }
});

$('#genre').on('change', function() {
    $('#selectedWork').html("Select work from below:");
    listWorks(document.getElementById('genre').value);
    // $('#worksCollapse').collapse();
});

function listWorks(genre){
    const url = `https://api.openopus.org/work/list/composer/${queryComposerId}/${genre}.json`
    let request = new XMLHttpRequest();
    // request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState==4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            let HTMLString = "";
            let newData = data['works'].sort(function(first, second) {
                return first['title'].localeCompare(second['title']);
            });
            newData.forEach(work => {
                HTMLString += `<a href="#" class="worklink list-group-item list-group-item-action w-100" value="${work['id']}">${work['title']}</a>`;
                // HTMLString += `<li class="list-group-item" value=${work['id']}>${work['title']}</li>`;
            });
            document.getElementById('worksList').innerHTML = HTMLString;
            $('#workContainer').removeClass('d-none');
            $('#worksCollapse').addClass('show');
        } else if (request.readyState==4 && this.status != 200){
            showErrorModal(this.tatus);
        }
    }
}

function getGenres(){
    const url = `https://api.openopus.org/genre/list/composer/${queryComposerId}.json`
    let request = new XMLHttpRequest();
    // request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    request.open("POST", url, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState==4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            let HTMLString = `<option value="Select genre" disabled selected>Select genre...</option>`;
            data['genres'].forEach(genre => {
                if (genre != "Popular" && genre != "Recommended"){
                    HTMLString += `<option value="${genre}">${genre}</option>`;
                }
            });
            document.getElementById('genre').innerHTML = HTMLString;
            $('#genreContainer').removeClass('d-none');
        } else if (request.readyState==4 && this.status != 200){
            showErrorModal(this.tatus);
        }
    }
}

function getResults(){
    // reset history
    idHistory = {};

    // reset progress bar
    totalAlbums = 300;
    doneAlbums = 0;
    totalGuesses = 0;
    doneGuesses = 0;
    totalRoles = 0;
    doneRoles = 0;

    console.log(queryComposerId);
    console.log(queryComposerName);
    console.log(queryPieceId);
    console.log(queryPieceName);
    resultTable.clear().draw();
    // const queryComposerId = '186'; // Sibelius
    // const queryComposerName = 'Sibelius'; 
    // const queryComposerId = '186'; // Sibelius
    // const queryPieceId = '22016'; // Sibelius 5
    getAllSongCandidates().then(
        function(value){
            console.log("Albums retrieved");
            // $('#progressbar').attr('style', 'width: 45%;');
            let albums = value;
            let funcs = [];
            let trackNumbers = [];
            let remember = [];
            let sendAlbums = [];
            // for each album
            albums.forEach(album => {
                let guesserAPIArray = [];
                let pieceNameHistory = {};
                let albumTrackNumbers = {};
                // for each song
                album['songs'].forEach(song => {
                    const composerName = song['composerName'];
                    const tracknumber = song['trackNumber'];

                    let pieceName = song['name'].split(":")[0];

                    // name shenanigans
                    pieceName = pieceName.replace("No ", "No. ");
                    
                    let newString;
                    // create guesserAPIArray for the album
                    if (typeof composerName === "undefined" ){
                        // composerNameが定義されていないCD
                        // アルバムタイトルにcomposerNameが入っていないか確認
                        if (album["name"].toLowerCase().includes(queryComposerName.toLowerCase())){
                            newString = JSON.stringify({'composer': queryComposerName, 'title': pieceName});
                            guesserAPIArray.push({'composer': queryComposerName, 'title': pieceName});// .split(", FP")[0]});
                            albumTrackNumbers[newString] = tracknumber;
                            pieceNameHistory[pieceName] = true;
                        }
                    } else {
                        if (typeof pieceNameHistory[pieceName] === "undefined"){
                            newString = JSON.stringify({'composer': composerName, 'title': pieceName});
                            guesserAPIArray.push({'composer': composerName, 'title': pieceName});// .split(", FP")[0]});
                            albumTrackNumbers[newString] = tracknumber;
                            pieceNameHistory[pieceName] = true;
                        }
                    }
                });

                while(guesserAPIArray.length) {

                    funcs.push(guessWorks(guesserAPIArray.splice(0,5), queryPieceId));
                    trackNumbers.push(albumTrackNumbers);
                    sendAlbums.push(album);
                }

                // funcs.push(guessWorks(JSON.stringify(guesserAPIArray), queryPieceId));
                // trackNumbers.push(albumTrackNumbers);
                // remember.push(guesserAPIArray);
            });
            totalGuesses = funcs.length;
            Promise.all(funcs).then((values) => {
                console.log("Guesses retrieved");
                resultTable.row().remove();

                let getRolesFuncs = [];
                let validAlbums = [];

                for (let i = 0; i < sendAlbums.length; i++){
                    if (values[i] != -1){
                        getRolesFuncs.push(getRoles(sendAlbums[i]['songs'][trackNumbers[i][values[i]] - 1]['artistName']));
                        validAlbums.push(sendAlbums[i]);
                    }
                }

                totalRoles = getRolesFuncs.length;

                Promise.all(getRolesFuncs).then((retrievedRoles) => {
                    const counts = {};
                    console.log("Roles retrieved");
                    retrievedRoles.forEach(roles => {
                        counts[Object.keys(roles).sort()] = (counts[Object.keys(roles).sort()] || 0) + 1;
                    });
                    let maximum = -1;

                    for (const [key, value] of Object.entries(counts)) {
                        if (value > maximum){
                            queryPieceRoles = key.split(',').filter(Boolean);
                            maximum = value;
                        }
                    }

                    // set header and hide columns
                    for (let i = 0; i < 4; i++) {
                        if (i < queryPieceRoles.length){
                            $(resultTable.column(i+2).header()).text(queryPieceRoles[i]);
                            resultTable.column(i+2).visible(true);
                        } else {
                            resultTable.column(i+2).visible(false);
                        }
                    }
                    $("#resultTable").width("100%");

                    // reenable search
                    // disable buttons until finish
                    $("#composer").attr('disabled', false);
                    $("#genre").attr('disabled', false);
                    $("#selectedWork").attr('data-bs-toggle', 'collapse');
                    $("#selectedWork").attr('style', 'text-decoration: none !important;');

                    // show table
                    $('#progressContainer').addClass('d-none');
                    $('#tableWrapper').removeClass('d-none');
                    
                    for (let i = 0; i < validAlbums.length; i++){
                        let assignedRoles = {};
                        let invalid;
                        let validCount = 0;
                        let invalidCount = 0;

                        // if retrieved role is in piece roles
                        for (let j = 0; j < queryPieceRoles.length; j++) {
                            if (queryPieceRoles[j] in retrievedRoles[i]){
                                assignedRoles[queryPieceRoles[j]] = retrievedRoles[i][queryPieceRoles[j]];
                                validCount++;
                            }
                        }
                        
                        // if weird role is retrieved
                        for (const [key, value] of Object.entries(retrievedRoles[i])) {
                            if (!queryPieceRoles.includes(key)) {
                                invalid = value;
                                invalidCount++;
                            }
                        }
                        // if one is missing and one is invalid, assume that is the one
                        if (validCount = queryPieceRoles.length - 1 && invalidCount == 1 && invalid !== undefined){
                            for (let j = 0; j < queryPieceRoles.length; j++) {
                                if (!(queryPieceRoles[j] in assignedRoles)){
                                    assignedRoles[queryPieceRoles[j]] = invalid;
                                    break;
                                }
                            }
                        }

                        // // add to addList
                        // let addList = [];
                        // for (let j = 0; j < queryPieceRoles.length; j++){
                        //     if (queryPieceRoles[j] in assignedRoles) {
                        //         addList.push(assignedRoles[queryPieceRoles[j]]);
                        //     }
                        // }
                        // for (let j = queryPieceRoles.length; j < 4; j++){
                        //     addList.push('a');
                        // }
                        let addList = [];
                        for (let j = 0; j < queryPieceRoles.length; j++){
                            if (queryPieceRoles[j] in assignedRoles) {
                                addList.push(`<div class='ic'><i class='icon ${queryPieceRoles[j]}Icon'></i><div>${assignedRoles[queryPieceRoles[j]][0]}</div></div>`);
                            } else {
                                addList.push("");
                            }
                        }
                        for (let j = queryPieceRoles.length; j < 4; j++){
                            addList.push("");
                        }

                        // let addList = [];
                        // for (let j = 0; j < queryPieceRoles.length; j++) {
                        //     if (queryPieceRoles[j] in retrievedRoles[i]){
                        //         addList.push(retrievedRoles[i][queryPieceRoles[j]]);
                        //     }
                        // }
                        // for (let j = queryPieceRoles.length; j < 4; j++){
                        //     addList.push('');
                        // }

                        // if enough infomration
                        if (addList.length == 4){
                            // console.log(validAlbums[i]['id']);
                            if (!(validAlbums[i]['id'] in idHistory)){
                                resultTable.row.add([
                                    `<a href='${validAlbums[i]['url']}' target="_blank">
                                    <img class='shadow-sm albumart' style='width: 100px !important;' src=${validAlbums[i]['artworkUrl'].replace('{w}x{h}', '300x300')}/></a>`,
                                    validAlbums[i]['releaseDate'].split('-')[0]
                                ].concat(addList)).draw(false);
                                idHistory[validAlbums[i]['id']] = 1;
                            }
                        }
                    }
                });
            });
        }
    );
}

function getRoles(rolesString){
    return new Promise(function(resolve){
        if (rolesString == "-1"){
            resolve("");
        }

        let rolesAPIString = JSON.stringify(rolesString.split(/ and | & |\/|, /));

        let result = {};
        $.ajax({
            url: `https://quiet-savannah-18236.herokuapp.com/https://api.openopus.org/dyn/performer/list?names=${rolesAPIString}`,
            type: "GET",
            // dataType: "json",
            // contentType: "application/json",
            // data: JSON.stringify({
            //     works: guessAPIArray
            // }),
            // set the request header authorization to the bearer token that is generated
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            success: function(retrievedResult) {
                const data = retrievedResult;
                data['performers']['readable'].forEach(element => {
                    if (element['role'] in result){
                        result[element['role']].push(element['name']);
                    } else {
                        result[element['role']] = [element['name']];
                    }
                });
                doneRoles++;
                $('#progressbar').attr('style', `width: ${Math.min(doneRoles / totalRoles * 18 + 85, 100)}%;`);
                $('#progressText').html('Matching performers...');
                resolve(result);
            },
            error: function(error) {
              console.log(`Error ${error}`)
            },
        });

        // let rolesAPIString = JSON.stringify(rolesString.split(/ and | & |\/|, /));
        // const url = `https://api.openopus.org/dyn/performer/list?names=${rolesAPIString}`;
        // let request = new XMLHttpRequest();
        // let result = {};
        // request.open("POST", url, true);
        // request.send();
        // request.onreadystatechange = function () {
        //     if (request.readyState==4 && this.status == 200) {
        //         const data = JSON.parse(this.responseText);
        //         data['performers']['readable'].forEach(element => {
        //             if (element['role'] in result){
        //                 result[element['role']].push(element['name']);
        //             } else {
        //                 result[element['role']] = [element['name']];
        //             }
        //         });
        //         doneRoles++;
        //         $('#progressbar').attr('style', `width: ${Math.min(doneRoles / totalRoles * 18 + 85, 100)}%;`);
        //         $('#progressText').html('Matching performers...');
        //         resolve(result);
        //     } else if (request.readyState==4 && this.status != 200){
        //         showErrorModal(parseInt(this.tatus));
        //     }
        // }
    });
}

function showErrorModal(status) {
    console.log(status);
    const labels = {429: "429 Too Many Requests", 502: "502 Bad Gateway"};
    const contents = {429: "Many people seem to be using this application. It should improve when you reload. Sorry for the inconvenience. <br />利用者数が多く, リクエスト数が制限に達してしまいました. 再読み込みすると改善します.", 502: "Server is down. It should improve when you reload. Sorry for the inconvenience. <br />サーバーがダウンしています. ページを再読み込みしてください."};
    $('#errorModalLabel').html(toString(status));
    $('#errorModalContent').html(contents[status]);
    let myModal = new Modal(document.getElementById('errorModal'));
    myModal.show();
}

function guessWorks(guessAPIArray, queryPieceId){

    return new Promise(function(resolve){
        $.ajax({
            url: `https://quiet-savannah-18236.herokuapp.com/https://api.openopus.org/dyn/work/guess?works=${encodeURIComponent(JSON.stringify(guessAPIArray))}`,
            type: "GET",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            success: function(result) {
                let found = -1;
                const data = result;
                if (data['works'] !== null){
                    for (let i = 0; i < data['works'].length; i++){
                        const element = data['works'][i];
                        if (queryPieceId == element['guessed']['id']){
                            found = JSON.stringify(element['requested']);
                            break;
                        }
                    }
                }
                doneGuesses++;
                $('#progressbar').attr('style', `width: ${Math.min(doneGuesses / totalGuesses * 40 + 45, 85)}%;`);
                $('#progressText').html('Identifying works in albums...');
                resolve(found);
            },
            error: function(error) {
              console.log(`Error ${error}`)
            },
          });
    });
}

function getAllSongCandidates(offset){
    return new Promise(function(resolve){
        let albums = [];
        // ループ処理（再帰的に呼び出し）
        function loop(i) {
            // 非同期処理なのでPromiseを利用
            getSongCandidates(i).then(function(value) {
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
        // const url = `https://api.music.apple.com/v1/catalog/us/search?offset=${offset}&limit=25&term=Tchaikovsky+symphony+5&types=albums`
        const url = `https://api.music.apple.com/v1/catalog/jp/search?l=en&offset=${offset}&limit=25&term=${queryComposerName}+${queryPieceName.replaceAll(' ', '+')}&types=albums`

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
                    // // for debug; cuts off at 100
                    // if (offset > 4){
                    //     cnt = false;
                    // }

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
                            doneAlbums += 25;
                            $('#progressbar').attr('style', `width: ${Math.min(doneAlbums * 45 / totalAlbums, 45)}%;`);
                            if (doneAlbums * 45 / totalAlbums > 45) {
                                $('#progressText').html('So many albums! Looking for more...');
                            }
                            resolve([values, cnt]);
                        }
                    )
                }
            }
        };
    });
}

function getSongsInAlbum(album){
    return new Promise(function(resolve){
        const albumId = album["id"];
        // const url = 'https://api.music.apple.com/v1/catalog/us/songs/' + id + '/albums'
        const url = `https://api.music.apple.com/v1/catalog/jp/albums/${albumId}/tracks?l=en`

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
                    songInAlbum["trackNumber"] = element['attributes']['trackNumber'];
                    songInAlbum["name"] = element['attributes']['name'];
                    songsInAlbum.push(songInAlbum);
                });
                album['songs'] = songsInAlbum;
                resolve(album);
            } else if (request.readyState==4 && this.status != 200){
                showErrorModal(this.tatus);
            }
        }
    });
}