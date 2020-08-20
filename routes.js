import React from "react"
import { Redirect } from "react-router-dom"

// Layout Types
import { DefaultLayout } from "./admin/layouts"
import { Layout } from "./layouts"

import ProtectRoute from "./RouteProtect"
// Admin Route Views
import BlogOverview from "./admin/views/BlogOverview"
import UserProfile from "./admin/views/UserProfile"
import AddNewPost from "./admin/views/AddNewPost"
import Errors from "./admin/views/Errors"
import BlogPosts from "./admin/views/BlogPosts"
import DraftPreview from "./admin/views/DraftPreview"
import EditDraft from "./admin/views/BlogDraftEdit"
import BlogInfo from "./admin/views/BlogPostView"
import BlogTable from "./admin/views/BlogTable"

// Readers Routes
import Landing from "./pages/Landing"
import UserAbout from "./pages/UserProfile"
import ViewPost from "./pages/ViewPost"
import Login from "./pages/Login"
import setAuthToken from "./Auth"

setAuthToken()

export default [
  {
    path: "/blog-overview",
    layout: Layout,
    component: BlogOverview,
  },
  {
    path: "/login",
    layout: Layout,
    component: Login,
  },
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: Landing,
  },
  {
    path: "/about",
    exact: true,
    layout: Layout,
    component: UserAbout,
  },
  {
    path: "/post/:id",
    layout: Layout,
    component: ViewPost,
  },
  {
    path: "/errors",
    layout: Layout,
    component: Errors,
  },
  // Admin routes
  {
    path: "/admin",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/admin-blog-posts" />,
  },
  {
    path: "/admin-add-new-post",
    layout: DefaultLayout,
    component: ProtectRoute(AddNewPost),
  },
  {
    path: "/admin-draft/update/:id",
    layout: DefaultLayout,
    component: ProtectRoute(EditDraft),
  },
  {
    path: "/admin-blog-posts",
    layout: DefaultLayout,
    component: ProtectRoute(BlogPosts),
  },
  {
    exact: true,
    path: "/admin-blog-table",
    layout: DefaultLayout,
    component: ProtectRoute(BlogTable),
  },
  {
    exact: true,
    path: "/admin-draft/:id",
    layout: DefaultLayout,
    component: ProtectRoute(DraftPreview),
  },
  {
    path: "/admin-post/:id",
    layout: DefaultLayout,
    component: ProtectRoute(BlogInfo),
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfile,
  },
]
