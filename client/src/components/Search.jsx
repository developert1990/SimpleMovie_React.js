import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { Movie } from './Movie';
import Jump from 'react-reveal/Jump';
import { HEROKU_PORT } from '../config/index';

export const Search = () => {
    console.log('3');
    const [movieArray, setMovieArray] = useState([]);
    // const URL = "http://localhost:7777/movie/"; // local


    const titleChange = async (e) => {
        if (e.target.value === '') {
            setMovieArray([]);
        } else {
            const newInputTitle = e.target.value;
            const path = `${HEROKU_PORT}/movie/findMoviesByTitle/${newInputTitle}`;
            try {
                const response = await fetch(path);
                const data = await response.json();
                setMovieArray(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const yearChange = async (e) => {
        if (e.target.value === '') {
            setMovieArray([]);
        } else {
            const newInputYear = e.target.value;
            const path = `${HEROKU_PORT}/movie/findMoviesByYear/${newInputYear}`;
            try {
                const response = await fetch(path);
                const data = await response.json();
                setMovieArray(data);
            } catch (error) {
                console.log(error);
            }
        }
    }



    const genreChange = async (e) => {
        const newInputGenre = e.target.value;
        const path = `${HEROKU_PORT}/movie/findMoviesByGenre/${newInputGenre}`;

        const response = await fetch(path);
        const data = await response.json();
        setMovieArray(data);
        console.log(movieArray);
    }




    const searchInput = useRef(null);
    useEffect(() => {
        searchInput.current.focus();
    }, [])

    // const searchInput = useRef(null);
    // let variableForX;
    // some time later.. ( in react this would be - after page renders)
    // variableForX = 10

    return (

        <div className="search-section">
            <Jump>
                <div className="search-movies">
                    <h1>Search Menu</h1>
                    <div className="search-bar">
                        <label>Title: </label>
                        <input type="text" onChange={titleChange} ref={searchInput} />
                    </div>
                    <div className="search-bar">
                        <label>Year: </label>
                        <input type="text" onChange={yearChange} />
                    </div>
                    <div className="search-bar">
                        <label>Genre: </label>
                        <input type="text" onChange={genreChange} />
                    </div>
                </div>
            </Jump>
            <Movie default1={movieArray} inputTitle={movieArray} inputYear={movieArray} inputGenre={movieArray} />

        </div>
    )
}
