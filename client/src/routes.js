import Base from './components/Base.jsx';
import HomePage from './containers/ActivityPage.jsx';
import ChapterPage from './containers/ChapterPage.jsx';
import TopicPage from './containers/TopicPage.jsx';
import ELOPage from './containers/ELOPage.jsx';
import ActivityPage from './containers/ActivityPage.jsx';
import ARPage from './containers/ARPage.jsx';




const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/chapter',
      component: ChapterPage
    },

    {
      path: '/topic',
      component: TopicPage
    },
	{
      path: '/elo',
      component: ELOPage
    },
	{
      path: '/activity',
      component: ActivityPage
    },
{
      path: '/arforms',
      component: ARPage
    }	

  ]
};

export default routes;
