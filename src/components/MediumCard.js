import React from "react";
import { Card, CardBody, Badge } from "shards-react";
import ShortenText from "../utils/ShortenText";
import ToText from "../utils/ToText";
import colors from "../utils/colors.json";

// functional card component to display single item
function MediumCard(props) {
  const monthShortname = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const {
    pubDate,
    thumbnail,
    tagNo,
    tag,
    profileLink,
    avatar,
    author,
    link,
    title,
    content,
  } = props;
  const splitDate = pubDate.split(" ");
  const date = splitDate[0];
  const splitMonth = date.split("-");
  const finalDate = `${monthShortname[Number(splitMonth[1] - 1)]} ${
    splitMonth[2]
  }, ${splitMonth[0]}`;

  return (
    <Card small className="card-post card-post--1">
      <div
        className="card-post__image"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div className="card-post__category">
          <Badge
            pill
            className="mr-1"
            style={{ backgroundColor: colors[tagNo] }}
          >
            {tag}
          </Badge>
        </div>
        <div className="card-post__author d-flex">
          <a
            href={profileLink}
            target="_blank"
            className="card-post__author-avatar card-post__author-avatar--small"
            style={{
              backgroundImage: `url(${avatar})`,
            }}
            rel="noopener noreferrer"
          >
            Written by {author}
          </a>
        </div>
      </div>
      <CardBody>
        <h5 className="card-title">
          <a
            href={link}
            target="_blank"
            className="text-fiord-blue"
            rel="noopener noreferrer"
          >
            {ShortenText(title, 0, 100)}
          </a>
        </h5>
        <p className="card-text d-inline-block mb-3">{`${ShortenText(
          ToText(content),
          0,
          120
        )}...`}</p>
        <br />
        <span className="text-dark">
          <i
            className="fad fa-user-edit"
            style={{
              fontSize: "20px",
              "--fa-primary-color": "mediumpurple",
              "--fa-secondary-color": "orange",
              "--fa-secondary-opacity": "1.0",
            }}
          ></i>{" "}
          {author}
        </span>
        <br />
        <span className="text-muted">
          <i
            className="fad fa-calendar-alt"
            style={{
              fontSize: "20px",
              "--fa-primary-color": "red",
              "--fa-secondary-color": "dimgray",
            }}
          ></i>{" "}
          {finalDate}
        </span>
        <br />
        <br />
      </CardBody>
    </Card>
  );
}

export default MediumCard;
