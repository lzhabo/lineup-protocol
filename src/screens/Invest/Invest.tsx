import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestVMProvider } from "@screens/Invest/InvestVm";
import InvestCard from "@screens/Invest/InvestCard";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 56px;
  text-align: left;

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const Container = styled.div`
  display: grid;
  row-gap: 16px;
  @media (min-width: 880px) {
    grid-template: 150px / auto auto auto;
    column-gap: 16px;
  }
`;

const InvestImpl: React.FC = () => {
  const tariffs = [
    {
      periodDays: 100,
      apy: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      periodDays: 30,
      apy: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      periodDays: 7,
      apy: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
  ];
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Container>
              {tariffs.map((t, index) => (
                <InvestCard {...t} key={index + "invest"} />
              ))}
            </Container>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const Invest: React.FC = () => (
  <InvestVMProvider>
    <InvestImpl />
  </InvestVMProvider>
);
export default Invest;
