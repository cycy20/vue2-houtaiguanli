<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      :key="item.path"
      :closable="item.name !== 'home'"
      size="small"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "  CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    //跳转
    changeMenu(item) {
      console.log(item, "changemenu");
      if(this.$route.name !== item.name)
      this.$router.push({
        name: item.name,
      });
    },
    //点击删除
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tags.length;

      //删除后的跳转
      if (item.name !== this.$route.name) {
        return;
      }
      //删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  .el-tag {
    cursor: pointer;
    margin-right: 15px;
  }
}
</style>
