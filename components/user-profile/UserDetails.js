import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
} from "shards-react"
import getWriterInfo from "../../services/GetWriterInfo"
import LoadingAnimation from "../../components/common/Loading"

const UserDetails = (props) => {
  const [userDetails, setUserDetails] = React.useState({
    avatar: "",
    firstname: "",
    lastname: "",
    email: "",
    profile: "",
    energy: "",
    about: "",
  })
  const [isLoading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    setIsloading(true)
    getWriterInfo()
      .then((res) => {
        const info = res.userprofile[0]
        setUserDetails({
          firstname: info.firstname,
          lastname: info.lastname,
          email: info.email,
          profile: info.profile,
          about: info.about,
          energy: info.energy,
          twitter: info.twitter,
          instagram: info.instagram,
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }
  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src="https://res.cloudinary.com/dendekky/image/upload/c_scale,h_845,q_25/v1595318921/0_uoa7bf.jpg"
            // {require("../../../assets/images/UserAvatar.jpg")}
            alt={userDetails.firstname}
            width="110"
          />
        </div>
        <h4 className="mb-0">
          {userDetails.firstname} {userDetails.lastname}
        </h4>
        <span className="text-muted d-block mb-2">{userDetails.email}</span>
        <span className="d-flex mb-2">
          {/* <i className="material-icons mr-1">bird</i> */}
          <strong className="mr-1">Twitter:</strong>
          <strong className="ml-auto">
            <a
              className="d-block mb-2"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${userDetails.twitter}`}
            >
              {userDetails.twitter}
            </a>
          </strong>
        </span>
        <span className="d-flex mb-2">
          {/* <i className="material-icons mr-1">twitter</i> */}
          <strong className="mr-1">Instagram:</strong>
          <strong className="ml-auto">
            <a
              className="d-block mb-2"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://instagram.com/${userDetails.instagram}`}
            >
              {userDetails.instagram}
            </a>
          </strong>
        </span>
        {/* <a className="text-muted d-block mb-2" href={`https://instagram.com/${userDetails.twitter}`}>{userDetails.twitter}</a>
        <a className="text-muted d-block mb-2" href={`https://instagram.com/${userDetails.instagram}`}>{userDetails.instagram}</a> */}
        {/* <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button> */}
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4">
          <div className="progress-wrapper">
            <strong className="text-muted d-block mb-2">
              {/* {userDetails.performanceReportTitle} */}
              Energy
            </strong>
            <Progress
              className="progress-sm"
              value={userDetails.energy}
              // {userDetails.performanceReportValue}
            >
              <span className="progress-value">
                {userDetails.energy}
                {/* {userDetails.performanceReportValue}% */}
              </span>
            </Progress>
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            {/* {userDetails.metaTitle} */}
            Profile
          </strong>
          <span>{userDetails.profile}</span>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

// UserDetails.propTypes = {
//   /**
//    * The user details object.
//    */
//   userDetails: PropTypes.object
// };

// UserDetails.defaultProps = {
//   userDetails: {
//     name: "Sierra Brooks",
//     avatar: require("./../../images/avatars/0.jpg"),
//     jobTitle: "Project Manager",
//     performanceReportTitle: "Workload",
//     performanceReportValue: 74,
//     metaTitle: "Description",
//     metaValue:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
//   }
// };

export default UserDetails
