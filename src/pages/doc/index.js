let arrayData = []
import simpleHtml from './simpleHtml'
import inputs from './input'
import brake from './brake'
import complex from './complex'
arrayData = arrayData.concat(simpleHtml)
arrayData = arrayData.concat(brake)
arrayData = arrayData.concat(inputs)
arrayData = arrayData.concat(brake)
arrayData = arrayData.concat(complex)
export default arrayData
