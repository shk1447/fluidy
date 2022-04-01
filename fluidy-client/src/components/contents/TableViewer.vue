<template>
  <golden-layout
    class="hscreen"
    :hasHeaders="false"
    :showPopoutIcon="false"
    :showMaximiseIcon="false"
  >
    <gl-col :width="100">
      <gl-row :height="50">
        <gl-stack :closable="false">
          <gl-component title="Form">
            <iframe-content :meta="meta" />
          </gl-component>
        </gl-stack>
      </gl-row>
      <gl-row :height="50">
        <gl-stack :closable="false">
          <gl-component :closable="false" :reorderEnabled="true" title="Data">
            <data-viewer
              :content_guid="content_guid"
              :content_options="content_options"
              :content_name="content_name"
              @added="addedRow"
              @updated="updatedRow"
              @removed="removedRow"
              @selected-cell="selectedCell"
              @selected-row="selectedRow"
            />
          </gl-component>
        </gl-stack>
      </gl-row>
    </gl-col>
  </golden-layout>
</template>
<script>
export default {
  props: ["content_guid", "content_name", "content_options"],
  data: () => ({
    iframe_height: 0,
    meta: {
      loadUrl: "",
    },
  }),

  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.content_guid);
  },
  methods: {
    addedRow(params) {},
    updatedRow(params) {},
    removedRow(params) {},
    selectedRow(params) {},
    selectedCell(params) {
      this.meta = {
        loadUrl: "",
      };
      this.iframe_height = this.iframe_width = 0;
      setTimeout(() => {
        this.meta = {
          loadUrl:
            "/content/" +
            this.content_guid +
            "/" +
            params.item[params.header.value],
        };
      }, 0);
    },
    changeData(e, idx, header) {
      console.log(e, idx, header);
    },
  },
};
</script>

<style scoped>
</style>
