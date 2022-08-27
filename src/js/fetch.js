var $ = require('jquery');
window.$ = $;
require('bootstrap');

$('#searchButton').on('click', function (e) {
    console.log("asdfasdf");
    const url = 'https://api.music.apple.com/v1/catalog/us/search?types=songs&term=Tchaikovsky+Symphony'
    let developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYyMTM3MzE5LCJpYXQiOjE2NjE1MzI1MTl9.C428yZYJjwSNd2z9llG68eWsfFfG8hMTmus7YqDFzs8BqWNGIXKOCiM8CWV_0pETSvhFz1nPfXIPm9b4wvOpBg"

    var request = new XMLHttpRequest();
    request.onreadystatechange= function () {
        if (request.readyState==4) {
            //handle response
        }
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            data['results']['songs']['data'].forEach(element => {
                const albumName = element['attributes']['albumName'];
                const artistName = element['attributes']['artistName'];
                const attribution = element['attributes']['attribution'];
                const composerName = element['attributes']['composerName'];

                console.log(element['attributes']);
                $('#myTable tr:last').after(
                    `<tr>
                        <td>${albumName}</td>
                        <td>${composerName}</td>
                        <td>${composerName}</td>
                    </tr>`
                );
            });
        }
    }
    request.open("GET", url, true);
    request.setRequestHeader('Authorization', "Bearer "+developerToken);
    request.send();
})