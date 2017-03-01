import React from 'react';
import  { render } from 'react-dom';

import './index.css';
import App from './components/App';
import Connexion from './components/Connexion';
import NotFound from './components/NotFound';

import {BrowserRouter, Match, Miss} from 'react-router';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={Connexion}/>
                <Match pattern="/box/:pseudo" component={App}/>
                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>
    );
};
render(<Root/>, document.getElementById('root'));