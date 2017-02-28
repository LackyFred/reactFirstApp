import React from 'react';

import base from '../database';

import Formulaire from './Formulaire';
import Message from './Message';

import ReactCSSTransistionGroup from 'react-addons-css-transition-group';
import '../animation.css';

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

    componentDidUpdate(){
        //Mettre le scroll en bas
        this.messages.scrollTop = this.messages.scrollHeight;
    }




    addMessage = message => {
        //Copie du state
        const messages = {...this.state.messages};
        //Ajouter une clé unique timestamp
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;
        //On supprime si plus de 10 messages
        Object.keys(messages).slice(0, -10).map(key => messages[key] = null);
        //Mettre à jour le state
        this.setState({messages});
    };

    isUser = pseudo => {
      return pseudo === this.props.params.pseudo
    };

    render(){
        const messages = Object
            .keys(this.state.messages)
            .map(key => <Message key={key} isUser={this.isUser} details={this.state.messages[key]}/>);

        return(
            <div className="box">
                <div>
                    <div className="messages" ref={input => this.messages = input}>
                        <ReactCSSTransistionGroup
                            component="div"
                            className="message"
                            transitionName="message"
                            transitionEnterTimeOut={200}
                            transitionLeaveTimeOut={200}
                        >
                        {messages}
                        </ReactCSSTransistionGroup>
                    </div>
                    <Formulaire pseudo={this.props.params.pseudo} length={140} addMessage={this.addMessage}/>
                </div>
            </div>
        )
    }
    static propTypes = {
        params: React.PropTypes.object.isRequired,
    }
}
export default App;