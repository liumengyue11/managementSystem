import React from 'react';
import Dva from 'dva';

import App from './containers/App.js';
import stafflistModel from './models/stafflistModel.js';
import addStaffModel from './models/addStaffModel.js'

const app = Dva();

app.router(() => <App/>);
app.model(stafflistModel);
app.model(addStaffModel);
app.start("#app");