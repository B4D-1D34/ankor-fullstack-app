Перед тем как развернуть сервис через docker-compose, сначала нужно создать volume:
`docker volume create --name=pgdata`

Сервис строится, а затем разворачивается через `docker-compose up` в корневой папке проекта

После того как сервис развернут можно запустить клиент
<code>cd client</code>
<code>npm start</code>
