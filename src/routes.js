import { TopProducts } from './components/TopProducts'
import { Average } from './components/Average'
import { Newest } from './components/Newest'
import { Errorsite } from './components/Errorsite'
import { Recommendation } from './components/Recommendation'
import { HomePage } from './components/HomePage'

export const routes = [
  {
    path: '/',
    component: <TopProducts />,
  },
  {
    path: '/Featured',
    component: <Average />,
  },
  {
    path: '/HigherCommission',
    component: <Newest />,
  },
  {
    path: '/Errorsite',
    component: <Errorsite />,
  },
  {
    path: '/homepage',
    component: <HomePage />,
  },
  {
    path: '/Recommendation',
    component: <Recommendation />,
  },
]
