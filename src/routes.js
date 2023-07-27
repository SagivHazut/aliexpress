import VideoScroll from './pages/VideoScroll'
import SearchBar from './components/SearchBar'
import { SearchItems } from './components/SearchItems'
import { Products } from './pages/Product'
import { Women } from './pages/Page'
import { HomePage } from './pages/HomePage'
import { Men } from './pages/Page'
import { Errorsite } from './pages/Errorsite'
import { TopProducts } from './pages/Page'
import { Featured } from './pages/Page'
import { SuperDeals } from './pages/Page'
import { Kids } from './pages/Page'
import { Sport } from './pages/Page'
import { House } from './pages/Page'
import { Recommendation } from './pages/Recommendation'
import GallreyScroll from './pages/GallreyScroll'
import { Banggood } from './pages/Banggood'

export const routes = [
  // {
  //   path: '/',
  //   redirect: '/',
  // },
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
    path: '/',
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
    path: '/Product/:id',
    component: <Products />,
  },
  {
    path: '/GallreyScroll',
    component: <GallreyScroll />,
  },
  {
    path: '/Banggood',
    component: <Banggood />,
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
