# WEB103 Project 1 - *Career Compass*

Submitted by: **Muhais Olatundun**

About this web app: **Career Compass is a list-based web app that introduces students to six careers across data analytics, business intelligence, product analytics, data science, machine learning, and data engineering. Each career card includes a title, category, description, image, and tools, and each item links to its own detailed route with every stored data field.**

Time spent: **3** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
    - [x] **Each detail view has a unique endpoint, such as `localhost:3000/careers/data-analyst` and `localhost:3000/careers/data-scientist`**
    - *When recording the walkthrough, show the unique URL for multiple detailed views.*
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique card layout with hover animation

The following **additional** features are implemented:

- [x] Responsive layout for desktop, tablet, and mobile
- [x] Express JSON API endpoints for all careers and individual careers
- [x] Local SVG artwork for every list item
- [x] Error handling for failed API requests
- [x] Expandable section on each detail page showing every database field

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='unit1project1part1' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  Add GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## How to Run

1. Install Node.js if it is not already installed.
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm start`.
5. Visit `http://localhost:3000` in your browser.

## Notes

One challenge in this project was creating unique detail pages while keeping the frontend framework-free. The app solves this by using Express routes such as `/careers/data-analyst` to serve a plain HTML detail page, while vanilla JavaScript reads the route and requests the matching career from the Express API.

The career data is stored in `data/careers.json`, which keeps the content separate from the page structure and makes it easy to add more careers later.

## License

Copyright 2026 Muhais Olatundun

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
