import React, { useEffect, useState } from 'react';
import { Col, Row } from 'shards-react';
import MediumCard from './MediumCard';

// wrapper for items
function Slider() {
  const [itemRows, setItemRows] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [loading, setLoading] = useState(false);

  const mediumURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rcvaram';

  useEffect(() => {
    fetch(mediumURL)
      .then(res => res.json())
      .then(data => {
        // create two-dimensional array with 3 elements per inner array
        const avatarImg = data.feed.image;
        const profile = data.feed.link;
        const items = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = items.filter(item => item.categories.length > 0);
        setAvatar(avatarImg);
        setProfileLink(profile);
        const blogs = [];
        posts.forEach((item, i) => {
          item['avatar'] = avatarImg; // push avatar inside the json
          item['profileLink'] = profile; // push profile link inside the JSON
          blogs.push(item);
        });
        const tagArrays = blogs.map(item => {
          return item.categories;
        });

        const allTags = tagArrays.flat();

        const allTagsWithCount = allTags.reduce(function(tagsWithCount, currentTag) {
          tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1; //increment the number of counts of a tag
          return tagsWithCount;
        }, {});

        //sort the tag(key) according its count
        const sortedTagsArray = Object.keys(allTagsWithCount).sort(function(a, b) {
          return allTagsWithCount[b] - allTagsWithCount[a];
        });

        console.log(sortedTagsArray);

        const tagArticle = [];
        let removedBlogs = blogs;
        for (let i = 0; i < sortedTagsArray.length; ++i) {
          const blogsWithTag = removedBlogs.filter(blog => blog.categories.includes(sortedTagsArray[i])); //filter
          removedBlogs = removedBlogs.filter(blog => blogsWithTag.indexOf(blog) == -1); //exclude
          if (blogsWithTag.length > 0) {
            blogsWithTag.forEach(item => {
              item[`tag`] = sortedTagsArray[i];
              item['tagNo'] = i + 1;
              const row = Math.floor(i / 3);
              if (!tagArticle[row]) tagArticle[row] = [];
              tagArticle[row].push(item);
            });
          }
        }
        setItemRows(tagArticle);
        setLoading(true);
      });
  }, []);

  return (
    <div className="blog__slider">
      {loading &&
        itemRows.length > 0 &&
        itemRows.map((row, i) => (
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

export default Slider;
