import fetch from 'utils/fetch'
import dashboard from './dashboard'
import login from './login'
import flowIn from './flowIn'

const api = {}
const apiList = [dashboard, login, flowIn]

apiList.forEach(menu => {
  generateApi(menu, api)
})

function generateApi(original, target) {
  Object.keys(original).forEach(key => {
    if (typeof original[key] === 'string') {
      let apiUrl = original[key].split(' ')[0]
      const apiMethod = original[key].split(' ')[1]
      target[key] = function() {
        /* arguments
         * 第一第二个参数为业务参数params以及需要传的id，可以交换顺序
         * axios配置参数必须放在第三个参数里
         */
        const axiosConfig = arguments.length === 3 ? arguments[2] : {}
        const params =
          typeof arguments[0] === 'object'
            ? arguments[0]
            : typeof arguments[1] === 'object'
            ? arguments[1]
            : undefined
        const id = !isNaN(arguments[0])
          ? arguments[0]
          : !isNaN(arguments[1])
          ? arguments[1]
          : undefined
        const fetchObj = {
          method: apiMethod,
          url: apiUrl.includes('{id}') ? apiUrl.replace('{id}', id) : apiUrl,
          ...axiosConfig
        }
        if (params) {
          fetchObj[
            ['put', 'post', 'delete'].includes(apiMethod) ? 'data' : 'params'
          ] = params
        }
        return fetch(fetchObj)
      }
    } else {
      target[key] = {}
      generateApi(original[key], target[key])
    }
  })
}

export default api
