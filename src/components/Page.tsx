import { Container, makeStyles } from "@material-ui/core";
import { NextPage } from "next";
import NavBar from "./Navbar";

const useStyles = makeStyles({
  container: {
    height: "calc(100% - 64px)",
  },
});

interface PageProps {}
export const Page: NextPage<PageProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Container className={classes.container}>
        <>{children}</>
      </Container>
    </>
  );
};
