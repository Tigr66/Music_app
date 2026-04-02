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
