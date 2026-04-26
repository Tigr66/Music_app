# Music API

API для работы с артистами, альбомами, треками и пользователями.

---

## Базовый URL

http://localhost:8000

---

## Эндпоинты API

| Метод  | Эндпоинт             | Описание                      |
| ------ | -------------------- | ----------------------------- |
| POST   | /artists             | Создать артиста               |
| GET    | /artists             | Получить артистов             |
| GET    | /artists/:id         | Получить артиста по id        |
| DELETE | /artists/:id         | Удалить артиста               |
| POST   | /artists/:id/publish | Опубликовать артиста          |
| POST   | /albums              | Создать альбом                |
| GET    | /albums              | Получить альбомы              |
| GET    | /albums/:id          | Получить альбом по id         |
| DELETE | /albums/:id          | Удалить альбом                |
| POST   | /albums/:id/publish  | Опубликовать альбом           |
| POST   | /tracks              | Создать трек                  |
| GET    | /tracks              | Получить треки                |
| DELETE | /tracks/:id          | Удалить трек                  |
| POST   | /tracks/:id/publish  | Опубликовать трек             |
| POST   | /track-history       | Добавить прослушивание трека  |
| POST   | /users               | Зарегистрировать пользователя |
| POST   | /users/sessions      | Авторизировать пользователя   |
| POST   | /users/logout        | Завершить сессию пользователя |

---

## Доступ и авторизация

Для защищённых эндпоинтов требуется токен:

```bash
Authorization: Bearer <token>
```

### Роли пользователей:

- USER — обычный пользователь
- ADMIN — администратор

### Ограничения:

Только ADMIN может удалять и публиковать артистов, альбомы и треки

### Особенности GET запросов

Токен передавать необязательно.

Поведение зависит от пользователя:

- Без токена:
    - возвращаются только опубликованные данные

- С токеном (USER):
    - возвращаются опубликованные данные + неопубликованные, созданные текущим пользователем

- С токеном (ADMIN):
    - возвращаются все данные (и опубликованные, и неопубликованные)

---

# Artists

## POST /artists

Создать артиста

### Формат запроса

multipart/form-data

### Headers

```bash
Authorization: Bearer <token>
```

### Поля:

- name (string, обязательно) - имя артиста
- info (string, обязательно) - описание артиста
- photo (file, обязательно) - фото артиста

### Ответ - 201

```json
{
    "id": 3,
    "name": "Me",
    "info": "The best singer",
    "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg",
    "userId": 1,
    "isPublished": false
}
```

## GET /artists

Получить артистов

### Доступ:

- Публичный (токен опционален)

### Ответ - 200

```json
[
    {
        "id": 1,
        "name": "Drake",
        "info": "Canadian rapper and singer",
        "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
        "userId": 1,
        "isPublished": true
    }
]
```

## GET /artists/:id

Получить артиста по id

### Доступ:

- Публичный (токен опционален)

### Ответ - 200

```json
{
    "id": 1,
    "name": "Drake",
    "info": "Canadian rapper and singer",
    "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
    "userId": 1,
    "isPublished": true
}
```

## DELETE /artists/:id

Удалить артиста

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "message": "Successfully deleted"
}
```

## POST /artists/:id/publish

Опубликовать артиста

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "id": 1,
    "name": "Drake",
    "info": "Canadian rapper and singer",
    "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
    "userId": 1,
    "isPublished": true
}
```

---

# Albums

## POST /albums

Создать альбом

### Формат запроса

multipart/form-data

### Headers

```bash
Authorization: Bearer <token>
```

### Поля:

- title (string, обязательно) - название альбома
- artistId (number, обязательно) - id артиста
- publishedAt (string, необязательно) - дата (ISO формат)
- cover (file, обязательно) - обложка альбома

### Ответ - 201

```json
{
    "id": 1,
    "title": "Album Name",
    "artistId": 3,
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": 1,
    "isPublished": false
}
```

## GET /albums

Получить альбомы

### Доступ:

- Публичный (токен опционален)

### Query параметры (опционально)

- artist (number) - фильтр по id артиста

### Примеры

