import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Registration from "../pages/Authentication/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AgentDashboard from "../pages/Dashboard/Agent/AgentDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AddProperty from "../pages/Dashboard/Agent/AddProperty/AddProperty";
import MyProperties from "../pages/Dashboard/Agent/MyProperties/MyProperties";
import UpdateProperty from "../pages/Dashboard/Agent/MyProperties/UpdateProperty/UpdateProperty";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import AllProperties from "../pages/AllProperties/AllProperties";
import ManageUsers from "../Components/ManageUser/ManageUser";
import ManageProperties from "../pages/Dashboard/Admin/ManageProperties/ManageProperties";
import LatestReviews from "../pages/HomePage/LatestReview/LatestReview";
import AllPropertyDetails from "../pages/AllProperties/PropertyDetails/PropertyDetails";
import Wishlist from "../pages/Dashboard/UserDashboard/Wishlist/Wishlist";
import PropertyBought from "../pages/Dashboard/UserDashboard/PropertyBrought/PropertyBrought";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews/MyReviews";
import MakeAnOffer from "../pages/Dashboard/UserDashboard/MakeAnOffer/MakeAnOffer";
import AgentProfile from "../pages/Dashboard/Agent/AgentProfile/AgentProfile";
import MySoldProperties from "../pages/Dashboard/Agent/MySoldProperties/MySoldProperties";
import OfferedProperties from "../pages/Dashboard/Agent/offeredProperties/OfferedProperties";
import Pay from "../pages/Dashboard/UserDashboard/Pay/Pay";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews/ManageReviews";
import AdvertiseProperty from "../pages/Dashboard/Admin/AdvertiseProperty/AdvertiseProperty";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import Forbidden from "../pages/Authentication/Forbidden/Forbidden";
import Profile from "../pages/Profile/Profile";
import NewsDetail from "../pages/HomePage/NewsSection/NewsDetails/NewsDetails";
import Contact from "../pages/Contact/Contact";
import PropertyListings from "../pages/PropertyListings/PropertyListings";
import Blog from '../pages/Blogs/Blog'
import Gallery from "../pages/Gallery/Gallery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'all-properties',
        element: <PrivateRoute>
          <AllProperties></AllProperties>
        </PrivateRoute>
      },
      {
        path: '/property-details/:id',
        element: <PrivateRoute>
          <AllPropertyDetails></AllPropertyDetails>
        </PrivateRoute>
      },
      {
        path: "/make-offer/:id",
        element: <MakeAnOffer></MakeAnOffer>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/news/:id",
        element: <NewsDetail></NewsDetail>
      },
     
      {
        path: "/propertyListings",
        element: <PropertyListings></PropertyListings>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>
      },

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'registration',
        Component: Registration
      },
      {
        path: 'forbidden',
        Component: Forbidden
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {

        path: 'agent',
        Component: AgentDashboard,
      },

      {
        path: 'agent/profile',
        element: <AgentProfile></AgentProfile>
      },
      {
        path: 'agent/addProperty',
        element: <AddProperty />
      },
      {
        path: 'agent/my-properties',
        element: <MyProperties></MyProperties>
      },
      {
        path: 'agent/update-property/:id',
        element: <UpdateProperty></UpdateProperty>
      },
      {
        path: 'agent/sold-properties',
        element: <MySoldProperties></MySoldProperties>
      },
      
      {
        path: 'agent/offered-properties',
        element: <OfferedProperties></OfferedProperties>
      },
      {
        path:"/dashboard/admin/advertise-property",
        element:<AdvertiseProperty></AdvertiseProperty>
      },


      {
        path: 'admin',
        element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
        children: [
          {
            index: true,
            element: <AdminProfile></AdminProfile>
          },
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>
          },
          {
            path: "manage-properties",
            element: <ManageProperties></ManageProperties>
          },
          {
            path: "manage-reviews",
            element: <ManageReviews></ManageReviews>
          },
          {
            path: "contact",
            element: <Contact></Contact>
          },
        ]
      },
      {
        path: 'user',
        element: <PrivateRoute><UserDashboard /></PrivateRoute>,
        children: [
          {
            path: 'my-profile',
            element: <MyProfile></MyProfile>
          },
          {
            path: 'wishlist',
            element: <Wishlist></Wishlist>
          },
          {
            path: 'property-bought',
            element: <PropertyBought />
          },
          {
            path: 'my-reviews',
            element: <MyReviews />
          },
          {
            path: 'pay/:id',
            element: <Pay></Pay>
          },
        ]
      }

    ]
  }
]); 