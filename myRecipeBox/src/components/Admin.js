import React from 'react';
import base from '../database';

import AjoutRecette from './ajoutRecette';

class Admin extends React.Component{

    state = {
        uid: null,
        owner: null
    };

    componentDidMount(){
        base.onAuth(user => {
            if(user){
                this.traitementConnexion(null,{user})
            }
        });
    }


    connexion = provider => {
       base.authWithOAuthPopup(provider, this.traitementConnexion);
    };

    deconnexion = () => {
      base.unauth();
      this.setState({uid: null});
    };

    traitementConnexion = (err, authData) => {
        if(err){
            console.log(err);
            return;
        }

        //Récupérer nom de la boite
        const boxRef = base.database().ref(this.props.pseudo);

        boxRef.once('value', snapshot =>{
            const data = snapshot.val() || {};

            //Attribuer la boxe si elle n'est pas utiliser
            if(!data.owner){
                boxRef.set({owner: authData.user.uid});
            }
            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        });
    };

    traiterChangement = (event, key) => {
      const recette = this.props.recettes[key];
      const majRecette = {
          ...recette,
          [event.target.name]: event.target.value
      };
      this.props.majRecette(key, majRecette);
    };

    renderLogin = () => {
       return(
           <div className="login">
               <h2>Connecte toi pour créer tes recettes !</h2>
               <button className="facebook-button" onClick={() => this.connexion('facebook')}>Me connecter avec Facebook</button>
               <button className="twitter-button" onClick={() => this.connexion('twitter')}>Me connecter avec Twitter</button>
           </div>
       );
    };
    renderAdmin = key =>{
        const recette = this.props.recettes[key];
        return(
            <div className="card" key={key}>
                <form className="admin-form">
                    <input type="text" name="nom" value={recette.nom} placeholder="Nom de la recette" onChange={e => this.traiterChangement(e,key)}/>
                    <input type="text" name="image" value={recette.image} placeholder="Adresse de l'image" onChange={e => this.traiterChangement(e,key)}/>
                    <textarea rows="3" name="ingredients" value={recette.ingredients} placeholder="Liste des ingrédients séparés par une virgule" onChange={e => this.traiterChangement(e,key)} >
                  </textarea>
                    <textarea rows="15" name="instructions" value={recette.instructions} placeholder="Liste des instructions(une par ligne)" onChange={e => this.traiterChangement(e,key)} >
                  </textarea>
                </form>
                <button onClick={() => this.props.supprimerRecette(key)}>Supprimer</button>
            </div>
        );
    }

    render(){
        const deconnexion = <button onClick={this.deconnexion}>Déconnexion</button>
        //Si il n'y a pas de propriétaire
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>;
        }

        //Est ce que c'est le propriétaire de cette box
        if(this.state.uid !== this.state.owner){
            return(
                <div className="login">
                {this.renderLogin()}
                <p>Vous n'êtes  pas le propriétaire de cette boîte à recette.</p>
                </div>
            );
        }



        const adminCards = Object.keys(this.props.recettes).map(this.renderAdmin);

        return(
            <div className="cards">
                <AjoutRecette ajouterRecette={this.props.ajouterRecette} />
                {adminCards}
                <footer>
                    <button onClick={this.props.chargerExemple}>Remplir</button>
                    {deconnexion}
                </footer>
            </div>

        );
    }


    static propTypes = {
        chargerExemple: React.PropTypes.func.isRequired,
        ajouterRecette: React.PropTypes.func.isRequired,
        majRecette: React.PropTypes.func.isRequired,
        recettes: React.PropTypes.object.isRequired,
        supprimerRecette: React.PropTypes.func.isRequired,
        pseudo: React.PropTypes.string.isRequired
    }
}
export default Admin;