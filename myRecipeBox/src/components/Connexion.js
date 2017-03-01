import React from 'react';


class Connexion extends React.Component{

    goToApp = event =>{
        event.preventDefault();
        const pseudo = this.pseudoInput.value;
        this.context.router.transitionTo(`/box/${pseudo}`);
    };

    render(){
        return(
            <div className="connexionBox" onSubmit={e => this.goToApp(e)}>
                <form className="connexion">
                    <h1>Ma Boîte à Recettes</h1>
                    <input type="text" placeholder="Nom du Chef" pattern="[A-Za-z-]{1,}" ref={input => {this.pseudoInput = input}} required/>
                    <button type="submit">GO</button>
                    <p>Pas de caractères spéciaux.</p>
                </form>
            </div>
        );
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
}
export default Connexion;