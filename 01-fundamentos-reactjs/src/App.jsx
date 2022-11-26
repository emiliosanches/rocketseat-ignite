import { Header } from "./components/Header";
import { Post } from "./Post";

import "./global.css";

function App() {
  return (
    <div>
      <Header />

      <Post
        author="Emilio Sanches"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Post
        author="John Doe"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  );
}

export default App;
