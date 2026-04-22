# Music API

API для работы с артистами, альбомами, треками и пользователями.

---

## Базовый URL

http://localhost:8000

---

## Эндпоинты API

| Метод | Эндпоинт        | Описание                      |
| ----- | --------------- | ----------------------------- |
| POST  | /artists        | Создать артиста               |
| GET   | /artists        | Получить артистов             |
| POST  | /albums         | Создать альбом                |
| GET   | /albums         | Получить альбомы              |
| GET   | /albums/:id     | Получить альбом по id         |
| POST  | /tracks         | Создать трек                  |
| GET   | /tracks         | Получить треки                |
| POST  | /track-history  | Добавить прослушивание трека  |
| POST  | /users          | Зарегистрировать пользователя |
| POST  | /users/sessions | Авторизировать пользователя   |
| POST  | /users/logout   | Завершить сессию пользователя |

---

# Artists

## POST /artists

Создать артиста

### Формат запроса

multipart/form-data

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
    "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg"
}
```

## GET /artists

Получить артистов

### Ответ - 200

```json
[
    {
        "id": 1,
        "name": "Drake",
        "info": "Canadian rapper and singer",
        "photo": "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg"
    }
]
```

---

# Albums

## POST /albums

Создать альбом

### Формат запроса

multipart/form-data

### Поля:

- title (string, обязательно) - название альбома
- artistId (number, обязательно) - id артиста
- publishedAt (string, обязательно) - дата (ISO формат)
- cover (file, обязательно) - обложка альбома

### Ответ - 201

```json
{
    "id": 1,
    "title": "Album Name",
    "artistId": 3,
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg"
}
```

## GET /albums

Получить альбомы

### Query параметры (опционально)

- artist (number) - фильтр по id артиста

### Примеры

- `/albums` - все альбомы
- `/albums?artist=2` - альбомы конкретного артиста

### Ответ - 200

```json
[
    {
        "id": 1,
        "title": "Album Name",
        "artistId": 3,
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg"
    }
]
```

## GET /albums/:id

Получить альбом по id

### Ответ - 200

```json
{
    "id": 1,
    "title": "Album Name",
    "artistId": 3,
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "cover": "/uploads/albums/V7mQk2aP9xLrT0uZs8dNfJ.jpg",
    "artist": {
        "id": 3,
        "name": "Me",
        "info": "The best singer",
        "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg"
    }
}
```

---

# Tracks

## POST /tracks

Создать трек

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
    "albumId": 3
}
```

## GET /tracks

Получить треки

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
        "albumId": 1
    }
]
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
    "token": null
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
    "token": "pnm0R_eFcZF5QPunVTca0"
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
