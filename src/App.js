import React from "react";
import { projectFirestore } from "./firebase/config";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  //useState pre formular
  const [movieTitle, setMovieTitle] = useState("");
  const [movieAge, setMovieAge] = useState(null);
  const [movieTime, setMovieTime] = useState(null);

  useEffect(() => {
    const unsubscripe = projectFirestore.collection("movies").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Ziadne filmy na vypisanie");
          setData([]);
        } else {
          let result = [];
          snapshot.docs.forEach((oneMovie) => {
            result.push({ id: oneMovie.id, ...oneMovie.data() });
          });

          setData(result);
          setError("");
        }
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => {
      unsubscripe();
    };
  }, []);

  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete();
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newMovie = { title: movieTitle, minage: movieAge, time: movieTime };
   
   try {
    await projectFirestore.collection("movies").add(newMovie);
    setMovieAge("")
    setMovieTime("")
    setMovieTitle("")
   } catch (err) {
setError(err.message)
   }
  };

  return (
    <div className="all-movies">
      <form onSubmit={submitForm} className="form">
        <input
          type="text"
          className="input"
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Nazov filmu"
          value={movieTitle}
        />
        

        <input
          type="number"
          className="input"
          onChange={(e) => setMovieAge(e.target.value)}
          placeholder="Minimalny vek"
          min={0}
          value={movieAge}
        />
        

        <input
          type="number"
          className="input"
          onChange={(e) => setMovieTime(e.target.value)}
          placeholder="Doba trvania"
          min={0}
          value={movieTime}
        />
        

        <input type="submit" value="Pridat" />
      </form>

      {error && <p>{error}</p>}
      {data.map((oneMovie) => {
        const { id, minage, title, time } = oneMovie;

        return (
          <div key={id} className="one-movie">
            <p>
              {title},{time} minut, {minage}+
            </p>
            <button type="button" onClick={() => deleteMovie(id)}>
              Vymazat
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
