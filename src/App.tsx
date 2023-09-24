import "./App.css";
import reactLogo from "./assets/react.svg";
import architectureImage from "./assets/architectureImage.jpg";

function App() {
  return (
    <div className="title-container">
      <h1 className="title">Emoji Riddle with Friends</h1>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a
        href="https://miro.com/app/board/uXjVMhiNYco=/?share_link_id=823805997381"
        target="_blank"
      >
        <img
          src={architectureImage}
          alt="Architecture diagram"
          style={{ width: "1500px", height: "1500px" }}
        />
      </a>
    </div>
  );
}

export default App;
