<template>
  <div id="app">
    <todoList />
  </div>
</template>

<script>
import todoList from './pages/todoList'

export default {
  name: 'App',
  components: {
    todoList
  }
}
</script>

<style lang="scss">
body,html{
  margin: 0;
  padding: 0;
  height: 100%;
  background: #efefef;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
#app{
  height: 100%;
}

// 自定义滚动条
// ::-webkit-scrollbar 滚动条整体部分
div::-webkit-scrollbar {
  width: 8px;
}
// ::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
div::-webkit-scrollbar-track {
  background: #EFEFEF;
  border-radius: 2px;
}
// ::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
div::-webkit-scrollbar-thumb {
  background: #AEAEAE;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #5F5F5F;
  cursor: pointer;
}
/*End*/

</style>
