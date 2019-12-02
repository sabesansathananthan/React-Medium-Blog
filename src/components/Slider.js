import React from "react";
import { Col, Row } from "shards-react";
import MediumCard from "./MediumCard";

// wrapper for items

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemRows: [], avatar: "" };
  }
  mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MediumStaff";

  componentDidMount() {
    fetch(this.mediumURL)
      .then(res => res.json())
      .then(data => {
        // create two-dimensional array with 3 elements per inner array
        const avatar = data.feed.image;
        this.setState({ avatar: avatar });
        const itemRows = [];
        data.items.forEach((item, i) => {
          item["avatar"] = this.state.avatar;  // push avatar inside the json
          const row = Math.floor(i / 3);
          if (!itemRows[row]) itemRows[row] = [];
          itemRows[row].push(item);
        });
        this.setState({ itemRows: itemRows });
      });
  }
  render() {
    return (
      <div className="blog__slider">
        {this.state.itemRows.map((row, i) => (
          <Row key={i}>
            {row.map((item, j) => (
              <Col key={j} lg="4" md="6" sm="12" className="mb-4">
                <MediumCard {...item} />
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}
export default Slider;
