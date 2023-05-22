import DashboardIcon from "@mui/icons-material/Dashboard";
// import ThreePIcon from "@mui/icons-material/ThreeP";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const feed = {
  homeOptions: [
    {
      label: "Dashboard",
      value: "/",
      Icon: DashboardIcon,
    },
  ],
  mainOptions: [
    // { label: "Profile", value: "profile", Icon: ThreePIcon, path: "/profile" },
    {
      label: "Edit Product",
      value: "edit-profile",
    },
    {
      label: "Profile",
      value: "profile",
    },
    {
      label: "Security",
      value: "security",
    },
    {
      label: "Add Product",
      value: "add_product",
      Icon: PostAddIcon,
      to: "/add",
    },
    {
      label: "Schedule",
      value: "schedule",
    },
    {
      label: "Issue Report",
      value: "issue",
    },
    {
      label: "Chart",
      value: "pie",
    },
    {
      label: "Logout",
      value: "logout",
    },
  ],
};

export default feed;
