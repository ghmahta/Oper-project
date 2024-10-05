# Media App - Oper Interview

This is a media application developed using **Angular 18**, **NgRx**, and **RxJS**. It has two main pages displaying **top-rated TV shows** and **movies** with an **infinite scroll** feature, as well as a **search** box that updates the list dynamically as you type.

## Features

- **Top-Rated TV Shows & Movies**: Browse the top-rated movies and TV shows fetched from The Movie Database (TMDb) API.
- **Infinite Scroll**: Automatically load more content as the user scrolls down the page.
- **Search Functionality**: Search through the list of TV shows or movies, and dynamically update the results based on the search query.
- **Standalone Angular Application**: The app is developed as an Angular standalone app using the latest Angular version.
- **State Management with NgRx**: The application uses NgRx for efficient state management and to handle API interactions.
- **Reactive Programming with RxJS**: Reactive streams are used for data handling and asynchronous operations, ensuring a smooth user experience.

## Technology Stack

- **Angular 18**: Standalone components, modules, and modern architecture.
- **NgRx**: For managing the global application state.
- **RxJS**: For handling asynchronous streams and reactive programming.
- **SCSS (BEM)**: Used for styling with the BEM (Block Element Modifier) methodology for a clean and scalable CSS architecture.
- **TMDb API**: Integrated with The Movie Database (TMDb) API to fetch data on movies and TV shows.

## Setup & Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ghmahta/Oper-project
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Get an API key from [The Movie Database](https://www.themoviedb.org/), and set it in your environment variables.

4. Start the development server:
    ```bash
    npm start
    ```

5. Access the app in your browser at `http://localhost:4200`.

## Usage

- Navigate to the **TV Shows** or **Movies** pages using the menu.
- Scroll down to load more content or use the **search box** to filter results.

## Future Improvements

- Add pagination default option for better user experience.
- Improve the view of page for better UI
