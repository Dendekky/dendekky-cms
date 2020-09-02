import React from "react"
import { Alert } from "shards-react"

export default class CustomAlert extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: true }
  }

  dismiss = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <Alert
          theme={this.props.theme}
          dismissible={this.dismiss}
          open={this.state.visible}
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.message }} />
          {/* Please enter the <strong>correct</strong> login credentials  */}
        </Alert>
      </div>
    )
  }
}
