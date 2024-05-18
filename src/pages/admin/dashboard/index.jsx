import { HeadAdmin } from "@/components/HeadAdmin";
import { SidebarMenu } from "@/components/SidebarOrganization";
import StatisticChartIncomeMonthly from "@/components/statistic/StatisticChartIncomeMonthly";
import StatisticChartItemMonthly from "@/components/statistic/StatisticChartItemMonthly";
import StatisticChartOrderMonthly from "@/components/statistic/StatisticChartOrderMonthly";
import StatisticDone from "@/components/statistic/StatisticDone";
import StatisticMonth from "@/components/statistic/StatisticMonth";
import StatisticToday from "@/components/statistic/StatisticToday";
import { withAuth } from "@/lib/authorization";
import { Container, Flex, Heading } from "@chakra-ui/react";

function Dashboard() {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <Heading marginBottom="8" marginTop="8">
              Dashboard
            </Heading>
            <Flex>
              <StatisticDone flex={1} />
              <StatisticToday flex={1} />
              <StatisticMonth flex={1} />
            </Flex>
            <Flex>
              <StatisticChartIncomeMonthly flex={1} />
            </Flex>
            <Flex>
              <StatisticChartOrderMonthly flex={1} />
              <StatisticChartItemMonthly flex={1} />
            </Flex>
            <Flex></Flex>
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Dashboard);
