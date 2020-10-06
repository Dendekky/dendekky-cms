/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Col,
  Card,
  CardBody,
  Badge,
  CardFooter,
  Tooltip,
} from 'shards-react'
import { trimmedPostBody } from '../utils/trimmedPostBody'

function PostCard({ post, idx, postIdList }) {
  const [postToggleOpen, setPostToggleOpen] = useState(postIdList)
  const toggleUniqueTooltip = (tooltipId) => {
    const data = [...postToggleOpen]
    data[tooltipId] = {
      ...data[tooltipId],
      tooltipOpen: !data[tooltipId].tooltipOpen,
    }
    setPostToggleOpen(data)
  }

  return (
    <Col lg='6' md='6' sm='12' className='mb-4'>
      <Link href={`/post/${post.slug}`} as={`/post/${post.slug}`}>
        <a className='text-fiord-blue'>
          <Card small className='card-post card-post--1'>
            <div
              className='card-post__image'
              style={{ backgroundImage: `url(${post.postImage})` }}
            >
              <Badge pill className='card-post__category bg-primary'>
                {post.category}
              </Badge>
            </div>
            <CardBody id={`post-${post._id}`}>
              <h4 className='card-title'>{trimmedPostBody(post.title, 50)}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: trimmedPostBody(post.body, 120),
                }}
              />
            </CardBody>
            <Tooltip
              style={{
                minWidth: '320px',
                fontSize: '20px',
              }}
              // placement="bottom"
              open={postToggleOpen[idx].tooltipOpen}
              target={`#post-${post._id}`}
              toggle={() => toggleUniqueTooltip(idx)}
            >
              {post.title}
            </Tooltip>
            <CardFooter>
              <span className='text-muted'>
                {new Date(post.updatedAt).toDateString()}
              </span>
            </CardFooter>
          </Card>
        </a>
      </Link>
    </Col>
  )
}

export default PostCard