- `/albums` - все альбомы
- `/albums?artist=2` -альбомы конкретного артиста (добавляется поле count - кол-во треков)

### Ответ - 200

```json
[
    {
        "id": 1,
        "title": "Album Name",
        "artistId": 3,
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
        "userId": 1,
        "isPublished": true,
        "count": 10
    }
]
```

## GET /albums/:id

Получить альбом по id

### Доступ:

- Публичный (токен опционален)

### Ответ - 200

```json
{
    "id": 1,
    "title": "Album Name",
    "artistId": 3,
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": 2,
    "isPublished": true,
    "artist": {
        "id": 3,
        "name": "Me",
        "info": "The best singer",
        "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg",
        "userId": 2,
        "isPublished": true
    }
}
```

## DELETE /albums/:id

Удалить альбом

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "message": "Successfully deleted"
}
```

## POST /albums/:id/publish

Опубликовать альбом

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "id": 1,
    "title": "Album Name",
    "artistId": 3,
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": 1,
    "isPublished": true
}
```

---

# Tracks

## POST /tracks

Создать трек

### Headers

```bash
Authorization: Bearer <token>
```

### Поля:

- title (string, обязательно)
- duration (number, обязательно) - длительность в секундах
- albumId (number, обязательно)

### Ответ - 201

```json
{
    "id": 3,
    "title": "My new track",
    "duration": 233,
    "albumId": 3,
    "userId": 1,
    "isPublished": false
}
```

## GET /tracks

Получить треки

### Доступ:

- Публичный (токен опционален)

### Query параметры (опционально)

- album (number) - если передан, возвращает треки только конкретного альбома

### Примеры

- `GET /tracks` - все треки
- `GET /tracks?album=3` - треки только из альбома с id = 3

### Ответ - 200

```json
[
    {
        "id": 1,
        "title": "God's Plan",
        "duration": 198,
        "albumId": 1,
        "userId": 1,
        "isPublished": true
    }
]
```

## DELETE /tracks/:id

Удалить трек

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "message": "Successfully deleted"
}
```

## POST /tracks/:id/publish

Опубликовать трек

### Доступ:

- ADMIN

### Ответ - 200

```json
{
    "id": 3,
    "title": "My new track",
    "duration": 233,
    "albumId": 3,
    "userId": 1,
    "isPublished": true
}
```

---

# Track History

## POST /track-history

Добавить прослушивание трека

### Headers

```bash
Authorization: Bearer <token>
```

### Поля:

- trackId (number, обязательно)

### Ответ - 201

```json
{
    "id": 1,
    "trackId": 1,
    "userId": 1,
    "datetime": "2026-04-09T12:07:47.716Z"
}
```

---

# Users

## POST /users

Зарегистрировать пользователя

### Поля:

- username (string, обязательно)
- password (string, обязательно)

### Ответ - 201

```json
{
    "id": 1,
    "username": "someone",
    "token": null,
    "role": "USER"
}
```

## POST /users/sessions

Авторизировать пользователя

### Поля:

- username (string, обязательно)
- password (string, обязательно)

### Ответ - 200

```json
{
    "id": 1,
    "username": "someone",
    "token": "pnm0R_eFcZF5QPunVTca0",
    "role": "USER"
}
```

## POST /users/logout

Завершить сессию пользователя

### Headers

```bash
Authorization: Bearer <token>
```

### Ответ - 200

```json
{
    "message": "Logged out successfully"
}
```

---

# Коды ответов

- 200 - OK
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not found
- 500 - Internal Server Error

---

# Инструкция к запуску проекта

## 1. Установить зависимости

```bash
npm install

cd ./client
npm install

cd ../server
npm install

```

## 2. Настроить `.env` (В папке server)

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## 3. Сгенерировать Prisma Client (В папке server)

```bash
npx prisma generate
```

## 4. Применить миграции (В папке server)

```bash
npx prisma migrate dev
```

## 5. Заполнить базу тестовыми данными (В папке server)

```bash
npx prisma db seed
```

## 6. Запустить проект (В корне проекта)

```bash
npm run dev
```
