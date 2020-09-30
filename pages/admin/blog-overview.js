import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Container,
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
} from "shards-react"

import PageTitle from "../../components/common/PageTitle"
import SmallStats from "../../components/common/SmallStats"
import PieChart from "../../components/blog/ChartComponent"
import Http from "../../services/Apicalls"
import LoadingAnimation from "../../components/common/Loading"
import Errors from "./Errors"

const BlogOverview = () => {
  const [data, setData] = useState({ blog: [], comment: [] })
  const [analyticsData, setAnalyticsData] = useState({})
  const [analyticsTimeInterval, setAnalyticsTimeInterval] = useState("30")
  const [loading, setLoading] = useState(true)
  const [gALoading, setGALoading] = useState(false)
  const [error, setError] = useState(false)

  // const blogCategories = data.blog
  //   .map((item) => item.category)
  //   .filter((v, i, self) => i == self.indexOf(v))

  const smallStats = [
    {
      label: "Posts",
      value: `${data.blog.length}`,
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [],
        },
      ],
    },
    {
      label: "Categories",
      value: `${
        data.blog
          .map((item) => item.category)
          .filter((v, i, self) => i == self.indexOf(v)).length
      }`,
      percentage: "3.8%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [],
        },
      ],
    },
    {
      label: "Pages",
      value: `${data.blog.length + 2}`,
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [],
        },
      ],
    },
    {
      label: "Comments",
      value: `${data.blog.map((item) => item.comments).flat().length}`,
      percentage: "3.8%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [],
        },
      ],
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      setGALoading(true)
      const allPosts = await Http.get(`/api/post`)
      const fetchGanalyticsData = await Http.get(
        `/api/analytics?metrics=pageviews,users,sessions&dimensions=ga:pagePath,country,city,browser,userType&startDate=${analyticsTimeInterval}daysAgo`
      )
      if (allPosts.data && fetchGanalyticsData.data) {
        setAnalyticsData(fetchGanalyticsData.data.data)
        setData({ blog: allPosts.data.posts })
      } else {
        setError(true)
      }
      setLoading(false)
      setGALoading(false)
    }
    fetchData()
  }, [analyticsTimeInterval])

  if (loading) {
    return <LoadingAnimation />
  }
  if (error) {
    return <Errors />
  }

  const getHomePage = analyticsData["ga:pagePath"].dimension.filter(
    (item) => item[0] == "/"
  )[0]
  getHomePage[2] = "Homepage"

  const getPages = analyticsData["ga:pagePath"].dimension.filter(
    (item) =>
      !item[0].includes("admin") &&
      !item[0].includes("demo") &&
      !item[0].includes("draft") &&
      item[0].includes("post")
  )
  const checkPostAgainstId = () => {
    for (let i = 0; i < getPages.length; i++) {
      const pageDataArray = data.blog.filter((val) =>
        getPages[i][0].includes(val._id)
      )
      const title =
        pageDataArray && pageDataArray[0]
          ? pageDataArray[0].title
          : "Deleted Post"
      getPages[i].push(title)
    }
  }
  checkPostAgainstId()
  const livePages = getPages.filter((val) => val[2] !== "Deleted Post")

  livePages.unshift(getHomePage)

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Blog Overview"
          subtitle="Dashboard"
          className="text-sm-left mb-3"
        />
      </Row>

      <Row>
        {smallStats.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg="12" md="12" sm="12">
          <FormSelect
            size="sm"
            value={analyticsTimeInterval}
            style={{ maxWidth: "130px" }}
            onChange={(e) => setAnalyticsTimeInterval(e.target.value)}
          >
            <option value="7">Last Week</option>
            <option value="1">Today</option>
            <option value="30">Last Month</option>
            <option value="60">Last 2 Months</option>
            <option value="100">Last 100 days</option>
            <option value="182">Last 6 Months</option>
            <option value="365">Last Year</option>
          </FormSelect>
        </Col>

        {!gALoading && analyticsData ? (
          <>
            <Col lg="6" md="12" sm="12" className="mb-4">
              <PieChart
                title="Users By Devices"
                label={analyticsData["ga:browser"].dimension.map(
                  (item) => item[0]
                )}
                data={analyticsData["ga:browser"].dimension.map(
                  (item) => item[1]
                )}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-4">
              <PieChart
                title="Users By Type"
                label={analyticsData["ga:userType"].dimension.map(
                  (item) => item[0]
                )}
                data={analyticsData["ga:userType"].dimension.map(
                  (item) => item[1]
                )}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-4">
              <PieChart
                title="Users By Countries"
                label={analyticsData["ga:country"].dimension.map(
                  (item) => item[0]
                )}
                data={analyticsData["ga:country"].dimension.map(
                  (item) => item[1]
                )}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-4">
              <PieChart
                title="Users By Cities"
                label={analyticsData["ga:city"].dimension.map(
                  (item) => item[0]
                )}
                data={analyticsData["ga:city"].dimension.map((item) => item[1])}
              />
            </Col>
            <Col lg="6" md="12" sm="12" className="mb-4">
              <Card small className=" h-100">
                <CardHeader className="border-bottom d-flex">
                  <div className="m-0 font-weight-bolder w-75">Posts</div>
                  <div className="m-0 font-weight-bolder w-25">
                    Number of Views
                  </div>
                </CardHeader>
                <CardBody className="d-flex flex-column py-0">
                  {livePages.map((item) => (
                    <div key={item[0]} className="d-flex pb-1">
                      <div className="mr-4 font-weight-bold w-75">
                        {item[2]}
                      </div>
                      <div>{item[1]}</div>
                      <hr />
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </>
        ) : (
          <LoadingAnimation />
        )}
      </Row>
    </Container>
  )
}

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
}

export default BlogOverview
