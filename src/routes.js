import { TopProducts } from './components/TopProducts'
import { Average } from './components/Average'
import { Newest } from './components/Newest'
import { Errorsite } from './components/Errorsite'
import { Recommendation } from './components/Recommendation'
import { HomePage } from './components/HomePage'
import { Men } from './components/Men'
import { Women } from './components/Women'
import { Kids } from './components/Kids'
import { Sport } from './components/Sport'
import { House } from './components/House'

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
    path: '/SuperDeals',
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
    path: '/Men',
    component: <Men />,
  },
  {
    path: '/Women',
    component: <Women />,
  },
  {
    path: '/Kids',
    component: <Kids />,
  },
  {
    path: '/Sport',
    component: <Sport />,
  },
  {
    path: '/House',
    component: <House />,
  },
  {
    path: '/Recommendation',
    component: <Recommendation />,
  },
  {
    path: '/*',
    component: <Errorsite />,
  },
]
