import React from "react"
import PropTypes from "prop-types"
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "shards-react"

import Chart from "../../utils/chart"
import ThemeColors from "../../../assets/colors/ThemeColors"

class ChartComp extends React.Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const { label, data } = this.props
    const chartConfig = {
      type: "pie",
      data: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data,
            backgroundColor: ThemeColors,
            // [
            //   "#33691e",
            //   "#ff6d00",
            //   "#ef5350",
            //   "#1a237e",
            //   "rgba(0,123,255,0.9)",
            //   "rgba(0,123,255,0.5)",
            //   "rgba(0,123,255,0.3)",
            //   "rgba(0,123,255,0.1)",
            // ],
          },
        ],
        labels: label,
      },
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest",
          },
        },
        ...this.props.chartOptions,
      },
    }

    new Chart(this.canvasRef.current, chartConfig)
  }

  render() {
    const { title } = this.props
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        {/* <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter> */}
      </Card>
    )
  }
}

ChartComp.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object,
}

export default ChartComp
