<template>
  <div>
    <div class="label label-primary" v-if="support.polyfill">
      <i class="fa" :class="getClass(support.polyfill)"></i> {{support.polyfill}}
    </div>
    <div class="label label-danger" v-if="version && support.polyfill && version > support.polyfill" v-for="version in support.no_support">
      <i class="fa" :class="getClass(version)"></i> {{version}}
    </div>
    <div class="label label-success" v-if="support.native">
      <i class="fa" :class="getClass(support.native)"></i> {{support.native}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tag-group',
    props: ['browser', 'support'],
    methods: {
      getClass(version) {
        let classPostfix = this.browser;
        if (this.browser === 'ie' && version > 12) {
          classPostfix = 'edge';
        }
        return `fa-${classPostfix}`;
      },
    },
  };

</script>
<style scoped>
  .label {
    padding-top:3px;
    margin-right:3px;
    display:inline-block;
  }

</style>
