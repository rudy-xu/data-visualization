// import { a } from './cjs'

// console.log(a)
// console.log('Test rollip')

// export default {}

import Test1 from './components/Test1/index';
import Test2 from './components/Test2/index';
import Test3 from './components/Test3/index';
import TestSvg from './components/TestSvg/index';
import Icon from './components/Icon/index';
import SvgAnimation from './components/SvgAnimation/index';
import Loading from './components/Loading/index';
import FlyBox from './components/FlyBox/index';
import Container from './components/Container/index';
import MyLogo  from './components/MyLogo/index';

export default function(Vue) {
  Vue.use(TestSvg)
  Vue.use(Test1)
  Vue.use(Test2)
  Vue.use(Test3)
  Vue.use(Icon)
  Vue.use(SvgAnimation)
  Vue.use(Loading)
  Vue.use(FlyBox)
  Vue.use(Container)
  Vue.use(MyLogo)
}
