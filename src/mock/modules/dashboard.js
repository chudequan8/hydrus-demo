import { random } from 'utils'
export default {
  rule: {
    reg: /\/api\/admin\/dashboard\/rule/,
    res: generateResData('rule')
  },
  scorecard: {
    reg: /\/api\/admin\/dashboard\/scorecard/,
    res: generateResData('scorecard')
  },
  riskEngine: {
    reg: /\/api\/admin\/dashboard\/riskEngine/,
    res: generateResData('riskEngine')
  },
  identityUnit: {
    reg: /\/api\/admin\/dashboard\/identityUnit/,
    res: generateResData('identityUnit')
  }
}

function generateResData(type) {
  let resData = {
    status: 200,
    rel: true
  }
  switch (type) {
    case 'rule':
      {
        const bookList = [
          '追风筝的人',
          '解忧杂货店',
          '小王子',
          '白夜行',
          '活着',
          '嫌疑人X的献身',
          '三体',
          '围城'
        ]
        const successTotalCount = 342
        resData.outList = bookList.map((ruleName, i) => {
          const rejectTotalCount = 160 - 20 * i + random(20)
          const uniqueHitTotalCount = 80 - 10 * i + random(10)
          return {
            rejectTotalCount,
            rejectRate:
              ((rejectTotalCount * 100) / successTotalCount).toFixed(2) + '%',
            uniqueHitTotalCount,
            uniqueHitRate:
              ((uniqueHitTotalCount * 100) / successTotalCount).toFixed(2) +
              '%',
            ruleName
          }
        })
        resData.ruleCheckTotalSuccessCount = resData.outList.reduce(
          (total, n) => total + n.rejectTotalCount,
          0
        )
        resData.ruleCheckTotalRejectCount = resData.outList.reduce(
          (total, n) => total + n.uniqueHitTotalCount,
          0
        )
      }
      break
    case 'scorecard':
      {
        resData.averageAge = 20 + random(20)
        resData.outList = ['百度', '谷歌'].map(scorecardVersion => {
          let data = {
            scorecardVersion
          }
          new Array(1, 2, 3, 4, 5).forEach(n => {
            data[`totalInterval${n}`] = 20 + random(80)
          })
          return data
        })
      }
      break
    case 'riskEngine':
      {
        const curHour = [...Array(new Date().getHours()).keys()]
        const allTime = [...Array(24).keys()]
        const todayOutList = curHour.map((item, index) => {
          return {
            todaySuccessCount:
              10 + random(20) + (12 - Math.abs(index - 12)) * (3 + random(2)),
            todaySuccessRate: '100.00%',
            countTime: index
          }
        })
        const sevenDayOutList = allTime.map((item, index) => {
          return {
            sevenDayAverageSuccessCountByHour:
              10 + random(20) + (12 - Math.abs(index - 12)) * (3 + random(2)),
            sevenDayAverageSuccessRateByHour: '100.00%',
            countTime: index
          }
        })
        resData.data = {
          totalTodayCallCount: 300 + random(200),
          totalTodayErrorCount: random(1),
          sevenDayAverageSuccessCount: 50 + random(5),
          sevenDayAverageSuccessRate: '99.88%',
          todayOutList,
          sevenDayOutList
        }
      }
      break
    case 'identityUnit':
      {
        const curHour = [...Array(new Date().getHours()).keys()]
        const allTime = [...Array(24).keys()]
        const todayOutList = curHour.map((item, index) => {
          return {
            todaySaveCount:
              1 +
              Math.round(((12 - Math.abs(index - 12)) / 3) * (1 + random(2))),
            countTime: index
          }
        })
        const sevenDayOutList = allTime.map((item, index) => {
          return {
            sevenDayAverageSaveCountByHour:
              1 +
              Math.round(((12 - Math.abs(index - 12)) / 3) * (1 + random(2))),
            countTime: index
          }
        })
        const totalTodaySaveCount = todayOutList
          .map(item => item.todaySaveCount)
          .reduce((total, item) => total + item)
        resData.data = {
          totalTodaySaveCount,
          todayOutList,
          sevenDayOutList
        }
      }
      break
  }
  return resData
}
