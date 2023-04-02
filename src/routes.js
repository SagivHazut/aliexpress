import { Average } from './components/Average'
import { Dashboard } from './components/Dashboard'
import { Newest } from './components/Newest'

export const routes = [
  {
    path: '/',
    component: <Dashboard />,
  },
  {
    path: '/Average',
    component: <Average />,
  },
  {
    path: '/Newest',
    component: <Newest />,
  },
]
