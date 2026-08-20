# Music API

API для работы с артистами, альбомами, треками и пользователями.

---

## Базовый URL

http://localhost:8000

---

## Эндпоинты API

Идентификаторы ресурсов имеют тип `string` и являются UUID.

| Метод  | Эндпоинт             | Описание                       |
| ------ | -------------------- | ------------------------------ |
| POST   | /artists             | Создать артиста                |
| GET    | /artists             | Получить артистов              |
| GET    | /artists/:id         | Получить артиста по UUID       |
| DELETE | /artists/:id         | Удалить артиста                |
| POST   | /artists/:id/publish | Опубликовать артиста           |
| POST   | /albums              | Создать альбом                 |
| GET    | /albums              | Получить альбомы               |
| GET    | /albums/:id          | Получить альбом по UUID        |
| DELETE | /albums/:id          | Удалить альбом                 |
| POST   | /albums/:id/publish  | Опубликовать альбом            |
| POST   | /tracks              | Создать трек                   |
| GET    | /tracks              | Получить треки альбома         |
| DELETE | /tracks/:id          | Удалить трек                   |
| POST   | /tracks/:id/publish  | Опубликовать трек              |
| POST   | /track-histories     | Добавить прослушивание трека   |
| GET    | /track-histories     | Получить историю прослушиваний |
| POST   | /auth/register       | Зарегистрировать пользователя  |
| POST   | /auth/login          | Авторизовать пользователя      |
| POST   | /auth/logout         | Завершить сессию пользователя  |
| POST   | /auth/refresh        | Обновить access-токен          |

---

## Доступ и авторизация

Для защищённых эндпоинтов требуется заголовок:

```bash
Authorization: Bearer <access-token>
```

### Роли пользователей:

- USER — обычный пользователь
- ADMIN — администратор

### Ограничения:

Только ADMIN может удалять и публиковать артистов, альбомы и треки.

### Особенности GET-запросов

Для `GET /artists`, `GET /artists/:id` и `GET /albums` токен необязателен.

Поведение зависит от пользователя:

- Без токена возвращаются только опубликованные данные.
- С токеном USER возвращаются опубликованные данные и неопубликованные данные, созданные текущим пользователем.
- С токеном ADMIN возвращаются все данные.

`GET /tracks` также поддерживает optional-auth middleware, но фактически требует query-параметр `album`.

---

# Artists

## POST /artists

Создать артиста.

### Формат запроса

`multipart/form-data`

### Headers

```bash
Authorization: Bearer <access-token>
```

### Поля:

- `name` (string, обязательно) — имя артиста
- `info` (string, обязательно) — описание артиста
- `photo` (file, обязательно) — изображение артиста размером до 5 МБ

### Ответ — 201

Возвращается созданный артист с полями `id`, `name`, `info`, `photo`, `userId` и `isPublished`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Drake",
    "info": "Canadian rapper and singer",
    "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": false
}
```

## GET /artists

Получить список артистов.

### Доступ:

- Публичный (токен необязателен)

### Ответ — 200

Массив артистов с полями `id`, `name`, `info`, `photo`, `userId` и `isPublished`.

```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Drake",
        "info": "Canadian rapper and singer",
        "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
        "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "isPublished": true
    }
]
```

## GET /artists/:id

Получить артиста по UUID.

### Доступ:

- Публичный (токен необязателен)

### Ответ — 200

Возвращается объект артиста с полями `id`, `name`, `info`, `photo`, `userId` и `isPublished`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Drake",
    "info": "Canadian rapper and singer",
    "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": true
}
```

## DELETE /artists/:id

Удалить артиста по UUID.

### Доступ:

- ADMIN

### Ответ — 200

```json
{
    "message": "Succesfully deleted"
}
```

## POST /artists/:id/publish

Опубликовать артиста по UUID.

### Доступ:

- ADMIN

### Ответ — 200

