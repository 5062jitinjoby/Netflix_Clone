import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {
    const [apiData, setApiData] = useState([])
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhhZWE1ZDEzZWU4Yzc4OWI1ZTRlNTAxNTUyNzQxNSIsIm5iZiI6MTcyMDU0NjQ1OS4xMTc3Miwic3ViIjoiNjY4NmZlODI2M2QwYjVkN2ZhMWE2YzRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JNKM4obwoQ9tPv1myZxukNwm0daOZk7PX3UwJ8n1jcI'
        }
      };
      

    const handleWheel = (event) =>{
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel',handleWheel);
    },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`http://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
