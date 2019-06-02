import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactionsAction } from '../redux';
import '../css/table.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

const columns = [
  {
    Header: 'Transaction ID',
    accessor: 'transactionID'
  },
  {
    Header: 'User Name',
    accessor: 'username'
  },
  {
    Header: 'Payment Mode',
    accessor: 'paymentMode'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  }
]

const Table = () => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const fetchTransactions = () => dispatch(fetchTransactionsAction());
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    async function fetchData() {
      fetchTransactions();
    }
    fetchData();
  }, []);

  const override = css`
  margin-left: 50%;`;

  return (
    <div>
    <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={40}
          color={'#123abc'}
          loading={loading}
        />
    <div disabled={loading}>
    <ReactTable
       className="container jumbotron trxn-table table-bordered"
       data={transactions}
       columns={columns}
       defaultPageSize={10}
     />
     </div>
     </div>
  );
};

export default Table;