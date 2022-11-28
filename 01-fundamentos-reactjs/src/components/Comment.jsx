import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";

export function Comment({ content }) {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/emiliosanches.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Emilio Sanches</strong>
              <time
                title="26 de novembro às 22:02"
                dateTime="2022-11-26 22:02:31"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Apagar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
