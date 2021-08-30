import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import iconImage from "../../assets/imdb.png";
import Video from "../../Components/Video";
import About from "../../Components/About";
import Season from "../../Components/Season";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.span`
  margin: 20px 0;
`;

const Item = styled.span`
  margin-bottom: 10px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  min-height: 150px;
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 30px;
  vertical-align: middle;
`;

const Tap = styled.div`
  margin: 20px 0;
`;

const List = styled.ul`
  display: flex;
`;

const TapList = styled.li`
  width: 60px;
  font-size: 14px;
  text-align: center;
  opacity: 0.7;
  padding-bottom: 7px;
  border-bottom: 3px solid transparent;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #d2082d;
  }
`;

const SubInfo = styled.div`
  width: 50%;
  text-align: start;
`;

const DetailPresenter = ({
  result,
  error,
  loading,
  handleTap,
  isActive,
  isMovie,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noposter.JPG")
          }
        />{" "}
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>・</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time}
            </Item>
            {result.genres && (
              <>
                <Divider>・</Divider>
                <Item>
                  {result.genres &&
                    result.genres.map((genre, index) =>
                      index === result.genres.length - 1
                        ? genre.name
                        : `${genre.name} / `
                    )}
                </Item>
              </>
            )}
            {result.imdb_id && (
              <>
                <Divider>・</Divider>
                <Item>
                  <a
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon alt="imdb icon" src={iconImage} />
                  </a>
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tap>
            <List>
              {result.videos.results && (
                <TapList
                  onClick={handleTap}
                  className={isActive === "Video" ? "active" : ""}
                >
                  Video
                </TapList>
              )}
              {(result.production_companies || result.production_contries) && (
                <TapList
                  onClick={handleTap}
                  className={isActive === "About" ? "active" : ""}
                >
                  About
                </TapList>
              )}
              {!isMovie && result.seasons && (
                <TapList
                  onClick={handleTap}
                  className={isActive === "Seasons" ? "active" : ""}
                >
                  Seasons
                </TapList>
              )}
            </List>
          </Tap>
          <SubInfo>
            {isActive === "Video" && <Video result={result} />}
            {isActive === "About" && <About result={result} />}
            {isActive === "Seasons" && <Season result={result} />}
          </SubInfo>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
