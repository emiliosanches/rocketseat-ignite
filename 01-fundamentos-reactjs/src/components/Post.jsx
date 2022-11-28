import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post({ author, publishedAt, content }) {
  const publishedAgo = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: "há",
  });

  const publishDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'de' yyyy 'às' HH:mm",
    {
      locale: ptBR,
    }
  );

  const [comments, setComments] = useState([
    { id: 1, content: "Post muito bom! Parabéns!" },
  ]);
  const [newCommentText, setNewCommentText] = useState([""]);

  function handlePublishComment(evt) {
    evt.preventDefault();
    setComments((c) => [
      ...c,
      {
        id: c.length + 1,
        content: newCommentText,
      },
    ]);
    setNewCommentText("");
  }

  function deleteComment(id) {
    setComments((data) => data.filter((comment) => comment.id !== id));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedAgo}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) =>
          line.type === "link" ? (
            <p key={line.content}>
              <a href="">{line.content}</a>
            </p>
          ) : (
            <p key={line.content}>{line.content}</p>
          )
        )}
      </div>

      <form onSubmit={handlePublishComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          name="content"
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentsList}>
        {comments.map(({ content, id }) => (
          <Comment
            key={id}
            id={id}
            content={content}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
