# Music API Documentation

API для работы с артистами, альбомами, треками и пользователями.

---

## Базовый URL

http://localhost:8000

---

## Эндпоинты API

| Метод | Эндпоинт        | Описание                         |
| ----- | --------------- | -------------------------------- |
| POST  | /artists        | Отправка создание новго артиста  |
| GET   | /artists        | Получение всех артистов          |
| POST  | /albums         | Отправка создание нового альбома |
| GET   | /albums/:id     | Получение альюома через id       |
| GET   | /albums         | Получение всех альбомов          |
| POST  | /tracks         | Отправка создание новго трека    |
| GET   | /tracks         | Получение всех артистов          |
| POST  | /tracks         | Создание нового трека            |
| GET   | /tracks         | Получение всех треков            |
| POST  | /track-history  | Добавление прослушивания трека   |
| POST  | /users          | Регистрация пользователя         |
| POST  | /users/sessions | Авторизация пользователя (логин) |

# Artists

## POST /artists

Отправляет новое сообщение.

Method: POST  
URL: http://localhost:8000/artists

---

### Формат запроса

Используется multipart/form-data.

Поля:

- name (string, обязательно) - имя артиста
- info (string, обязательно) - описание артиста
- photo (file, обязательно) — фотка артиста

```json
{
    {
        "id": 3,
        "name": "Me",
        "info": "The best singer",
        "photo": "/uploads/artists/87hdgwg-3e98-4445-a499-cf444e204a72.jpg"
    }
}
```

---

## GET /artists

### Ответ — 200

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

### Формат запроса

Используется multipart/form-data.

Поля:

- title (string, обязательно) — название альбома
- artistId (number, обязательно) — id артиста
- publishedAt (string, обязательно) — дата (ISO формат)
- cover (file, обязательно) — обложка альбома

## Ответ

```json
{
    {
        "id": 1,
        "title": "Album Name",
        "artistId": 2,
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "cover": "/uploads/albums/cover.jpg"
    }
}
```

## GET /albums

```json
[
    {
        "id": 1,
        "title": "Album Name",
        "artistId": 2,
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "cover": "/uploads/albums/cover.jpg"
    }
]
```

# Tracks

## POST /tracks

Создание трека

### Что принимает (JSON)

- title (string, обязательно) — название трека
- duration (number, обязательно) — длительность в секундах
- albumId (number, обязательно) — id альбома

### Ответ — 201

```json
{
    "id": 3,
    "title": "My new track",
    "duration": 233,
    "albumId": 3
}
```

---

## GET /tracks

Получение всех треков

### Ответ — 200

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

Добавление прослушивания

### Что принимает (JSON)

- trackId (number, обязательно) — id трека

### Ответ — 201

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

Регистрация пользователя

### Что принимает (JSON)

- username (string, обязательно)
- password (string, обязательно)

### Ответ — 201

```json
{
    "id": 1,
    "username": "someone"
}
```

---

## POST /users/sessions

Логин пользователя

### Что принимает (JSON)

- username (string, обязательно)
- password (string, обязательно)

### Ответ — 200

```json
{
    "token": "$2b$10$DS6myfA16yZ.pGvkSyqNsuHEwet56jCev48VVnzqEEZaEPwouVhYK"
}
```

---

# Коды ответов

- 200 — OK
- 201 — Created
- 400 — Bad Request
- 401 — Unauthorized
- 404 — Not found
- 500 — Internal Server Error

# Инструкция к запуску проекта

## 1. Установить зависимости

```bash
npm install
```

## 2. Настроить `.env`

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## 3. Сгенерировать Prisma Client

```bash
npx prisma generate
```

## 4. Применить миграции

```bash
npx prisma migrate dev
```

## 5. Заполнить базу тестовыми данными

```bash
npx prisma db seed
```

## 6. Запустить сервер

```bash
npm run dev
```
