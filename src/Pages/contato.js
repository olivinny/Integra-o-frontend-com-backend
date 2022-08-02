import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";

const Contatos = () => {
  const url = "http://localhost:5000/message";
  const [message, setMessage] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(async () => {
    const response = await fetch("http://localhost:5000/message");
    const data = await response.json();
    setMessage(data);
  }, [render]);

  const sendMessage = () => {
    setValidator(false);
    setSuccess(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: author,
        message: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setRender(true);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      });

    setAuthor("");
    setContent("");

    console.log(content);
  };

  return (
    <>
      <Grid container direction="row" xs={12}>
        <TextField
          id="name"
          label="Name"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          fullWidth
        />
        <TextField
          id="message"
          label="Message"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          fullWidth
        />
      </Grid>

      {validator && (
        <div
          className="mt-2 alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Por favor preencha todos os campos
          <button
            onClick={() => {
              setValidator(false);
            }}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {success && (
        <div
          className="mt-2 alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Mensagem enviada
        </div>
      )}

      <Button
        onClick={sendMessage}
        className="mt-2"
        variant="contained"
        color="primary"
      >
        Send
      </Button>

      {message.map((content) => {
        return (
          <div className="card mt-2" key={content.id}>
            <div className="card-body">
              <h5 className="card-title">{content.email}</h5>
              <p className="card-text">{content.message}</p>
              <p className="card-text">
                <small className="text-muted">{content.created_at}</small>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Contatos;
