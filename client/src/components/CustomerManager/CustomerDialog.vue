<template>
  <div class="customer-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1600px"
      style="margin-top:-40px"
    >
      <!-- style="margin:10px;width:auto" -->
      <el-form
        ref="form"
        :model="customerFormData"
        :rules="form_rules"
        label-width="100px"
      >
        <el-container>
          <el-header>
            <!-- 第一列，客戶分類，客戶名稱，公司統編，公司電話，公司傳真 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4"
                ><el-form-item
                  label="客戶分類："
                  prop="customer_class"
                  label-width="120px"
                >
                  <el-select
                    @change="customerClassChange"
                    v-model="customerFormData.customer_class"
                    placeholder="客戶分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemClass, index) in customerClassData"
                      :key="index"
                      :value="itemClass._id"
                      :label="itemClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="客戶名稱："
                  prop="company"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company"
                    placeholder="遠足文化事業股份有限公司(小熊出版社)(禁止交易)"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="公司統編："
                  prop="tax_id_number"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.tax_id_number"
                    placeholder="沒有就開二聯發票"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="公司電話："
                  prop="company_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company_telephone"
                    placeholder="公司電話"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="公司傳真："
                  prop="company_fax"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company_fax"
                    placeholder="公司傳真"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第二列，客戶網站，FB，IG，PINKOI -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item
                  label="客戶網站："
                  prop="website"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.website"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="facebook："
                  prop="facebook"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.facebook"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="instagram："
                  prop="instagram"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.instagram"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="pinkoi："
                  prop="pinkoi"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.pinkoi"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第三列，聯絡人姓名，聯絡人手機，聯絡人市電，聯絡人mail，聯絡人職務，備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="聯絡人姓名："
                  prop="contact_person_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_name"
                    placeholder="楊大大"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"
                ><el-form-item
                  label="聯絡人職務："
                  prop="contact_person_title"
                  label-width="120px"
                >
                  <el-select
                    @change="customerTitleChange"
                    v-model="customerFormData.contact_person_title"
                    placeholder="創作者本人"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemTitle, index) in customerTitleData"
                      :key="index"
                      :value="itemTitle._id"
                      :label="itemTitle.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="聯絡人手機："
                  prop="contact_person_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="聯絡人市話："
                  prop="contact_person_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="聯絡人信箱："
                  prop="contact_person_email"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_email"
                    placeholder="waha1206@gmail.com"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="備註："
                  prop="contact_person_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_memo"
                    placeholder="早上不要聯繫"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第四列，會計姓名，會計手機，會計市電，會計mail，會計職務，備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="會計姓名："
                  prop="accounting_person_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.accounting_person_name"
                    placeholder="楊小小"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"
                ><el-form-item
                  label="選擇職務："
                  prop="accounting_person_title"
                  label-width="120px"
                >
                  <el-select
                    @change="customerTitleChange"
                    v-model="customerFormData.accounting_person_title"
                    placeholder="請選擇職務"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemTitle, index) in customerTitleData"
                      :key="index"
                      :value="itemTitle._id"
                      :label="itemTitle.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="會計手機："
                  prop="accounting_person_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.accounting_person_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="會計市話："
                  prop="accounting_person_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.accounting_person_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="會計信箱："
                  prop="accounting_person_email"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.accounting_person_email"
                    placeholder="waha1206@gmail.com"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="備註："
                  prop="accounting_person_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.accounting_person_memo"
                    placeholder="早上不要聯繫"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第五列，其一姓名，其一手機，其一市電，其一mail，其一職務，其一備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="其一姓名："
                  prop="other_person_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.other_person_name"
                    placeholder="楊小小"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"
                ><el-form-item
                  label="其一職務："
                  prop="other_person_title"
                  label-width="120px"
                >
                  <el-select
                    @change="customerTitleChange"
                    v-model="customerFormData.other_person_title"
                    placeholder="請選擇職務"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemTitle, index) in customerTitleData"
                      :key="index"
                      :value="itemTitle._id"
                      :label="itemTitle.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="其一手機："
                  prop="other_person_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.other_person_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="其一市話："
                  prop="other_person_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.other_person_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="其一信箱："
                  prop="other_person_email"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.other_person_email"
                    placeholder="waha1206@gmail.com"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="備註："
                  prop="other_person_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.other_person_memo"
                    placeholder="收件請下午之類"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第六列，發票收件人，發票收件人地址，發票收件人電話，發票收件人手機 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="發票收件人："
                  prop="invoice_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_name"
                    placeholder="楊小小"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item
                  label="手機："
                  prop="invoice_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="市話："
                  prop="invoice_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="position:relative">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="right"
                  style="z-index:2000"
                >
                  <el-badge
                    value="help"
                    class="item"
                    style="margin-top: 0px;margin-right: 0px;position:absolute;top:10px;right:26px"
                  >
                  </el-badge>
                  <div slot="content">
                    <a
                      href="https://twzipcode.com/"
                      target="_blank"
                      style="color:#fff"
                      >點我查詢區碼</a
                    >
                  </div>
                </el-tooltip>
                <el-form-item
                  label="區碼："
                  prop="invoice_postal "
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_postal"
                    placeholder="23145"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="地址："
                  prop="invoice_address"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_address"
                    placeholder="新北市新店區寶興路45巷9弄3號3樓 (警衛室可代收)"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第七列，發票備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="12">
                <el-form-item
                  label="發票備註："
                  prop="invoice_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_memo"
                    placeholder="每個月的2月25號前發票要寄送，超過25號的發票就算到隔月"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="invoice_type " label="發票類型：">
                  <el-radio-group v-model="customerFormData.invoice_type">
                    <el-radio :label="1">二聯發票</el-radio>
                    <el-radio :label="2">三聯發票</el-radio>
                    <el-radio :label="3">電子發票</el-radio>
                    <el-radio :label="4">其他，不要問</el-radio>
                    <el-radio :label="5">國外地區</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第八列，款項票期與付款方式 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="12">
                <el-form-item prop="payment_date" label="款項票期：">
                  <el-radio-group v-model="customerFormData.payment_date">
                    <el-radio :label="1">30%訂金，出貨前結清</el-radio>
                    <el-radio :label="2">貨到付款</el-radio>
                    <el-radio :label="3">月結30天</el-radio>
                    <el-radio :label="4">月結45天</el-radio>
                    <el-radio :label="6">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="payment" label="付款方式：">
                  <el-radio-group v-model="customerFormData.payment">
                    <el-radio :label="1">現金</el-radio>
                    <el-radio :label="2" style="position:relative"
                      >國內轉帳
                      <el-tooltip
                        class="item"
                        effect="dark"
                        placement="right"
                        style="z-index:2000"
                      >
                        <el-badge
                          value="help"
                          class="item"
                          style="margin-top: 0px;margin-right: 0px;position:absolute;top:-18px;right:-20px"
                        >
                        </el-badge>
                        <div slot="content">
                          <span>匯款資料：</span><br />
                          <span>匯款戶名：麥歐有限公司</span><br />
                          <span>匯款銀行：台灣企銀新店分行(代碼050)</span><br />
                          <span>匯款帳號：02512120000</span>
                        </div>
                      </el-tooltip>
                    </el-radio>
                    <el-radio :label="3" style="position:relative"
                      >paypal

                      <el-tooltip
                        class="item"
                        effect="dark"
                        placement="right"
                        style="z-index:2000"
                      >
                        <el-badge
                          value="help"
                          class="item"
                          style="margin-top: 0px;margin-right: 0px;position:absolute;top:-18px;right:-20px"
                        >
                        </el-badge>
                        <div slot="content">
                          <span>paypal 的支付帳號為：</span><br />
                          <span>paula@hbw.com.tw</span>
                        </div>
                      </el-tooltip>
                    </el-radio>
                    <el-radio :label="4">信用卡支付</el-radio>
                    <el-radio :label="5">載具支付</el-radio>
                    <el-radio :label="6">支票</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第九列，樣品收件人，樣品收件人地址，樣品收件人電話，樣品收件人手機 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="樣品收件人："
                  prop="sample_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.sample_name"
                    placeholder="楊小小"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item
                  label="手機："
                  prop="sample_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.sample_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="市話："
                  prop="sample_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.sample_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="position:relative">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="right"
                  style="z-index:2000"
                >
                  <el-badge
                    value="help"
                    class="item"
                    style="margin-top: 0px;margin-right: 0px;position:absolute;top:10px;right:26px"
                  >
                  </el-badge>
                  <div slot="content">
                    <a
                      href="https://twzipcode.com/"
                      target="_blank"
                      style="color:#fff"
                      >點我查詢區碼</a
                    >
                  </div>
                </el-tooltip>
                <el-form-item
                  label="區碼："
                  prop="sample_postal  "
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.sample_postal"
                    placeholder="23145"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="地址："
                  prop="invoice_address"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.invoice_address"
                    placeholder="新北市新店區寶興路45巷9弄3號3樓 (警衛室可代收)"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第十列，收件備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="12">
                <el-form-item
                  label="樣品備註："
                  prop="sample_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.sample_memo"
                    placeholder="警衛室有代收，所以配送的時候可以寫在配送單上面"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="right"
                  style="z-index:2000"
                >
                  <el-badge
                    value="查件"
                    class="item"
                    style="margin-top: 0px;margin-right: 0px;position:absolute;top:-5px;right:500px"
                  >
                  </el-badge>
                  <div slot="content">
                    <a
                      href="http://www.hiyes.com.tw/?flag=no"
                      target="_blank"
                      style="color:#fff"
                      >點我查詢貨運單號</a
                    >
                  </div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="right"
                  style="z-index:2000"
                >
                  <el-badge
                    value="查件"
                    class="item"
                    style="margin-top: 0px;margin-right: 0px;position:absolute;top:-5px;right:400px"
                  >
                  </el-badge>
                  <div slot="content">
                    <a
                      href="https://htm.sf-express.com/tw/tc/dynamic_function/waybill/"
                      target="_blank"
                      style="color:#fff"
                      >點我查詢貨運單號</a
                    >
                  </div>
                </el-tooltip>
                <el-form-item
                  prop="sample_delivery"
                  label="樣品配送："
                  style="position:relative"
                >
                  <el-radio-group v-model="customerFormData.sample_delivery">
                    <el-radio :label="1">郵局</el-radio>
                    <el-radio :label="2">新航快遞</el-radio>
                    <el-radio :label="3">順豐快遞</el-radio>
                    <el-radio :label="4">全家</el-radio>
                    <el-radio :label="5">7-11</el-radio>
                    <el-radio :label="6">自取</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第十一列，大貨收件人，大貨收件人地址，大貨收件人電話，大貨收件人手機 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="大貨收件人："
                  prop="goods_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_name"
                    placeholder="楊小小"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item
                  label="手機："
                  prop="goods_cell_phone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_cell_phone"
                    placeholder="0918-700586"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="市話："
                  prop="goods_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_telephone"
                    placeholder="02-89116396#80"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="區碼："
                  prop="goods_postal"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_postal"
                    placeholder="23145"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="地址："
                  prop="goods_address"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_address"
                    placeholder="新北市新店區寶興路45巷9弄3號3樓 (警衛室可代收)"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第十二列，大貨備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="12">
                <el-form-item
                  label="大貨備註："
                  prop="goods_memo"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.goods_memo"
                    placeholder="警衛室有代收，所以配送的時候可以寫在配送單上面"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="goods_delivery" label="大貨配送：">
                  <el-radio-group v-model="customerFormData.goods_delivery">
                    <el-radio :label="1">郵局</el-radio>
                    <el-radio :label="2">新航快遞</el-radio>
                    <el-radio :label="3">順豐快遞</el-radio>
                    <el-radio :label="4">全家</el-radio>
                    <el-radio :label="5">7-11</el-radio>
                    <el-radio :label="6">自取</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第十三列，啟用，運費，每件加收，客戶等級 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item prop="activated" label="啟用：">
                  <el-radio-group v-model="customerFormData.activated">
                    <el-radio :label="1">啟用</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="delivery_charge" label="運費：">
                  <el-radio-group v-model="customerFormData.delivery_charge">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">加收</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="delivery_charge_fee" label="每件加收：">
                  <my-currency-input
                    :isReadyOnly="false"
                    :height="24"
                    :width="56"
                    type="delivery_charge_fee"
                    v-model="deliveryChargeFee"
                  ></my-currency-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="level" label="客戶等級：">
                  <el-radio-group v-model="customerFormData.level">
                    <el-radio :label="1">VIP</el-radio>
                    <el-radio :label="2">潛力</el-radio>
                    <el-radio :label="3">正常</el-radio>
                    <el-radio :label="4">觀察名單</el-radio>
                    <el-radio :label="5">拒絕往來</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第十四列，其它備註事項 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <!-- <el-col :span="4">
                <el-form-item label="客戶編號：" prop="no" label-width="120px">
                  <el-input
                    class="rt-input"
                    :readonly="true"
                    v-model="customerFormData.no"
                    placeholder="會自動產生"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item
                  label="其它備註："
                  prop="remarks"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.remarks"
                    placeholder="其它的備註說明"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-header>
          <el-main> </el-main>

          <el-footer>
            <el-form-item class="text_right">
              <el-button type="warning" @click="dialog.show = false"
                >取消</el-button
              >
              <el-button type="primary" @click="onSubmit('form')"
                >提交</el-button
              >
            </el-form-item>
          </el-footer>
        </el-container>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'customer-dialog',
  props: {
    dialog: Object,
    customerClassData: Array,
    customerTitleData: Array
  },
  components: {},
  data() {
    return {
      // 貨運加收費用
      deliveryChargeFee: 0,
      // 控制 material cloth dialog 的物件
      customerFormData: {},
      // materialDataForm_rules: {
      form_rules: {
        contact_person_title: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        contact_person_name: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        customer_class: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 取得使用者資料
    ...mapGetters(['user']),
    // 時間轉換
    getDate() {
      if (!this.customerFormData.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.customerFormData.last_modify_date).format(
        'YYYY年MM月DD日 - HH：mm'
      )
    },
    // 取得修改人的_id 轉換成 name
    getUserNameById() {
      if (!this.customerFormData.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.customerFormData.last_edit_person) name = item.name
      })
      return name
    }
  },
  watch: {
    deliveryChargeFee(newValue) {
      this.customerFormData.delivery_charge_fee = String(newValue)
    },
    customerTitleData(value) {
      console.log(value)
    },
    dialog: function(newValue, oldValue) {
      console.log('CustomerDialog.vue - watch - dialog', newValue, oldValue)
      // 當 dialog.option == 'add' 的時候就把表格都清空  另外我準備了一個 editData = {} 準備承接 edit 狀態下的 scope.row 資料
      this.customerFormData = Object.assign({}, newValue.data)

      if (!this.isEmpty(this.customerFormData.delivery_charge_fee)) {
        this.deliveryChargeFee = Number(
          this.customerFormData.delivery_charge_fee
        )
      } else {
        this.deliveryChargeFee = 0
      }
    }
  },
  created() {
    // this.customerFormData = Object.assign({}, this.formData)
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    },
    // 客戶的類別異動
    customerClassChange() {},
    customerTitleChange() {},
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.customerFormData.last_edit_person = this.user.id
          this.customerFormData.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.customerFormData._id}`
          console.log(url, this.customerFormData)

          this.$axios
            .post(`/api/customer/${url}`, this.customerFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 隱藏 MyDialog
              this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        } else {
          this.$message({
            message: '有星號的欄位都必須要填寫喔！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/* .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
} */
.el-col {
  border-radius: 4px;
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

.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  /* background-color: #f9fafc; */
}
/* 這邊開始是 布局容器 */
body > .el-container {
  margin-bottom: 40px;
}

.el-main {
  margin: 10px 0 0 0;
  padding: 0;
  /* background-color: #e9eef3; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100% !important; */
  height: 100% !important;
}
.el-header,
.el-footer {
  margin: 0;
  padding: 0;
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100%; */
  height: 100% !important;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 100% !important;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100% !important;
}
/* 布局容器 結束 */
</style>
