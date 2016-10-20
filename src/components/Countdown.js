/**
 * UI上通过更改背景图的位置控制数字
 *
 * this.state
 * .remainTimes @ 倒计时剩余时间(s)
 * .finished @ 是否结束
 * .show @ 文字说明显示
*/

import React, {Component, PropTypes} from 'react';

import '../css/base.css'

const propTypes = {
  endTime: PropTypes.string
}

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.endTime = props.option.endTime;
    this.step = props.option.step * 1000 || 1000;
    this.info = props.option.imformation || '';

    this.state = {
      remainTimes: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      finished: false,
      show: null
    }

    this.tick = this.tick.bind(this);

    // 设置样式
    this.style = {
      hh: 'item item-hh',
      hl: 'item item-hl',
      mh: 'item item-mh',
      ml: 'item item-ml',
      sh: 'item item-sh',
      sl: 'item item-sl',
      s: 'item item-s'
    }
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick, this.step); //1s计时一次
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.finished) {
       if (prevState.seconds !== this.state.seconds) {
         this.setSec(prevState.seconds,this.state.seconds);
       }

       if (prevState.minutes !== this.state.minutes) {
         this.setMin(prevState.minutes,this.state.minutes);
       }

      if (prevState.hours !== this.state.hours) {
         this.setHour(prevState.hours,this.state.hours);
       }
    } else {
      document.querySelector('.timeup').classList.add('show');
    }
  }

  setSec(preNum,num) {
    let preNumL = preNum % 10, //获得上一次低位的值,以判断是否需要更新高位
        numH = Math.floor(num / 10),
        numL = num % 10;

    let classSh = this.style.sh;
    let classSl = this.style.sl;
    let nodeNumH = document.querySelector(".item.item-sh");
    let nodeNumL = document.querySelector(".item.item-sl");
    if(preNumL === 0) {
      nodeNumH.className = classSh;
      this.setNum(numH,nodeNumH);
    }
    nodeNumL.className = classSl;
    this.setNum(numL,nodeNumL);
  }

  setMin(preNum,num) {
    let preNumL = preNum % 10,
        numH = Math.floor(num / 10),
        numL = num % 10;

    let classMh = this.style.mh;
    let classMl = this.style.ml;
    let nodeNumH = document.querySelector(".item.item-mh");
    let nodeNumL = document.querySelector(".item.item-ml");
    if(preNumL === 0) {
      nodeNumH.className = classMh;
      this.setNum(numH,nodeNumH);
    }
    nodeNumL.className = classMl;
    this.setNum(numL,nodeNumL);
  }

  setHour(preNum,num) {
    let preNumL = preNum % 10,
        numH = Math.floor(num / 10),
        numL = num % 10;

    let classHh = this.style.hh;
    let classHl = this.style.hl;
    let nodeNumH = document.querySelector(".item.item-hh");
    let nodeNumL = document.querySelector(".item.item-hl");
    if(preNumL === 0) {
      nodeNumH.className = classHh;
      this.setNum(numH,nodeNumH);
    }
    nodeNumL.className = classHl;
    this.setNum(numL,nodeNumL);
  }


  setNum(num,nodeNum) {
    switch(num) {
      case 0: this.addclass(nodeNum, 0);break;
      case 1: this.addclass(nodeNum, 1);break;
      case 2: this.addclass(nodeNum, 2);break;
      case 3: this.addclass(nodeNum, 3);break;
      case 4: this.addclass(nodeNum, 4);break;
      case 5: this.addclass(nodeNum, 5);break;
      case 6: this.addclass(nodeNum, 6);break;
      case 7: this.addclass(nodeNum, 7);break;
      case 8: this.addclass(nodeNum, 8);break;
      case 9: this.addclass(nodeNum, 9);break;
      default: break;
    }
  }

  addclass(nodeNum, num) {
    nodeNum.classList.add(`item-${num}`);
  }

  tick() {
    let remainTimes = new Date(this.endTime) - new Date();
    let message = '';
    if (remainTimes > 0) {
      message = this.getSeparateTime(remainTimes);
    } else {
      this.setState({finished: true});
      clearInterval(this.interval);
    }
    this.setState({show: message});
  }

  //将毫秒转换成时分秒
  getSeparateTime(remainTimes) {
    const sec = 1000,
          min = sec * 60,
          hour = min * 60,
          day = hour * 24;

    let days = Math.floor(remainTimes / day);
    let hours = Math.floor((remainTimes % day) / hour);
    let minutes = Math.floor((remainTimes % hour) / min);
    let seconds = Math.floor((remainTimes % min) / sec);

    this.setState({
      remainTimes: remainTimes <= 0 ? 0 : remainTimes,
      days,
      hours,
      minutes,
      seconds,
      finished: remainTimes <= 0 ? true : false
    });

    let message = `${this.info}还剩${days}天,`;
    return message;
  }

  render() {
    //低于一天是不显示提示天数的信息
    let days = this.state.days === 0 ? '' : this.state.show;
    return(
      <div className="countdown">
        <h2>倒计时</h2>
        <p className="remainDay">{days}</p>
        <ul className="timeList">
          <li className={this.style.hh}></li>
          <li className={this.style.hl}></li>
          <li className={this.style.s}></li>
          <li className={this.style.mh}></li>
          <li className={this.style.ml}></li>
          <li className={this.style.s}></li>
          <li className={this.style.sh}></li>
          <li className={this.style.sl}></li>
        </ul>
        <p className="timeup">时间到了!</p>
      </div>
    );
  }
}

export default Countdown;