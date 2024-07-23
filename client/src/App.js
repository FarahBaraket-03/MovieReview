import {useEffect, useState }from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';

function App() {
  const [allMovies,setAllMovies]=useState([])
  useEffect(()=>{
    Axios.get('http://localhost:3009/api/select').then((result)=>{
      setAllMovies(result.data);
    })
  })
  
  const [movieName,setName]=useState('');
  const [Review,setReview]=useState('');
  const [nm,setnm]=useState('');
  const [rm,setrm]=useState('');
  
  const addMovie=(e)=>{
    e.preventDefault();
    Axios.post('http://localhost:3009/api/insert',{movieName:movieName,Review: Review})
    .then(()=>{
      setAllMovies([...allMovies,{nameMovie:movieName,reviewMovie:Review}])
      console.log("insert succefully");
    })
  }
  const deleteMovie=(uid)=>{
    Axios.delete("http://localhost:3009/api/delete/"+uid)
    .then(()=>{
      console.log('delete sccussfully');
    })
  }
  const updateMovie=(name,id)=>{
    Axios.put("http://localhost:3009/api/update",{nameMovie:nm,Review:rm,id:id}).then(()=>{
      console.log("update successfully");
    })
  }

  return (
    <div className="App">
      <div className="alert alert-warning" role="alert">
        Simple application Using NODEJS and MYSQL
      </div>
      <div>
        <h1>CRUD APPLICATION</h1>
        <form>
          <label>Name of Movie :</label>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} />
          <label>Review : </label>
          <input type="text" onChange={(e)=>{setReview(e.target.value)}} />
          <button className='btn btn-secondary' onClick={(e)=>{addMovie(e)}} >add Review</button>
        </form>
      </div>
      <div className='container'>
        <h2>All Movies</h2>
        <div className="accordion" id="accordionExample">
        {
          allMovies && allMovies.map((movie)=>{
            return (
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button w-100 " type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+movie.id} aria-expanded="true" aria-controls="collapseOne">
                    <strong>Name : {movie.nameMovie}</strong>
                  </button>
                </h2>
              <div id={"collapse"+movie.id} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                 Review:{movie.reviewMovie} 
                </div>
              </div>
              <div className='buttons'>
                <button className='btn btn-danger' onClick={()=>{deleteMovie(movie.id)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 " viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                </button>
                <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target={"#exampleModal"+movie.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
                </button>
                
                <div className="modal fade" id={"exampleModal"+movie.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Movie : {movie.nameMovie}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
               <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Change Name of Movie</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." onChange={(e)=>{setnm(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">change Review :</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange={(e)=>{setrm(e.target.value)}}/>
  </div>
</div>

                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={()=>updateMovie(movie.nameMovie,movie.id)}>Save changes</button>
                </div>
    </div>
  </div>
</div>


              </div>
            </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;
