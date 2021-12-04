import React from 'react';
import { Card, CardBody } from 'shards-react';
import ShortenText from '../utils/ShortenText';
import ToText from '../utils/ToText';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'shards-react';
import colors from '../utils/colors.json';
// functional card component to display single item
export default function MediumCard(props) {
  const monthShortname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const splitDate = props.pubDate.split(' ');
  const date = splitDate[0];
  const splitMonth = date.split('-');
  const finalDate = monthShortname[Number(splitMonth[1] - 1)] + ' ' + splitMonth[2] + ',' + ' ' + splitMonth[0];

  return (
    <Card small className="card-post card-post--1">
      <div className="card-post__image" style={{ backgroundImage: `url(${props.thumbnail})` }}>
        <div className={'card-post__category'}>
          <Badge pill className={'mr-1'} style={{ backgroundColor: colors[props.tagNo] }}>
            {props.tag}
          </Badge>
        </div>
        <div className="card-post__author d-flex">
          <a
            href={props.profileLink}
            target="_blank"
            className="card-post__author-avatar card-post__author-avatar--small"
            style={{
              backgroundImage: `url(${props.avatar})`
            }}
            rel="noopener noreferrer"
          >
            Written by {props.author}
          </a>
        </div>
      </div>
      <CardBody>
        <h5 className="card-title">
          <a href={props.link} target="_blank" className="text-fiord-blue" rel="noopener noreferrer">
            {ShortenText(props.title, 0, 100)}
          </a>
        </h5>
        <p className="card-text d-inline-block mb-3">{ShortenText(ToText(props.content), 0, 120) + '...'}</p>
        <br />
        <span className="text-dark">
          <FontAwesomeIcon icon={faUser} /> {props.author}
        </span>
        <br />
        <span className="text-muted">
          <FontAwesomeIcon icon={faCalendarAlt} /> {finalDate}
        </span>
        <br />
        <br />
      </CardBody>
    </Card>
  );
}
