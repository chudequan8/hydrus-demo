import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  })
}

export default {
  page: '/api/admin/user/page get',
  addObj: '/api/admin/user post',
  getObj: '/api/admin/user/{id} get',
  delObj: '/api/admin/user/{id} delete',
  putObj: '/api/admin/user/{id} put'
}
