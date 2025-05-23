# 📊 Daily Sales Overview

A modern and responsive sales dashboard built with **Vue 3**, **Vuex**, **TypeScript**, **TailwindCSS**, and **ApexCharts**. This project aims to visualize sales data interactively, focusing on clean architecture, secure login, and effective state management.

---

## 🔗 Live Demo

👉 [daily-sales-psi.vercel.app/login](https://daily-sales-psi.vercel.app/login)

---

## 🎯 Purpose

This case study demonstrates the development of a responsive, user-friendly dashboard interface that allows users to:

- Log in securely with real-time error handling
- View recent sales data in bar chart format
- Filter results by specific day ranges (7, 14, 30, 60 days)
- Navigate seamlessly across devices

---

## ✨ Features

### 🔐 Login

- Email/password login functionality
- Displays error messages for incorrect credentials or failed requests
- Redirects to dashboard on successful login

### 📊 Sales Dashboard

- Interactive bar chart visualization using `vue3-apexcharts`
- Filters for last **7**, **14**, **30**, and **60** days
- Displays sales, quantity, and shipping details by SKU

> ⚠️ Note: Due to limitations in ApexCharts, bar click interaction may appear to select only part of the bar visually.

### 📱 Responsive Design

- Fully responsive layout using TailwindCSS
- Optimized for desktop, tablet, and mobile views

---

# ⚙️ Project Setup

## Clone the repository

git clone https://github.com/mervekara/daily-sales.git

## Navigate into the project directory

cd daily-sales

## Install dependencies

npm install

## Run the development server

npm run dev

---
