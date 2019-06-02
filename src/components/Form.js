import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transferTransactionAction } from '../redux';
import '../css/form.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StringBuffer from 'stringbuffer';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [transaction, setTransaction] = useState({});
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const formLoading = useSelector((state) => state.formLoading);

  const dispatch = useDispatch();
  const transferTransaction = () => dispatch(transferTransactionAction(transaction));

  const onChangePaymentMode = (e) => {
    console.log(`Payment Mode before ${paymentMode}, setting to ${e.target.value}`);
    transaction.paymentMode = e.target.value;
    setTransaction(transaction);
    setPaymentMode(e.target.value);
  };

  const onChangeAmount = (e) => {
    console.log(`Amount before ${amount}, setting to ${e.target.value}`);
    transaction.amount = e.target.value;
    setTransaction(transaction);
    setAmount(e.target.value);
  };

  const onClickUser = (user) => {
    console.log(`User before ${username}, setting to ${user.target.value}`);
    transaction.username = user.target.value;
    setTransaction(transaction);
    setUsername(user.currentTarget.value);

  };

  const validateForm = () => {
    var errors = [];
    if(!username) errors.push('user');
    if(!amount) errors.push('amount');
    if(!paymentMode) errors.push('paymentMode');

    if (errors.length >0) {
      setErrors(errors);
      return false;
    }

    setErrors(errors);
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    debugger;
    if(!validateForm()) return;
    transferTransaction(transaction);
  };

  const getClassNames = (user, field) => {
      var sb = new StringBuffer();
      if(field === 'user') {
          username === user?sb.append("button-grp "):sb.append("button-grp trxn-button ");
          if(errors.includes('user')) sb.append("error ");
      }

      if(errors.includes(field)) sb.append("error ");
      return sb.toString();
  };

    //Label texts to come from localization JSON file
    return (
      <div className="container jumbotron  paymentForm" disabled={formLoading}>
      <ToastContainer autoClose={5000} />
      <form onSubmit={onSubmit}>

      {errors.length>0 && (
      <div className="row">
          <div className="col-lg-5 error-mesg">
            Please select the fields highlighted in red
         </div>
      </div>
    )}

      <div className="row">

      <div className="col-lg-3">
      <div className="btn-group-vertical">
      <Button className={getClassNames("USER-A","user")} value="USER-A" variant="secondary" onClick={onClickUser}>USER-A</Button>
      <Button className={getClassNames("USER-B","user")} value="USER-B" variant="secondary" onClick={onClickUser}>USER-B</Button>
      <Button className={getClassNames("USER-C","user")} value="USER-C" variant="secondary" onClick={onClickUser}>USER-C</Button>
      </div>

      </div>

      <div className="col-lg-3 marginTop">
      <div>
        <label>
          <input type='radio' className={getClassNames(null, "paymentMode")} name="paymentMode" value="American Express" onChange={onChangePaymentMode}/>
          American Express
        </label>
      </div>

          <div>
            <label>
            <input type='radio' className={getClassNames(null, "paymentMode")} name="paymentMode" value="VISA"  onChange={onChangePaymentMode}/>
            VISA
          </label>
          </div>

          <div>
          <label>
          <input type='radio' className={getClassNames(null, "paymentMode")} name="paymentMode" value="DBS PayLah" onChange={onChangePaymentMode}/>
          DBS PayLah
          </label>
          </div>
      </div>

          <div className='col-lg-2 padding'>
            <label>
            <input type='number' name="amount" className={getClassNames(null, "amount")} value={amount} max='5000' onChange={onChangeAmount}/>
            <br/>
            <p className='help-text'>***Maximum Allowed amount is 5000 INR</p>
            </label>
          </div>

          <div className="col-lg-3 padding">
            <input className="button btn btn-primary transfer-btn" type='submit' disabled={formLoading} value='Transfer' />
            <ClipLoader
                sizeUnit={"px"}
                size={40}
                color={'#123abc'}
                loading={formLoading}
              />
          </div>

      </div>
      </form>
      </div>
    )
}
export default Form;
