<template>
  <div>
    <iframe :src="this.$route.query.frameLink" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "pano",
  data() {
    return {};
  },
  mounted: function() {},
  methods: {},
  watch: {}
};
</script>

