import { TopProducts } from './components/TopProducts'
import { Featured } from './components/Featured'
import { SuperDeals } from './components/SuperDeals'
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
    redirect: '/top-products/page/:pageNumber',
  },
  {
    path: '/top-products/page/:pageNumber',
    component: <TopProducts />,
  },
  {
    path: '/Featured/page/:pageNumber',
    component: <Featured />,
  },
  {
    path: '/SuperDeals/page/:pageNumber',
    component: <SuperDeals />,
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
