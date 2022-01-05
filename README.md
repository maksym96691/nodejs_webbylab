# nodejs_webbylab

1. Github: https://github.com/maksym96691/nodejs_webbylab
2. Запуск приложения: docker run --name movies  -p 8000:8050 -d mereum129/node-webbylab-app -e DB_HOST=./dev.sqlite3, DB_DIALECT=sqlite, JWT_SECRET=$YOUR_JWT_SECRET
В репозитории присутствует Dockerfile со сборкой образа
3. DB_HOST=./dev.sqlite3, DB_DIALECT=sqlite - подключение к БД, JWT_SECRET=$YOUR_JWT_SECRET - для аутентификации
4. Dockerhub: https://hub.docker.com/repository/docker/mereum129/node-webbylab-app
