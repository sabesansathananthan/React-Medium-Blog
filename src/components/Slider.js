import React, { useEffect, useState } from "react";
import { Col, Row } from "shards-react";
import MediumCard from "./MediumCard";
import sortAndSetCategory from "../utils/SortAndSetCategeory";

// wrapper for items
function Slider() {
  const [itemRows, setItemRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sabesan96";

  useEffect(() => {
    fetch(mediumURL)
      .then((res) => res.json())
      .then((data) => {
        const {
          feed: { image, link },
          items,
        } = data || {};

        const posts = items.filter((item) => item.categories.length > 0);

        const tagArrays = posts.map((item) => item.categories);

        const allTags = tagArrays.flat();

        const sortedTagsArray = sortAndSetCategory(allTags) || [];

        // console.log(sortedTagsArray);
        const tagArticle = [];
        let removedBlogs = posts;
        for (let i = 0; i < sortedTagsArray.length; i += 1) {
          const blogsWithTag = removedBlogs.filter((blog) =>
            blog.categories.includes(sortedTagsArray[i])
          ); // filter

          removedBlogs = removedBlogs.filter(
            (blog) => blogsWithTag.indexOf(blog) === -1
          ); // exclude

          if (blogsWithTag.length > 0) {
            blogsWithTag.forEach((item) => {
              item.tag = sortedTagsArray[i];
              tagArticle.push(item);
            });
          }
        }

        const filteredTagArrays = tagArticle.map((item) => item.tag);
        const filteredSortedTagsArray =
          sortAndSetCategory(filteredTagArrays) || [];

        tagArticle.forEach((item) => {
          item.tagNo = filteredSortedTagsArray.indexOf(item.tag) + 1;
          item.avatar = image; // push avatar inside the json
          item.profileLink = link; // push profile link inside the JSON
        });

        const tagArticleWithRow = [];

        tagArticle.forEach((item, i) => {
          const row = Math.floor(i / 3);
          if (!tagArticleWithRow[row]) tagArticleWithRow[row] = [];
          tagArticleWithRow[row].push(item);
        });

        setItemRows(tagArticleWithRow);
        setLoading(true);
      });
  }, []);
  // eslint-disable jsx-props-no-spreading
  return (
    <div className="blog__slider">
      {loading &&
        itemRows.length > 0 &&
        itemRows.map((row) => (
          <Row>
            {row.map((item) => (
              <Col lg="4" md="6" sm="12" className="mb-4">
                <MediumCard {...item} />
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
}

export default Slider;
