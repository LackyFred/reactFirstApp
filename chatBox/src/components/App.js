import React from 'react';

import base from '../database';

import Formulaire from './Formulaire';
import Message from './Message';

class App extends React.Component{
    state = {
      messages: {}
    };

    componentWillMount(){
        this.ref = base.syncState('/', {
           context: this,
           state: 'messages'
        });
    }




    addMessage = message => {
        //Copie du state
        const messages = {...this.state.messages};
        //Ajouter une clé unique timestamp
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;
        //Mettre à jour le state
        this.setState({messages});
    };

    render(){
        const messages = Object
            .keys(this.state.messages)
            .map(key => <Message key={key} details={this.state.messages[key]}/>);

        return(
            <div className="box">
                <div>
                    <div className="messages">
                        {messages}
                    </div>
                    <Formulaire pseudo={this.props.params.pseudo} length="140" addMessage={this.addMessage}/>
                </div>
            </div>
        )
    }
}
export default App;