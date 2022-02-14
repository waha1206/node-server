<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
      top="40px"
      ><el-container>
        <!-- :mmodel 綁定的會是 data return 裡面的某個物件 這邊綁定的是 levelOneData -->
        <el-form
          ref="levelThreeForm"
          :model="levelThreeFormData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto"
        >
          <el-form-item label="顯示頁面：" prop="switch" label-width="120px" class="switch">
            <el-switch v-model="levelThreeFormData.switch" active-text="優惠商品/新品專區" inactive-text="商品目錄">
            </el-switch
          ></el-form-item>
          <el-container v-show="!levelThreeFormData.switch">
            <el-header height="auto">
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="8"
                  ><div class="grid-content">
                    <el-form-item label="先選擇大分類：" size="mini" prop="level_one_id" label-width="120px">
                      <!-- v-model 通常會指定到 formData (要提交的表單) 裡面的某個屬性 這邊是再 data return 裡面的 levelThreeData.level_one_id -->
                      <el-select
                        v-model="levelThreeFormData.level_one_id"
                        placeholder="請選擇"
                        filterable
                        @change="levelOneChang"
                        size="mini"
                      >
                        <!-- value 這邊綁定的是此 陣列裡面，要傳給 select v-mode 的值 -->
                        <!-- label 就單純的顯示再 input 上面可以看到的文字 -->
                        <el-option
                          v-for="(item, index) in categoriesLevelOneData"
                          :key="index"
                          :label="item.name"
                          :value="item._id"
                        >
                          <span style="float: left">{{ item.type }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div></el-col
                >
                <!-- 第二層的下拉選單 -->
                <!-- ********************* 兩種做法，1.第二個選擇欄位獨立出去  *********************-->
                <!-- ********************* 兩種做法，2.v-if 去判斷資料要不要顯示出來  *********************-->
                <el-col :span="8"
                  ><div class="grid-content">
                    <el-form-item label="選擇中分類：" size="mini" prop="level_two_id" label-width="120px">
                      <!-- 可複選的 select 要加入這三個屬性 allow-create default-first-option multiple -->
                      <!-- v-model="levelThreeFormData.level_two_id" -->
                      <el-select
                        v-model="levelThreeFormData.level_two_id"
                        placeholder="請選擇"
                        filterable
                        @change="levelTwoChang"
                        size="mini"
                      >
                        <el-option
                          v-for="(citem, cindex) in updateLevelTwoData"
                          :key="citem._id"
                          :label="citem.name"
                          :value="citem._id"
                        >
                          <span style="float: left">{{ citem.type }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ citem.name }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div></el-col
                >
                <!-- 輸入商品名稱 -->
                <el-col :span="8">
                  <div class="grid-content">
                    <el-form-item label="商品名稱：" size="mini" label-width="120px" prop="name">
                      <el-input placeholder="造型圓形側背包" type="name" v-model="levelThreeFormData.name"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <!-- 第二行開始，備註說明 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item label="備註說明：" size="mini" label-width="120px" prop="describe">
                      <el-input
                        placeholder="(無耳朵)直徑約25x厚7公分(外口袋+8吋拉鍊內口袋)-仿帆布10安造型圓形側背包(轉印仿帆布10安內裡)(轉印可調背帶2.5X150公分)(10吋)50個"
                        type="name"
                        v-model="levelThreeFormData.describe"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 第三行開始，加工說明 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item label="加工說明：" size="mini" label-width="120px" prop="processing_describe">
                      <el-input
                        placeholder="給自己人看的加工說明"
                        type="name"
                        v-model="levelThreeFormData.processing_describe"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 第四行開始，商品編號，商品狀態 啟用/VIP ，NEW，HOT-->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="商品編號：" size="mini" label-width="120px" prop="type">
                      <el-input type="type" placeholder="0001 (四碼)" v-model="levelThreeFormData.type"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div class="grid-content">
                    <el-form-item label="商品狀態：" size="mini" label-width="120px" prop="status.activated">
                      <el-checkbox v-model="levelThreeFormData.status.activated">啟用</el-checkbox>
                      <el-checkbox v-model="levelThreeFormData.status.vip">VIP</el-checkbox>
                      <el-checkbox v-model="levelThreeFormData.status.new">NEW</el-checkbox>
                      <el-checkbox v-model="levelThreeFormData.status.hot">HOT</el-checkbox>
                      <el-checkbox v-model="levelThreeFormData.status.discount">優惠</el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <el-form-item label="商品特色：" size="mini" label-width="120px" prop="feature">
                      <el-input type="type" placeholder="最多10個字" v-model="levelThreeFormData.feature"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <!-- 第五行開始，商品介紹影片，校色影片-->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="影片名稱：" size="mini" label-width="120px" prop="introduction_video.label">
                      <el-input
                        type="type"
                        placeholder="零錢包的製作影片"
                        v-model="levelThreeFormData.introduction_video.label"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="影片連結：" size="mini" label-width="120px" prop="introduction_video.link">
                      <el-input
                        type="type"
                        placeholder="https://youtu.be/Olm_oOCY_2Y"
                        v-model="levelThreeFormData.introduction_video.link"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item
                      label="布料校色："
                      size="mini"
                      label-width="120px"
                      prop="salting_on_color_video.label"
                    >
                      <el-input
                        type="type"
                        placeholder="布料校色"
                        v-model="levelThreeFormData.salting_on_color_video.label"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="校色連結：" size="mini" label-width="120px" prop="salting_on_color_video.link">
                      <el-input
                        type="type"
                        placeholder="https://youtu.be/Olm_oOCY_2Y"
                        v-model="levelThreeFormData.salting_on_color_video.link"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 第六行開始，其他影片(一)，其他影片(二)-->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="其它(一)：" size="mini" label-width="120px" prop="note_one_video.label">
                      <el-input
                        type="type"
                        placeholder="影片(一)"
                        v-model="levelThreeFormData.note_one_video.label"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="連結(一)：" size="mini" label-width="120px" prop="note_one_video.link">
                      <el-input
                        type="type"
                        placeholder="https://youtu.be/Olm_oOCY_2Y"
                        v-model="levelThreeFormData.note_one_video.link"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="其它(二)：" size="mini" label-width="120px" prop="note_two_video.label">
                      <el-input
                        type="type"
                        placeholder="影片(二)"
                        v-model="levelThreeFormData.note_two_video.label"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="連結(二)：" size="mini" label-width="120px" prop="note_two_video.link">
                      <el-input
                        type="type"
                        placeholder="https://youtu.be/Olm_oOCY_2Y"
                        v-model="levelThreeFormData.note_two_video.link"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <!-- 第6.5行開始，購買樣品，最後修改時間，最後修改人員 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="購買樣品：" size="mini" label-width="120px" prop="sample_order.name">
                      <el-input
                        type="type"
                        placeholder="購買樣品"
                        v-model="levelThreeFormData.sample_order.name"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="販售網址：" size="mini" label-width="120px" prop="sample_order.url">
                      <el-input
                        type="type"
                        placeholder="https://youtu.be/Olm_oOCY_2Y"
                        v-model="levelThreeFormData.sample_order.url"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="最後修改時間：" size="mini" label-width="120px" prop="">
                      <el-input type="" v-model="getDate" :readonly="true"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="最後修改人員：" size="mini" label-width="120px" prop="">
                      <el-input type="" v-model="getUserNameById" :readonly="true"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <!-- 第七行開始，版型編號-->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="8">
                  <div class="grid-content">
                    <el-form-item label="版型編號：" size="mini" label-width="120px" prop="pattern_no">
                      <el-input
                        type="type"
                        placeholder="版型編號範例尚未制定"
                        v-model="levelThreeFormData.pattern_no"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item label="版型下載：" size="mini" label-width="120px" prop="pattern_free">
                      <el-checkbox v-model="levelThreeFormData.pattern_free">允許下載</el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="grid-content">
                    <el-form-item label="版型下載：" size="mini" label-width="120px" prop="pattern_download">
                      <el-input
                        type="type"
                        placeholder="雲端的下載連結網址，通常是一個google雲端目錄"
                        v-model="levelThreeFormData.pattern_download"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <!-- 第八行開始，平車費用，裁切費用-->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="平車費用" size="mini" label-width="120px" prop="tailor_fee">
                      <my-currency-input
                        :height="24"
                        :width="130"
                        :isReadyOnly="false"
                        type="tailor_fee"
                        v-model="tailorFee"
                      ></my-currency-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="裁切費用：" size="mini" label-width="120px" prop="crop_fee">
                      <my-currency-input
                        :height="24"
                        :width="130"
                        :isReadyOnly="false"
                        type="crop_fee"
                        v-model="cropFee"
                      ></my-currency-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item label="拆圖數量：" size="mini" label-width="120px" prop="split_quantity">
                      <el-input
                        type="type"
                        placeholder="可拆圖的最低數量"
                        v-model="levelThreeFormData.split_quantity"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item label="最低訂量：" size="mini" label-width="120px" prop="mini_order">
                      <el-input
                        type="type"
                        placeholder="商品的最低訂購量"
                        v-model="levelThreeFormData.mini_order"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item label="打樣：" size="mini" label-width="60px" prop="disable_proofing">
                      <el-checkbox v-model="levelThreeFormData.disable_proofing">不允許打樣</el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 第九行開始，外表布寬，高，內裡布寬，高 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="4" style="position:relative">
                  <!-- style="position:relative;border-radius:8px" -->
                  <div @click="handleCalculationLayout">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="試算版型耗損率"
                      placement="right"
                      style="z-index:2000"
                    >
                      <el-badge
                        value="試算"
                        class="item"
                        style="margin-top: 0px;margin-right: 0px;position:absolute;top:0px;right:-40px"
                      >
                      </el-badge>
                    </el-tooltip>
                  </div>
                  <el-form-item prop="outside_layout_width" label="外表布寬：">
                    <el-input
                      style="width:60px"
                      placeholder="寬度"
                      size="mini"
                      type="type"
                      v-model="levelThreeFormData.outside_layout_width"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="outside_layout_height" label="外表布高：">
                    <el-input
                      style="width:60px"
                      placeholder="高度"
                      size="mini"
                      type="type"
                      v-model="levelThreeFormData.outside_layout_height"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="product_profit" label="表布耗損：">
                    <my-percentage-input
                      :isReadyOnly="false"
                      :width="34"
                      :height="24"
                      type=""
                      v-model="outsideClothLoss"
                    ></my-percentage-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="inside_layout_width" label="內裡布寬：">
                    <el-input
                      style="width:60px"
                      placeholder="寬度"
                      size="mini"
                      type="type"
                      v-model="levelThreeFormData.inside_layout_width"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="inside_layout_height" label="內裡布高：">
                    <el-input
                      style="width:60px"
                      placeholder="高度"
                      size="mini"
                      type="type"
                      v-model="levelThreeFormData.inside_layout_height"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="product_profit" label="裡布耗損：">
                    <my-percentage-input
                      :isReadyOnly="false"
                      :width="34"
                      :height="24"
                      type=""
                      v-model="insideClothLoss"
                    ></my-percentage-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第九行結束 -->

              <!-- 第十行 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6" style="position:relative">
                  <!-- style="position:relative;border-radius:8px" -->
                  <div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="運費為必選欄位"
                      placement="right"
                      style="z-index:2000"
                    >
                      <el-badge
                        value="help"
                        class="item"
                        style="margin-top: 0px;margin-right: 0px;position:absolute;top:0px;right:30px"
                      >
                      </el-badge>
                    </el-tooltip>
                  </div>
                  <el-form-item prop="delivery_id" label="運費：">
                    <el-button
                      v-if="delivery"
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectDeliveryOrCarton('delivery')"
                      >{{ delivery }}</el-button
                    >
                    <el-button
                      v-else
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectDeliveryOrCarton('delivery')"
                      >運費尚未選擇</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="position:relative">
                  <!-- style="position:relative;border-radius:8px" -->
                  <div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="紙箱為必選欄位"
                      placement="right"
                      style="z-index:2000"
                    >
                      <el-badge
                        value="help"
                        class="item"
                        style="margin-top: 0px;margin-right: 0px;position:absolute;top:0px;right:0px"
                      >
                      </el-badge>
                    </el-tooltip>
                  </div>
                  <el-form-item prop="carton_id" label="紙箱：">
                    <el-button
                      v-if="carton"
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectDeliveryOrCarton('carton')"
                      >{{ carton }}</el-button
                    >
                    <el-button
                      v-else
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectDeliveryOrCarton('carton')"
                      >紙箱尚未選擇</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="建議售價：" size="mini" label-width="120px" prop="selling_price">
                      <el-input
                        type="type"
                        placeholder="建議市售價"
                        v-model="levelThreeFormData.selling_price"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-form-item label="簡易規格：" size="mini" label-width="120px" prop="specification">
                      <el-input
                        type="type"
                        placeholder="9公分*20公分"
                        v-model="levelThreeFormData.specification"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 第十行結束 -->

              <!-- 第十一行  style="margin-bottom:-90px" 讓下面的商品圖片往上移動-->
              <el-row :gutter="20" type="flex" class="row-bg" style="margin-bottom:-180px">
                <el-col :span="6"
                  ><div class="grid-content ">
                    <el-form-item prop="typesetting" label="智慧排版：" label-width="110px">
                      <!-- @change="handleTypesettingChange" -->
                      <el-switch v-model="levelThreeFormData.typesetting" active-text="啟用" inactive-text="禁用">
                      </el-switch>
                    </el-form-item></div
                ></el-col>
                <el-col :span="8" style="position:relative">
                  <!-- style="position:relative;border-radius:8px" -->
                  <div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="轉印紙為必選欄位"
                      placement="right"
                      style="z-index:2000"
                    >
                      <el-badge
                        value="help"
                        class="item"
                        style="margin-top: 0px;margin-right: 0px;position:absolute;top:0px;right:30px"
                      >
                      </el-badge>
                    </el-tooltip>
                  </div>
                  <el-form-item prop="paper_id" label="轉印紙：">
                    <el-button
                      v-if="paper"
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectPaperOrInk('paper')"
                      >{{ paper }}</el-button
                    >
                    <el-button v-else type="primary" size="mini" class="button" @click="handleSelectPaperOrInk('paper')"
                      >轉印紙尚未選擇</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="position:relative">
                  <!-- style="position:relative;border-radius:8px" -->
                  <div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="墨水為必選欄位"
                      placement="right"
                      style="z-index:2000"
                    >
                      <el-badge
                        value="help"
                        class="item"
                        style="margin-top: 0px;margin-right: 0px;position:absolute;top:0px;right:30px"
                      >
                      </el-badge>
                    </el-tooltip>
                  </div>
                  <el-form-item prop="ink_id" label="輸出墨水：">
                    <el-button
                      v-if="ink"
                      type="primary"
                      size="mini"
                      class="button"
                      @click="handleSelectPaperOrInk('ink')"
                      >{{ ink }}</el-button
                    >
                    <el-button v-else type="primary" size="mini" class="button" @click="handleSelectPaperOrInk('ink')"
                      >輸出墨水尚未選擇</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第十一行結束 -->
            </el-header></el-container
          >
          <el-container v-show="levelThreeFormData.switch" style="height:200px">
            <el-header height="auto">
              <!-- 優惠活動開始日期 優惠活動結束日期 -->
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="8">
                  <div class="grid-content">
                    <el-form-item label="優惠活動開始：" prop="" label-width="120px">
                      <el-date-picker
                        v-model="levelThreeFormData.start_date_of_discount"
                        type="date"
                        size="mini"
                        placeholder="選擇日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <el-form-item label="優惠活動結束：" prop="" label-width="120px">
                      <el-date-picker
                        v-model="levelThreeFormData.end_date_of_discount"
                        type="date"
                        size="mini"
                        placeholder="選擇日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 優惠活動描述 levelThreeFormData.sales_event_description  -->
              <el-row :gutter="20" type="flex" class="row-bg" style="height:36%">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item label="優惠活動說明：" prop="" label-width="120px">
                      <el-input
                        type="textarea"
                        placeholder="請輸入優惠活動說明"
                        v-model="levelThreeFormData.sales_event_description"
                        :rows="3"
                        maxlength="120"
                        show-word-limit
                        style="margin-top:8px"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 新品說明或是商品完整描述 levelThreeFormData.new_product_description  -->
              <el-row :gutter="20" type="flex" class="row-bg" style="height:40%; ">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item label="新品說明：" prop="" label-width="120px">
                      <el-input
                        type="textarea"
                        placeholder="請輸入新品介紹，也是一般商品的詳細說明"
                        v-model="levelThreeFormData.new_product_description"
                        :rows="3"
                        maxlength="120"
                        show-word-limit
                        style="margin-top:8px"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item label="新品(banner)：" label-width="120px" prop="">
                      <UploadBannerImgs
                        :bannerFiles="getBannerFiles"
                        @updateAddBannerImgs="updateAddBannerImgs"
                        @updateRemoveBannerImgs="updateRemoveBannerImgs"
                      ></UploadBannerImgs>
                    </el-form-item></div
                ></el-col>
              </el-row>
            </el-header>
          </el-container>
          <!-- 第十二行開始，圖片上傳 -->
          <!-- 圖片上傳的教學 https://segmentfault.com/a/1190000013796215 -->
          <!-- 上傳一張照片的時候隱藏 後面的 + 框框  https://www.twblogs.net/a/5b81a49e2b71772165ad9752 -->
          <!-- 另外一種做法：https://blog.csdn.net/zaocha321/article/details/103345423 -->
          <el-main>
            <!-- <div class="image-warp"> -->
            <!-- :data="uploadData"
						action="#" 上傳的網址，應該是自動上傳使用的吧-->
            <el-form-item label="商品圖片：" size="mini" label-width="120px" prop="describe" style="margin-top:190px">
              <div class="upload-wrap">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  accept="image/jpeg,image/gif,image/png"
                  multiple
                  :limit="6"
                  :file-list="files"
                  :on-change="onFileChange"
                >
                  <el-dialog :visible.sync="dialogVisible" append-to-body width="520px">
                    <img width="480px" height="480px" fit="contain" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                  <i slot="default" class="el-icon-plus"></i>
                  <div class="image-content" slot="file" slot-scope="{ file }">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-download" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                      </span>
                      <!-- v-if="!disabled" -->
                      <span class="el-upload-list__item-delete" @click="handleRemove(file, files)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </div>
            </el-form-item>
            <!-- </div> -->
          </el-main>
          <!-- 第十二行結束 -->

          <!-- 取消、提交、重置 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <!-- 這裡有個問題點，沒有清除浮動 -->
            <el-col :span="24">
              <div class="grid-content">
                <el-form-item class="text_right" label-width="110px" style="margin-top:10px">
                  <el-button type="warning" @click="dialog.show = false">取消</el-button>
                  <el-button type="primary" @click="onSubmit('levelThreeForm')">提交</el-button>
                  <el-button @click="resetForm('levelThreeForm')">重置</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表單結束 -->
      </el-container>
    </el-dialog>
    <PaperAndInk :dialog="paperAndInkDialog" @update="updatePaperAndInk"> </PaperAndInk>
    <DeliveryAndCarton :dialog="deliveryAndCartonDialog" @update="updateDeliveryAndCarton"> </DeliveryAndCarton>
    <CalLayoutDialog :dialog="calLayoutDialog"></CalLayoutDialog>
  </div>
</template>

<script>
import PaperAndInk from '../../components/CategoriesManager/PaperAndInk'
import CalLayoutDialog from '../../components/CategoriesManager/CalLayoutDialog'
import DeliveryAndCarton from '../../components/CategoriesManager/DeliveryAndCarton.vue'
import UploadBannerImgs from './UploadBannerImgs.vue'
import { isEmpty } from '../../utils/tools'
import { Message } from 'element-ui'

export default {
  name: 'categories-level-three-dialog',
  props: {
    dialog: Object,
    // 父元件傳到子元件的屬性，不能編輯他，如果要編輯，要使用 $emit
    formData: Object,
    allUserNameId: Array,
    categoriesLevelOneData: Array,
    categoriesLevelTwoData: Array
  },
  components: { PaperAndInk, CalLayoutDialog, DeliveryAndCarton, UploadBannerImgs },
  data() {
    return {
      calLayoutDialog: {
        show: false,
        title: '試算版型尺寸'
      },
      paperAndInkDialog: {
        show: false,
        title: '選擇轉印紙或墨水',
        option: '' // paper 是紙類  ink 是墨水類
      },
      deliveryAndCartonDialog: {
        show: false,
        title: '選擇運費或紙箱',
        option: '' // delivery 是運費  carton 是紙箱
      },
      levelThreeFormData: {},
      dontRemove: '5fd54071cbcb7757640a7ee7',
      // 圖片上傳
      uploadData: {
        dataType: '0',
        oldFilePath: ''
      },
      files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      bannerFiles: [],
      tailorFee: 0,
      cropFee: 0,
      updateLevelTwoData: [],
      outsideClothLoss: 0,
      insideClothLoss: 0,
      paper: '', // 選擇的 轉印紙
      ink: '', // 選擇的 墨水
      delivery: '', // 選擇的運費 _id
      carton: '', // 選擇的紙箱
      form_rules: {
        ink_id: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        paper_id: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        delivery_id: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        carton_id: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.levelThreeFormData = Object.assign({}, this.formData)
    if (this.levelThreeFormData.paper_id) {
      this.getMaterialNameById(this.levelThreeFormData.paper_id, 'paper')
    }
    if (this.levelThreeFormData.ink_id) {
      this.getMaterialNameById(this.levelThreeFormData.ink_id, 'ink')
    }
    if (this.levelThreeFormData.delivery_id) {
      this.getMaterialNameById(this.levelThreeFormData.delivery_id, 'delivery')
    }
    if (this.levelThreeFormData.carton_id) {
      this.getMaterialNameById(this.levelThreeFormData.carton_id, 'carton')
    }
    this.getImgs()
  },
  mounted() {
    // 這一行很重要，當子元件一啟動，就會先執行一次，然後接下來要去 watch 觀察 dialog 的變化，
    // 要是有資料流進來，就會重新把 updateLevelTwoData
    // 嘿嘿
    this.levelOneChang(this.levelThreeFormData.level_one_id)
    // 如果是要新增商品，就把 el-upload 裡面的圖片資料清空，這邊做第一次近來的初始化，接下來透過 watch this.dialog 去做監控與更新
    if (this.dialog.option === 'add') this.files = []
    // 舊資料裡面的 tailor_fee 跟 crop_frr 有可能是 undefined 所以在父元件的時候就處理掉 handleEditCategory 裡面去處理
    this.setFee(
      this.formData.tailor_fee,
      this.formData.crop_fee,
      this.formData.outside_cloth_loss,
      this.formData.inside_cloth_loss
    )
  },
  computed: {
    getBannerFiles() {
      return this.bannerFiles
    },
    getDate() {
      if (!this.levelThreeFormData) return '目前沒有修改過'
      return this.$moment(this.levelThreeFormData.last_modify_date).format('YYYY年MM月DD日-HH:mm')
    },
    getUserNameById() {
      if (!this.levelThreeFormData.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.levelThreeFormData.last_edit_person) name = item.name
      })
      return name
    },
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    // 觀察 tailor_fee 跟 crop_fee 當變化的時候就更新到表單裡面 this.levelThreeFormData
    tailorFee(newValue) {
      this.levelThreeFormData.tailor_fee = String(newValue)
    },
    cropFee(newValue) {
      this.levelThreeFormData.crop_fee = String(newValue)
    },
    // 當 props dialog 有新的 資料進來 (這邊是點擊【編輯】 的時候會觸發) 然後更新 Imgs 但是第一次還是要掛載於 created() 裡面喔
    dialog() {
      // 如果是要新增商品，就把 el-upload 裡面的圖片資料清空，mounted 執行過後，每次監控，透過 watch this.dialog 去做判斷要不要清空 files[]
      if (this.dialog.option === 'add') {
        this.files = []
        this.formData.imgs = []
      }

      // 父元素 就處理好了 formData 如果是 add 就是乾淨的資料，如果是 edit 就是要編輯的資料
      // this.levelThreeFormData = Object.assign({}, this.formData)
      this.levelThreeFormData = this._.cloneDeep(this.formData)

      // 記得要把要編輯的資料裡面的 tailor_fee 跟 crop_fee 存到 tailorFee 跟 cropFee 裡面
      // 因為這兩個欄位是另外的子元件會需要使用到的欄位，而且有被 watch
      // 第一次我們要靠 mounted 去觸發 setFee 第二次開始就會從這邊去做設定 setFee
      this.setFee(
        this.levelThreeFormData.tailor_fee,
        this.levelThreeFormData.crop_fee,
        this.levelThreeFormData.outside_cloth_loss,
        this.levelThreeFormData.inside_cloth_loss
      )
      // 第一次更新 updateLevelTwoData 在 mounted(){} 裡面，這邊是後續每次異動 dialog 都會去更新 updateLevelTwoData
      this.levelOneChang(this.levelThreeFormData.level_one_id)
      // 先清空 ink 跟 paper 欄位   如果傳遞過來的資料有 墨水 id、轉印紙 id 的話，就讀取他的 _id 轉換成 name
      this.ink = ''
      this.paper = ''
      this.delivery = ''
      this.carton = ''
      if (this.levelThreeFormData.paper_id) {
        this.getMaterialNameById(this.levelThreeFormData.paper_id, 'paper')
      }
      if (this.levelThreeFormData.ink_id) {
        this.getMaterialNameById(this.levelThreeFormData.ink_id, 'ink')
      }
      if (this.levelThreeFormData.delivery_id) {
        this.getMaterialNameById(this.levelThreeFormData.delivery_id, 'delivery')
      }
      if (this.levelThreeFormData.carton_id) {
        this.getMaterialNameById(this.levelThreeFormData.carton_id, 'carton')
      }
      this.getImgs()
    },
    updateLevelTwoData() {
      console.log('恩，有變動')
    }
  },
  methods: {
    updateRemoveBannerImgs(index) {
      this.bannerFiles.splice(index, 1)
    },
    // 子元件 bannerImgs 更動
    updateAddBannerImgs(img) {
      this.bannerFiles.push(img)
    },
    // 智慧排版啟用 / 禁止
    // handleTypesettingChange(value) {
    //   this.levelThreeFormData.typesetting = value
    // },
    // 試算版型
    handleCalculationLayout() {
      this.calLayoutDialog.show = true
    },
    // 子元件選擇了哪種 paper or ink  option 會傳回選擇的種類
    updatePaperAndInk(item, option) {
      this.paperAndInkDialog.show = false
      if (option == 'paper') {
        this.levelThreeFormData.paper_id = item._id
        this.getMaterialNameById(item._id, option)
      } else if (option == 'ink') {
        this.levelThreeFormData.ink_id = item._id
        this.getMaterialNameById(item._id, option)
      }
    },
    // 子元件選擇了哪種 delivery or carton  option 會傳回選擇的種類
    updateDeliveryAndCarton(item, option) {
      this.deliveryAndCartonDialog.show = false
      if (option == 'delivery') {
        this.levelThreeFormData.delivery_id = item._id
        this.getMaterialNameById(item._id, option)
      } else if (option == 'carton') {
        this.levelThreeFormData.carton_id = item._id
        this.getMaterialNameById(item._id, option)
      }
    },
    // 取得墨水的中文品名
    getMaterialNameById(id, option) {
      this.$axios
        .get(`/api/material/get-material-name-by-id/${id}`)
        .then((res) => {
          if (option == 'paper') {
            this.paper = res.data.product_name
          } else if (option == 'ink') {
            this.ink = res.data.product_name
          } else if (option == 'delivery') {
            this.delivery = res.data.product_name
          } else if (option == 'carton') {
            this.carton = res.data.product_name
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 選擇轉印紙或墨水
    handleSelectPaperOrInk(option) {
      let title = option == 'paper' ? '請選擇轉印紙' : '請選擇轉印墨水'
      this.paperAndInkDialog = {
        show: true,
        title: title,
        option: option
      }
    },
    // 選擇運費或紙箱
    handleSelectDeliveryOrCarton(option) {
      let title = option == 'delivery' ? '請選擇運費' : '請選擇紙箱尺寸'
      this.deliveryAndCartonDialog = {
        show: true,
        title: title,
        option: option
      }
    },
    // 當這個元件被觸發的時候，要更新一些束值
    setFee(tailorFee, cropFee, outsideClothLoss, insideClothLoss) {
      // isNaN 判斷這個數值是否可以被轉換成數字
      if (isNaN(tailorFee)) {
        this.tailorFee = 0
      } else {
        this.tailorFee = Number(tailorFee)
      }
      if (isNaN(cropFee)) {
        this.tailorFee = 0
      } else {
        this.cropFee = Number(cropFee)
      }
      if (isNaN(outsideClothLoss)) {
        this.outsideClothLoss = 0
      } else {
        this.outsideClothLoss = Number(outsideClothLoss)
      }
      if (isNaN(insideClothLoss)) {
        this.insideClothLoss = 0
      } else {
        this.insideClothLoss = Number(insideClothLoss)
      }
    },
    // 把從資料庫讀進來的 Imgs (base64) 拼接成 el-upload 的 files 可以接受的格式，這樣就會顯示出來了
    getImgs() {
      this.files = []
      // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
      // base64toBlob 超強範例！
      // 編輯商品的時候，要拚接 base64 格式與檔頭，然後 push 到 this.files 裡面會有一個內定的 下面是出處
      // https://blog.csdn.net/hequhecong10857/article/details/108276022
      // 秀出圖片
      // this.dialogImageUrl = obj.url
      // this.dialogVisible = true
      if (this.levelThreeFormData.imgs.length > 0) {
        this.levelThreeFormData.imgs.forEach((img) => {
          // params[0] 裡面是檔案格式
          // params[1] 裡面是 base64
          const params = img.split(',')
          let obj = {
            name: '商品照片',
            url: 'data:image/jpeg;base64,' + params[1]
          }
          this.files.push(obj)
        })
      }
      // 如果 banner_imgs 沒有資料 undefined 就帶入空陣列
      this.bannerFiles = this.levelThreeFormData.banner_imgs || []
    },
    // 第一層被選中後，就會去更新第二層的資料
    levelOneChang(id) {
      if (id) {
        this.updateLevelTwoData = this.categoriesLevelTwoData.filter((item) => {
          return item.level_one_id === id
        })
      } else {
        this.updateLevelTwoData = []
      }
    },
    levelTwoChang() {
      console.log('categoriesThreeDialog第二層選項備呼叫惹')
    },
    // 提交表單 add / edit
    onSubmit(formName) {
      // add 的時候，如果是 edit 要改
      // dialog 發生變化的時候 (使用 watch 觀察) 就會把 levelThreeFormData 的內容清空或是設定好
      // 關於 tailor_fee 跟 crop_fee 的數字，也是使用 watch 去觀察跟設定到 levelThreeFoemData 裡面
      const uploadFormData = {
        typesetting: this.levelThreeFormData.typesetting,
        processing_describe: this.levelThreeFormData.processing_describe,
        ink_id: this.levelThreeFormData.ink_id,
        paper_id: this.levelThreeFormData.paper_id,
        delivery_id: this.levelThreeFormData.delivery_id,
        carton_id: this.levelThreeFormData.carton_id,
        outside_cloth_loss: String(this.outsideClothLoss),
        outside_layout_width: this.levelThreeFormData.outside_layout_width,
        outside_layout_height: this.levelThreeFormData.outside_layout_height,
        inside_cloth_loss: String(this.insideClothLoss),
        inside_layout_width: this.levelThreeFormData.inside_layout_width,
        inside_layout_height: this.levelThreeFormData.inside_layout_height,
        name: this.levelThreeFormData.name,
        level_one_id: this.levelThreeFormData.level_one_id,
        level_two_id: this.levelThreeFormData.level_two_id,
        describe: this.levelThreeFormData.describe,
        type: this.levelThreeFormData.type,
        level: this.levelThreeFormData.level,
        imgs: this.levelThreeFormData.imgs.join('|'),
        last_modify_date: new Date(),
        last_edit_person: this.user.id,
        status: Object.assign({}, this.levelThreeFormData.status),
        pattern_no: this.levelThreeFormData.pattern_no,
        pattern_free: this.levelThreeFormData.pattern_free,
        pattern_download: this.levelThreeFormData.pattern_download,
        tailor_fee: this.levelThreeFormData.tailor_fee,
        crop_fee: this.levelThreeFormData.crop_fee,
        split_quantity: this.levelThreeFormData.split_quantity,
        mini_order: this.levelThreeFormData.mini_order,
        feature: this.levelThreeFormData.feature,
        selling_price: this.levelThreeFormData.selling_price,
        specification: this.levelThreeFormData.specification,
        switch: this.levelThreeFormData.switch,
        start_date_of_discount: this.levelThreeFormData.start_date_of_discount,
        end_date_of_discount: this.levelThreeFormData.end_date_of_discount,
        sales_event_description: this.levelThreeFormData.sales_event_description,
        introduction_video: Object.assign({}, this.levelThreeFormData.introduction_video),
        salting_on_color_video: Object.assign({}, this.levelThreeFormData.salting_on_color_video),
        note_one_video: Object.assign({}, this.levelThreeFormData.note_one_video),
        note_two_video: Object.assign({}, this.levelThreeFormData.note_two_video),
        sample_order: Object.assign({}, this.levelThreeFormData.sample_order),
        banner_imgs: this.bannerFiles.length > 0 ? this.bannerFiles.join('|') : [], // 如果圖片都除除乾淨，就給空數組
        disable_proofing: this.levelThreeFormData.disable_proofing,
        new_product_description: this.levelThreeFormData.new_product_description
      }

      if (uploadFormData.carton_id == undefined || uploadFormData.delivery_id == undefined) {
        this.$message({
          message: '紙箱跟運費欄位必填！',
          type: 'error'
        })
        return
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          uploadFormData.level = 3
          if (uploadFormData.level_one_id === this.dontRemove) {
            this.$message('請重新選擇第一層分類，您不能選擇全部分類')
            return
          }
          const url = this.dialog.option == 'add' ? 'add' : `edit/${this.levelThreeFormData._id}`
          this.$axios
            .post(`/api/categories/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.dialog.show = false
              //  提交資料到資料庫後，清空前端的圖片 levelThreeFormData.imgs = [] 下面的圖片資料清空
              this.levelThreeFormData.imgs = []
              this.files = []
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    },
    // 新增第三層商品裡面，清空所有欄位的按鍵，當然，包含了圖片
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // 清空圖片
      this.files = []
      this.levelThreeFormData.imgs = []
      this.levelThreeFormData.status.vip = false
      this.levelThreeFormData.status.new = false
      this.levelThreeFormData.status.hot = false
    },
    // 圖片移除的 function
    handleRemove(file, fileList) {
      let _index = 0
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.files.splice(index, 1) //移除数组中要删除的图片
          _index = index
        }
      }
      // 如果是 edit 狀態的話，要把 this.levelThreeFormData 中的 imgs 也移除掉
      // if (this.dialog.option !== 'edit') return

      this.levelThreeFormData.imgs.splice(_index, 1)
    },
    // 跳出預覽圖片預覽視窗
    // https://www.codeleading.com/article/29861991468/
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 過濾跟移除掉超過檔案限制的檔案
    // https://www.jianshu.com/p/840601098d88
    onFileChange(file, fileList) {
      const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      // 小於 1M 的檔案是 1024 / 1024  這裡設定小於50k ==> 1024 / 50
      // const isLt1M = file.size / 1024 / 1024 < 1
      const isLt50K = file.size / 1024 / 50 < 1
      if (!isIMAGE) {
        this.$message.error('只能上傳jpg/png圖片!')
        return false
      }
      if (!isLt50K) {
        this.$message.error('上傳文件大小不能超過 50KB!')
        for (let index = 0; index < fileList.length; index++) {
          if (fileList[index].uid == file.uid) {
            this.files.splice(index, 1) //移除数组中要删除的图片
          }
        }
        return false
      }

      let reader = new FileReader()
      const _this = this

      reader.onload = function(e) {
        // 圖片的 base64 存到 levelThreeFormData.imgs 裡面
        _this.levelThreeFormData.imgs.push(e.target.result)
      }
      reader.readAsDataURL(file.raw)
      // 重點，把 file 存到 files 這樣 upload 才有辦法操控元件的移除、下載 等等動作  預覽不用
      this.files.push(file)
      // console.log('file', file)
      // console.log('this.files', this.files)
    }
  }
}
</script>

<style scoped>
/* eslint-disable */
/* .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
} */
.el-col {
  border-radius: 4px;
  background-color: #fff;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
  width: 100%;
}
.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  background-color: #f9fafc;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
  margin: 0;
  width: 1140px;
  line-height: 40px;
  /* height: 40px; */
  height: 100%;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  padding: 0;
  margin: 0;
  /* margin-top: 10px; */
  /* line-height: 400px; */
  /* position: relative; */
}

.upload-wrap {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 148px;
  overflow: hidden;
}
.el-form-item {
  margin-bottom: 0px;
}
.switch {
  margin-bottom: 0px;
}
.el-dialog__body {
  padding-top: 10px;
  /* padding-bottom: 20px; */
}
/* .hide .el-upload.el-upload--picture-card {
  display: none;
} */

/* https://blog.csdn.net/weixin_47711284/article/details/106403718 */
</style>
