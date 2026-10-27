import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { NgoSchema } from './components/Seo'

/* --- Pages -------------------------------------------------------------- */
import Home from './pages/Home'
import About from './pages/About'
import Understanding from './pages/Understanding'
import TraitAndCounselling from './pages/TraitAndCounselling'
import LivingWell from './pages/LivingWell'
import Programs from './pages/Programs'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import GetInvolved from './pages/GetInvolved'
import Donate from './pages/Donate'
import Events from './pages/Events'
import News from './pages/News'
import Article from './pages/Article'
import Research from './pages/Research'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
import Cookies from './pages/Cookies'
import Accessibility from './pages/Accessibility'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

/**
 * App — route table.
 *
 * Every page renders inside the shared <Layout> (sticky header, footer,
 * floating help, back-to-top and cookie banner).
 *
 * HOSTING NOTE: this is a single-page app using the History API. Configure the
 * host to serve index.html for unknown paths (Vercel and Netlify do this by
 * default; add a rewrite rule on Apache/IIS) so deep links resolve.
 */
export default function App() {
  return (
    <>
      {/* Site-wide schema.org NGO markup */}
      <NgoSchema />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/understanding-sickle-cell" element={<Understanding />} />
          <Route path="/trait-and-counselling" element={<TraitAndCounselling />} />
          <Route path="/living-well" element={<LivingWell />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<Article />} />
          <Route path="/research" element={<Research />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accessibility" element={<Accessibility />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin console — its own chrome, outside the public layout. */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}
