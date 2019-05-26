import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import eventHandler from '../events/handler';
import {Notification} from '../events/event-types';

import {addArticle} from '../actions/index';

class App extends Component {
    handleClick = () => {
        this.props.addArticle({
            title: 'added one'
        });
        eventHandler.emit(new Notification('Article added'));
    }
    render () {
        return (
            <Fragment>
                {
                    this.props.articles.map((article, i) => {
                        return (
                            <p key={i}>{article.title}</p>
                        )
                    })
                }
                <button onClick={this.handleClick}>Add Article</button>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);