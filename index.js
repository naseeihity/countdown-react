import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './src/components/Countdown';

const ENDTIME = '10/19/2018 11:18 PM';
ReactDOM.render(
   <Countdown endTime={ENDTIME} />, document.getElementById('countdown'));