Возвращается обновлённый артист с `isPublished: true`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Drake",
    "info": "Canadian rapper and singer",
    "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": true
}
```

---

# Albums

## POST /albums

Создать альбом.

### Формат запроса

`multipart/form-data`

### Headers

```bash
Authorization: Bearer <access-token>
```

### Поля:

- `title` (string, обязательно) — название альбома
- `artistId` (string, UUID, обязательно) — UUID артиста
- `publishedAt` (string, необязательно) — дата в ISO-формате; по умолчанию используется текущая дата
- `cover` (file, обязательно) — изображение обложки размером до 5 МБ

### Ответ — 201

Возвращается созданный альбом с полями `id`, `title`, `artistId`, `publishedAt`, `cover`, `userId` и `isPublished`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Album Name",
    "artistId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": false
}
```

## GET /albums

Получить список альбомов.

### Доступ:

- Публичный (токен необязателен)

### Query-параметры (необязательно)

- `artist` (string, UUID) — фильтр по UUID артиста

### Примеры

- `/albums` — все доступные альбомы
- `/albums?artist=550e8400-e29b-41d4-a716-446655440000` — альбомы артиста; каждый элемент дополнительно содержит `count` — количество треков

### Ответ — 200

Массив альбомов. При использовании `artist` каждый элемент дополнительно содержит поле `count`.

```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Album Name",
        "artistId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "publishedAt": "2026-01-01T00:00:00.000Z",
        "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
        "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "isPublished": true,
        "count": 10
    }
]
```

## GET /albums/:id

Получить альбом по UUID.

### Доступ:

- Публичный (токен необязателен)

### Ответ — 200

Возвращается альбом с полями альбома и вложенным объектом `artist`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Album Name",
    "artistId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": true,
    "artist": {
        "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "name": "Drake",
        "info": "Canadian rapper and singer",
        "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg",
        "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "isPublished": true
    }
}
```

## DELETE /albums/:id

Удалить альбом по UUID.

### Доступ:

- ADMIN

### Ответ — 200

```json
{
    "message": "Succesfully deleted"
}
```

## POST /albums/:id/publish

Опубликовать альбом по UUID. Артист альбома также должен быть опубликован.

### Доступ:

- ADMIN

### Ответ — 200

Возвращается обновлённый альбом с `isPublished: true`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Album Name",
    "artistId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": true
}
```

---

# Tracks

## POST /tracks

Создать трек.

### Формат запроса

`application/json`

### Headers

```bash
Authorization: Bearer <access-token>
Content-Type: application/json
```

### Поля:

- `title` (string, обязательно) — название трека
- `duration` (positive integer, обязательно) — длительность в секундах
- `albumId` (string, UUID, обязательно) — UUID альбома
- `youtubeUrl` (string, обязательно) — URL видео YouTube

### Ответ — 201

Возвращается созданный трек с полями `id`, `title`, `duration`, `number`, `albumId`, `youtubeUrl`, `userId` и `isPublished`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My new track",
    "duration": 233,
    "number": 1,
    "albumId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": false
}
```

## GET /tracks

Получить треки альбома.

### Доступ:

- Публичный (токен необязателен)

### Query-параметры

- `album` (string, UUID, обязательно) — UUID альбома

### Примеры

- `GET /tracks?album=550e8400-e29b-41d4-a716-446655440000` — треки указанного альбома
- `GET /tracks` — возвращает `400` с ошибкой `Album ID must be a string`, поскольку `album` обязателен в текущей реализации

### Ответ — 200

Массив треков с полями `id`, `title`, `duration`, `number`, `albumId`, `youtubeUrl`, `userId` и `isPublished`.

```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "God's Plan",
        "duration": 198,
        "number": 1,
        "albumId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "isPublished": true
    }
]
```

## DELETE /tracks/:id

Удалить трек по UUID.

### Доступ:

- ADMIN

### Ответ — 200

```json
{
    "message": "Succesfully deleted"
}
```

## POST /tracks/:id/publish

Опубликовать трек по UUID. Альбом трека также должен быть опубликован.

### Доступ:

- ADMIN

### Ответ — 200

Возвращается обновлённый трек с `isPublished: true`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My new track",
    "duration": 233,
    "number": 1,
    "albumId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "isPublished": true
}
```

