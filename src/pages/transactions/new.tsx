import makeHttp from "../../utils/http";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../../utils/model";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  MenuItem,
} from "@material-ui/core";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Page } from "../../components/Page";

const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function submit(data: any) {
    try {
      await makeHttp().post("transactions", { data });
      // router.push("/transactions");
    } catch (error) {
      console.log("EERRO", error);
      console.error(error);
    }
  }

  return (
    <Page>
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>

      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("payment_date")}
              type="date"
              required
              label="Data de pagamento"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              {...register("name")}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />

            <TextField
              {...register("description")}
              label="Descrição"
              required
              fullWidth
            />

            <TextField
              {...register("category")}
              label="Categoria"
              select
              required
              fullWidth
            >
              {TransactionCategoryLabels.map((item, key) => (
                <MenuItem key={key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register("amount", { valueAsNumber: true })}
              label="Valor"
              type="number"
              required
              fullWidth
            />

            <TextField
              {...register("type")}
              label="Tipo de operação"
              select
              required
              fullWidth
            >
              {TransactionTypeLabels.map((item, key) => (
                <MenuItem key={key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <Box marginTop={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
};

export default TransactionsNewPage;
