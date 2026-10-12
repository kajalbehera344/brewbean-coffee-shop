# Brew & Bean — Coffee Ordering Frontend

Brew & Bean is a café storefront concept designed and built as a portfolio project. The goal is to make a coffee order feel like a small, personal ritual rather than a generic checkout flow.

## What makes this project personal
- Custom café name, visual identity, warm editorial typography, and a muted green / cream palette
- A “Brew AI” coffee guide that matches a visitor's mood and hot/iced preference to a menu item
- Original interaction flow connecting recommendations to the shopping bag
- Thoughtful empty-cart state, quantity controls, product categories, small copy details, and mobile layout

## Features
- Responsive landing page and café-style menu
- Six coffee / tea products with category filtering
- Brew AI mood-based recommendation panel
- Add to bag, update quantities, remove items, and automatic subtotal
- Demo checkout confirmation
- No framework or package installation required

## How the Brew AI feature works
Brew AI uses a small, readable local recommendation engine in `script.js`. It takes the selected mood and temperature preference, then chooses a fitting item from the menu. It is an AI-inspired recommendation feature, not a connected generative-AI model. It works offline from API services and requires no secret keys. You can later connect a real AI API if you want natural-language chat recommendations.

## Run in VS Code
1. Download and extract `brewbean-coffee-shop.zip`.
2. Open the extracted `brewbean-coffee-shop` folder in VS Code.
3. Open `index.html` in a browser, or install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

## Files
- `index.html` — page structure
- `style.css` — visual design and responsive styles
- `script.js` — menu filtering, cart behavior, and Brew AI recommendation logic

## Notes
- Product photos and Google Fonts load from external URLs, so those visual assets need an internet connection.
- This is a frontend-only demo. Cart data resets on refresh; orders and payments are not sent to a server.
