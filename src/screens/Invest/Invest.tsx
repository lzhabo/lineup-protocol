import styled from "@emotion/styled";
import React from "react";
import { Observer, useObserver } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestVMProvider } from "@screens/Invest/InvestVm";
import InvestCard from "@screens/Invest/InvestCard";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import rocket1 from "@src/assets/images/rocket1.svg";
import rocket2 from "@src/assets/images/rocket2.svg";
import rocket3 from "@src/assets/images/rocket3.svg";
import { useNavigate } from "react-router-dom";
import { useStores } from "@stores";

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

  @media (min-width: 768px) {
    margin-top: 56px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > * {
    max-width: 330px;
    margin: 0 0 16px 0;
  }
  :last-child {
    margin: 0;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > * {
      max-width: 100%;
      margin: 0 16px 0 0;
    }
    :last-child {
      margin: 0;
    }
  }
`;

const InvestImpl: React.FC = () => {
  const { investStore } = useStores();
  const locks = useObserver(() => investStore.locks);
  const tariffs = locks && [
    {
      id: locks[0].id,
      pic: rocket1,
      periodDays: locks[0].lockPeriod / 60,
      apy: locks[0].lockPeriod / 100,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      id: locks[1].id,
      pic: rocket2,
      periodDays: locks[1].lockPeriod / 60,
      apy: locks[1].lockPeriod / 100,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      id: locks[2].id,
      pic: rocket3,
      periodDays: locks[2].lockPeriod / 60,
      apy: locks[2].lockPeriod / 100,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
  ];
  const navigate = useNavigate();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack link={ROUTES.DASHBOARD} text="Back to Dashboard" />
            <SizedBox height={32} />
            <Text size="title">Invest</Text>
            <SizedBox height={16} />
            <Container>
              {tariffs?.map((t, index) => (
                <InvestCard
                  {...t}
                  key={index + "invest"}
                  onClick={() => navigate(`/invest/${t.id}`)}
                />
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
