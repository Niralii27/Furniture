import React from 'react';
import orange from '../../images/cart1.png'; // Update with your image paths
import chocolate from '../../images/cart2.png';
import beans from '../../images/product-1.jpg';
import contactimg from '../../images/contact.jpg';


function Wishlist() {
  // Button styles
 

  const deleteButtonStyle = {
    backgroundColor: '#DC3545',
    borderColor: '#DC3545',
    color: 'white'
  };

  const moveAllButtonStyle = {
    color: '#CD853F',
    borderColor: '#CD853F',
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    marginTop: '20px',
    display: 'inline-block',
    float: 'right'
  };

 
  
  const productCellStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 10px'
  };

  const productImageStyle = {
    maxWidth: '70px',
    marginRight: '15px',
  };

  return (
    <div style={{ backgroundColor: "#FAFDFF"}}>

         <div>
                          <div className="hero-section position-relative" style={{
                        backgroundImage: `url(${contactimg})`,
                            backgroundPosition: 'center',
                            height: '50vh',
                            position: 'relative'
                          }}>
                            <div className="overlay position-absolute w-100 h-100" style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }}></div>
                            <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative">
                              <h1 className="text-white text-center mb-2">Wishlist</h1>
                              <p className="text-white text-center">Add your Fovorite Items</p>
                            </div>
                          </div>
                    
                </div>
                <div className="container py-4">

      {/* Breadcrumb */}
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent p-0">
          <li className="breadcrumb-item"><a href="#" style={{color: '#6c757d', textDecoration: 'none'}}>Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
        </ol>
      </nav> */}
      
      {/* Wishlist Table */}
      <div className="table-responsive mt-5 pt-5">
        <table className="table">
          <thead style={{backgroundColor: '#f8f9fa'}}>
            <tr>
              <th style={{padding: '15px 10px', fontWeight: '600'}}>Product</th>
              <th style={{padding: '15px 10px', fontWeight: '600'}}>Price</th>
              <th className="ps-5" style={{ padding: '15px 10px', fontWeight: '600' }}>Actions</th>
              </tr>
          </thead>
          <tbody>
            <tr style={{borderBottom: '1px solid #dee2e6'}}>
              <td style={productCellStyle}>
                <img src={orange} alt="Orange" style={productImageStyle} />
                <span>Orange 2 kg</span>
              </td>
              <td style={{verticalAlign: 'middle'}}>₹1080.00</td>
              <td style={{verticalAlign: 'middle'}}>
                <button className="btn ms-4 me-2 light-brown-btn" >Add to cart</button>
                <button className="btn" style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
            <tr style={{borderBottom: '1px solid #dee2e6'}}>
              <td style={productCellStyle}>
                <img src={chocolate} alt="Chocolate" style={productImageStyle} />
                <span>Chocolate</span>
              </td>
              <td style={{verticalAlign: 'middle'}}>₹4200.50</td>
              <td style={{verticalAlign: 'middle'}}>
                <button className="btn ms-4 me-3 light-brown-btn">Add to cart</button>
                <button className="btn" style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
            <tr style={{borderBottom: '1px solid #dee2e6'}}>
              <td style={productCellStyle}>
                <img src={beans} alt="Beans" style={productImageStyle} />
                <span>Beans - Broad (Loose), 500 g</span>
              </td>
              <td style={{verticalAlign: 'middle'}}>₹1700.00</td>
              <td style={{verticalAlign: 'middle'}}>
                <button className="btn ms-4 me-3 light-brown-btn">Add to cart</button>
                <button className="btn" style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Move All to Cart Button */}
      <div className="text-right">
        <button className="btn" style={moveAllButtonStyle}>Move all to cart</button>
      </div>
    </div>
    </div>
  );
}

export default Wishlist;