export default function () {
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: "",
    },
    {
      title: "Post Table",
      htmlBefore: '<i class="material-icons">list</i>',
      to: "/admin-blog-table",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/admin-blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/admin-add-new-post",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
  ]
}
