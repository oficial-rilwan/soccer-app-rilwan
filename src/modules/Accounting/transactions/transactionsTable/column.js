export const COLUMNS = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({
      row: {
        original: { date },
      },
    }) => {
      return new Date(date).toLocaleDateString('en-GB');
    },
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Category',
    accessor: 'transactionType',
    Cell: ({
      row: {
        original: { creditAccountType, debitAccountType, transactionType },
      },
    }) => {
      return transactionType === 'inflow'
        ? creditAccountType.name
        : debitAccountType.name;
    },
  },
  {
    Header: 'Debit',
    accessor: 'creditAccountType',
    Cell: ({
      row: {
        original: { transactionType, amount },
      },
    }) => {
      return (
        transactionType === 'inflow' && `NGN ${Number(amount).toLocaleString()}`
      );
    },
  },
  {
    Header: 'Credit',
    accessor: 'debitAccountType',
    Cell: ({
      row: {
        original: { amount, transactionType },
      },
    }) => {
      return (
        transactionType === 'outflow' &&
        `NGN ${Number(amount).toLocaleString()}`
      );
    },
  },
  {
    Header: 'Action',
    Cell: ({
      row: {
        original: { transactionId },
      },
    }) => {
      return (
        <div style={{ color: '#2f49d0', cursor: 'pointer' }} onClick={() => {}}>
          View
        </div>
      );
    },
  },
];
