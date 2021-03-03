<template>
<v-container style="height:100%;">
  <div style="display:flex;align-items:center;justify-content:center;">
    <v-spacer>
    </v-spacer>
  </div>
  <div style="height:100%;">
    <form v-if="mrx_store.app.selected_idx > -1">
      <v-text-field label="#" autocomplete="off" disabled dense v-model="selected_item.idx" placeholder=" "></v-text-field>
      <v-text-field label="ID" autocomplete="off" disabled dense v-model="selected_item.id" placeholder=" "></v-text-field>
      <v-text-field label="Name" autocomplete="off" dense v-model="selected_item.name" placeholder=" "></v-text-field>
      <v-select v-if="selected_item.type != 'Edge'" label="Type" autocomplete="off" :items="options" v-model="selected_item.type" dense placeholder=" "></v-select>
      <v-textarea v-if="selected_item.type != 'Edge'" label="Desc" autocomplete="off" dense placeholder=" " v-model="selected_item.desc"></v-textarea>
    </form>
    <div v-else style="height:100%;display:flex; justify-content:center;align-items:center;font-size:18px;">
      선택된 노드가 없습니다.
    </div>
  </div>
</v-conatiner>
</template>

<script>

export default {
  components: {
    // 외부 컴포넌트 등록
  },
  methods: {
    // 해당 view에서 사용하는 함수 등록
    addCount() {
      this.count++;
    }
  },
  watch: {
    // 해당 view에서 사용되는 변수에 대한 event listen 등록
    selected_item(val) {
      console.log(val);
    }
  },
  computed: {
    element_list() {
      return this.mrx_store.app.selected_proc.children.map(function(d) {
        return d
      })
    },
    selected_item() {
      var item;
      if(this.mrx_store.app.selected_type == 'Edge') {
        item = this.mrx_store.app.edge_list;
      } else {
        item = this.mrx_store.app.selected_proc.children;
      }
      
      return item[this.mrx_store.app.selected_idx];
    }
  },
  data () {
    // 해당 view에서 사용되는 변수 등록(<temaplte></template>연동)
    return {
      options:['Process', 'Decision', 'Document', 'Terminal', 'OtherProcess', 'Database', 'MultiDocuments']
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

</style>
