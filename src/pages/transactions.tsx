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
import { Container, Typography } from "@material-ui/core";

const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data pag.",
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
  },
];

const TransactionsPage = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>

      <Grid rows={[]} columns={columns}>
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
