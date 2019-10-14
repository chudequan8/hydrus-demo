import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/admin/groupType/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/groupType',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/groupType/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/groupType/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/groupType/' + id,
    method: 'put',
    data: obj
  })
}

export default {
  page: '/api/admin/groupType/page get',
  addObj: '/api/admin/groupType post',
  getObj: '/api/admin/groupType/{id} get',
  delObj: '/api/admin/groupType/{id} delete',
  putObj: '/api/admin/groupType/{id} put'
}
