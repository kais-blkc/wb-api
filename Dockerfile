# Используем официальный образ Node.js 20 в качестве базового
FROM node:20-slim AS base

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости для сборки
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем TypeScript проект
RUN npm run build


# --- Финальный образ ---
FROM node:20-slim AS production

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Копируем package.json и package-lock.json для установки только production зависимостей
COPY package*.json ./
RUN npm ci 

# Копируем собранный код из промежуточного образа
COPY --from=base /usr/src/app/dist ./dist
COPY google-service-account.json ./google-service-account.json

# Копируем .env файлы, если они нужны для запуска
COPY .env ./.env

# Запускаем приложение
CMD ["node", "dist/app.js"]

