import * as Icon from "react-feather"

export default function () {
  return [
    {
      title: "Dashboard",
      to: "/admin/blog-overview",
      htmlBefore: <Icon.Home size={16} />,
      // <i className="fa fa-database" />,
      htmlAfter: "",
    },
    {
      title: "Posts Table",
      htmlBefore: <Icon.TrendingUp size={16} />,
      // <i className="fa fa-list" />,
      to: "/admin/blog-table",
    },
    {
      title: "Blog Posts",
      htmlBefore: <Icon.FileText size={16} />,
      // <i className="fa fa-vertical_split" />,
      to: "/admin/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: <Icon.Edit3 size={16} />,
      // <i className="fa fa-edit" />,
      to: "/admin/add-new-post",
    },
    {
      title: "User Profile",
      htmlBefore: <Icon.User size={16} />,
      // <i className="fa fa-person" />,
      to: "/admin/user-profile",
    },
  ]
}
