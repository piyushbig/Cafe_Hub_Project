import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import '../Cafe/myOrder.css'
import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "./CustomerNavbar";

export default function MyOrder(){

  const [orderList,setOrderList]=useState([]);

  

   useEffect(() => {
    const currentUser =localStorage.getItem("userID")
    axios.get(`http://localhost:8086/orders/orderitem/fetch/${currentUser}`)
        .then((response) => {
            setOrderList(response.data);
            console.log(response.data);
        })
        
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Handle the error, display a message to the user, retry the request, etc.
        });
    }, []);
    return(
        <>
        <CustomerNavbar/>
        <Container fluid="md">
        <Row> 
          <div id="container"><Col><h1>My Orders</h1></Col></div>
        </Row>

        <Table className="mt-4 sm-8 lg md">
        <thead>
                <tr>
                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>
                    Product ID
                  </th>
                  <th className="text-center  "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Name</th>

                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Category</th>
                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Cafe</th>
                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Price</th>
                
                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Quantity</th>
                  <th className="text-center "style={{ backgroundColor: '#325f53', color: '#ffffff' }}>Status</th>
                
                </tr>
              </thead>
        <tbody id="tbl_head">
        
        {
                orderList.map((o)=>{
                  return(
            <tr >
                <th>{o.orderItemId}</th>
                {/* <th>Food</th> */}
                <th className="text-center">{o.product ? o.product.name : 'N/A'}</th>
                <th className="text-center">{o.product && o.product.category ? o.product.category.name : 'N/A'}</th> 
                <th className="text-center">{o.order && o.order.cafe ? o.order.cafe.name : 'N/A'}</th>
                <th className="text-center">{o.product.price}</th>
                <th className="text-center">{o.quantity}</th>
                <th className="text-center">{o.order.status}</th>
                {/* <th>Order Time</th>
                <th>Order Status</th> */}
                {/* <th>Delivery Person</th>
                <th>Delivery Contact</th>
                <th>Delivery Time</th> */}

            </tr>
            )
                })
            } 
        </tbody>
        
        </Table>
        
      </Container>
      </>
    );
}