# REST API for "Adeeb أديب" backend.

## Objectives

- Get back my flow with JavaScript and TypeScript.
- Take another look on my code's design, structure...etc
- migrate [Adeeb's backend](https://github.com/M-Shrief/Adeeb_ExpressTS) to use Hono instead of Express. 

## Overview
It's concerned with Arabic literature. It assumes a business model that enables you to order a specific piece of literature to be printed with especial colors and font. Then it'll be delivered to the customer, with the ability for the customer to follow up the process. And for special customers, it provides them with the ability to make bulk orders fast and easy. And if they’re willing to signup, they can review all of their past orders.

- Tech stack:

  - Full **TypeScript**
  - **Nodejs** & **Hono**
  - Database:
    - **MongoDB** & **Mongoose**
    - Caching with ~~Redis~~ **ValKey**
  - **Docker** Containerization