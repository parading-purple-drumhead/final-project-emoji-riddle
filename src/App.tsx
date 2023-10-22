import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import architectureImage from "./assets/main_architecture.png";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Emoji Riddle with Friends</h1>
        <img
          src={architectureImage}
          className="architecture"
          alt="Architecture"
          width="1000px"
          height="800px"
        />
      </div>
    </>
  );
}

export default App;
