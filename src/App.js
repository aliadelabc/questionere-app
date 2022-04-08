import { useState } from "react";
import "./App.css";
import { Container, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Header } from "./components/Header/header";
import Questions from "./components/Questions/questions";
function App() {
  const [lightMode, setLightMode] = useState(false);
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "15px",
            paddingTop: "10px",
          }}
        >
          <span>{!lightMode ? "Light Mode" : "Dark Mode"}</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header lightMode={lightMode} />
        <Questions lightMode={lightMode} />
      </Container>
    </div>
  );
}

export default App;
