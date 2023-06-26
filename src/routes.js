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
import VideoScroll from './components/VideoScroll'
import SearchBar from './components/SearchBar'
import { SearchItems } from './components/SearchItems'

export const routes = [
  {
    path: '/',
    redirect: '/top-products',
  },
  {
    path: '/top-products',
    component: <TopProducts />,
  },
  {
    path: '/Featured',
    component: <Featured />,
  },
  {
    path: '/SuperDeals',
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
    path: '/VideoScroll',
    component: <VideoScroll />,
  },
  {
    path: '/SearchBar',
    component: <SearchBar />,
  },
  {
    path: '/SearchItems',
    component: <SearchItems />,
  },
  {
    path: '/*',
    component: <Errorsite />,
  },
]
