import axios from 'axios'

export async function fetchPage ({ commit }, route) {
  try {
    let page = await axios.get(`http://localhost:3000/dynamicPage/byName?path=/${route}`)
    commit('currentPage', page.data.data)
  } catch (err) {
    console.error(err)
  }
}
