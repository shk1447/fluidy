var common = [{
  compName: 'iframe-content',
  compPath: require('./components/contents/IFrame.vue')
}];

var windows = [{
  compName: 'form',
  compPath: require('./components/windows/FormWindow.vue')
}];

var panels = [];

var dialogs = [{
  compName: 'space',
  compPath: require('./components/dialogs/SpaceDialog.vue')
}];

var viewers = [{
  compName: 'data',
  compPath: require('./components/contents/DataViewer.vue')
}, {
  compName: 'chart',
  compPath: require('./components/contents/ChartViewer.vue')
}, {
  compName: 'code',
  compPath: require('./components/contents/CodeViewer.vue')
}, {
  compName: 'map',
  compPath: require('./components/contents/MapViewer.vue')
}, {
  compName: 'flow',
  compPath: require('./components/contents/FlowViewer.vue')
}, {
  compName: 'tree',
  compPath: require('./components/contents/TreeViewer.vue')
}];

export default {
  common: common,
  windows: windows,
  panels: panels,
  dialogs: dialogs,
  viewers: viewers,
};
