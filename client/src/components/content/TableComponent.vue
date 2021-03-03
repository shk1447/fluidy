<template>
<div>
  <v-tabs v-model="tab" height="32px" background-color="#f1f4f5">
    <v-tabs-slider color="white"></v-tabs-slider>
    <v-tab v-for="item in tabs" :key="item.name" style="
        font-size: 1em;
        background: white;
        border-top: 1px solid #e2e2e2;
        border-right: 1px solid #e2e2e2;
        border-bottom: 2px solid #e2e2e2;
      ">
      {{ item.name }}
    </v-tab>
  </v-tabs>
  <v-tabs-items v-model="tab" style="width:100%;height:calc(100% - 40px);overflow:none;">
    <v-tab-item v-for="item in tabs" :key="item.name" style="height: 100%; width: 100%">
      <div style="display:flex;height:36px;padding:1em; align-items:center;justify-content:flex-start;">
        <h2>{{mrx_store.app.selected_proc.name == '' ? '-' : mrx_store.app.selected_proc.name}}</h2>
        <v-icon @click="goToParent" v-if="mrx_store.app.selected_proc.parent" small style="margin-top:2px;margin-left:1em;">mdi-arrow-expand-up</v-icon>
      </div>
      <v-data-table style="width:100%;height:calc(100% - 36px);z-index:1;border-top:1px solid #dedede;" class="node-list-table" :headers="node_header" :items="element_list" calculate-widths no-data-text="No Data Table" hide-default-footer :items-per-page="-1" show-select>
        <template v-slot:body="{ items }">
          <tbody>
            <tr>
              <td colspan="6" style="text-align:center;cursor:pointer;">
                <v-icon>
                  mdi-plus
                </v-icon>
                <label style="cursor:inherit;">
                  노드 추가하기
                </label>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>
                <v-simple-checkbox></v-simple-checkbox>
              </td>
              <td>{{idx}}</td>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>{{item.desc}}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-tab-item>
  </v-tabs-items>
</div>
</template>

<script>

export default {
  components: {
    // 외부 컴포넌트 등록
  },
  methods: {
    // 해당 view에서 사용하는 함수 등록
    search (tree, value, key = 'id', reverse = false) {
      const stack = [ tree[0] ]
      while (stack.length) {
        const node = stack[reverse ? 'pop' : 'shift']()
        if (node[key] === value) return node
        node.children && stack.push(...node.children)
      }
      return null
    },
    goToParent() {
      var parent_node = this.search(this.mrx_store.app.node_list, this.mrx_store.app.selected_proc.parent);
      if(parent_node) {
        this.mrx_store.app.selected_proc = parent_node;
      }
    }
  },
  watch: {
    // 해당 view에서 사용되는 변수에 대한 event listen 등록
  },
  computed: {
    element_list() {
      return this.mrx_store.app.selected_proc.children.map(function(d) {
        return d
      })
    }
  },
  data () {
    // 해당 view에서 사용되는 변수 등록(<temaplte></template>연동)
    return {
      node_header:[  // table view column  names 
        {text:'#',value:'idx', width:'100'},
        {text:'ID',value:'id', width:'360'},
        {text:'Name',value:'name'},
        {text:'Type',value:'type'},
        {text:'Description',value:'desc'}
      ],
      node_list:[],
      tab: 0,
      tabs: [{
        name: "Process"
      }]
    }
  },
  created() {
    // vue lifecycle01 : dom이 생성되기 전 instance 생성시 발생
    console.log('created')
  },
  mounted() {
    // vue lifecycle02 : dom객체가 browser에 생성시 발생
    console.log('mounted')
  },
  updated() {
    // vue lifecycle03 : data 변경으로 인해 dom update시 발생
  },
  destroyed() {
    // vue lifecycle04 : view destroy시 발생
    console.log('destroyed')
  }
}
</script>

<style scoped>
.node-list-table {
  background: transparent !important;
  
}
</style>
