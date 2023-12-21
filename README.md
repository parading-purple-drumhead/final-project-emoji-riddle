# PictoVerse Puzzle

## Live Demo

[**PictoVerse Puzzle** (https://pictoverse-puzzle.netlify.app)](https://pictoverse-puzzle.netlify.app/)

## Description

PictoVerse Puzzle is a multiplayer turn-based game website that is based on emoji-based phrase guessing. In this game, one player is given a phrase, and they must select emojis to depict the phrase. Other players then try to guess the phrase based on the emojis chosen. To enhance user experience and manage player identification, users are required to sign in with their Google accounts.

The website is built using Vite for fast and efficient development and ReactTS for a robust and type-safe front-end. The combination of these technologies provides a seamless and engaging gaming experience.

## Credits

### Development Team

- Eric Leon
  - Email: eleon23@uic.edu

- Mridvika Suresh
  - Email: msures3@uic.edu

- Sudhanshu Basuroy (me)
  - Email: sbasur2@uic.edu

If you have any questions, feedback, or suggestions, feel free to reach out to the team members via their provided email addresses.

## How to Install and Run the Code

Follow these steps to install and run PictoVerse Puzzle on your local machine:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/PictoVerse-Puzzle.git
```

2. Navigate to the project directory:

```bash
cd PictoVerse-Puzzle
```

3. Install dependencies:

```bash
npm install
```

### Configuration

1. Create a project on the [Google Cloud Console](https://console.cloud.google.com/) to obtain the necessary credentials for Google Sign-In.

2. Create a `.env` file in the project root and add the following:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

Replace `your-google-client-id` with the actual client ID obtained from the Google Cloud Console.

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000).

3. Enjoy playing PictoVerse Puzzle locally!

Feel free to contribute, report issues, or suggest improvements by creating pull requests or issues on this GitHub repository. Happy gaming!
