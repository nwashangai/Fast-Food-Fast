# Fast-Food-Fast

[![Build Status](https://travis-ci.org/nwashangai/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/nwashangai/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/nwashangai/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/nwashangai/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/98711084676949674c5c/maintainability)](https://codeclimate.com/github/nwashangai/Fast-Food-Fast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/98711084676949674c5c/test_coverage)](https://codeclimate.com/github/nwashangai/Fast-Food-Fast/test_coverage)

An online food ordering system which allow users register, login and order food items online

## **Getting Started**

These instructions bellow will guide you in getting a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

You will need to have the following softwares installed on your local machine

  - node js & npm

## Installing

A step by step series of instruction to install and get a development env running

```
npm install
```
To start the server run
```
npm start
```
Kudos :+1: now your API server is running at http://localhost:3000/

## Features
* User can place a new order for food.
* User can get a list of orders.
* User can fetch a specific order.
* User can update the order status.

## Running the tests

To run mocha test
```
npm run test
```

## Endpoints
<table>
<tr><th>HTTP verbs</th><th>Route Endpoints</th><th>Function</th><th>Payload</th></tr>
<tr><td>GET</td><td>api/v1/orders</td><td>Get all orders</td><td>None</td></tr>
<tr><td>GET</td><td>api/v1/orders/:orderId</td><td>Get a specific order</td><td>None</td></tr>
<tr><td>POST</td><td>api/v1/orders</td><td>Post a user order</td><td>
"id": string,<br/>
"userId": string,<br/>
"order": [<br/>
    {"foodId": string, "qty": number}<br/>
  ]</td></tr>
<tr><td>PUT</td><td>api/v1/orders/:orderId</td><td>Update order with the given orderId</td><td>"status": string</td></tr>
</table>

## Viewing the UI

To view the UI template, open the UI/index.html or UI/user.html or UI/admin.html from the root directory on your browser

*Note: you do not need to start your server when running test, the mocha test run automatically creates an instance of the server on port 3000 and therefore will generate an error when your test tries to create identical server*

## Credits

*Credits@Andela 21 program*
