<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addGroupLevelOne"
          >預留按紐一</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelTwo"
          >預留按紐二</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelThree"
          >預留按紐三</el-button
        >
      </el-header>
      <el-main>
        <el-row :gutter="20" type="flex" class="row-bg">
          <el-col :span="6">
            <div class="input-wrap">
              轉印紙使用：
              <!-- <el-button
                v-if="materialDataForm.accessory_cloth_id"
                type="primary"
                size="mini"
                class="button"
                @click="handleSelectAccessoryCloth"
                >{{ accessoryClothName }}</el-button
              > -->
              <el-button
                type="primary"
                size="mini"
                class="button"
                @click="handleSelectPaper"
                >點我選擇轉印紙</el-button
              >
            </div>
          </el-col>
          <el-col :span="6"> </el-col>
          <el-col :span="6"> </el-col>
          <el-col :span="6" style="position:realative"> </el-col>
        </el-row>
      </el-main>
    </el-container>

    <SettingPaper
      :dialog="paperDialog"
      @update="updateSettingPaper"
      @reportError="reportError"
    >
    </SettingPaper>
  </div>
</template>

<script>
import SettingPaper from '../../components/Setting/SettingPaper'

export default {
  name: 'setting',
  data() {
    return {
      paperDialog: {
        show: false,
        title: '選擇轉印紙',
        option: '' // option 有幾種選項 paper ink ... 可以陸續加入
      }
    }
  },
  components: {
    SettingPaper
  },
  methods: {
    // 新增第一層
    addGroupLevelOne() {
      this.addLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類組合',
        option: 'add'
      }
    },
    // 新增第二層
    addGroupLevelTwo() {
      this.addLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類組合',
        option: 'add'
      }
    },
    // 新增原物料組合 (這邊是空殼)
    addGroupLevelThree() {
      this.addLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品組合',
        option: 'add'
      }
    },
    updateSettingPaper() {},
    reportError() {},
    handleSelectPaper() {
      this.paperDialog = {
        show: true,
        title: '選擇轉印紙',
        option: 'paper'
      }
    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.input-wrap {
  float: left;
  height: 28px;
  line-height: 28px;
}
</style>
