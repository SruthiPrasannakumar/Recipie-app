import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRecipes } from '../Redux/recipeSlice'


const Home = () => {
    const dispatch = useDispatch()
    const {allRecipes,loading,error} = useSelector(state=>state.recipeReducer)
    // console.log(allRecipes,loading,error);
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 8
    const totalPage = Math.ceil(allRecipes?.length/cardsPerPage)
    const currentPageLastRecipeIndex = currentPage * cardsPerPage
    const currentPageFirstRecipeIndex = currentPageLastRecipeIndex - cardsPerPage
    const visibleRecipeCards = allRecipes?.slice(currentPageFirstRecipeIndex,currentPageLastRecipeIndex)

    useEffect(()=>{
        dispatch(fetchAllRecipes())
    },[])

    const navigateToNextPage = ()=>{
        if(currentPage!= totalPage)
        {
            setCurrentPage(currentPage+1)
        }
      }

      const navigateToCurrentPage = (page) => {
        setCurrentPage(page)
      }
    
      const navigateToPreviousPage = ()=>{
        if(currentPage!= 1)
        {
            setCurrentPage(currentPage-1)
        }
      }

  return (
    <>
        <Header insideHome = {true}/>
        <div style={{paddingTop:'50px'}} className='px-5 container'>
            <h1 className='text-center mb-4 fw-bolder text-info'>All Recipes</h1>
            <>
                {
                    loading ?
                    <div className='text-center my-5 fs-2 fw-bold text-secondary'>
                        <img width={'60px'} height={'60px'} className='me-2' src="https://i2.wp.com/aceyourpaper.com/essays/public/images/loader.gif" alt="" />Loading...
                    </div>
                    :
                    <div className='row'>
                    {/* recipe cards */}
                    {
                        allRecipes?.length>0 ?
                            visibleRecipeCards.map((recipe,index)=>(
                                <div key={index} className="col-lg-3 col-md-6">
                                    <div className="card text-white bg-info mb-3 rounded-3 border-white shadow">
                                            <img style={{height:'10rem', objectFit:'cover'}} width={'100%'}  className='img-fluid rounded-top-5 shadow' src={recipe.image} alt="" />
                                            <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                                <h4 style={{fontSize:"1.05rem"}} className="card-title fw-bold text-white">{recipe.name}</h4>
                                                <p><span className='fw-bolder text-black'>Rating:</span>{recipe.rating}<i class="fa-solid fa-star text-warning"></i></p>
                                                <Link style={{fontSize:'0.7rem'}} to={`/${recipe.id}/view`} className='btn btn-danger fw-bold'>View more...</Link>
                                            </div>
                                    </div>
                                </div>
                            ))
                        :
                        <div className="fw-bold text-warning">No Recipes 
                        Found</div>
                        
                    }
                </div>
                }
            </>
            {/* pagination */}
            <div className='d-flex justify-content-center'>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={navigateToPreviousPage}
                        >
                            &laquo;
                        </a>
                    </li>
                    {
                        Array.from({ length: totalPage }, (_, i) => (
                            <li
                                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                key={i}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={()=>navigateToCurrentPage(i+1)}
                                >
                                    {i + 1}
                                </a>
                            </li>
                        ))
                    }
                    <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={navigateToNextPage}
                        >
                            &raquo;
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </>    
  )
}

export default Home