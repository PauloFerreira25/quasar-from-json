export const callBackend = () => {
  return Math.floor(Math.random() * Math.floor(10)) % 2 === 0 ? 'pj' : 'pf'
}
