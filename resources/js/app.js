import '../scss/app.scss';

import $ from 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/index';
import App from './components/App';
import eventHandler from './events/handler';
import notificationListeter from './events/listeners/notification-listener';
import {Notification} from './events/event-types';

eventHandler.subscribe(notificationListeter);

$('#toast').toast({delay: 2000});

eventHandler.emit(new Notification('kek'));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));