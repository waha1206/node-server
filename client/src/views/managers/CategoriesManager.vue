<template>
  <div>
    <el-container>
      <el-header>
        <div class="cascader-wrap">
          <el-cascader
            @change="onOptionsChange"
            v-model="choiceLevelTwoValue"
            :props="{ expandTrigger: 'hover' }"
            size="mini"
            placeholder="請選擇第二層分類"
            :options="levelOneTowOption"
            filterable
          ></el-cascader>
        </div>
        <el-button type="primary" size="small" @click="addLevelOne"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addLevelTwo"
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click="addLevelThree"
          >新增第三層商品</el-button
        >
      </el-header>
      <!-- 分頁 -->
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="my_paginations.page_index"
          :page-size="my_paginations.page_size"
          :page-sizes="my_paginations.page_sizes"
          :total="my_paginations.total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
      <el-container>
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <!-- type = "expand" 這個就會把 expand 裡面的 所有值 帶入到 props 裡面 所以可以在裡面找到 quantity_profit 的值，再利用
					第一次的 v-for 在 template 他會把 tableData 下面的 expand 裡面的 item 先拿出來
					第二次的 v-for 把 quantity_profit[0] [1] [2] ... 依序的 pop 出來使用
				  -->
          <el-table-column type="expand">
            <template v-slot="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- <el-form-item label="" class="cascader-item">
                  <div class="block"></div>

                </el-form-item> -->
                <el-form-item label="利潤表格：" class="cascader-item">
                  <el-container>
                    <!-- header 兩個按紐 新增欄位，利潤清單更新 -->
                    <el-header class="profit-btn-wrap">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleAddProfit(props.row)"
                        >新增欄位</el-button
                      >
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleUpdateProfir(props.row)"
                        >利潤清單更新</el-button
                      >
                    </el-header>
                    <el-main>
                      <!-- 這邊會秀出欄位名稱 數量，利潤，刪除按紐 -->
                      <div
                        class="profit-wrap"
                        v-for="(citem, index) in props.row.quantity_profit"
                        :key="index"
                      >
                        <el-input
                          class="my-input"
                          v-model="citem.quantity"
                        ></el-input>
                        <my-percentage-input
                          :width="52"
                          :height="28"
                          :isReadyOnly="false"
                          v-model="citem.profit"
                        ></my-percentage-input>
                        <el-button
                          class="profit-btn"
                          size="mini"
                          type="danger"
                          @click="
                            handleDeleteProfit(index, props.row.quantity_profit)
                          "
                          >刪除</el-button
                        >
                      </div>
                    </el-main>
                  </el-container>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 序號 -->
          <el-table-column
            type="index"
            label="序號"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 添加原料組合 -->
          <!-- ******************************* cascader 選擇原料組 開始 *******************************-->
          <el-table-column
            label="添加原料組合"
            width="400"
            prop=""
            align="center"
          >
            <template slot-scope="props">
              <!-- <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="" class="cascader-item"> -->
              <div class="group-btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleUpdateGroupMember(props.row)"
                  >更新</el-button
                >
              </div>
              <div class="group-cascader">
                <!-- <span class="demonstration">多选可搜索</span> -->
                <el-cascader
                  size="mini"
                  clearable
                  :show-all-levels="false"
                  v-model="props.row.material_group"
                  placeholder="選擇原料組合"
                  @change="onMaterialGroupOptionsChange(props.row)"
                  :options="materialGroupOptions"
                  :props="{
                    multiple: true,
                    expandTrigger: 'hover',
                    emitPath: false
                  }"
                  filterable
                ></el-cascader>
              </div>
              <!-- </el-form-item>
              </el-form> -->
            </template>
          </el-table-column>
          <!-- ******************************* cascader 選擇原料組 結束 *******************************-->
          <!-- 商品名稱 -->
          <el-table-column
            label="商品名稱"
            prop="name"
            align="left"
            width="250"
          ></el-table-column>
          <!-- 商品編號 -->
          <el-table-column
            label="商品編號"
            prop="type"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 版型商品編號 -->
          <el-table-column
            label="版型編號"
            prop="pattern_no"
            align="center"
            width="120"
          >
          </el-table-column>
          <!-- 啟用/VIP -->
          <el-table-column label="啟用 / VIP" align="center" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status.activated" type="" size="mini"
                >啟用</el-tag
              >
              <el-tag v-else type="warning" size="mini">關閉</el-tag>
              &nbsp
              <el-tag v-if="scope.row.status.vip" type="" size="mini"
                >啟用</el-tag
              >
              <el-tag v-else type="warning" size="mini">關閉</el-tag>
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="單圖" width="70" align="center">
            <template slot-scope="scope">
              <!-- v-for="(item, index) in scope.row.imgs" -->
              <img
                v-if="scope.row.imgs[0]"
                width="50px"
                height="50px"
                :src="scope.row.imgs[0]"
                alt=""
              />
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="多圖" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img
                  v-for="(item, index) in scope.row.imgs"
                  width="200px"
                  height="200px"
                  :key="index"
                  :src="item"
                  alt=""
                />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">多圖</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 說明跳出來對話框的區塊 -->
          <el-table-column label="詳細資料" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>建檔日期：{{ getDate(scope.row.create_date) }}</p>
                <p>商品名稱：{{ scope.row.name }}</p>
                <p>商品編號：{{ scope.row.type }}</p>
                <p>商品說明：{{ scope.row.describe }}</p>
                <p>
                  商品狀態：<span v-if="scope.row.status.activated"
                    >已經啟用</span
                  >
                  <span v-else>尚未啟用</span>
                  <span>、</span>
                  <span v-if="scope.row.status.vip">VIP已啟用</span>
                  <span v-else>VIP未啟用</span>
                </p>
                <p>修改時間：{{ getDate(scope.row.last_modify_date) }}</p>
                <p>
                  修改人員：{{ getUserNameById(scope.row.last_edit_person) }}
                </p>
                <p>影片名稱：{{ scope.row.introduction_video.label }}</p>
                <p>
                  影片連結：<a
                    :href="scope.row.introduction_video.link"
                    target="_blank"
                    >{{ scope.row.introduction_video.link }}</a
                  >
                </p>
                <p>布料校色：{{ scope.row.salting_on_color_video.label }}</p>
                <p>
                  校色連結：<a
                    :href="scope.row.salting_on_color_video.link"
                    target="_blank"
                    >{{ scope.row.salting_on_color_video.link }}</a
                  >
                </p>
                <p>其它影片(一)：{{ scope.row.note_one_video.label }}</p>
                <p>
                  影片連結(一)：<a
                    :href="scope.row.note_one_video.link"
                    target="_blank"
                    >{{ scope.row.note_one_video.link }}</a
                  >
                </p>
                <p>其它影片(二)：{{ scope.row.note_two_video.label }}</p>
                <p>
                  影片連結(二)：<a
                    :href="scope.row.note_two_video.link"
                    target="_blank"
                    >{{ scope.row.note_two_video.link }}</a
                  >
                </p>
                <p>版型編號：{{ scope.row.pattern_no }}</p>
                <p>
                  版型連結：<a
                    :href="scope.row.pattern_download"
                    target="_blank"
                    >{{ scope.row.pattern_download }}</a
                  >
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">完整說明</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 商品說明 -->
          <el-table-column
            label="商品說明"
            prop="describe"
            align="center"
            width="310"
          >
          </el-table-column>

          <!-- 搜尋欄位 -->
          <el-table-column align="center" width="150">
            <!-- header 代表放到列的說明文字那邊 -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="輸入關鍵字搜尋"
              />
            </template>
            <!-- slot 崁入兩個按鈕 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditCategory(scope.$index, scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteCategory(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-aside width="50%">{{ choiceLevelTwoClass }}</el-aside>
        <el-aside width="50%">Aside</el-aside> -->
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>

    <!-- 新增第一層商品的 dialog -->
    <CategoriesLevelOneDialog
      v-if="categoriesLevelOneData[0]"
      :dialog="categoriesLevelOneDialog"
      :formData="categoriesLevelOneFormData"
      :categoriesData="categoriesLevelOneData"
      @update="getCategoriesLevelOneData"
    ></CategoriesLevelOneDialog>
    <!-- v-if="categoriesLevelTwoData[0]" -->
    <CategoriesLevelTwoDialog
      :dialog="categoriesLevelTwoDialog"
      :formData="categoriesLevelTwoFormData"
      :categoriesLevelTwoData="categoriesLevelTwoData"
      :categoriesLevelOneData="categoriesLevelOneData"
      @update="getCategoriesLevelTwoData"
    ></CategoriesLevelTwoDialog>
    <!-- 新增第三層商品的 dialog -->
    <!-- v-if 判斷很重要，add 的話，原始的 form 裡面會有一個內定的 level = 3 如果是 edit 的話就要判斷有沒有 _id 這個值 -->
    <CategoriesLevelThreeDialog
      v-if="(formData.level == 3 || formData._id) && allUserNameId[0]"
      :dialog="categoriesLevelThreeDialog"
      :formData="formData"
      :categoriesLevelOneData="categoriesLevelOneData"
      :categoriesLevelTwoData="categoriesLevelTwoData"
      :allUserNameId="allUserNameId"
      @update="getCategoriesLevelThreeData"
    ></CategoriesLevelThreeDialog>
  </div>
</template>

<script>
import CategoriesLevelOneDialog from '../../components/CategoriesManager/CategoriesLevelOneDialog'
import CategoriesLevelTwoDialog from '../../components/CategoriesManager/CategoriesLevelTwoDialog'
import CategoriesLevelThreeDialog from '../../components/CategoriesManager/CategoriesLevelThreeDialog-1'
import { MessageBox } from 'element-ui'

export default {
  name: 'categories-manager',
  data() {
    return {
      // 增加利潤與數量使用的資料
      temporary: {},

      // 管理分頁的物件
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [1, 2, 3, 4, 5, 7, 8, 9, 10] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      search: '', // 表格搜尋的值
      tableData: [], // 表格的資料
      choiceLevelTwoValue: [], // cascader 選擇的品項
      levelOneTowOption: [], // 存放第一層與第二層的分類
      allUserNameId: [], // 所有使用者
      categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [], // 開始就先讀取資料庫的數據
      categoriesLevelThreeData: [], // 開始就先讀取資料庫的數據
      materialGroupOptions: [], // 所有的原物料組 第一層 第二層 第三層 拼湊出來的 cascader options
      groupLevelOneData: [],
      groupLevelTwoData: [],
      groupLevelThreeData: [],
      categoriesLevelOneFormData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: '',
        level: 1
      },
      categoriesLevelTwoFormData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: '',
        level: 2,
        level_one_id: ''
      },
      formData: {},
      categoriesLevelThreeFormData: {
        imgs: [],
        level_one_id: '',
        level_two_id: '',
        name: '',
        type: '',
        describe: '',
        level: 0,
        pattern_no: '', // 版型編號
        pattern_download: '', // 雲端下載連結，存放雲端資料夾的網址
        pattern_height: 0,
        pattern_width: 0,
        introduction_video: { label: '', link: '' }, // 商品影片
        salting_on_color_video: { label: '', link: '' }, // 校色影片
        note_one_video: { label: '', link: '' }, // 其它影片(一)
        note_two_video: { label: '', link: '' }, // 其它影片(二)
        last_modify_date: new Date(),
        last_edit_person: '',
        status: { activated: false, vip: false }, // 啟用？網頁端會看到商品與否，VIP = 客製化商品專屬
        id: '',
        level: 3,
        level_one_id: '',
        tailor_fee: '',
        crop_fee: '',
        quantity_profit: [],
        split_quantity: '',
        mini_order: '',
        outside_layout_width: '',
        outside_layout_height: '',
        outside_cloth_loss: '',
        inside_layout_width: '',
        inside_layout_height: '',
        inside_cloth_loss: '',
        paper_id: '',
        ink_id: '',
        processing_describe: ''
      },
      categoriesLevelOneDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      },
      categoriesLevelTwoDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      },
      categoriesLevelThreeDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      }
      // addMaterialGroupDialog: {
      //   show: false,
      //   title: '建立原料組合',
      //   option: 'edit'
      // }
    }
  },
  components: {
    CategoriesLevelOneDialog,
    CategoriesLevelTwoDialog,
    CategoriesLevelThreeDialog
  },

  created() {
    this.getGroupLevelOneData()
    this.getGroupLevelTwoData()
    this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
    this.getGroupLevelThreeData()
    this.getUserInfo()
  },
  mounted() {
    this.setCascaderOptions()
  },
  watch: {
    // 讀取完 level three data / level one class / level two class
    groupLevelOneData() {
      if (
        !this.groupLevelOneData.length &&
        !this.groupLevelTwoData.length &&
        !this.groupLevelThreeData.length
      )
        return
      this.getMaterialGroupOptions()
    },
    groupLevelTwoData() {
      if (
        !this.groupLevelOneData.length &&
        !this.groupLevelTwoData.length &&
        !this.groupLevelThreeData.length
      )
        return
      this.getMaterialGroupOptions()
    },
    groupLevelThreeData() {
      if (
        !this.groupLevelOneData.length &&
        !this.groupLevelTwoData.length &&
        !this.groupLevelThreeData.length
      )
        return
      this.getMaterialGroupOptions()
    },
    // 如果 level one 跟 level two 都有資料的時候，就更動 cascader 的聯集選擇器
    categoriesLevelTwoData() {
      if (this.categoriesLevelTwoData[0]) {
        this.levelOneTowOption = []
        this.categoriesLevelOneData.forEach((item) => {
          // console.log(index, item.name, item._id)
          let obj = {
            value: '',
            label: '',
            children: []
          }
          obj.value = item._id
          obj.label = item.type + ' ' + item.name
          this.levelOneTowOption.push(obj)
        })

        for (let i = 0; i < this.levelOneTowOption.length; i++) {
          const level_one_id = this.levelOneTowOption[i].value
          this.categoriesLevelTwoData.forEach((item) => {
            if (item.level_one_id === level_one_id) {
              let obj2 = {
                value: '',
                label: ''
              }
              obj2.value = item._id
              obj2.label = item.type + ' ' + item.name
              this.levelOneTowOption[i].children.push(obj2)
            }
          })
        }
      }
      this.getCategoriesLevelThreeData()
    }
  },

  methods: {
    // 刪除 數量 / 利潤 的欄位
    handleDeleteProfit(index, item) {
      console.log(index, item)
      item.splice(index, 1)
    },
    //
    quantityProfitChange(value) {
      console.log(value)
    },
    // 增加數量與利潤
    handleAddProfit(row) {
      if (row.quantity_profit.length > 11) {
        this.$message({
          message: '最多只能有12個！',
          type: 'success'
        })
        return
      }
      const obj = {
        quantity: '1000',
        profit: '40'
      }
      row.quantity_profit.push(obj)
      const uploadFormData = {
        level: 3,
        quantity_profit: row.quantity_profit
      }
      const url = `edit/${row._id}`
      console.log(row.quantity_profit)

      this.$axios
        .post(`/api/categories/${url}`, uploadFormData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '更新數量與利潤成功！',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>CategoriesManager.vue==>', err)
        })
    },
    // 更新增加數量與利潤到資料庫裏面
    handleUpdateProfir(row) {
      const uploadFormData = {
        level: 3,
        quantity_profit: row.quantity_profit
      }
      const url = `edit/${row._id}`
      this.$axios
        .post(`/api/categories/${url}`, uploadFormData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '更新數量與利潤成功！',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>CategoriesManager.vue==>', err)
        })
    },
    // 取得 group member option ， 當讀取 group one two three 都完成的時候，才取得 cascader option 的資料
    getMaterialGroupOptions() {
      console.log('被觸發了')
      this.materialGroupOptions = []
      this.groupLevelOneData.forEach((item) => {
        // console.log(index, item.name, item._id)
        let obj = {
          value: '',
          label: '',
          children: []
        }
        obj.value = item._id
        obj.label = item.type + ' ' + item.name
        this.materialGroupOptions.push(obj)
      })

      for (let i = 0; i < this.materialGroupOptions.length; i++) {
        const level_one_id = this.materialGroupOptions[i].value
        this.groupLevelTwoData.forEach((item) => {
          if (item.level_one_id === level_one_id) {
            let obj2 = {
              value: '',
              label: '',
              children: []
            }
            obj2.value = item._id
            obj2.label = item.type + ' ' + item.name
            this.materialGroupOptions[i].children.push(obj2)
          }
        })
        for (let j = 0; j < this.materialGroupOptions[i].children.length; j++) {
          const level_two_id = this.materialGroupOptions[i].children[j].value
          this.groupLevelThreeData.forEach((item) => {
            if (item.level_two_id === level_two_id) {
              let obj3 = {
                value: '',
                label: ''
              }
              obj3.value = item._id
              obj3.label = item.type + ' ' + item.name
              this.materialGroupOptions[i].children[j].children.push(obj3)
            }
          })
        }
      }
    },

    // ********************* 讀取 material group *********************
    getGroupLevelOneData() {
      this.$axios
        .get('/api/material-group/one/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelOneData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // @emit('update) 來這邊取得第二層的資料
    getGroupLevelTwoData() {
      this.$axios
        .get('/api/material-group/two/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelTwoData = res.data
          // 設置分頁數據 如果是子組件的話，不需要這邊重新整理更新頁面
          // 子組件裡面會有一個 watch 去觀察資料，如果有異動了 setPagination 會在那邊觸發
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getGroupLevelThreeData() {
      this.$axios
        .get('/api/material-group/three/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelThreeData = res.data
          // 設置分頁數據 如果是子組件的話，不需要這邊重新整理更新頁面
          // 子組件裡面會有一個 watch 去觀察資料，如果有異動了 setPagination 會在那邊觸發
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // ********************* 讀取 material group 結束 *********************

    // 當 material group 選擇的內容產生變化的時候，目前沒什麼用途
    onMaterialGroupOptionsChange(row) {
      console.log(row)
    },
    // 點擊更新的時候，把原料組合存到資料庫
    handleUpdateGroupMember(row) {
      const uploadFormData = {
        level: 3,
        material_group: row.material_group
      }
      console.log(uploadFormData)
      const url = `edit/${row._id}`
      this.$axios
        .post(`/api/categories/${url}`, uploadFormData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '更新原料組合成功！',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>CategoriesManager.vue==>', err)
        })
    },
    // 將使用者的 id 轉換成 name
    getUserNameById(id) {
      if (!id) return
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == id) name = item.name
      })
      return name
    },

    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日-HH：mm')
    },
    setCascaderOptions() {
      // ，就讀回來上次的紀錄
      if (
        localStorage.choiceLevelTwoValue &&
        localStorage.choiceLevelOneValue
      ) {
        this.choiceLevelTwoValue[0] = localStorage.choiceLevelOneValue
        this.choiceLevelTwoValue[1] = localStorage.choiceLevelTwoValue
      }
    },

    onOptionsChange(value) {
      // 當分類選擇異動的時候，再重新的撈第三層的商品資料
      localStorage.choiceLevelOneValue = value[0]
      localStorage.choiceLevelTwoValue = value[1]
      this.getCategoriesLevelThreeData()
    },
    // 取得所有使用者的資訊
    getUserInfo() {
      this.$axios
        .get('/api/user/user-info')
        .then((res) => {
          this.allUserNameId = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 一開始就取得 商品分類代號資訊
    getCategoriesLevelOneData() {
      this.$axios
        .get('/api/categories')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelOneData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategoriesLevelTwoData() {
      this.$axios
        .get('/api/categories/two')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelTwoData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 取得第三層的商品資訊，使用選擇到的第二層分類 id ，回傳值忽略掉 imgs 欄位，有需要再另外取得
    getCategoriesLevelThreeData() {
      if (!this.choiceLevelTwoValue[1]) return
      this.$axios
        .get(`/api/categories/three/${this.choiceLevelTwoValue[1]}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelThreeData = [...res.data]
          // 設置分頁數據
          this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 添加一筆新的商品分類代號 TD SS GG ... 等等
    addLevelOne() {
      this.categoriesLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類目錄',
        option: 'add'
      }
    },
    addLevelTwo() {
      this.categoriesLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類目錄',
        option: 'add'
      }
    },
    addLevelThree() {
      this.categoriesLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品',
        option: 'add'
      }
      // 新增，就把要傳到子元件裡面的資料清空，這邊傳到子元件是 formData
      this.formData = Object.assign({}, this.categoriesLevelThreeFormData)
    },
    // 編輯選中的商品資料
    handleEditCategory(index, row) {
      this.categoriesLevelThreeDialog = {
        show: true,
        title: '編輯加第三層的商品',
        option: 'edit'
      }
      // 把 row 裡面的資料深拷貝一份給 formdata 這是是傳到 子元件裡面所需要的屬性
      this.formData = Object.assign({}, row)
      if (typeof row.tailor_fee === 'undefined') this.formData.tailor_fee = ''
      if (typeof row.crop_fee === 'undefined') this.formData.crop_fee = ''
    },
    // 刪除第一層的 class 目前不開放
    handleDeleteCategory(index, row) {
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/categories/delete-level-three/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.getCategoriesLevelTwoData()
              this.setPaginations()
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
      return
    },
    // 分頁設定 **********************************************************************
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.categoriesLevelThreeData.length
      this.my_paginations.page_index = 1
      if (localStorage.categories_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.categories_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.categoriesLevelThreeData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.categories_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.categoriesLevelThreeData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 獲取當前頁面
      let index = this.my_paginations.page_size * (page - 1)
      // 數據的總數
      let nums = this.my_paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.categoriesLevelThreeData[i]) {
          tables.push(this.categoriesLevelThreeData[i])
        }
        this.tableData = tables
      }
    }
    // 分頁設定結束 **********************************************************************
  }
}
</script>

<style scoped>
.customer-manager {
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
}

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
/* 調整 div 容器最大的寬度 */
.cascader-wrap {
  float: left;
  margin: 0 15px 0 0;
  padding: 0;
  width: 300px;
}

/* 直接調整 el-cascader 沒有用，因為外面套了一個 div 該 class 為 .el-cascader--mini */
.el-cascader--mini {
  width: 100% !important;
}
.pagination {
  text-align: left;
  margin-top: 3px;
}

.group-cascader {
  float: left;
  margin: 0;
  padding: 0;
  width: 300px;
}
.group-btn {
  float: left;
  margin-top: 4px;
  padding: 0;
  width: 70px;
}
.el-header.profit-btn-wrap {
  margin: 0;
  padding: 5px;
  height: 33px !important;
  line-height: 28px;
  background-color: rgb(239, 236, 250);
}

.my-percentage-div {
  margin: 0;
  padding: 0;
  height: 28px !important;
  line-height: 28px;
  float: left;
  width: 52px;
}

.el-main {
  width: 1000px;
  height: 128px;
  padding: 5px;
  margin: 0;
  background-color: rgb(239, 236, 250);
}

.profit-wrap {
  width: 80px;
  height: 128;
  float: left;
}

.my-input {
  height: 40px;
  width: 72px;
  line-height: 40px;
  float: left;
  margin-bottom: 6px;
}

.el-input__inner {
  height: 28px;
  text-align: center;
}

.profit-btn {
  float: left;
  margin-left: 1px;
  margin-top: 10px;
  width: 70px;
  height: 28px;
}
</style>
