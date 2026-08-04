# Eugex Cloud v3.1 (CIS)

Облачная платформа для программистов, разработчиков и IT-бизнеса в СНГ · ОКВЭД 62.09

Оплата: только МИР · СБП · безналичный счёт (Visa/Mastercard не принимаются).

## Запуск

```bash
npm install
npm run dev
```

http://localhost:3000

## Что внутри

- Next.js 14 App Router + TypeScript + Tailwind + Framer Motion
- Hero с телеметрией, particles, scramble-текст
- Auth-gate оплаты (без входа оплата недоступна)
- Чекбокс оферты на login / register / payment
- `/api/accept` — логирование акцепта (User_ID, IP, User-Agent, версия)
- PDF «Отчёт Агента» 97/3 через печать браузера
- QR СБП (SVG + таймер 30 с)
- Дашборд: 5 разделов
- Адрес ИП на сайте не публикуется

## Важно (демо-режим)

1. **Авторизация** хранится в `localStorage` — только для демо. В production: httpOnly cookie + серверная сессия.
2. **Платежи** имитируются (`/api/payment`). Подключить Банк 131 / ЮKassa / Продамус.
3. **acceptLog / transactions / api-keys** — in-memory. Для production → PostgreSQL + Prisma.
4. Карточные данные **не отправляются** на бэкенд в демо-форме (только маски на клиенте).

## Production checklist

- [ ] Реальный эквайринг
- [ ] Сессии на сервере
- [ ] БД для логов акцепта и транзакций
- [ ] SMTP-уведомления
- [ ] Реальные QR от платёжного провайдера
- [ ] HTTPS / SSL

## Юрлицо

ИП Чурсин Евгений Валентинович  
ИНН 781109486616 · ОГРНИП 326784700254015  
eugtch@yandex.ru · +7 (921) 908-57-97

© 2026 Eugex Cloud
