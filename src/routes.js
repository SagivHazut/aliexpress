<<<<<<< HEAD
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
    path: '/Product/:id',
    component: <Products />,
  },
  {
    path: '/GallreyScroll',
    component: <GallreyScroll />,
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
=======
import { TopProducts } from "./components/TopProducts";
import { Average } from "./components/Average";
import { Newest } from "./components/Newest";
import { Errorsite } from "./components/Errorsite";
import { Category } from "./components/Category";

export const routes = [
  {
    path: "/",
    component: <TopProducts />,
  },
  {
    path: "/Featured",
    component: <Average />,
  },
  {
    path: "/HigherCommission",
    component: <Newest />,
  },
  {
    path: "/Errorsite",
    component: <Errorsite />,
  },
];
>>>>>>> 4ba7360d73367df0777a54ff2e481520bb6eaef9
