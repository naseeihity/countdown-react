import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './src/components/Countdown';

// 初始化一个标准时间为倒计时的终点
// 可以设置每一次计时长度step,默认为1s
// 可以设置相关信息

const ENDTIME = '1/1/2018 00:00 AM';
const OPTION = {
  endTime: ENDTIME,
  step: 1,
  imformation: '距离2018年元旦'
}

ReactDOM.render(
   <Countdown option={OPTION} />, document.getElementById('countdown'));

