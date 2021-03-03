<template>
<div style="height:100%;width:100%;display:flex;justify-content:center;align-items:center;font-size:18px;">
  To be released
</div>
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
    count(val) {
      this.$message({type:'info', message:val});
      this.$notify({type:'info', message:val});
    }
  },
  data () {
    // 해당 view에서 사용되는 변수 등록(<temaplte></template>연동)
    return {
      count:0,
      template_name:'샘플 카운트'
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
