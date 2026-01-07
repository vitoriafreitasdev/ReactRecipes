
// aqui as imagens estão aparecendo
import { useState, useEffect } from "react"
import programFetch from "../axios/config"
import { Link } from "react-router-dom"
import { linkToImg } from "../axios/config"
import "./Home.css"
const Home = () => {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await programFetch.get("/receitas")
      setRecipes(res.data)
      setLoading(false)
    }
    load()
  }, [])
 
  if (loading) return <div className="loading">Carregando dados...</div>
  return (
    
    <div className="home">
      
      <div className="div-receitas-links">
        <h2>Cadastre-se e poste suas próprias receitas.</h2>
        <p>Aqui você encontra as melhores receitas para deliciosos pratos. Como as abaixo, já cadastradas, clique nelas para mais detalhes.</p>
        {recipes &&
        recipes.map((recipe) => (
          <div className="recipes-links">
            <Link className="link" to={`/receita/${recipe._id}`}><h4 className="recipe-title">{recipe.title}</h4></Link>    
          </div>
        ))}
        
      </div>
      <div className="recipescontainer">
        <h1>Receitas:</h1>
        {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-cont">
              <h2>{recipe.title}</h2>
              <h3>Ingredientes: </h3>
              <p>{recipe.ingredients}</p>
              <h3>Preparação: </h3>
              <p>{recipe.preparation}</p>
              <h3>Tempo de preparo: </h3>
              <p>{recipe.preparationTime}</p>
              <h3>Imagem:</h3>
              <img className="img" src={recipe.src.startsWith('http') ? recipe.src : `${linkToImg}/${recipe.src}`} />
          </div>
        ))
        }
        
      </div>
    </div>
  )
}

export default Home