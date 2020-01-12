import React, { useState, useEffect } from "react";
import axios from "axios";
import JokesCard from "./jokes";
import { Container, Row } from "reactstrap";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialJoke = {
  questions: "",
  punchline: { p: "" },
  public: true
};

export default function JokesData() {
  const [jokes, setJokes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [jokeToEdit, setJokeToEdit] = useState(initialJoke);
  const [addJoke, setAddJoke] = useState(initialJoke);

  useEffect(() => {
    axios
      .get("https://dad-jokes-7.herokuapp.com/api/jokes")
      .then(response => {
        console.log(response.data.results);
        setJokes(response.data);
      })
      .catch(error => {
        console.log("there is an error", error);
      });
  }, []);

  const editJoke = joke => {
    setEditing(true);
    setJokeToEdit(joke);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/jokes/${jokeToEdit.id}`, jokeToEdit)
      .then(res => {
        const updatedArray = jokes.map(jokes => {
          if (jokes.id === res.data.id) {
            return jokeToEdit;
          } else {
            return jokes;
          }
        });
        setJokes(updatedArray);
        setEditing(false);
        setJokeToEdit(initialJoke);
      })
      .catch(err => console.log("Put request error: ", err));
  };

  const saveAddJoke = e => {
    const newJoke = {
      ...addJoke,
      id: jokes.length + 1
    };
    e.preventDefault();
    axiosWithAuth()
      .post("/jokes", newJoke)
      .then(res => {
        setJokes(res.data);
        setAddJoke(initialJoke);
      })
      .catch(err => console.log("Color post request error: ", err));
  };

  const deleteJoke = jokeId => {
    setEditing(false);
    axiosWithAuth()
      .delete(`/jokes/${jokeId}`)
      .then(res => {
        const filteredArray = jokes.filter(jokes => jokes.id !== res.data);
        setJokes(filteredArray);
      })
      .catch(err => console.log("Delete request error: ", err));
  };

  return (
    <div className="colors-wrap">
      <p>Jokes</p>
      <ul>
        {jokes.map(jokes => (
          <li key={jokes.jokes} onClick={() => editJoke(jokes)}>
            <h1>{jokes.punchline}</h1>
            <button>
              <span
                className="delete"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteJoke(jokes.id);
                }}
              >
                Delete
              </span>{" "}
              {jokes.joke}
            </button>
          </li>
        ))}
      </ul>
    </div>

    // <>
    // {/* <form onSubmit={saveAddJoke}>
    //         <legend>add joke</legend>
    //         <label>
    //           joke name:
    //           <input
    //             onChange=""
    //             value={addJoke.joke}
    //           />
    //         </label>
    //         <label>

    //           <input
    //             onChange={e =>
    //               setAddJoker({
    //                 ...addJoke,
    //                 punchline: { p:e.target.value }
    //               })
    //             }

    //           />
    //         </label>
    //         <div className="button-row">
    //           <button type="submit">Submit</button>
    //         </div>
    //       </form>
    //     </>
    //   );
    // };

    // </> */}
  );
}
