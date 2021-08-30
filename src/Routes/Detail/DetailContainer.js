import { movieApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      isActive: "",
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      push("/");
    }

    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find Anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  handleTap = (event) => {
    this.setState({ isActive: event.target.innerText });
  };

  render() {
    const { result, error, loading, isActive, isMovie } = this.state;
    console.log(result);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        handleTap={this.handleTap}
        isActive={isActive}
        isMovie={isMovie}
      />
    );
  }
}
