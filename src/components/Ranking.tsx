import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Table from "./Table";
import { Record } from "../config";

const StyledDisplay = styled.div`
  min-width: 540px;
  min-height: 480px;
  display: grid;
  grid-template-columns: 540px;
  justify-content: center;
  margin: 60px;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr 20px;
  border-radius: 10px;
  padding: 1rem;
  background-color: rgb(77, 193, 249);
  background-image: url("/images/gameClear.png");
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr;
  img {
    justify-self: right;
    width: 50px;
    height: 50px;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  border: none;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  background-color: salmon;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledPaging = styled.div`
  margin: 0 auto;
`;

type RankingProps = {
  data: Record[];
};

const Ranking: React.FC<RankingProps> = ({ data }) => {
  return (
    <StyledDisplay>
      <StyledDiv>
        <StyledHeader>
          <StyledLink to="/">⬅</StyledLink>
          <img src="/images/trophy.png" alt="trophy" />
        </StyledHeader>
        <Table data={data} />
        <StyledPaging>
          <button>←</button>
          <button>→</button>
        </StyledPaging>
      </StyledDiv>
    </StyledDisplay>
  );
};

export default Ranking;
