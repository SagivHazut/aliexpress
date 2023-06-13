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
    path: '/top-products/page/:pageNumber',
    component: <TopProducts />,
  },
  {
    path: '/Featured/page/:pageNumber',
    component: <Average />,
  },
  {
    path: '/SuperDeals/page/:pageNumber',
    component: <Newest />,
  },
  {
    path: '/Errorsite',
    component: <Errorsite />,
  },
  {
    path: '/homepage/page/:pageNumber',
    component: <HomePage />,
  },
  {
    path: '/Men/page/:pageNumber',
    component: <Men />,
  },
  {
    path: '/Women/page/:pageNumber',
    component: <Women />,
  },
  {
    path: '/Kids/page/:pageNumber',
    component: <Kids />,
  },
  {
    path: '/Sport/page/:pageNumber',
    component: <Sport />,
  },
  {
    path: '/House/page/:pageNumber',
    component: <House />,
  },
  {
    path: '/Recommendation/page/:pageNumber',
    component: <Recommendation />,
  },
  {
    path: '/*',
    component: <Errorsite />,
  },
]
