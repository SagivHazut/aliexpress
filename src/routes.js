import { TopProducts } from './components/TopProducts'
import { Average } from './components/Average'
import { Newest } from './components/Newest'
import { Errorsite } from './components/Errorsite'

export const routes = [
  {
    path: '/',
    component: <TopProducts />,
  },
  {
    path: '/Average',
    component: <Average />,
  },
  {
    path: '/Newest',
    component: <Newest />,
  },
  {
    path: '/Errorsite',
    component: <Errorsite />,
  },
]
