import { http } from "../../utils/http";
import { Token, validateAuth } from "../../utils/auth";
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
import { Container, Typography, Button } from "@material-ui/core";
import { GetServerSideProps, NextPage } from "next";
import { Transaction } from "../../utils/model";
import { formatCellDate } from "../../utils/date.helpers";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";

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
    <Container>
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
    </Container>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const token = (auth as Token).token;
  const { data: transactions } = await http.get("transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    props: { transactions },
  };
};
