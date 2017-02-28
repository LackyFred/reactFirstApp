import React from 'react';

class Formulaire extends React.Component{

    state = {
      length: this.props.length
    };

    createMessage = event => {
        event.preventDefault();
        const message = {message: this.inputMessage.value, pseudo: this.props.pseudo};

        this.props.addMessage(message);

        this.messageForm.reset();
        const length = this.props.length;
        this.setState({length});

    };

    compteur = event => {
        const length = this.props.length - this.inputMessage.value.length
        this.setState({length});
    };

    render(){
        return(
            <form
                ref={input => this.messageForm = input}
                className="form"
                onSubmit={e => this.createMessage(e)}
            >
                <textarea
                    required
                    maxLength={this.props.length}
                    ref={input => {this.inputMessage = input} }
                    onChange={e => this.compteur(e)}
                >

                </textarea>
                <div className="info">{this.state.length}</div>

                <button type="submit">Envoyer</button>
            </form>
        );
    }
}
export default Formulaire;