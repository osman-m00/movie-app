# Movie Search App - README & User Guide

## Overview
The **Movie Search App** allows users to search for movies, view details, and explore trending films using the **TMDB API**. The app is built with **React (Vite)** and styled using **Tailwind CSS**.

## Features
- Search for movies by title.
- View detailed movie information, including ratings and descriptions.
- Explore trending and popular movies.
- Fully responsive design for all screen sizes.

---
## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>=14.0)
- **npm** or **yarn**

### Clone the Repository
```sh
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

### Install Dependencies
```sh
npm install
# OR
yarn install
```

### Setup Environment Variables
Create a `.env` file in the project root and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

### Run the Development Server
```sh
npm run dev
# OR
yarn dev
```
The app will be available at `http://localhost:5173/`.

---
## Usage Guide
### Searching for Movies
- Enter a movie title in the search bar to find related films.
- Click on a movie to view more details.

### Browsing Trending Movies
- The homepage displays trending movies fetched from TMDB.

### Viewing Movie Details
- Each movie has a dedicated page showing its poster, description, rating, and release date.

---
## Deployment
To deploy the application:
```sh
npm run build
# OR
yarn build
```
Then, deploy the `dist/` directory to a hosting service like **Vercel**, **Netlify**, or **GitHub Pages**.

---
## Contributing
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your branch and submit a pull request.

