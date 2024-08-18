import { createPinia } from 'pinia'
import config from './materialsConfig/index'

const pinia = createPinia()
const obj = config()
console.log(obj);

export default pinia
