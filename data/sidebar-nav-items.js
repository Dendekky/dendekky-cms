export default function NavItems () {
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
      to: "/blog-table",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile",
    },
  ]
}
