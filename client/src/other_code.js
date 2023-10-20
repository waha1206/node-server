const constants = {
  SERVER_RENEW_BUYER_DATA_90001: 'SERVER_RENEW_BUYER_DATA_90001',
  SERVER_RENEW_BUYER_DATA_90002: 'SERVER_RENEW_BUYER_DATA_90002',
  SERVER_RENEW_SUPPLIER_DATA_90003: 'SERVER_RENEW_SUPPLIER_DATA_90003',
  SERVER_RENEW_BANNER_DATA_90010: 'SERVER_RENEW_BANNER_DATA_90010',
  SERVER_RENEW_GIVEAWAY_DATA_90011: 'SERVER_RENEW_GIVEAWAY_DATA_90011',
  SERVER_RENEW_QUESTION_ANS_ANSWER_DATA_90012:
    'SERVER_RENEW_QUESTION_ANS_ANSWER_DATA_90012',
  SERVER_RENEW_MAIN_BANNER_DATA_90013: 'SERVER_RENEW_MAIN_BANNER_DATA_90013',
  SERVER_RENEW_LEFT_SIDE_BANNER_DATA_90014: 'SERVER_RENEW_LEFT_SIDE_BANNER_DATA_90014',
  SERVER_RENEW_ADD_DELIVERY_RECORD_90020: 'SERVER_RENEW_ADD_DELIVERY_RECORD_90020',
  SERVER_RENEW_DEL_DELIVERY_RECORD_90021: 'SERVER_RENEW_DEL_DELIVERY_RECORD_90021',
  REQUIRED_FIELDS: [
    'product_name',
    'unit_price',
    'storage',
    'level_one_id',
    'level_two_id',
    'material_onwer'
  ],
  MATERIAL_KIND: {
    1: '一般原料',
    2: '轉印布料',
    3: '現成布料',
    4: '配件專用',
    5: '紙',
    6: '墨',
    7: '紙箱',
    8: '運費'
  },
  MATERIAL_STORAGE_DEFAULT_OPTIONS: {
    value: '00000',
    label: '00000 特殊選擇',
    children: [
      { value: '00000', label: '00000 所有商品' },
      { value: '00001', label: '00001 一般原料' },
      { value: '00002', label: '00002 轉印布料' },
      { value: '00003', label: '00003 現成布料' },
      { value: '00004', label: '00004 配件專用' },
      { value: '00005', label: '00005 紙' },
      { value: '00006', label: '00006 墨' },
      { value: '00007', label: '00007 紙箱' },
      { value: '00008', label: '00008 運費' }
    ]
  }
}

module.exports = constants
