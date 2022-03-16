import styled from "@emotion/styled";
import React from "react";
import { Observer, useObserver } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestVMProvider } from "@screens/Invest/InvestVm";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import rocket1 from "@src/assets/images/rocket1.svg";
import rocket2 from "@src/assets/images/rocket2.svg";
import rocket3 from "@src/assets/images/rocket3.svg";
import { useNavigate } from "react-router-dom";
import { useStores } from "@stores";
import AnimatedPage from "@components/AnimatedPage";
import InvestItem from "./InvestItem";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  max-width: calc(1160px + 32px);
  text-align: left;

  @media (min-width: 768px) {
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > * {
    //max-width: 330px;
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
      lock: locks[0],
      pic: rocket1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      lock: locks[1],
      pic: rocket2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque sit eget purus aliquet senectus et arcu.",
    },
    {
      lock: locks[2],
      pic: rocket3,
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
                <InvestItem
                  {...t}
                  key={index + "invest"}
                  onClick={() =>
                    navigate(ROUTES.INVEST_CARD.replace(":id", t.lock.id))
                  }
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
    <AnimatedPage>
      <InvestImpl />
    </AnimatedPage>
  </InvestVMProvider>
);
export default Invest;
