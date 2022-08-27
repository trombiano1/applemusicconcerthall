"use strict";

function fetchData() {
    const url = 'https://api.music.apple.com/v1/catalog/us/search?types=songs&term=Tchaikovsky'
    let developerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYyMTM3MzE5LCJpYXQiOjE2NjE1MzI1MTl9.C428yZYJjwSNd2z9llG68eWsfFfG8hMTmus7YqDFzs8BqWNGIXKOCiM8CWV_0pETSvhFz1nPfXIPm9b4wvOpBg"

    var request = new XMLHttpRequest();
    request.onreadystatechange= function () {
        if (request.readyState==4) {
            //handle response
        }
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
        }
    }
    request.open("GET", url, true);
    request.setRequestHeader('Authorization', "Bearer "+developerToken);
    request.send();
}