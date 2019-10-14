const productUrl = '/api/admin/product'

export default {
  getProductList: productUrl + ' get', // 获取产品列表
  getProductMethods: productUrl + '/route get', // 获取方法列表
  addProduct: productUrl + ' post', // 新增产品
  editProduct: productUrl + '/{id} put', // 编辑产品
  deleteProduct: productUrl + '/{id} delete', // 删除产品
  getThirdConfig: productUrl + '/deploy get', // 获取配置
  saveThirdConfig: productUrl + '/deploy put', // 保存第三方配置
  getProductVersionList: productUrl + '/version get', // 获取产品版本列表
  deleteVersion: productUrl + '/version/{id} delete', // 删除版本
  addVersion: productUrl + '/version post', // 添加版本
  editVersion: productUrl + '/version/{id} put', // 编辑版本
  getRuleGroupList: productUrl + '/version/ruleGroup get', // 获取规则组列表
  getScoreCardList: productUrl + '/version/scorecard get' // 获取评分卡列表
}
