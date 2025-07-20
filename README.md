# 📦 Tariff Sync Service

Этот сервис автоматически:

- Импортирует тарифы с WB API каждый час
- Экспортирует тарифы в указанные Google Таблицы (на лист `stocks_coefs`)
- Обновляет тарифы в базе, удаляя старые данные за текущую дату
- Обеспечивает порядок обновления: экспорт выполняется **только после** импорта

## ⚙️ Технологии

- Node.js + TypeScript
- Knex.js + PostgreSQL
- Cron (через `node-cron`)
- Google Sheets API

## 🚀 Как запустить

1. **Создай `.env` файл** (или `.env.local`) и пропиши нужные переменные:

```env
DATABASE_URL=postgres://user:password@host:port/dbname
GOOGLE_SHEET_IDS=sheet_id_1,sheet_id_2,...
```

2. **Добавь** google-service-account.json в корень проекта:

```bash
your-project/
├── google-service-account.json
```

3. **Добавь** sheetId в константу `SHEET_CONFIGS` в`src/core/config/google/google-sheets.config.ts` или в `GOOGLE_SHEET_ID` .env  

```ts
export const SHEET_CONFIGS = [
  {
    sheetId: "your-sheet-id",
    sheetName: "stocks_coefs",
  },
];
```

### Где взять google-service-account.json?

**Это файл сервисного аккаунта от Google с правами на редактирование Google Таблиц.**



1. [Перейди в Google Cloud > IAM & ADMIN & Services](https://console.cloud.google.com/iam-admin/serviceaccounts)

2. Создай проект (если еще нет)

4. Нажми Create Credentials → Service Account

5. Назови его, создай, на шаге "Grant access" можно нажать "Done"

6. В списке аккаунтов нажми на только что созданный → вкладка Keys

7. Нажми Add Key → JSON — скачай google-service-account.json

8. Добавь email сервисного аккаунта (например: my-bot@my-project.iam.gserviceaccount.com) в доступ к Google Таблице с правами Editor

## 🐳 Запуск через Docker

```bash
docker compose up --build
```

**Это:**

- Соберёт проект
- Запустит его с nodemon и tsx
- Автоматически выполнит import → export тарифов по cron каждый час

## 🛠 Структура кода

- src/app.ts — точка входа
- src/crons/ — задачи по расписанию
- src/services/ — работа с API и Google Sheets
- src/core/utils/googleAuth.ts — авторизация Google API
- src/postgres/ — подключение к базе и knex

## 📅 Cron расписание

**Каждый час:**

- importTariffsFromApi() — загружает и обновляет тарифы в БД
- exportTariffsToSheets() — экспортирует их в Google Таблицы (в отсортированном виде)

## ✅ Пример Google Таблицы

**Лист должен называться:**

```text
stocks_coefs
```

Первые строки будут перезаписаны с новыми данными, отсортированными по возрастанию коэффициента.

## 🧪 Проверка работы

**Если хочешь запустить крон каждую минуту (для отладки), в cron.schedule() поменяй:**

(Сайчас стоит 1 минута специально для тестирования)

```ts
cron.schedule("* * * * *", ...)
```
