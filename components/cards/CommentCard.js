/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../utils/context/authContext';

export default function CommentCard({ commentObj }) {
  const { user } = useAuth();

  return (
    <div>
      <Card style={{ margin: '15px auto', border: 'none' }}>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={commentObj.author?.imageURL}
                alt="profile-pic"
              />
              <Card.Title style={{ marginLeft: '8px' }}>{commentObj.author?.firstName}</Card.Title>
            </div>
            {commentObj.author?.id === user.id && (
            <svg
              width="54"
              height="54"
              viewBox="0 0 84 84"
              fill="none"
              // onClick={handleClick}
              style={{ cursor: 'pointer' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_ddd_360_5244)">
                <path d="M32.5 34H51.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M45.9673 34C45.9673 31.7909 46.6286 30 42 30C37.3714 30 38.0327 31.7909 38.0327 34" stroke="black" strokeWidth="2" />
                <path d="M50 37.5L48.005 48.346C47.9236 48.8094 47.6815 49.2292 47.3212 49.5317C46.9609 49.8342 46.5055 50 46.035 50H37.965C37.4945 50 37.0391 49.8342 36.6788 49.5317C36.3185 49.2292 36.0764 48.8094 35.995 48.346L34 37.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <filter id="filter0_ddd_360_5244" x="-21" y="-21" width="126" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_360_5244" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="13" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0785417 0 0 0 0 0.149529 0 0 0 0 0.3625 0 0 0 0.04 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_360_5244" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.14902 0 0 0 0 0.360784 0 0 0 0.04 0" />
                  <feBlend mode="normal" in2="effect1_dropShadow_360_5244" result="effect2_dropShadow_360_5244" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.14902 0 0 0 0 0.360784 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="effect2_dropShadow_360_5244" result="effect3_dropShadow_360_5244" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_360_5244" result="shape" />
                </filter>
              </defs>
            </svg>
            )}
          </div>
          <Card.Text style={{ fontSize: '14px', marginTop: '10px' }}>{commentObj.content}</Card.Text>
          <footer style={{ fontSize: '12px', marginTop: '-5px' }}>{formatDistanceToNow(new Date(commentObj.createdOn), { addSuffix: true })}</footer>
        </Card.Body>
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    firebaseKey: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      imageURL: PropTypes.string,
    }),
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
