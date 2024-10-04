# BeatBlend

BeatBlend is a web application that allows music enthusiasts to discover songs based on various genres, top charts, and artists. The application utilizes a **Spring Boot** backend to fetch data from the **Spotify API** and provides users with detailed information about tracks, artists, and the ability to preview songs directly from Spotify.

## Live Demo

You can explore the live application at:
- [BeatBlend on Netlify](https://demo-beatblend.netlify.app)
- [BeatBlend on Railway](https://beatblend-production.up.railway.app)

## Features

- **Song Discovery**: Browse songs by genre, top tracks, and popular artists.
- **Artist and Song Details**: Access detailed information about artists and related songs.
- **Spotify Integration**: Play song previews directly from Spotify using the provided URLs.
- **Responsive Design**: A mobile-friendly interface ensures a seamless experience across devices.

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Java Spring Boot (Maven)
- **API**: Spotify API for song and artist data
- **Deployment**: Railway for the backend and Netlify for the frontend

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/riteeka20/beatblend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd beatblend
   ```

3. Install the necessary dependencies:
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

   - For the backend:
     ```bash
     cd server
     mvn clean install
     ```

4. Set up environment variables for your Spotify API client ID and secret in the backend.

5. Start the backend server:
   ```bash
   mvn spring-boot:run
   ```

6. Start the frontend:
   ```bash
   npm start
   ```

## Usage

1. Visit the live application URL or run it locally.
2. Explore songs by genre, top charts, or search for specific artists.
3. Click on any song to view its details and listen to previews directly from Spotify.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to create a pull request.

