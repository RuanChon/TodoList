<template>
  <div class="ListContainer">
    <!-- Header -->
    <div class="headerContainer">
      <div class="headerBody flex-row-between">
        <h2>待办事项</h2>
        <el-input placeholder="请输入待办事项" v-model="addItem" @keyup.enter.native="addList" clearable></el-input>
      </div>
    </div>

    <!-- Body -->
    <div class="BodyContainer flex-column-between">
      <!-- 正在进行 List -->
      <div class="onGoingContainer">
        <!-- title -->
        <div class="goingTitle flex-row">
          <h3>正在进行</h3>
          <span>{{goingCount}}</span>
        </div>

        <!-- ListItem -->
        <div class="goingList">
          <ul>
            <li class="goingItem flex-row-between" v-for="(item,index) in goingArr" :key="index">
              <div class="itemLeft flex-row">
                <span class="checkBox" @click="finishChange(goingArr, index)"></span>
                <el-input :value="item" readonly="readonly"></el-input>
              </div>
              <span class="el-icon-delete itemRight" @click="delItem(goingArr, index)"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 已完成 List -->
      <div class="finishContainer">
        <!-- title -->
        <div class="finishTitle flex-row">
          <h3>已完成</h3>
          <span>{{finishCount}}</span>
        </div>

        <!-- ListItem -->
        <div class="finishList">
          <ul>
            <li class="finishItem flex-row-between" v-for="(item,index) in finishArr" :key="index">
              <div class="itemLeft flex-row">
                <span class="checkBox el-icon-check" @click="goingChange(finishArr, index)"></span>
                <el-input :value="item" readonly="readonly"></el-input>
              </div>
              <span class="el-icon-delete itemRight" @click="delItem(finishArr, index)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footerContainer flex-row-center">
        <span>Author：RuanChon -- 2020/07/02</span>
    </div>
  </div>
</template>

<script>
import "../assets/css/flex.css";
import { isNull } from "../utils/utils";

export default {
  data() {
    return {
      readonly: true,
      addItem: "", // 添加 List
      goingArr: [], // 正在进行 List
      finishArr: [] // 已完成 List
    };
  },
  created(){
    let going = localStorage.getItem('rc-todolist').split(',')
    console.log('缓存', going)
    if(going[0]){
      this.goingArr = going
    }
  },
  methods: {
    // 新增待办
    addList() {
      let res = isNull(this.addItem.trim());
      if (res == true) {
        return this.$message({
          message: "请输入待办事项",
          showClose: true,
          duration: 1500,
          type: "warning"
        });
      }

      this.goingArr.push(this.addItem);
      localStorage.setItem('rc-todolist', this.goingArr)
      this.addItem = null;
      console.log("当前未完成的：", this.goingArr);
    },

    // 完成事项
    finishChange(arr, idx) {
      let itme = arr.splice(idx, 1);
      localStorage.setItem('rc-todolist', this.goingArr)
      this.finishArr.push(itme.toString());
    },

    // 重新拉起事项
    goingChange(arr, idx) {
      let itme = arr.splice(idx, 1);
      this.goingArr.push(itme.toString());
    },

    // 删除 Item
    delItem(arr, idx) {
      arr.splice(idx, 1);
      localStorage.setItem('rc-todolist', this.goingArr)
    }
  },
  computed: {
      goingCount(){
          return this.goingArr.length
      },
      finishCount(){
          return this.finishArr.length
      }
  },
};
</script>


<style lang="scss">

.ListContainer {
  height: 100%;
  .headerContainer {
    width: 100%;
    height: 8%;
    background: #272822;
    .headerBody {
      width: 40%;
      height: 100%;
      margin: 0 auto;
      color: #fff;
      .el-input {
        width: 60%;
      }
    }
  }
  .BodyContainer {
    width: 40%;
    height: 85%;
    margin: 0 auto;
    .onGoingContainer {
        height: 45%;
        width: 100%;
      .goingTitle {
          height: 15%;
        align-items: center;
        span {
          display: inline-block;
          width: 1.4rem;
          line-height: 1.4rem;
          text-align: center;
          background: #e6e6fa;
          border-radius: 50px;
          font-size: 14px;
          margin-left: 10px;
        }
        .el-input__inner {
          border: none;
        }
      }
      .goingList {
        width: 100%;
        height: 85%;
        overflow-y: auto;
        .goingItem {
          height: 2.5rem;
          background: #ffffff;
          border-radius: 0 5px 5px 0;
          margin-bottom: 10px;
          .itemLeft {
            width: 80%;
            height: 100%;
            align-items: center;
            position: relative;
            .checkBox {
              display: block;
              width: 20px;
              height: 20px;
              border: 1px solid #797c69;
              border-radius: 2px;
              margin-left: 20px;
              cursor: pointer;
            }
            .checkBox:hover {
              border-color: #afb1a5;
            }
            .el-input {
              width: 90%;
              .el-input__inner {
                border: none;
              }
            }
          }
          .itemLeft::after {
            content: "";
            width: 5px;
            height: 100%;
            background: #49a3ff;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 3px 0 0 3px;
          }
          .itemRight {
            font-weight: bold;
            margin-right: 10px;
            cursor: pointer;
            color: #B8B8B8;
          }
          .itemRight:hover {
            color: #636556;
          }
        }
      }
    }

    // 已完成
    .finishContainer {
        height: 52%;
        width: 100%;
      .finishTitle {
        align-items: center;
        height: 15%;
        span {
          display: inline-block;
          width: 1.4rem;
          line-height: 1.4rem;
          text-align: center;
          background: #e6e6fa;
          border-radius: 50px;
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .finishList {
        width: 100%;
        height: 85%;
    overflow-y: auto;
        .finishItem {
          height: 2.5rem;
          background: #e0e0e0;
          border-radius: 0 5px 5px 0;
          margin-bottom: 10px;
          .itemLeft {
            width: 80%;
            height: 100%;
            align-items: center;
            position: relative;
            .checkBox {
              display: block;
              width: 22px;
              line-height: 22px;
              border-radius: 2px;
              margin-left: 20px;
              cursor: pointer;
              text-align: center;
              font-weight: bold;
              color: #efefef;
              background: #49a3ff;
            }
            .checkBox:hover {
              background: #0062C4;
            }
            .el-input {
              width: 90%;
              .el-input__inner {
                border: none;
                background: #e0e0e0;
              }
            }
          }
          .itemLeft::after {
            content: "";
            width: 5px;
            height: 100%;
            background: #b3b3b3;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 3px 0 0 3px;
          }
          .itemRight {
            font-weight: bold;
            margin-right: 10px;
            cursor: pointer;
            color: #B8B8B8;
          }
          .itemRight:hover {
            color: #636556;
          }
          .itemRight {
            font-weight: bold;
            margin-right: 10px;
            cursor: pointer;
          }
          .itemRight:hover {
            color: #636556;
          }
        }
      }
    }
  }
  .footerContainer{
      height: 7%;
      width: 100%;
      color:#B8B8B8;    
}
}
</style>