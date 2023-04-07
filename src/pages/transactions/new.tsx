import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../../utils/model";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  MenuItem,
} from "@material-ui/core";
import { NextPage } from "next";

const TransactionsNewPage: NextPage = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>

      <form>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              required
              label="Data de pagamento"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />

            <TextField label="Descrição" required fullWidth />

            <TextField label="Categoria" select required fullWidth>
              {TransactionCategoryLabels.map((item, key) => (
                <MenuItem key={key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Valor" type="number" required fullWidth />

            <TextField label="Tipo de operação" select required fullWidth>
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
    </Container>
  );
};

export default TransactionsNewPage;
