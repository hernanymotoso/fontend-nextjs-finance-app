import makeHttp from "../../utils/http";
import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  SortingState,
  SearchState,
  PagingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import { Typography, Button } from "@material-ui/core";
import { GetServerSideProps, NextPage } from "next";
import { Transaction } from "../../utils/model";
import { formatCellDate } from "../../utils/date.helpers";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import { Page } from "../..//components/Page";
import { withAuth } from "../../hof/withAuth";

interface TransactionPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data pag.",
    getCellValue: formatCellDate,
  },
  {
    name: "name",
    title: "Nome",
  },
  {
    name: "category",
    title: "Categoria",
  },
  {
    name: "type",
    title: "Operação",
  },
  {
    name: "created_at",
    title: "Criado em",
    getCellValue: formatCellDate,
  },
];

const TransactionsPage: NextPage<TransactionPageProps> = ({ transactions }) => {
  const router = useRouter();

  return (
    <Page>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push("/transactions/new")}
      >
        Criar
      </Button>

      <Grid rows={transactions} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState defaultValue="Paris" />
        <PagingState defaultCurrentPage={0} pageSize={0} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Page>
  );
};

export default TransactionsPage;

export const getServerSideProps = withAuth(async (ctx, { token }) => {
  const { data: transactions } = await makeHttp(token).get("transactions");

  return {
    props: {
      transactions,
    },
  };
});