---

# Track History

## POST /track-histories

Добавить прослушивание опубликованного трека.

### Формат запроса

`application/json`

### Headers

```bash
Authorization: Bearer <access-token>
Content-Type: application/json
```

### Поля:

- `trackId` (string, UUID, обязательно) — UUID трека

### Ответ — 201

Возвращается запись истории с полями `id`, `trackId`, `userId` и `datetime`.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "trackId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "datetime": "2026-04-09T12:07:47.716Z"
}
```

## GET /track-histories

Получить историю прослушиваний текущего пользователя.

### Доступ:

- USER или ADMIN (требуется токен)

### Headers

```bash
Authorization: Bearer <access-token>
```

### Ответ — 200

```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "artistName": "Drake",
        "trackTitle": "God's Plan",
        "datetime": "2026-04-09T12:07:47.716Z"
    }
]
```

---

# Users

## POST /auth/register

Зарегистрировать пользователя.

### Формат запроса

`application/json`

### Headers

```bash
Content-Type: application/json
```

### Поля:

- `username` (string, обязательно)
- `password` (string, обязательно)

### Ответ — 201

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "someone",
    "role": "USER"
}
```

## POST /auth/login

Авторизовать пользователя.

### Формат запроса

`application/json`

### Headers

```bash
Content-Type: application/json
```

### Поля:

- `username` (string, обязательно)
- `password` (string, обязательно)

### Ответ — 200

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "someone",
    "role": "USER",
    "accessToken": "<access-token>"
}
```

Одновременно устанавливается HttpOnly cookie `refresh_token` со сроком действия 7 дней. В JSON-ответ refresh-токен не включается.

## POST /auth/logout

Завершить сессию пользователя.

### Доступ:

- Публичный; токен не проверяется

### Ответ — 200

```json
{
    "message": "Logged out successfully"
}
```

Cookie `refresh_token` удаляется.

## POST /auth/refresh

Получить новый access-токен.

### Доступ:

- Требуется заголовок `Authorization: Bearer <access-token>` и cookie `refresh_token`

### Ответ — 200

```json
{
    "accessToken": "<new-access-token>"
}
```

В текущей конфигурации `cookie-parser` не подключён в `server/src/app.ts`, поэтому обращение к этому маршруту фактически приводит к ответу `500` до исправления конфигурации.

---

# Коды ответов

- 200 — OK
- 201 — Created
- 400 — Bad Request: ошибка валидации, некорректный YouTube URL или бизнес-ограничение
- 401 — Unauthorized: отсутствует или некорректен access-токен; также используется для отсутствующего refresh-токена
- 403 — Forbidden: недостаточно прав (например, роль USER для ADMIN-маршрута)
- 404 — Not Found: ресурс не найден или недоступен текущему пользователю
- 409 — Conflict: пользователь с таким username уже существует
- 429 — Too Many Requests: превышен лимит регистрации или входа
- 500 — Internal Server Error: необработанная ошибка сервера

Ошибки обычно возвращаются в формате `{ "error": "..." }`. Для rate limit используется объект с полями `statusCode` и `message`.

Основные сообщения ошибок:

- `401`: `No authorization token`, `Invalid authorization format`, `Invalid authorization token`, `Authorization failed`, `No refresh token provided`
- `403`: `Only admin can publish artist`, `Only admin can delete artist` и аналогичные сообщения для альбомов и треков
- `404`: `Artist not found`, `Album not found`, `Track not found`, `Track is not found`
- `400`: ошибки валидации DTO, `Photo is required`, `Cover is required`, `Invalid YouTube URL`, `Album ID must be a string`, `Track is unpublished`, `Cannot publish album because artist is not published`
- `409`: `User with this username is already exist`

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
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
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
