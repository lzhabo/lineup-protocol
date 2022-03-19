import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
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
  width: 100%;
  text-align: left;

  @media (min-width: 768px) {
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  & > * {
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
  const navigate = useNavigate();
  const handleLockClick = (id: string) =>
    navigate(ROUTES.INVEST_CARD.replace(":id", id));
  return (
    <Layout>
      <Observer>
        {() => {
          const locks = investStore.locks;
          return (
            <Root>
              <GoBack link={ROUTES.DASHBOARD} text="Back to Dashboard" />
              <SizedBox height={32} />
              <Text size="title">Invest</Text>
              <SizedBox height={16} />
              <Container>
                {locks && (
                  <>
                    <InvestItem
                      lock={locks[0]}
                      pic={rocket1}
                      onClick={() => handleLockClick(locks[0].id)}
                    />
                    <InvestItem
                      lock={locks[1]}
                      pic={rocket2}
                      onClick={() => handleLockClick(locks[1].id)}
                    />
                    <InvestItem
                      lock={locks[2]}
                      pic={rocket3}
                      onClick={() => handleLockClick(locks[2].id)}
                    />
                  </>
                )}
              </Container>
            </Root>
          );
        }}
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
