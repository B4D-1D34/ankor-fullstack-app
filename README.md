### Было получено задание

![tg-files](https://github.com/B4D-1D34/ankor-fullstack-app/blob/master/tg-files.png "Telegram response")

### Что в нем значилось можно посмотреть в папке client, потому что на старте я просто скопировал репозиторий с заданием, осталось как ридми, ну или если репозиторий еще цел https://github.com/danroshko/au-react-test

### После выполнения был получен фидбек

![feedback1](https://github.com/B4D-1D34/ankor-fullstack-app/blob/master/feedback1.png "Feedback 1")

![feedback2](https://github.com/B4D-1D34/ankor-fullstack-app/blob/master/feedback2.png "Feedback 2")

### После осознания такой новости для меня как алгоритмы, функция была успешно приведена к О(n) и другие аспекты также были улучшены в меру моих возможностей. В вопросе алгоритмов свои знания вывел на качественно новый уровень.

### Касательно запуска

Перед тем как развернуть сервис через docker-compose, сначала нужно создать volume:
`docker volume create --name=pgdata`

Сервис строится, а затем разворачивается через `docker-compose up` в корневой папке проекта

После того как сервис развернут можно запустить клиент  
<code>cd client</code>  
<code>npm i</code>  
<code>npm start</code>
