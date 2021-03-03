export default {
  dragging:false,
  node_list: [{
    parent:null,
    id:'root',
    name:'Root Process',
    type:'Process',
    desc:'',
    children:[]
  }],
  edge_list:[],
  selected_type: 'Node',
  selected_idx : -1,
  selected_proc: {
    idx:null,
    parent:null,
    id:null,
    name:null,
    type:null,
    desc:null,
    children:[]
  }
}