# Интернет-магазин Moda-Lab

**Проект интернет-магазина**, разработанный в рамках дипломной работы. Приложение реализовано как одностраничное (SPA) с использованием современного фронтенд-стека. Цель - в рамках учебного проекта сделать frontend клиент-серверного приложения с архитектурой, максимально приближенной к современным SPA уровня локального интернет-магазина.

## Технологии

* **React + Vite + TypeScript** — основа приложения
* **Tailwind CSS + Radix UI** — адаптивная стилизация и UI-компоненты
* **Redux Toolkit + RTK Query** — глобальное состояние и работа с API
* **React Router DOM (v7)** — маршрутизация страниц
* **Heroicons** — набор иконок для интерфейса
* **ESLint + eslint-plugin-react-hooks + eslint-plugin-react-refresh** — статический анализ и контроль качества кода
* **Vitest + Testing Library** — тестирование компонентов и функционала
* **MSW (Mock Service Worker)** — моки API для разработки  

Проект построен по принципу адекватного распределения обязанностей между клиентом и сервером. Например, Access token хранится в Redux state, а Refresh token в Http only cookie, и проверяется на уровне сервера. Корзина и избранное серверные, с минимумом запросов на сервер (необходимые данные берутся преимущественно из кэшированных запросов).  

## Скриншоты

### Выбор товара и добавление в корзину
![Products overview](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/products.webp)  
![Product 1](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/product1.webp)  
![Product 2](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/product2.webp)  

### Каталог и поиск
![Catalog page](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/catalog.webp)  
![Search page](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/search.webp)  

### Фильтры
![Filter panel](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/filter-panel.webp)  
![City selector](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/city-selector.webp)  
### Layout
![Header](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/header.webp)  

### Профиль пользователя и вход по паролю
![Profile page](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/profile.webp)  
![Login page](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/login.webp)  

### Корзина и избранное
![Cart page](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/cart.webp)  
![Favorites](https://github.com/Kirill-Bokov/moda-lab/raw/main/docs/favorites.webp)  

## Кратко о Data flow и авторизации
### Token-based authentication

При логине пользователь отправляет email и пароль через `login: builder.mutation`  
Сервер возвращает accessToken и refreshToken  
accessToken хранится в памяти Redux, refreshToken – в HttpOnly Cookie  
Все защищённые запросы используют accessToken в заголовке Authorization  
Если токен истёк, RTK Query автоматически делает refresh через refreshToken и повторяет запрос  

### Источники данных

Backend API – основной источник данных о товарах, категориях, пользователях, корзине, заказах  
Local Storage / Cookies – хранение токенов авторизации (refresh/access), состояния корзины при оффлайн-сессиях  
Mock-сервисы (MSW) – для разработки и тестирования компонентов без реального API  

### Получение данных

Все запросы к API выполняются через RTK Query  
Основные endpoints:  
getProducts – список товаров и их детали  
getCategories – список категорий  
getCart – корзина пользователя  
getFavorites – избранное  
login / register – аутентификация  

### Модификация данных

Компоненты отправляют мутации RTK Query: addCartItem, updateCartItem, removeCartItem. После успешной мутации RTK Query автоматически обновляет кэш, вызывая re-fetch или обновление данных. Redux Store синхронизируется с актуальными данными, и компоненты, подписанные на соответствующий хук, перерисовываются с новыми данными.

## Установка и запуск

```
git clone https://github.com/Kirill-Bokov/moda-lab.git  
cd moda-lab
npm install
npm run dev
```

`npm run preview` запускает превью без MSW, а `npm run preview:demo` с ним