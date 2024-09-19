# VocaFlip

![VocaFlip Logo](https://github.com/SoufianKm/vocaFlip/blob/9fc923c13f9282ec86fa2effdb6bc64f6008cf4c/assets/logo.png)

## Description

**VocaFlip** is an intuitive language learning application designed to help users improve their vocabulary through interactive flashcards. Users can create custom decks, flip through flashcards, track progress, and share their decks with others. The app integrates responsive design for mobile and tablet devices, ensuring a smooth learning experience across all platforms.

## Features

- Create and manage decks with flashcards for different languages.
- Share your decks with others via social media platforms.
- Flip through flashcards and mark your progress with options such as “Not Sure” and “No Idea.”
- User authentication and data management using Firebase.
- Explore other users' decks categorized by language on the homepage.

## Architecture & Technologies

### Frontend:
- **React.js**: For building the user interface.
- **Swiper.js**: For creating a smooth and intuitive carousel of language decks.
- **Aphrodite**: To handle CSS in JavaScript and provide styles.

### Backend:
- **Firebase**: Provides authentication, real-time database, and storage solutions.

### Third-party Libraries:
- **React-Share**: To enable social media sharing of decks and website content.
- **Swiper**: For implementing carousels to browse through decks and languages.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SoufianKm/vocaFlip.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project.
   - Enable Authentication (Email/Password).
   - Add your Firebase configuration to `src/firebase/firbase.js`.

4. Run the project locally:
   ```bash
   npm start
   ```

### Deployment

VocaFlip can be deployed to Firebase Hosting, Vercel, or any other static site hosting service. Follow your host’s specific deployment instructions.

## Usage

- Create an account or sign in using your credentials.
- Start learning by selecting a language and navigating through flashcards.
- Share decks with friends and family via social media.
- Track your learning progress with each flashcard flipped.

## Next Steps

- Optimize the platform for mobile and tablet devices.
- Handle errors and exceptions to ensure smooth navigation.
- Add a feature to track total words learned with options for “Not Sure” and “No Idea.”
- Allow users to share their created decks on a categorized homepage by language.
- Finalize social media sharing functionality after deployment.
- Continue refining the user experience and adding more language decks.

## License

This project is licensed under the MIT License.