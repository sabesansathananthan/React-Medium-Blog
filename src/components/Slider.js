import React from 'react';
import { Col, Row } from 'shards-react';
import MediumCard from './MediumCard';

// wrapper for items

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemRows: [], avatar: '', profileLink: '' };
  }
  mediumURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MediumStaff';

  componentDidMount() {
    fetch(this.mediumURL)
      .then(res => res.json())
      .then(data => {
        // create two-dimensional array with 3 elements per inner array
        const avatar = data.feed.image;
        const profileLink = data.feed.link;
        const res = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter(item => item.categories.length > 0);

        this.setState({ avatar: avatar, profileLink: profileLink });
        const itemRows = [];
        posts.forEach((item, i) => {
          item['avatar'] = this.state.avatar; // push avatar inside the json
          item['link'] = this.state.profileLink; // push profile link inside the JSON
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
