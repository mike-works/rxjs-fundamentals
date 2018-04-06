import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import ObservableComponent, { ObservableProps } from '../../common/components/Observable';

const oProps: ObservableProps = {
  observableIndex: 1,
  name: { text: 'obs name', width: 200 },
  translateY: 0,
  height: 150,
  marginLeft: 20,
  shouldRenderAxis: true,
  axisWidth: 2,
  progressWidth: 300,
  mainColor: 'red',
  arrowWidth: 15,
  shapeOuterSize: 10,
  shapeStrokeWidth: 3,
  scale: x => x,
  animate: true,
  allTooltips: [],
  onErrorMouseEnter: () => {},
  onErrorMouseLeave: () => {},
  onValueMouseEnter: () => {},
  onValueMouseLeave: () => {},
  observable: {
    startTime: 1,
    mainColor: 'blue',
    values: [4, 5, 6, 7],
    completed: {
      time: 1000,
      lastValueBeforeCompletedTime: 9
    }
  }
};

ReactDOM.render([new ObservableComponent(oProps).render()], document.getElementById('example'));
