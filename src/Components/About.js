import React from "react";
import styled from "styled-components";
import Message from "../Components/Message";

const Container = styled.div`
  margin-top: 15px;
`;

const Title = styled.div`
  font-weight: 600;
  margin: 5px 0;
`;

const About = ({ result }) => {
  return (
    <>
      {!result.production_companies && !result.production_countries && (
        <Message
          text="There's no Information"
          color="rgb(230, 230, 230, 0.7)"
        />
      )}
      {result.production_companies && result.production_companies.length > 0 && (
        <Container>
          <Title>Production Companies</Title>
          <div>
            {result.production_companies.map((list, index) =>
              index === result.production_companies.length - 1
                ? list.name
                : `${list.name} / `
            )}
          </div>
        </Container>
      )}
      {result.production_countries && result.production_countries.length > 0 && (
        <Container>
          <Title>Production Countries</Title>
          <div>
            {result.production_countries.map((list, index) =>
              index === result.production_countries.length - 1
                ? list.name
                : `${list.name} / `
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default About;
