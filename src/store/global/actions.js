import axios from 'axios'

export const simulateLogin = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export const callBackend = async (context, params) => {
  try {
    let response = await axios(params)
    return response.data
  } catch (err) {
    throw err
  }
}
