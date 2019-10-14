const dashboardUrl = '/api/admin/dashboard'
export default {
  chart: {
    getRuleChart: dashboardUrl + '/rule get',
    getScorecardChart: dashboardUrl + '/scorecard get',
    getProductCallChart: dashboardUrl + '/riskEngine get',
    getIncreasedUserChart: dashboardUrl + '/identityUnit get'
  }
}
