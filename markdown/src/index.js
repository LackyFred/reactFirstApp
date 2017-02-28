import React from 'react';
import { render } from 'react-dom';

import './style/css/bootstrap.min.css';
import './index.css';

import { sampleText } from './sampleText';
import marked from 'marked';

class App extends React.Component{
    state = {
      text: sampleText
    };
    componentWillMount(){
        if(localStorage.getItem('text')){
            this.setState({text: localStorage.getItem('text')})
        }
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('text', nextState.text);
    }



    editText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };

    renderText  = (text) =>{
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    render(){
        return(
            <div className="container">
                <div className="row">

                    <div className="col-sm-6">
                        <textarea rows="35"
                                  value={this.state.text}
                                  className="form-control"
                                  onChange={(e) => this.editText(e)}
                        >

                        </textarea>
                    </div>

                    <div dangerouslySetInnerHTML={this.renderText(this.state.text)} className="col-sm-6" />

                </div>
            </div>
        );
    }
}

render(
    <App/>, document.getElementById('root')
);
