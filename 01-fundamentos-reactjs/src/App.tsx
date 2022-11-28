import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css";

import "./global.css";

interface Post {
  id: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  content: Array<{ type: "paragraph" | "link"; content: string }>;
  publishedAt: Date;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/emiliosanches.png",
      name: "Emilio Sanches",
      role: "Full-Stack Developer",
    },
    content: [
      { type: "paragraph", content: "E aí, galera! Beleza?" },
      {
        type: "paragraph",
        content:
          "Criando mais um projeto pro meu GitHub! Esse aqui é uma interface de blog desenvolvida em ReactJS.",
      },
      {
        type: "paragraph",
        content:
          "Esse é o primeiro projeto que estou desenvolvendo através do Ignite da Rocketseat! Em breve haverão muitos outros.",
      },
      {
        type: "paragraph",
        content: "Meu github:",
      },
      {
        type: "link",
        content: "https://github.com/emiliosanches",
      },
      { type: "link", content: "#ReactJS" },
      { type: "link", content: "#Estudos" },
      { type: "link", content: "#Ignite" },
      { type: "link", content: "#Rocketseat" },
    ],
    publishedAt: new Date("2022-11-26 21:47:17"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "João da Silva Santos",
      role: "UX/UI Designer",
    },
    content: [
      { type: "paragraph", content: "E aí, feed" },
      {
        type: "paragraph",
        content: "Passando pra avisar que em breve vai ter novidade!",
      },
      {
        type: "paragraph",
        content:
          "Estou criando o design de um site para divulgação de layouts. Todos vocês vão poder compartilhar suas ideias e se inspirar com as ideias de outros profissionais.",
      },
    ],
    publishedAt: new Date("2022-11-26 19:52:35"),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              publishedAt={post.publishedAt}
              content={post.content}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
