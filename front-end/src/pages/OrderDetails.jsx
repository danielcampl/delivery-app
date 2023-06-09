import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import TableOrders from '../components/TableOrders';
import dataTestsIds from '../utils/dataTestIds';

const Main = styled.section`
    background-color: #FFF3E0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 30px;
    section {
      display: flex;
      width: 60%;
      flex-direction: row;
      padding-left: 380px;
      justify-content: center;
    }

    div {
      margin: auto;
      background-color: #C94E35;
      width: 340px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      color: white;
    }

    .total-value {
      background-color: #C94E35;
      padding: 10px;
      border-radius: 5px;
      width: 200px;
      height: 20px;
      color: #FFF;
      font-weight: bold;
      display: flex;
      justify-content: center;
      border: 3px solid black;
    }
  `;

export default function OrderDetails() {
  const [sales, setSalles] = useState({});
  const [status, setStatus] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/customer/orders/${id}`).then(({ data }) => {
      setSalles(data);
      console.log('axios status data', data);
      setStatus(data.status);
    });
  }, [id, status]);
  const DATE_SLICE = 10;

  const changeStatusInDB = async (value) => {
    await axios.put(`http://localhost:3001/customer/orders/${id}`, { status: value });
  };

  const handleStatus = ({ target: { value } }) => {
    setStatus(value);
    changeStatusInDB(value);
  };
  return (
    <>
      <div className="container-product">
        <header>
          <NavBar />
        </header>
      </div>
      <Main>
        <section>
          <div data-testid={ `${dataTestsIds[38]}` }>
            {`Pedido ${sales.id}`}
          </div>
          <div data-testid={ `${dataTestsIds[39]}` }>
            <p>Vendedor(a): Fulana Pereira</p>
          </div>
          <div data-testid={ `${dataTestsIds[40]}` }>
            {`Data: 
            ${sales.saleDate?.slice(0, DATE_SLICE).split('-').reverse().join('/')}`}
          </div>
          </section>
          <TableOrders
            sales={ sales }
            status={ status }
            handleStatus={ handleStatus }
          />
          <div data-testid={ `${dataTestsIds[47]}` } className="total-value">
            {`Total: $ ${sales.totalPrice?.replace(/\./, ',')}`}
          </div>
      </Main>
    </>
  );
}
