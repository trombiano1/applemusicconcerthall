import requests

developer_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBOOEc2UTM5VzYifQ.eyJpc3MiOiIzNDQ5MjhYNTJQIiwiZXhwIjoxNjYyMTM3MzE5LCJpYXQiOjE2NjE1MzI1MTl9.C428yZYJjwSNd2z9llG68eWsfFfG8hMTmus7YqDFzs8BqWNGIXKOCiM8CWV_0pETSvhFz1nPfXIPm9b4wvOpBg"

url = 'https://api.music.apple.com/v1/catalog/us/search?types=songs,albums,artists&term=Pyotr\ Ilyich\ Tchaikovsky+Symphony'

result = requests.get(url, headers={'Authorization': "Bearer %s" % developer_token})
print(result.json())