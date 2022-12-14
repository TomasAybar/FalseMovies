import React, { useState, useEffect } from 'react'
import moviesActions from '../redux/actions/moviesActions'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link as LinkRouter } from 'react-router-dom'


const URLIMG = 'https://image.tmdb.org/t/p/w500'

const Details = () => {

    const dispatch = useDispatch();

    const [movie, setMovie] = useState() // traigo mi pelicula
    const [similar, setSimilar] = useState() // traigo peliculas similares

    const { id } = useParams(); // id 


    useEffect(() => {

        dispatch(moviesActions.getOneMovie(id))
            .then(res => setMovie(res.data))

        dispatch(moviesActions.getSimilarOneMovie(id))
            .then(res => setSimilar(res.data.results))

    }, [id])

    // console.log(movie)

    return (
        <div className='py-10 contenedor-detail-movie'>
            {/* pelicula principal */}
            <div className='text-center flex items-center justify-center flex-col container mx-auto mb-14'>

                <div className='flex flex-col items-center justify-center'>
                    <h1 className='mb-3 text-3xl text-gray-300'>{movie?.title}</h1>
                    <img
                        src={URLIMG + movie?.poster_path}
                        alt={movie?.title}
                        className='poster mb-5'
                    />
                    <p className='text-gray-300 text-base md:text-xl w-full px-3 md:px-0 md:w-1/2'>{movie?.overview}</p>
                </div>

            </div>

            {
                similar?.length !== 0
                    ? <div className='text-center container mx-auto'>
                        <h2 className='text-3xl text-gray-300 mb-4'>Peliculas similares</h2>

                        {/* Contenedor peliculas similares */}
                        <div className='flex items-center justify-center flex-wrap gap-5'>

                            {
                                similar?.map(movie => {
                                    return (
                                        <LinkRouter
                                            to={`/movie/${movie.id}`}
                                            key={movie.id}
                                        >
                                            <div>
                                                <img
                                                    src={URLIMG + movie.poster_path}
                                                    alt={movie.title}
                                                    className='poster-similar'
                                                />
                                            </div>
                                        </LinkRouter>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : <p className='text-white text-xl text-center'>Lamentablemente, no se encontraron peliculas similares</p>
                    
            }
            
            
        </div>
    )
}

export default Details