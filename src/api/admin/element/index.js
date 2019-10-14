import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/admin/element/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/element',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'put',
    data: obj
  })
}

export default {
  page: '/api/admin/element/list get',
  addObj: '/api/admin/element post',
  getObj: '/api/admin/element/{id} get',
  delObj: '/api/admin/element/{id} delete',
  putObj: '/api/admin/element/{id} put'
}
