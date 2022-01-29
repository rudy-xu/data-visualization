// import { a } from './cjs'

// console.log(a)
// console.log('Test rollip')

// export default {}

import Test1 from './components/Test1/index';
import Test2 from './components/Test2/index';
import Test3 from './components/Test3/index';

export default function(Vue) {
  Vue.use(Test1)
  Vue.use(Test2)
  Vue.use(Test3)
}
