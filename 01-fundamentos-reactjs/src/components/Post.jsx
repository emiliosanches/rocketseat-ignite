import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src="https://github.com/emiliosanches.png"
          />
          <div className={styles.authorInfo}>
            <strong>Emilio Sanches</strong>
            <span>Full-Stack Developer</span>
          </div>
        </div>
        <time title="26 de novembro às 21:47" dateTime="2022-11-26 21:47:17">
          Publicado há 1 hora
        </time>
      </header>

      <div className={styles.content}>
        <p>E aí, galera! Beleza?</p>

        <p>
          Criando mais um projeto pro meu GitHub! Esse aqui é uma interface de
          blog desenvolvida em ReactJS.
        </p>

        <p>
          Esse é o primeiro projeto que estou desenvolvendo através do Ignite da
          Rocketseat! Em breve haverão muitos outros.
        </p>

        <p>
          Meu github:{" "}
          <a href="https://github.com/emiliosanches">
            https://github.com/emiliosanches
          </a>
        </p>

        <p>
          <a href="#">#ReactJS</a> <a href="#">#Estudos</a>{" "}
          <a href="#">#Ignite</a> <a href="#">#Rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentsList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
