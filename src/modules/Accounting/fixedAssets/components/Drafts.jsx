import { Button, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'assetName', label: 'Asset Name', minWidth: 220 },
  { id: 'assetNumber', label: 'Asset Number', minWidth: 220 },
  { id: 'assetType', label: 'Asset Type', minWidth: 220 },
  { id: 'purchaseDate', label: 'Purchase Date', minWidth: 220 },
  { id: 'purchasePrice', label: 'Purchase Price', minWidth: 120 },
];

const useStyles = makeStyles((theme) => ({
  table: {
    background: '#FCFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: 3,
    height: '10rem',
  },
  btnRoot: {
    fontFamily: 'Rubik',
    fontSize: 13,
    textTransform: 'none',
    background: '#DFDFDF',
    borderRadius: 3,
    color: '#fff',
    '& :hover': {
      color: '#fff',
    },
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
}));

export default function Draft() {
  const classes = useStyles();
  return (
    <section className={classes.table}>
      <div style={{ margin: '15px' }}>
        <Button
          classes={{ root: classes.btnRoot }}
          style={{ background: '#DFDFDF', marginRight: '15px' }}>
          Delete
        </Button>
        <Button
          classes={{ root: classes.btnRoot }}
          style={{ background: '#DFDFDF' }}>
          Register
        </Button>
      </div>
      <div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: '15px',
                    }}
                    className={classes.cellWrapper}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/*   <TableBody style={isLoading ? { display: 'none' } : {}}>
              {searchedItems.map((row, i) => (
                <TableRow hover key={i} className={classes.tableRow}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.respTable}>
                        {column.id === 'action' ? (
                          <>
                            <IconButton
                              size="small"
                              onClick={handleClick(row?.customerId)}
                              classes={{ root: classes.iconRoot }}>
                              <KeyboardArrowDownOutlined />
                            </IconButton>
                            <Popover
                              elevation={0}
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              classes={{
                                paper: classes.popOver,
                              }}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}>
                              <ul
                                style={{
                                  listStyle: 'none',
                                  margin: 0,
                                  padding: 0,
                                }}>
                                <li className={classes.list_1}>
                                  <TypographyH5
                                    onClick={() =>
                                      history.push(
                                        `/dashboard/customers/view/${uuid}`,
                                      )
                                    }
                                    className={classes.typography_1}>
                                    View
                                  </TypographyH5>
                                </li>
                                <li
                                  className={classes.list_1}
                                  onClick={() =>
                                    history.push(
                                      `/dashboard/customers/edit/${uuid}`,
                                    )
                                  }
                                  style={{
                                    borderBottom: '1px solid #C4C4C4',
                                  }}>
                                  <TypographyH5
                                    className={classes.typography_1}>
                                    Edit
                                  </TypographyH5>
                                </li>
                                <li
                                  className={classes.list_1}
                                  onClick={() =>
                                    history.push(
                                      '/dashboard/invoice/new_invoice',
                                    )
                                  }
                                  style={{
                                    borderBottom: '1px solid #C4C4C4',
                                  }}>
                                  <TypographyH5
                                    className={classes.typography_1}>
                                    Create Invoice
                                  </TypographyH5>
                                </li>
                                <li
                                  className={classes.list_2}
                                  onClick={handleDelete}>
                                  <TypographyH5
                                    className={classes.typography_2}>
                                    Delete
                                  </TypographyH5>
                                </li>
                              </ul>
                            </Popover>
                          </>
                        ) : column.id == 'openingBalance' ? (
                          `NGN ${Number(value).toLocaleString()}`
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}
