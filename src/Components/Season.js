import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 15px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

const SeasonNumber = styled.div`
  margin-top: 3px;
`;

const Season = ({ result }) => {
  return (
    <Container>
      {result.seasons.length > 0 &&
        result.seasons.map((season) => (
          <div>
            <Poster
              src={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                  : require("../assets/noposter.JPG").default
              }
            />
            <SeasonNumber>
              {season.season_number === 0
                ? "Specials"
                : `Season ${season.season_number}`}
            </SeasonNumber>
          </div>
        ))}
    </Container>
  );
};

export default Season;
