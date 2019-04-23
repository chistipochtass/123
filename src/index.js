import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'

connect.send('VKWebAppInit', {});

const router = createRouter()

router.start(() => {
    ReactDOM.render((
        <RouterProvider router={router}>
            <App router={router}/>
        </RouterProvider>
    ), document.getElementById('root'))
})
