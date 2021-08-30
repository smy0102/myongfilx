import React from "react";
import styled from "styled-components";
import Message from "./Message";

const Container = styled.div`
  padding-top: 50px;
`;

const Video = ({ result }) => {
  return (
    <>
      {result.videos.results && result.videos.results.length > 0 ? (
        <embed
          width="350px"
          height="200px"
          frameborder="0"
          src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
          allowfullscreen
        ></embed>
      ) : (
        <Container>
          <Message text="There's no Video" color="rgb(230, 230, 230, 0.7)" />
        </Container>
      )}
    </>
  );
};

export default Video;
