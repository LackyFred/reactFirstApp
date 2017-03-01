import React from 'react';


class AjoutRecette extends React.Component{

    creerRecette = event => {
        event.preventDefault();
        const recette = {
          nom: this.nom.value,
          image: this.image.value,
          ingredients: this.ingredients.value,
          instructions: this.instructions.value
        }
        this.props.ajouterRecette(recette);
        this.recetteForm.reset();
    };


    render(){
        return(
            <div className="card">
              <form className="admin-form ajouter-recette" ref={input => this.recetteForm = input} onSubmit={e => this.creerRecette(e)}>
                  <input type="text" ref={input => this.nom = input} placeholder="Nom de la recette"/>
                  <input type="text" ref={input => this.image = input} placeholder="Adresse de l'image"/>
                  <textarea  rows="3" ref={input => this.ingredients = input} placeholder="Liste des ingrédients séparés par une virgule" >
                  </textarea>
                  <textarea  rows="15" ref={input => this.instructions = input} placeholder="Liste des instructions(une par ligne)" >
                  </textarea>
                  <button type="submit">+ Ajouter une recette</button>
              </form>
            </div>
        );
    };
    static propTypes = {
        ajouterRecette: React.PropTypes.func.isRequired
    }
}

export default AjoutRecette;