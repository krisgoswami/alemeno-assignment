import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import ShowNavbar from './components/ShowNavbar';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import CreateCourse from './pages/CreateCourse';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import UpdateCourse from './pages/UpdateCourse';

function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <ShowNavbar>
            <Navbar />
          </ShowNavbar>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/create" element={<CreateCourse />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/update/:id" element={<UpdateCourse />} />
            {/* <Route path="/items" element={<Items />} /> */}
            {/* <Route path="/listed-items" element={<MyItems />} /> */}
            {/* <Route path="/item-details/:id" element={<ItemDetails />} /> */}
            {/* <Route path="/update-item/:id" element={<EditItem />} /> */}
            {/* <Route path="/purchase/:id" element={<Purchase />} /> */}
            {/* <Route path="/purchases" element={<Purchases />} /> */}
            {/* <Route path="/search" element={<Search />} /> */}
            {/* <Route path="/auction" element={<AuctionPage />} /> */}
            {/* <Route path="/profile/:id" element={<UserProfile />} /> */}
          </Routes>
        </Router>
        {/* <Footer /> */}
      </Provider>
    </>
  )
}

export default App
