import React, { useEffect, useState } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import { TextField,Button, Grid,IconButton,InputAdornment,Input,InputLabel, ButtonGroup,Popover,Modal,Paper,Checkbox,FormControlLabel,Select,MenuItem,FormControl} from '@material-ui/core';
import {Autocomplete,Pagination} from '@material-ui/lab';
import {Close,CreateOutlined, DeleteForeverOutlined, SearchOutlined,
  ExpandMore,Edit,  Delete,Search,CalendarToday,MoreVert,KeyboardBackspace,AddCircleOutline,SendOutlined,FiberManualRecord} from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/sucessful.json';
import animationData2 from 'modules/animations/mail.json';
import { useHistory } from 'react-router';
import { ReactComponent as Bank } from '../../lib/assets/icons/BankColored.svg';
import { ReactComponent as AddIcon } from '../../lib/assets/icons/AddColored.svg';
import { ReactComponent as Person } from '../../lib/assets/icons/person_add.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {moneyFormat} from '../../lib/helpers/formatCurrency';
import Moment from 'react-moment';
import moment from 'moment';

import './index.css';
import Backdrop from '@material-ui/core/Backdrop';
import NaijaStates from 'naija-state-local-government';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { func } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function Invoice() {
  const [path, , pathname] = useRouter();
  const history = useHistory();
  const location = useLocation();

//SucessAnimationData
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

//MailAnimationData
const defaultOption2 = {
  loop: false,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [fromDate, setFromDate] =useState('');
  const [toDate, setToDate] =useState('');
  const [searchValue, setSearchValue] =useState('');
  const [selection, setSelection] =useState({});

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [modalInvoice, setModalInvoice] = useState(null);
  const [pageType, setPageType] = useState(1);
  const { register, handleSubmit, errors } = useForm();

  const [stage,setStage]=useState(1)
  const [invoiceStage,setInvoiceStage]=useState(1)
  const [newInvoiceStage,setNewInvoiceStage]=useState(1)
  const [addMore,setAddMore]=useState(1)

  const [customers,setCustomers]=useState([])
  const [customer,setCustomer]=useState({})
  const [invoices,setInvoices]=useState([])
  const [_invoice,set_invoice]=useState({})
  const [items,setItems]=useState([])
  const [customerItems,setCustomerItems]=useState([])
  const [creditNoteItems,setCreditNoteItems]=useState([])
  const [tempCreditNote,setTempCreditNote]=useState({})
  const [creditNotes,setCreditNotes]=useState([])
  const [_creditNote,set_creditNote]=useState([])
  const [tempInvoice,setTempInvoice]=useState({})
  const [discount,setDiscount]=useState(0)
  const [discountType,setDiscountType]=useState("PERCENTAGE")
  


  useEffect(() => {
    if(location.data!=null) setPageType(2)
    dispatch('get','/api/v1/accounting/customers','getCustomers')
    refresh()
    dispatch('get','/api/v1/accounting/products','getItems')

   // dispatch('get','/api/v1/accounting/invoices','getCreditNotes','?customerId='+d.id)
  }, []);

  const refresh = (filter='')=>{
    dispatch('get','/api/v1/accounting/invoices','getInvoices',filter)
  }

  useEffect(() => {
    const subTotal= customerItems.reduce((a,v) =>  a = a + v.amount,0)
    const subTotal2=customerItems.reduce((a,v) =>  a = a + v.amount2,0)
    const total=subTotal - (discountType!="PERCENTAGE" ? discount : (discount*0.01*subTotal2))
    setTempInvoice({...tempInvoice,subTotal:subTotal2, vatTotal: subTotal-subTotal2, total:total,items:customerItems})
    console.log(tempInvoice)
  }, [customerItems,discount,discountType]);

  useEffect(() => {
    set_creditNote({..._creditNote,items:creditNoteItems})
    console.log("CREDITNOTE",_creditNote)
  }, [creditNoteItems]);


  const SearchT = (e) => {
    const s = e.target?.value;
    setSearchTerm(s);
  };


  // constant definition for openning and closing the popups and modals of the application
  const openPopup = (type, e,n)=>{
    setShowPopup({type:type,data:e,n:n})
  }
  const closePopup = ()=>{
    setShowPopup(null)
    setSearchValue('')
  }

  const openModal = (type, e, footer)=>{
    setShowPopup(null);  
    setShowModal({type:type,data:e,nofooter:footer})
  }
  const closeModal = ()=>{
    setShowModal(null)
    closePopup()
  }

  const goTo = (d)=>{
    if(d==2)setNewInvoiceStage(1)
    setPageType(d)
  }

  const updateCreditNoteItem=(value, object, type)=>{
   
    switch(type){
      case 1:
        setCreditNoteItems(
          creditNoteItems.map(item => 
              item.id === object.id 
              ? {...item, return : value,name:item.description} 
              : item 
          ))
        break
    }  
  }

  const updateCustomerItem=(value, object, type)=>{
    switch(type){
      case 1:
        setCustomerItems(
          customerItems.map(item => 
              item.id === object.id 
              ? {...item, quantity : value, amount: object.vatIncluded ? (value*object.price) +((value*object.price)*0.075) : value*object.price, amount2:value*object.price} 
              : item 
          ))
        break
      case 2:
        setCustomerItems(
          customerItems.map(item => 
              item.id === object.id 
              ? {...item, vatIncluded : value, amount: value ? object.amount +(object.amount*0.075) : object.quantity*object.price,amount2:object.quantity*object.price} 
              : item 
      ))
        break
      case 3:
        setDiscountType(value)
        setTempInvoice({...tempInvoice,discount:{amount:discount,type:value}})
        break;
      case 4:
        setDiscount(value)
        setTempInvoice({...tempInvoice,discount:{amount:value,type:discountType}})
        break;
    }

  
  }

  //Root return
  return (
    <div className="body">
        {PageSwitch()}
        {showDropdown()}
    </div>
  );

  //Defines the subpages switches
  function PageSwitch(){
    switch (pageType){
      case 1: return InvoicePage()
      case 2: return AddInvoicePage()
      case 3: return ViewInvoicePage()
      case 4: return CreditNotePage()
    }
  }

  //Startup page for invoice
  function InvoicePage(){
    return (
      <div>
        <Header path={path} url={'/dashboard/invoice'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
        <div className="space-top">
          <div className="push-left-right">
            <div>
            <TextField
                  placeholder="Search Invoice/credit note"
                  variant="outlined"
                  fullWidth
                  style={{width:'320px'}}
                  onKeyUp={(e)=>setSearchValue(e.target.value)} 
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
            <div className="ruby center2">
              <Button variant="outlined" className="space-right2" color="primary" onClick={(e)=>openPopup('addCustomer',e.currentTarget,1)}>Issue Credit Note</Button>
              <Button variant="contained" color="primary" onClick={()=> goTo(2)}>Create an Invoice</Button>
            </div>
          </div>
        </div>

        <div className="space-top box">
          <Grid container>
            <Grid item xs={1}>
              <div className="text bold">Filter:</div>
            </Grid>
          </Grid>

          <Grid container spacing={2} className="space-top2 space-bottom2">
            <Grid item xs={4} >
              <div className="ruby">
                <span className="text space-right2">Customer</span>  
                  {/* <TextField
                    placeholder="Search Customer"
                    variant="outlined"
                    onKeyUp={(e)=>setSearchValue(e.target.value)} 
                    size="small"
                    style={{background:'#fff'}}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                  /> */}

              {SelectDropDown('customerSelect','All Customers','')}
              </div>
            </Grid>
            <Grid item xs={2} >
              {SelectDropDown('statusSelect','Status','')}
            </Grid>

            <Grid item xs={3} >
              <div className="ruby">
                <span className="text space-right2">Date:</span>
                <div style={{position:'relative'}}>
                        <div className=""  style={{position:'absolute',zIndex:'10', right:'10px',paddingTop:'6px'}}>
                        <CalendarToday variant="outlined" />
                        </div>
                        <DatePicker
                          placeholderText="Select Date"
                          className="datepicker text padding1 click"
                          onChange={ date => setFromDate(date) }
                          selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                          dateFormat="dd/MM/yyyy"
                          selected={fromDate}    
                          startDate={fromDate}
                          endDate={toDate}
                          maxDate={toDate}
                        />
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="ruby space-right2">
                <span className="text space-right2">To:</span>  
                <div style={{position:'relative'}}>
                        <div className=""  style={{position:'absolute',zIndex:'10', right:'10px',paddingTop:'6px'}}>
                        <CalendarToday variant="outlined" />
                        </div>
                        <DatePicker
                          placeholderText="Select Date"
                          className="datepicker text padding1 click"
                          onChange={ date => setToDate(date) }
                          selectsEnd showMonthDropdown showYearDropdown dropdownMode="select"
                          dateFormat="dd/MM/yyyy"
                          selected={toDate}    
                          startDate={fromDate}
                          endDate={toDate}
                          minDate={fromDate}
                        />
                </div>
              </div>
            </Grid>

          </Grid>
         
        </div>
          {invoiceTable()}
        </div>
       
      </div>

    )
  }

  function getCustomerAddress(e){
    return `${e?.number} ${e?.street} ${e?.city} ${e?.lga} ${e?.state!=null ? e.state:""} ${e?.country}`
  }

  function AddInvoicePage(){
    const handleInputChange = (e) => {
     //   item[e.target.name] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }
  
    return (
      <div>
        <Header path={path} url={'/dashboard/invoice'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
       

        <div className="space-top">
          <div className="push-left-right">
            <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
            <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
            </div>
            <div className="ruby">
             {newInvoiceStage==2 && <Button variant="outlined" className="space-right2">Preview</Button>}
             <Button variant="contained" color="primary" onClick={(e)=>openPopup('saveAndSend',e.currentTarget)}>Save and Send</Button>
            </div>
          </div>
        </div>

        
        <div style={{border:'0.3px solid #dfdfdf', borderRadius:'3px',marginTop:'20px',paddingBottom:'10px'}}>
          <div style={{padding:'20px 30px'}}>
          <div className="text bold space-bottom md">Billed to</div>
          
            <Grid container>
            {newInvoiceStage==1 ?
            <Grid item xs={5}>
              <div className="box2 click" style={{padding:'40px'}} onClick={(e)=>openPopup('addCustomer',e.currentTarget,2)}>
                <div className="center">
                  <Person/>
                  <div className="text blue">Add Customer</div>
                </div>
              </div>
              </Grid>

            :
            <Grid item xs={5}>
              <div className='text'>{customer.name}</div>
              <div className='text'>{getCustomerAddress(customer.address)}</div>
              <div className="text blue">{customer.email}</div>

              <span className="ruby space-top">
              <span className="text sm blue click bold">Edit this Customer</span> <FiberManualRecord color="primary" fontSize="small" style={{padding:'0px 5px'}}/>
              <span className="text sm blue click bold" onClick={(e)=>openPopup('addCustomer',e.currentTarget,2) }>Select another Customer</span> 
            </span>
            </Grid>
            }
            <Grid item xs={1}></Grid>
            <Grid item xs={6} className="push-right">
            <div>
              <div>
                <div className="ruby">
                  <div className="text space-right2">Invoice No:</div>
                  <TextField type="number" onChange={(e)=>setTempInvoice({...tempInvoice,number:e.target.value})} variant='outlined' size="small" fullWidth  style={{width:'200px'}}/>
                </div>
              </div>
              <div>
              <div className="ruby space-top2">
                <div className="text space-right2">Date of Issue:</div>
                <div style={{position:'relative',width:'200px'}} className="mRight">
                  <div style={{position:'absolute', right:'10px',paddingTop:'6px'}}>
                  <CalendarToday variant="outlined" />
                  </div>
                  <DatePicker
                    placeholderText="Select Date"
                    className="datepicker text padding1 click"
                    onChange={ date => setTempInvoice({...tempInvoice,issueDate:date})}
                    selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    selected={tempInvoice.issueDate}    
                    startDate={tempInvoice.issueDate}
                    endDate={tempInvoice.dueDate}
                    maxDate={tempInvoice.dueDate}
                  />
                </div>
              </div>
            </div>
              <div className="ruby space-top2">
                <div className="text space-right2">Due Date:</div>
                <div style={{position:'relative',width:'200px'}}  className="mRight">
                  <div style={{position:'absolute', right:'10px',paddingTop:'6px'}}>
                  <CalendarToday variant="outlined" />
                  </div>
                  <DatePicker
                    placeholderText="Select Date"
                    className="datepicker text padding1 click"
                    onChange={ date => setTempInvoice({...tempInvoice,dueDate:date}) }
                    selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    selected={tempInvoice.dueDate}    
                    startDate={tempInvoice.issueDate}
                    endDate={tempInvoice.dueDate}
                    minDate={tempInvoice.issueDate}
                  />
                </div>
              </div>
              <div className="ruby  space-top2">
                <div className="text space-right2">Reference:</div>
                <TextField  onChange={(e)=>setTempInvoice({...tempInvoice,reference:e.target.value})}variant='outlined' size="small"  fullWidth style={{width:'200px'}}/>
              </div>
            </div>
            </Grid>
          </Grid>
          </div>
          <div>
            {itemTable()}
          </div>
          <div>
            {Payment()}
          </div>

          
        </div>
        </div>
      </div>

    )
  }

  function ViewInvoicePage(){
    return (
      <div>
        
        <div style={{marginTop:'20px'}}>
        {invoiceStage==2 &&
          <div>
             <div className="text bold lg">Preview</div>
             <div className="click space-top"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px',display:'table'}}>
              <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
              </div>
          </div>
        }
        {invoiceStage==1 &&
          <div>
              <div className="text bold lg">Invoice #{_invoice.number}</div>
              <div className="space-top push-right">
                <div className="ruby">
                <Button variant="outlined" color="primary" className="space-right2">Resend</Button>
                <Button variant="contained" color="primary" className="space-right2" onClick={()=>goTo(1)}>Done</Button>
                </div>
             </div>
             <div className="space-top box2" style={{padding:'15px'}}>
              <Grid container>
                <Grid item  xs={4}>
                  <div className="ruby center2">
                    <div style={{border:'0.893617px solid #1F53D7',borderRadius:'2.7px',padding:'3px 3px 1px 3px'}}>
                      <SendOutlined style={{transform: 'rotate(-30deg)',padding:'2px'}} className="center" />
                    </div>
                    <div className="space-left2">
                      <div className='text bold lg'>Payment Recorded</div>
                      <div className="ruby">
                        <span className="text space-right2 blue">Amount Paid:</span>
                        <span className="text">{moneyFormat('76637676')}</span>
                    </div>
                  </div>
                  </div>
                </Grid>
                <Grid item xs={8}className="push-right">
                  <div>
                    <div className="text">Payments received:</div>
                    <div className="text">January 20, 2021 - A payment of NGN1,500,000.00 ‎ was made using Bank Transfer.</div>
                  </div>
                </Grid>
              </Grid>
             </div>

          </div>
        }
        {invoiceStage>=3 &&
        <div>
        <span className="text bold lg">Invoice #{_invoice.number}</span>
        <div className="space-top">
          <div className="push-left-right">
            <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
            <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
            </div>
            <div className="ruby">
              <Button variant="outlined" color="primary" className="space-right2">Customer Preview</Button>
              <Button variant="outlined" color="primary" className="space-right2">Resend</Button>
              <Button variant="contained" color="primary" onClick={()=>openModal('recordPayment',_invoice,true)}>Record Payment</Button>
            </div>
          </div>
        </div>

        <div className="box2 space-top">
          <Grid container>
            <Grid item  xs={6}>
              <div className="ruby">
                <div className="space-right">
                  <div className="text">Customer</div>
                  <div className="text bold">Dolby Inc.</div>
                </div>
                <div className="space-right">
                  <div className="text">Status</div>
                  <div className="text bold">{invoiceStage==4?"Draft":"Sent"}</div>
                </div>
              </div>
            </Grid>

            <Grid item xs={6} className="push-right">
              <div className="ruby push-right">
                <div className="space-right">
                  <div className="text">Amount Due</div>
                  <div className="text bold">{moneyFormat('6636676767')}</div>
                </div>
                <div className="space-right">
                  <div className="text">Due Date</div>
                  <div className="text bold">15/03/2021</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        </div>
        }
        <div style={{margin:'20px 60px',padding:'30px'}}>
          {invoiceStage==1 &&
          <div className="push-right">
            <span className="ruby">
              <span className="text blue click bold" onClick={()=>openModal('sendInvoiceReceipt',null,false)}>Send Reciept</span> <FiberManualRecord color="primary" fontSize="small" style={{padding:'0px 5px'}}/>
              <span className="text blue click bold">Edit Payment</span> <FiberManualRecord color="primary" fontSize="small" style={{padding:'0px 5px'}}/>
              <span className="text blue click bold" onClick={()=>openModal('removePayment',null,false) }>Remove Payment</span> 
            </span>
          </div>}
          {invoice()}
        </div>
      </div>
       </div>

    )
  }

  //Standard template function of an invoice
  function invoice(){
    let items=[
      {id:1,name:'Strawberries',quantity:'20 Carton',price:'78778798',amount:'86456877'},
    ]
   
    return (
      <div>
      <div className="invoiceBox">
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <div>
              <div className="placeholderBox">
                <span className="text2 bold">Logo</span>
              </div>

              <div style={{marginTop:'100px'}}>
                <div className="text2 md bold space-bottom2">Bill To:</div>
                <div className="text2 space-bottom2">Dolby Inc 102 Bayview Ave Toronto, Ontario M6P 2K6</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="shift-right">
              <div className="text2 bold " style={{fontSize:'40px'}}>Invoice</div>
              <div className="text2 bold" style={{fontSize:'22px'}}>Fresible</div>
              <div className="text2">Nigeria</div>

              <div style={{marginTop:'50px'}}>
                <div className="text2 space-bottom2">Invoice No: #{_invoice.number}</div>
                <div className="text2 space-bottom2">Quote Date: <Moment format={'DD/MM/YYYY'} date={_invoice?.issueDate} /></div>
                <div className="text2 space-bottom2">Expires On:<Moment format={'DD/MM/YYYY'} date={_invoice?.dueDate} /></div>
                <div className="text2 bold space-bottom2">Grand Total: {moneyFormat(_invoice.total)}</div>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container className="space-top">
          <Grid item xs={4}>
            <span className="text2 bold">Item</span>
          </Grid>
          <Grid item xs={2}>
            <span className="text2 bold">Quantity</span>
          </Grid>
          <Grid item xs={3} className="push-right">
            <span className="text2 bold">Price</span>
          </Grid>
          <Grid item xs={3} className="push-right">
            <span className="text2 bold ">Amount</span>
          </Grid>
        </Grid>
        <hr className="hr3"/>
        {_invoice.items?.map((data,index)=>{
            return(
              <div>
             
              <Grid container spacing={1}>
                  <Grid item xs={4}><span className="text3">{data.description}</span></Grid>
                  <Grid item xs={2}><span className="text3">{data.quantity}</span></Grid>
                  <Grid item xs={3} className="push-right"><span className="text3">{moneyFormat(data.price)}</span></Grid>
                  <Grid item xs={3} className="push-right"><span className="text3">{moneyFormat(data.amount)}</span></Grid>
              </Grid>
              <hr className="hr"/>
              </div>
          )
        })}
        <div  style={{marginTop:'50px'}}>
        {[{name:'Sub Total',value:_invoice.subTotal},
          {name:'Discount',value: _invoice.discount?.amount},
          {name:'VAT',value:_invoice.vatTotal},
          ].map((data,index)=>{
            return(
              <Grid container spacing={1} className="space-top">
                <Grid item xs={9} className="push-right"><span className="text bold">{data.name}:</span></Grid>
                <Grid item xs={3} className="push-right"><span className="text3">{moneyFormat(data.value)}</span></Grid>
              </Grid>
              )
            })}
         </div>
        <hr className="hr3"/>

        <Grid container spacing={1} className="space-top">
          <Grid item xs={3}></Grid>
          <Grid item xs={6} className="push-right"><span className="text bold">Total:</span></Grid>
          <Grid item xs={3} className="push-right"><span className="text3">{moneyFormat(_invoice.total)}</span></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <div className="text bold md">Bank Details:</div>
            <div className="text sm">{_invoice.bankDetails +"- 0034578984 Cube Inc."}</div>
            <div className="text md bold space-top">Terms/Notes:</div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
          <div className="space-top2" style={{width:'70%',padding:'20px',background:'#F9F9F9'}}>
            <span className="text italic sm light">{_invoice.note}</span>
          </div>
          </Grid>
        </Grid>
      </div>

      <div style={{background:'#336666',padding:'40px 20px'}}>
        <div className="white shift-right">
          <span className="text2 white bold">Grand Total:</span>
          <hr className="space-y hr2"/>
          <div className="text3 space-top white space-bottom2" style={{fontSize:'45px',lineHeight:'30px'}}>{moneyFormat(_invoice.total)}</div>
          <div className="text2 sm white">Total payment due in  <Moment date={_invoice.dueDate}  toNow ago/>.</div>
          <hr className="space-y hr2"/>
        </div>

        <div className="push-left-right center2">
          <div className="ruby">
              <span style={{padding:'15px',background:'#fff',borderRadius:'50px'}}></span>
              <span className="text white space-left2">Thank you! — dolbyinc@gmail.com</span>
          </div>
          <span className="text white">₦ - Naira</span>
        </div>          
      </div>

      </div>
    )
  }
  
  const handleChange = (event, value) => {
    setPage(value);
  };


  function CreditNotePage(){
    const ROWS_PER_PAGE=10
    const items=[
      {id:1,number:"0098",issueDate:'12/11/2021',item:"Carrot1s",quantity:20,amount:'378378370',VAT:'2020202',return:2,price:'9389939'},
      {id:2,number:"#0098",issueDate:'12/11/2021',item:"Carrot2s",quantity:20,amount:'378378370',VAT:'2020202',return:2,price:'9389939'},
      {id:3,number:"#0098",issueDate:'12/11/2021',item:"Carrot3s",quantity:20,amount:'378378370',VAT:'2020202',return:2,price:'9389939'},
     ]

    const select =(data)=>{
      setStage(2);
      const d={
        invoiceId:data.id,
        issuedAt:data.issueDate,
        number:data.number,
        subTotal:data.subTotal,
        vatTotal:data.vatTotal,
        note:data.note,
        total:data.total,
        items:data.items
      }
      set_creditNote(d)
      setCreditNoteItems(data.items)
      setCreditNoteItems(
        creditNoteItems.map(item => 
            item!=null
            ? {...item, name:item.description} 
            : item 
        ))
    }
    return (
      <div>
        <Header path={path} url={'/dashboard/invoice'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
       
        {stage==1 ? <div>
          <div className="space-top">
            <div className="push-left-right">
              <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
              <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
              </div>
          </div>
          </div>
          
          <div style={{border:'0.3px solid #dfdfdf', borderRadius:'3px',marginTop:'20px',paddingBottom:'10px'}}>
          <div className="padding">
          <Grid container>
            <Grid item xs={3} style={{marginTop:'40px'}}>
              <div className='text'>{customer.name}</div>
              <div className='text'>{getCustomerAddress(customer.address)}</div>
              <div className="text blue">{customer.email}</div>
            </Grid>
          </Grid>
          

          <div className="space-y text sm click blue" onClick={(e)=>openPopup('addCustomer',e.currentTarget,1)}>Select another customer</div>
          </div>

        <div>
            <hr className="hr"/>
            <Grid container className="padding-y">
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold space-left2">Invoice No</span></Grid>
              <Grid item xs={2}><span  style={{background:'#FCFFFF'}} className="text bold">Date</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Item</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Quantity</span></Grid>
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold">Amount</span></Grid>
            </Grid>
            
            {creditNotes.map((data,index)=>{
              return(
                <div>
                <hr className="hr"/>
                <Grid container spacing={1} style={{paddingTop:'5px'}}>
                    <Grid item xs={3}><span className="text space-left2">#{data.number}</span></Grid>
                    <Grid item xs={2}><span className="text"><Moment format={'DD/MM/YYYY'} date={data?.issueDate} /></span></Grid>
                    <Grid item xs={2}><span className="text">{data.item}</span></Grid>
                    <Grid item xs={2}><span className="text">{data.quantity}</span></Grid>
                    <Grid item xs={3}>
                      <div className="push-left-right">
                        <span className="text">{moneyFormat(data.amount)}</span>
                        <span className="text bold blue click space-right2" onClick={()=>select(data)}>Select</span>
                      </div>
                    </Grid>
                </Grid>
                </div>
            )
          })}
        </div>
        </div>
        <Pagination count={Math.ceil(items.length / ROWS_PER_PAGE)} page={page} className="push-right flex space-top2"
            onChange={handleChange} variant="outlined" shape="rounded" color="primary"/>
      </div>
      :
      <div>
          <div className="space-top">
            <div className="push-left-right">
              <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
              <KeyboardBackspace className="center block" onClick={()=>setStage(1)}/>
              </div>
              <Button variant="contained" color="primary" onClick={()=>openModal('confirmAction',{},false)}>Approve</Button>
          </div>
          </div>
          
          <div>
          <div style={{border:'0.3px solid #dfdfdf', borderRadius:'3px',marginTop:'20px',paddingBottom:'10px'}}>
         
          <div className="padding">
            <div className='text bold lg' style={{marginTop:'30px'}}>Send to:</div>
            <Grid container style={{marginTop:'40px'}}>
            <Grid item xs={3}>
              <div className='text'>{customer.name}</div>
              <div className='text'>{getCustomerAddress(customer.address)}</div>
              <div className="text blue">{customer.email}</div>
            </Grid>
            <Grid item xs={9} className="push-right">
                <div>
                  <div className="ruby">
                    <span className="text space-right2">Invoice No:</span>
                    <TextField name="name" disabled value={_creditNote.number} className="mRight" style={{width:'188px'}} fullWidth variant='outlined'  size="small"   />
                  </div>
                </div>

                <div>
                <div className="ruby space-top2">
                  <span className="text space-right2" style={{width:'120px'}}>Date of Issue:</span>
                  <div >
                  <TextField name="name" disabled value={moment(_creditNote.issuedAt).format('DD/MM/YYYY')}className="mRight" style={{width:'188px'}} fullWidth variant='outlined'  size="small"   />
                  {/* <DatePicker
                              className="mRight"
                              placeholderText="Select Date"
                              className="datepicker text padding1 click"
                              onChange={ date => setFromDate(date) }
                              selected={_creditNote.issuedAt}
                              selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                            /> */}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          </div>
        <div>
            <hr className="hr"/>
            <Grid container spacing={2} className="padding-y">
              <Grid item xs={2}><span style={{background:'#FCFFFF'}}  className="text bold space-left2">Item</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Quantity</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Quantity-Return</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Price</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}}  className="text bold">VAT</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Amount</span></Grid>
            </Grid>
            {creditNoteItems.map((data,index)=>{
              return(
                <div>
                <hr className="hr"/>
                <Grid container spacing={2} className="center2" style={{paddingTop:'5px'}}>
                    <Grid item xs={2}><span className="text truncate space-left2">{data.description}</span></Grid>
                    <Grid item xs={2}><span className="text">{data.quantity}</span></Grid>
                    <Grid item xs={2}><TextField variant="outlined" type="number"  InputProps={{
                    inputProps: { type: 'number',min: 0, max: data.quantity, },}} onChange={(e)=>updateCreditNoteItem(e.target.value,data,1)} defaultValue="0" size="small" /></Grid>
                    <Grid item xs={2}><span className="text">{moneyFormat(data.price)}</span></Grid>
                    <Grid item xs={2}><span className="text">{moneyFormat(data.VAT)}</span></Grid>
                    <Grid item xs={2}>
                      <div className="push-left-right center2">
                        <span className="text">{moneyFormat(data.amount)}</span>
                        <DeleteForeverOutlined style={{ color: '#EB5757' }} className="space-right2 click" onClick={()=>console.log('')} />
                      </div>
                    </Grid>
                </Grid>
                </div>
            )
          })}
        </div>
        <hr className="hr"/>
      
      <div className="space-top padding-x">
        <Grid container>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <div className="space-top box">
              {[{name:'SubTotal',value:_creditNote.subTotal},
                {name:'VAT',value: _creditNote.vatTotal},
                {name:'Total',value:_creditNote.total},].map((data,index)=>{
                  return (
                    <div className="push-left-right space-top2">
                      <span className="text">{data.name}</span>
                      <span className="text bold">{moneyFormat(data.value)}</span>
                    </div>
                  )
                })}

            </div>
          </Grid>
        </Grid>

        <span className="text bold space-top">Terms/Notes</span>
        <div className="box2">
          <span className="text light italic sm">{_creditNote.note}</span>
        </div>
    </div>
      

    
      </div>
      </div>
    </div>
    }
        
        </div>
        </div>
    )
  }

  //Helper function
  function showdata(a,b){
    return (
      <div className="push-left-right" style={{padding:'5px 10px'}}>
        <span className="text">{a}</span>
        <span className="text">{b}</span>
      </div>
    )
  }

  

  function itemTable(){
    const ROWS_PER_PAGE=10
    const items=[
      {id:1,name:"Banana Milk Shake",code:'101',quantity:100,price:'2022029',isTaxed:true,amount:'378378370'},
      {id:1,name:"Banana Milk Shake",code:'101',quantity:100,price:'2022029',isTaxed:false,amount:'378378370'},
      {id:1,name:"Banana Milk Shake",code:'101',quantity:100,price:'2022029',isTaxed:true,amount:'378378370'},
      {id:1,name:"Banana Milk Shake",code:'101',quantity:100,price:'2022029',isTaxed:true,amount:'378378370'},
    ]
    return (
      <div>
          
          <hr className="hr"/>
            <Grid container spacing={1} className="padding-y">
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold space-left">Item</span></Grid>
              <Grid item xs={2}><span  style={{background:'#FCFFFF'}} className="text bold">Quantity</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Price</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold space-left2">Tax</span></Grid>
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold">Amount</span></Grid>
            </Grid>
          
          {customerItems.map((data,index)=>{
            return(
              <div>
              <hr className="hr"/>
              <Grid container spacing={1} className="center2">
                  <Grid item xs={3}>
                    <span className="ruby space-right2 space-left2">
                      <span className="text blue">{data.description+" - "}</span>
                      <span className="text">{data.code}</span>
                    </span>
                  </Grid>
                  <Grid item xs={2}><TextField size="small" variant='outlined' onChange={(e)=>updateCustomerItem(e.target.value,data,1)} defaultValue={data.quantity}/> </Grid>
                  <Grid item xs={2}><span className="text">{moneyFormat(data.price)}</span></Grid>
                  <Grid item xs={2}> 
                  <FormControlLabel
                      value="VAT(7.5%)"
                      control={<Checkbox onChange={(e)=>updateCustomerItem( e.target.checked,data,2)} color="primary" defaultChecked={data.vatIncluded} />}
                      label="VAT(7.5%)"
                      labelPlacement="start"
                    /></Grid>
                  <Grid item xs={3}>
                      <div className="push-left-right center2">
                        <span className="text">{moneyFormat(data.amount)}</span>
                        <DeleteForeverOutlined style={{ color: '#EB5757' }} className="space-right2 click" onClick={()=>console.log('')} />
                      </div>
                    </Grid>
              </Grid>
              </div>
          )
        })}
          <hr/>
          <div className="center padding">
            <span className="ruby center click" onClick={(e)=>openPopup('addItem',e.currentTarget)}>
              <AddCircleOutline color="primary"/>
              <div className="text blue bold">Add Item</div>
            </span>
          </div>
          <hr/>
        </div>)
  }

    function Payment(){
        return (
        <div style={{padding:'20px'}}>
            <Grid container style={{marginTop:'15px'}}>
              <Grid item xs={5}>
                <div>
                  <div className="text lg bold">Online Payment:</div>
                  <div className="text sm space-bottom2">Do you want to allow payment with paystack</div>
                  <select className="select" onChange={(e)=>setTempInvoice({...tempInvoice,acceptsOnlinePayment:e.target.value}) }>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>

                  <div className="text lg bold space-top space-bottom2">Bank Details:</div>
                  <div className="box2 ">
                    <TextField 
                    className="text" style={{lineHeight:'30px'}}
                    placeholder={"First Bank of Nigeria - 0034578984 "+  customer.name}
                    name="bankDetails" fullWidth variant='standard' fontSize="small" multiline maxRows={2} rows={2}
                    onChange={(e)=>setTempInvoice({...tempInvoice,bankDetails:e.target.value})} />
                    {/* <div className="text">First Bank - 0034578984</div>
                    <div className="text">Cube Inc.</div> */}
                  </div>
                  <div className="text lg bold space-top space-bottom2">Terms/Notes:</div>
                  <div className="box2 spae-top2">
                    {/* <span className="text sm italic">Thank you for doing business with us.</span> */}

                    <TextField 
                    placeholder={"Thank you for doing business with us."}
                    name="bankDetails" fullWidth variant='standard' className="text sm italic" fontSize="small" multiline maxRows={2}
                    onChange={(e)=>setTempInvoice({...tempInvoice,note:e.target.value})} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={4} className="push-right">
                <div className="shift-right box">
                  <div className="push-left-right space-top center2">
                    <span className="text">Subtotal:</span>
                    <span className="text push-right bold">{moneyFormat(tempInvoice.subTotal)}</span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text ruby">
                      Discount:
                      <select className="select" style={{marginLeft:'5px'}} onChange={(e)=>updateCustomerItem(e.target.value,null,3) }>
                        <option value="PERCENTAGE">%</option>
                        <option value="FIXED">₦</option>
                      </select>
                    </span>
                    <span className="text push-right bold"><TextField size="small" onChange={(e)=>updateCustomerItem(e.target.value,null,4)} style={{width:'80px',fontSize:'12px',background:'#ffffff'}} variant="outlined"/></span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text">VAT(7.5%):</span>
                    <span className="text push-right bold">{moneyFormat(tempInvoice.vatTotal)}</span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text">Total:</span>
                    <span className="text push-right bold">{moneyFormat(tempInvoice.total)}</span>
                  </div>
                  
                </div>
              </Grid>
            </Grid>
          </div>
    )
  }


  function invoiceTable(){
    const ROWS_PER_PAGE=10
    // const invoices =  [ 
    //   {id:1,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:1},
    //   {id:2,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:2},
    //   {id:3,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:3},
    //   {id:4,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:4},
    //   {id:5,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:5},
    // ]

    const handleChange = (event, value) => {
      setPage(value);
    };
    const filtered=invoices.data?.filter(x=>
    (x.number+"").toLowerCase().includes(searchValue?.toLowerCase())
      )
    const view =(d)=>{
     
      setInvoiceStage(getStatusId(d.status));
      goTo(3)
    }
    return (
        <div>
        <div className="box2" style={{marginTop:'40px',marginBottom:"20px"}}>
          <Grid container spacing={1} className="center2 space-top2">
            <Grid item xs={3}><span className="text bold">Invoice/Credit Note</span></Grid>
            <Grid item xs={2}><span className="text bold">Date</span></Grid>
            <Grid item xs={2}><span className="text bold">Total</span></Grid>
            <Grid item xs={2}><span className="text bold">Amount Due</span></Grid>
            <Grid item xs={2}><span className="text bold">Status</span></Grid>
            <Grid item xs={1}><span className="text bold">Action</span></Grid>
          </Grid>

           {filtered?.slice((page- 1) * ROWS_PER_PAGE,(page- 1) * ROWS_PER_PAGE + ROWS_PER_PAGE).map((data,index)=>{
             const name=data.name
             const code=data.number
             const date=data.issueDate
             const total=data.total
             const amount=data.balance
             const status=data.status

            return(
          <div>
           <hr className="hr"/>
          <Grid container spacing={1} className="center2">
              <Grid item xs={3}>
                <div className="text truncate">{name}</div>
                <div className="text blue">{code}</div>
                </Grid>
              <Grid item xs={2}><span className="text truncate"><Moment format={'DD/MM/YY'} date={data.date}/></span></Grid>
              <Grid item xs={2}><span className="text">{moneyFormat(data.total)}</span></Grid>
              <Grid item xs={2}><span className="text">{moneyFormat(data.amount)}</span></Grid>
              <Grid item xs={2}><span className="text">{getStatus(data.status)}</span></Grid>
              <Grid item xs={1} onClick={()=>set_invoice(data)}>
                <span className="ruby">
                  <span className="blue text space-right2 click bold sm" onClick={(e)=> view(data)}>View</span>
                  <MoreVert className="click" onClick={(e)=>openPopup('view',e.currentTarget,data)}/>
                </span>
              </Grid>
          </Grid>
          </div>
          )
        })}

       </div>
        <Pagination count={Math.ceil(filtered?.length / ROWS_PER_PAGE)} page={page} className="push-right flex space-top2"
          onChange={handleChange} variant="outlined" shape="rounded" color="primary"/>
        </div>
    )
  }

  function getStatus(type){
    switch (type){
      case "PAID": return <span className="text bold" style={{color:'#27AE60'}}>Paid</span>
      case "PARTIAL": return <span className="text bold" style={{color:'#F2994A'}}>Partial</span>
      case "UNPAID": return <span className="text bold" style={{color:'#EB5757'}}>Unpaid</span>
      case "DRAFT": return <span className="text bold" style={{color:'#F2C94C'}}>Draft</span>
      default: return <span className="text bold" style={{color:'#F2C94C'}}>Draft</span>
    }
  }

  function getStatusId(type){
    switch (type){
      case "PAID": return 1
      case "PARTIAL": return 2
      case "UNPAID": return 3
      case "DRAFT": return 4
      default: return 4
    }
  }

  //APIs definition
  function dispatch(method,url,type,data='',e){
    if(method=='post'){
        authClient.post(url, data).then((res) => {
        switch (type){ 
          case "addCustomer":
          case "createInvoice":
            if(e==null) openModal('success',{title:'Complete',message:'Successful'},true)
            else{
              data= {
                from:e.from,
                to:e.to,
                sendCopyToSelf:e.copy,
                attachInvoiceAsPDF:e.pdf,
              }
                dispatch('post','/api/v1/accounting/invoices/send?id='+res.data?.data?.id,'sendInvoice',data)
            }
            break;
          case "sendInvoice":
            openModal('success',{title:'Send Invoice',message:'Invoice Sent'},true)
            break;
          case "confirmAction":
            openModal('success',{title:'Complete',message:'Successful'},false)
            goTo(1)
            setStage(1)
            break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=='put'){
      authClient.put(url+ data).then((res) => {
      switch (type){ 
        case "addInflow":
          break;
      }
    })
    .catch((e) => console.log(e));
    }
    else
    if(method=="get"){
      authClient.get(url + data).then((res) => {
        switch (type){ 
          case "getCustomers":
            setCustomers(res.data)
            break
          case "getInvoices":
            setInvoices(res.data)
            break;
          case "getItems":
              setItems(res.data?.data)
              break;
          case 'getCreditNotes':
            setCreditNotes(res.data?.data)
            break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=="delete"){
      authClient.delete(url + data).then((res) => {
        switch (type){ 
          case "deleteInvoice":
          case "deleteInflow":
            break;
        }
      })
      .catch((e) => console.log(e));
    }
  }
  

  function showDropdown(){
    const onSubmit = (e)=>{
      let data={}
      switch (showModal?.type){
          case "deleteInvoice":
            dispatch('delete','api/v1/accounting/invoices/delete?id=',"deleteInvoice",showModal.data?.id)
            break;
          case "deleteInflow":
            dispatch('delete','api/v1/accounting/transaction?transactionId=',"deleteInflow",showModal.data?.id)
            break;
          case "addInflow":
            if(showModal.data!=null) dispatch('put','/api/v1/accounting/transaction?transactionId=',"editInflow",showModal.data?.id)
            else dispatch('post','/api/v1/accounting/transaction',"addInflow",showModal.data)
            break;
          case "sendInvoice":
            dispatch('post','/api/v1/accounting/invoices',"createInvoice",tempInvoice,e)
            break;
          case "addCustomer":
             data= {
              name:e.name,
              openingBalance:e.balance,
              email:e.email,
              phone:e.phone,
              customerDiscount:e.discount,
              address:{number:e.no, 
                street:e.street,
                city:e.city,
                lga:selection.lga,
                state:selection.state,
               country:'Nigeria'
             },
            }
            dispatch('post','/api/v1/accounting/customers','addCustomer',data)
            break;
          case "addAccount":
            data= {
              name:e.name,
              openingBalance:0,
              isActive:true,
              description:e.description,
              code:e.code,
            }
            dispatch('post','/api/v1/accounting/accounts','addAccount',data)
            break;
          case "recordPayment":
            data={
              amount:e.amount,
              type: e.paymentType,
              withHoldingTax:e.withHoldingTax,
              method:e.paymentMethod,
              accountId:'',
              description:e.description,
              date:selection.paymentDate,
              invoiceId:e.id,
              message:e.description,
              id:e.id,
            }
            console.log("DATAA",data)
            dispatch('post','/api/v1/accounting/invoices/payments?invoiceId='+e.id,'recordPayment',data)
            break;
      }
    }
    //Defines the popups and dropdowns
    return (
      <div>
        <Popover
          open={showPopup!=null ? true: false}
          anchorEl={showPopup?.data}
          onClose={()=>closePopup()}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          {showPopupData(showPopup)}
        </Popover>

        <Modal
          open={showModal!=null ? true: false}
          onClose={()=>closeModal()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 100,
          }}
        >
           
          <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
              {showModalData(showModal)}
              {showModal?.nofooter==null &&
              <div className=" center" style={{justifyContent:'center',display:'flex'}}>
                <Button color="primary" variant="contained" type="submit" >
                  Save
                </Button>
                <div className="space-left2 cancel" onClick={()=>closeModal()}>
                  Cancel
                </div>
              </div>}
            </form>
          </div>
        </Modal>


        <Popover
          open={modalInvoice!=null ? true: false}
          onClose={()=>setModalInvoice(null)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 100,
          }}
        >
          <div style={{display:'block'}}>
            {invoice()}
          </div>
        </Popover>
      </div>
    )
  }

  function showPopupData(data){
    let d=[]
    switch (data?.type){
      case "view":
        return (
          <div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Edit</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Duplicate</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Resend</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Export</div>
            <div className="text sm hover padding-x" onClick={()=>openModal('edit')}>Print</div>
            <div className="text sm red hover padding-x" onClick={()=>openModal('deleteInvoice',data.n,false)}>Delete</div>
          </div>
        )
      case "saveAndSend":
        return (
          <div>
            <div className="text sm hover" onClick={()=>openModal('sendInvoice',null,true)}>Save and Send</div>
            <div className="text sm hover" onClick={()=> dispatch('post','/api/v1/accounting/invoices',"createInvoice",tempInvoice) }>Save as Draft</div> <div className="text sm red hover" onClick={()=>openModal('edit')}>Delete</div>
          </div>
        )
      case "yesno":
        return (
          <div>
            <div className="text sm hover">Yes</div>
            <div className="text sm hover">No</div> 
          </div>
        )
      case "account":
        return (
          <div className="space-top2">
              <span className="text bold space-left2">Cash and Bank</span>
              {showdata("Cash on Hand",moneyFormat(3000000))}
              {showdata("First Bank",moneyFormat(2000000))}
              <hr className="hr" />
              <span className="text bold space-left2">Liabilities</span>
              {showdata("Loan",moneyFormat(4000000))}
              <hr className="hr"  />
              {showdata("All Accounts",moneyFormat(4000000))}
              <ButtonGroup className="space-top2">
                <Button onClick={()=>{ setOpen(true); setShowSelectAccount(false)}}>
                  <Bank style={{ marginRight: '.8rem' }} />
                  <span className="text blue nocase">Connect your bank</span>
                </Button>
                <Button onClick={()=>openModal('addAccount')}>
                  <AddIcon style={{ marginRight: '.8rem' }} />
                  <span className="text blue nocase">Add new account</span>
                </Button>
              </ButtonGroup>
          </div>
        )
      case "addCustomer":
        const performAction=(d)=>{
            setCustomer(d)
            setTempInvoice({...tempInvoice,customerId:d.id})
          if(data.n==1){
            goTo(4)
            setNewInvoiceStage(1)
            dispatch('get','/api/v1/accounting/invoices','getCreditNotes','?customerId='+d.id)
          }else if(data.n==2){
            setNewInvoiceStage(2)
          }
          closePopup()
        }
        d=customers.data
        return (
          <div>
              <div className="modalHeader">
                <div className="push-left-right">
                  <span className="text bold">{data.n!=1 ?"Add Customer":"Select receiving customer"}</span>
                  <Close className="click" onClick={()=>closePopup()} />
                </div>
              </div>
              <hr className="hr"/>
              <div>
              <TextField
                variant="outlined"
                className="padding sm text"
                style={{minWidth:'maxWidth'}}
                onKeyUp={(e)=>setSearchValue(e.target.value)} 
                size="small"
                fullWidth
                placeholder="Search customer"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
            <div style={{maxHeight:'400px',overflowY:'auto'}}>
                {d?.filter(x=>x.name.toLowerCase().includes(searchValue?.toLowerCase())).map((data)=>{
                  return (
                    <div>
                    <hr className="hr"/>
                    <div className="push-left-right padding-x center2">
                      <div style={{minWidth:'300px'}}>
                        <span className="ruby">
                          <span className="text bold">{data.name}</span>
                        </span>
                      </div>
                      <Button variant="contained" color="primary" onClick={()=>performAction(data)}>Select</Button>
                    </div>
                  </div>
                  )
                })}
            </div>
        <hr className="hr"/>
        <span className="ruby click padding" onClick={()=>openModal('addCustomer',null)}>
          <AddCircleOutline color="primary"/>
          <span className="text blue click bold space-left2">Add New Customer</span>
        </span>
      </div>)
      case "addItem":
        
        const select=(e)=>{
          const item={id:e.id,itemId:e.id,description:e.name,code:e.code,quantity:0,price:e.sellingPricing?.price,amount:0,amount2:0,isVariant:false,vatIncluded:false,type:"PRODUCT"}
          setCustomerItems(customerItems => [...customerItems, item]);
          setItems(items.filter(x=>x.id!=e.id))
          closePopup()
        }
        d=items
        return (
          <div>
             <div className="modalHeader">
                <div className="push-left-right">
                  <span className="text bold">Add Item</span>
                  <Close className="click" onClick={()=>closePopup()} />
                </div>
              </div>
              <hr className="hr"/>
              <div>
              <TextField
                variant="outlined"
                className="padding sm text"
                fullWidth
                onKeyUp={(e)=>setSearchValue(e.target.value)} 
                size="small"
                placeholder="Search by product name or code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
            <div style={{maxHeight:'400px',overflowY:'auto'}}>
                {d.filter(x=>x.name.toLowerCase().includes(searchValue?.toLowerCase())).map((data)=>{
                  return (
                    <div>
                    <hr className="hr"/>
                    <div className="push-left-right padding-x">
                      <div style={{minWidth:'300px'}}>
                        <span className="ruby">
                          <span className="text bold">{data.name}</span>
                          <span className="text blue space-left2">{"- "+data.code}</span>
                        </span>
                        <div className="text sm">{moneyFormat(data.sellingPricing?.price)}</div>
                      </div>
                    <Button variant="contained" color="primary" onClick={()=>select(data)}>Select</Button>
                    </div>
                  </div>
                  )
                })}
            </div>
        <hr className="hr"/>
        <span className="ruby click padding" onClick={()=>openModal('addNewItem',null)}>
          <AddCircleOutline color="primary"/>
          <span className="text blue click bold space-left2">Add New Item</span>
        </span>
      </div>)
      case "account2":
        d=[
          {id:1,name:"Cash and Bank",d2:[{id:1,name:"Cash on hand"},{id:2,name:"First Bank"}]},
        ]
        return (
          <div>
            {SelectDropDownItem("Account Type",d,"account2")}
            </div>
          )
      case "account3":
        d=[
          {id:1,name:"Cash and Bank",d2:[{id:1,name:"Cash on hand"},{id:2,name:"First Bank"}]},
        ]
        return (
          <div>
            {SelectDropDownItem("Account Types",d,setSearchValue)}
            </div>
          )
      case "state":
        d=[]
        NaijaStates.states().map((state, i) => ( d.push({id:i,name:state}) ))
        return (
          <div>
            {SelectDropDownItem("State",d, "state")}
            </div>
          )
      case "lga":
        d=[]
        NaijaStates.lgas('Abia',).lgas.map((lga, i) => ( d.push({id:i,name:lga}) ))
        return (
          <div>
            {SelectDropDownItem("Local Govt",d,"lga")}
            </div>
          )
      case "customer":
         d=[
          {id:1,name:"Peter"},
          {id:2,name:"Paul"},
          {id:3,name:"jubril"},
          {id:4,name:"Simon"},
        ]
        d=customers.data
        return (
          <div>
              {SelectDropDownItem("Customers",d,setSearchValue)}

            
            <Button onClick={()=>openModal('addCustomer')}>
              <AddIcon style={{ marginRight: '.8rem' }} />
              <span className="text blue nocase">Add new customer</span>
            </Button>

          </div>
        )
        case "customerSelect":
          d=customers.data
          return (
          <div>
          <div className="text bold center padding-y">Select Customer</div>
            <hr className="hr" />
            <TextField
                  placeholder="All Customers"
                  variant="outlined"
                  className="padding sm text"
                  onKeyUp={(e)=>setSearchValue(e.target.value)} 
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
            <div className="padding-x">
                <div>
                  <span className="text sm hover" onClick={()=>{refresh();closePopup();;setSelection({...selection,customerSelect:'All Customers'})}}>All Customers</span>
                </div>
              {d?.filter(x=>x.name.toLowerCase().includes(searchValue?.toLowerCase())).map((data)=>{
                return (
                  <div>
                  <span className="text sm hover" onClick={()=>{refresh('?customerId='+data.id);closePopup();setSelection({...selection,customerSelect:data.name})}}>{data.name}</span>
                  </div>
                )
              })}
            </div>
          </div>)
         case "statusSelect":
          d=[
            {id:1,name:"Status"},
            {id:1,name:"PAID"},
            {id:2,name:"PARTIAL"},
            {id:3,name:"UNPAID"},
            {id:4,name:"DRAFT"},
          ]
          return (
          <div>
          <div className="text bold center padding-x space-top2">Select Status</div>
            <hr className="hr" />
            <div className="">
              {d?.map((data)=>{
                return (
                  <div>
                  <span className="text sm ipad hover" onClick={()=>{closePopup();setSelection({...selection,statusSelect:data.name})}}>{data.name}</span>
                  </div>
                )
              })}
            </div>
          </div>)
        case "paymentType":
           d=[
            {id:1,name:"Cash"},
            {id:2,name:"Cheque"},
            {id:3,name:"Bank Transfer"},
            {id:4,name:"Others"},
          ]
          return (
            <div>
              {SelectDropDownItem("Payment Type",d,setSearchValue)}
            </div>
          )
        case "accountCategory":
           d=[
            {id:1,name:"Income Accounts",d2:[{id:1,name:"Gain on Foreign Exchange"}]},
            {id:2,name:"Asset Account",d2:[{id:2,name:"Account receivable"},{id:3,name:"Opening stock"}]},
          ]
          return (
            <div>
              {SelectDropDownItem("Category",d,setSearchValue)}
            </div>
          )
      default:
        return null
      
    }
  }
  
  function showModalData(data){
    switch (data?.type){
      case "addNewItem":
        return (
          <div >
          {modalHeader("New Item")}
              <div className="modalBody">
                <div>
                <div className="ruby">
                  <span className="text mLeft">Name:<span className="red">*</span></span>
                  <TextField className="mRight"name="name" fullWidth inputRef={register({ required: true})} variant='outlined'  size="small"   />
                </div>
                </div>
                <div>
                <div className="space-top ruby">
                  <span className="text mLeft">Price:<span className="red">*</span></span>
                  <TextField placeholder="000,000.00" fullWidth variant="outlined" className="mRight"
                    size="small" name="weight" ref={register({ required: true})} 
                      InputProps={{startAdornment: (
                          <InputAdornment position="start">
                            <div className="sign">₦</div>
                          </InputAdornment>
                        ),  }} />
                </div>
                </div>
               
                <div>
                    <div className="space-top ruby ">
                        <span className="text mLeft">Description:</span>
                    
                        <TextField name="description"  fullWidth className="mRight" inputRef={register({ required: false})}  variant='outlined' size="small" multiline maxRows={4} rows={4}/>
                    </div>
                </div>
                <FormControlLabel
                style={{marginLeft:'100px'}}
                value="start"
                fontSize="small"
                size="small"
                control={<Checkbox color="primary" defaultChecked={true} />}
                label="VAT Included"
              />
                
              </div>
          </div>
        )
      case "sendInvoice":
        return (
          <div >
          {modalHeader("Send Invoice")}
              <div className="modalBody">
              <div>
                <div className="ruby">
                    <span className="text mLeft">From:</span>
                    <TextField name="from" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">To:</span>
                    <TextField name="to" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">Subject:</span>
                    <span className="text mRight">Invoice #{tempInvoice.number} from Fresible</span>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">Message:</span>
                    <TextField name="name" fullWidth className="mRight" inputRef={register({ required: false})} variant='outlined'  size="small" multiline maxRows={4} rows={4}/>
                </div>
              </div>

              <div style={{marginLeft:'100px'}}>
                  <div>
                    <FormControlLabel
                      control={<Checkbox color="primary" defaultChecked={true} inputRef={register({ required: false})} name="copy" />}
                      label="Send Copy to Self"
                    />
                  </div>
                  <div>
                     <FormControlLabel
                      control={<Checkbox color="primary" defaultChecked={true} inputRef={register({ required: false})} name="pdf"/>}
                      label="Attach Invoice as PDF"
                    />
                  </div>
                    <div className="space-bottom ruby">
                      <Button  variant="contained" color="primary" className="space-right2" type="submit">Send Invoice</Button>
                      <Button  variant="outlined" color="primary" className="space-right2" type="button">Preview</Button>
                      <Button  variant="outlined" color="primary" className="space-right2" type="button" onClick={()=>closeModal()}>Cancel</Button>
                    </div>
              </div>
              </div>
          </div>
        )
      case "sendInvoiceReceipt":
        return (
          <div >
          {modalHeader("Send Invoice")}
              <div className="modalBody">
              <div>
                <div className="ruby">
                    <span className="text mLeft">From:</span>
                    <span className="text mRight">Fresible@gmail.com</span>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">To:</span>

                    <TextField name="name" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                    <AddCircleOutline className="space-left2 click" onClick={()=>setAddMore(addMore+1)} color="primary"/>
                </div>
                <div style={{marginLeft:'100px'}}>
                    {[1,2,3,4,5,6,7].map(k=>{
                      return (
                      addMore > k &&
                      <div className="block">
                        <div className="space-top2 ruby">
                          <TextField name="name" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                          <DeleteForeverOutlined color="error" className="space-left2 click" onClick={()=>setAddMore(addMore-1)} color="primary"/>
                        </div>
                      </div>
                      )
                    })}
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">Subject:</span>
                    <span className="text mRight">Invoice #00074 from Fresible</span>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">Message:</span>
                    <TextField name="name" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small" multiline maxRows={4} rows={4}/>
                </div>
              </div>

              <div style={{marginLeft:'100px'}}>
                  <div>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" defaultChecked={true} />}
                      label="Send a copy to self"
                    />
                  </div>
                    <div className="space-bottom ruby">
                      <Button  variant="contained" color="primary" className="space-right2" onClick={()=>openModal('success',{title:"Send Receipt",message:'Receipt Sent',animation:defaultOption2},false)} >Send Receipt</Button>
                      <Button  variant="outlined" color="primary"  onClick={()=>closeModal()}>Cancel</Button>
                    </div>
              </div>
              </div>
          </div>
        )
      case "recordPayment":
        return (
          <div >
          {modalHeader("Record Payment For This Invoice")}
              <div className="modalBody">
              <div>
                <div className=" ruby">
                    <span className="text mLeft2">Payment Date:</span>
                    <div style={{position:'relative'}} className="mRight">
                            <div className=""  style={{position:'absolute',zIndex:'10', right:'10px',paddingTop:'6px'}}>
                            <CalendarToday variant="outlined" />
                            </div>
                            <DatePicker
                              placeholderText="Select Date"
                              className="datepicker text padding1 click"
                              onChange={ date => setSelection({...selection,paymentDate:date})}
                              selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                              dateFormat="dd/MM/yyyy"
                              selected={selection.paymentDate}    
                            />
                    </div>
                  </div>
                </div>

                <input type="hidden" value={showModal.data?.id} name="id" ref={register({ required: false})} />
                <div>
                  <div className="space-top2 ruby">
                      <span className="text mLeft2">Payment Type:</span>
                      <select name="paymentType" ref={register} 
                      className="select mRight" inputRef={register({ required: false})}>
                        <option value="full">Full Payment</option>
                        <option value="partial">Partial Payment</option>
                      </select>
                  <div>
                </div>
                </div>
                <div>
                <div className="space-top2 ruby">
                  <span className="text mLeft2">Amount Paid:</span>
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="amount" inputRef={register({ required: false})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                </div>
               </div>
               <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Witholding Tax:</span>
                  
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="withHoldingTax" inputRef={register({ required: false})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Total:</span>
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="total" inputRef={register({ required: false})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Payment Method:</span>
                    <select  
                     className="select mRight" name="paymentMethod" ref={register} >
                      <option value="cash">Cash</option>
                      <option value="bankTransfer">Bank Transfer</option>
                      <option value="bankDraft">Bank Draft</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Payment Account:</span>
                    {SelectDropDown("account2","Account","200px")}
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Message:</span>

                    <TextField name="description" className="mRight" fullWidth inputRef={register({ required: false})}  variant='outlined' size="small" multiline maxRows={4} rows={2}/>
                    
                </div>
                </div>
                <div style={{marginLeft:'150px'}}>
                  <div>
                  <FormControlLabel
                      control={<Checkbox color="primary" defaultChecked={true}  inputRef={register({ required: false})} name="vat"/>}
                      label="VAT Included"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox color="primary" defaultChecked={true} inputRef={register({ required: false})} name="pdf" />}
                      label="Attach Invoice as PDF"
                    />
                    </div>
                    <div className="space-bottom">
                      <Button  variant="contained" color="primary" type="submit" className="space-right2">Save</Button>
                      <Button  variant="outlined" color="primary" type="button" className="space-right2" onClick={()=>setModalInvoice({data:true})}>Preview</Button>
                      <Button  variant="outlined" color="primary" type="button" onClick={()=>closeModal()}>Cancel</Button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )
      case "success":
        return(
          <div>
            <div className="modalHeader">
              <div className="push-left-right">
                <span className="text bold lg">{data.data?.title}</span>
                <Close className="click" onClick={()=>closeModal()} />
              </div>
            </div>
          <Lottie
                options={data.data?.animation==null ? defaultOptions: data.data?.animation }
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <span className="blue bold center2" style={{fontSize:'22px'}}>{data.data?.message}</span>
          </div>
        )
      case "removePayment":
        return(
          <div>
            <div className="modalDeleteHeader">
              <div className="push-left-right">
                <span className="text white lg bold">Remove Payment</span>
                <Close className="click" onClick={()=>closeModal()} style={{ color:"white"}}/>
              </div>
            </div>
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">Payment for ₦1,500,000.00 using bank transfer.</div>
                  <div className="text">Are you sure you want to remove this invoice payment? </div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button  variant="contained" color="secondary">Remove Payment</Button>
                  <Button variant="outlined" className="space-left2" onClick={()=>closeModal()}>Cancel</Button>
                </div>
            </div>
          </div>
        )
      case "deleteInvoice":
        const deleteInvoice=()=>{
          dispatch('delete','api/v1/accounting/invoices/delete?id=',"deleteInvoice",showModal.data?.id)
        }
        return(
          <div>
            <div className="modalDeleteHeader">
              <div className="push-left-right">
                <span className="text white lg bold">Delete Invoice</span>
                <Close className="click" onClick={()=>closeModal()} style={{ color:"white"}}/>
              </div>
            </div>
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">Are you sure you want to delete this invoice? </div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button  variant="contained" color="secondary" onClick={()=>deleteInvoice()}>Delete Invoice</Button>
                  <Button variant="outlined" className="space-left2" onClick={()=>closeModal()}>Cancel</Button>
                </div>
            </div>
          </div>
        )
      case "duplicateInvoice":
        const duplicateInvoice=()=>{
          dispatch('post','api/v1/accounting/invoices/duplicate?id=',"duplicateInvoice",showModal.data?.id)
        }
        return(
          <div>
            <div className="modalHeader">
              <div className="push-left-right">
                <span className="text white lg bold">Duplicate Invoice</span>
                <Close className="click" onClick={()=>closeModal()} style={{ color:"white"}}/>
              </div>
            </div>
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">Are you sure you want to duplicate this invoice? </div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button  variant="contained" color="secondary" onClick={()=>duplicateInvoice()}>Duplicate Invoice</Button>
                  <Button variant="outlined" className="space-left2" onClick={()=>closeModal()}>Cancel</Button>
                </div>
            </div>
          </div>
        )
     
      case "confirmAction":
        const confirmAction= ()=>{
          dispatch('post','/api/v1/accounting/credit-notes','confirmAction',_creditNote)
        }
        return(
          <div>
            {modalHeader("Confirm Action")}
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">You cannot edit this when this action has been completed</div>
                  <div className="text">Do you want to proceed?</div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button color="secondary" onClick={()=>closeModal()}>No. Take me back!</Button>
                  <Button variant="contained" color="primary" className="space-left2" onClick={()=>confirmAction()}>Yes. Continue</Button>
                </div>
            </div>
          </div>
        )
      case "addAccount":
        return(
          <div >
              {modalHeader("New Account")}
              <div className="modalBody">
                <Grid container spacing={2} className='center2'>
                  <Grid item xs={5} >
                  <span className="text sm push-right">Account Name:<span className="red">*</span></span>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField name="name" inputRef={register({ required: true})} variant='outlined'  size="small"   />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className='center2 space-top2'>
                  <Grid item xs={5} >
                    <span className="text sm push-right">Account Type:<span className="red">*</span></span>
                  </Grid>
                  <Grid item xs={7}>
                    {SelectDropDown("account2","Select account")}
                  </Grid>
                </Grid>

                <Grid container spacing={2} className='center2 space-top2'>
                  <Grid item xs={5} >
                    <span className="text sm push-right">Account Code:</span>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField name="code"inputRef={register({ required: false})}  variant='outlined'  size="small"
                      />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className='center2 space-top2'>
                  <Grid item xs={5} >
                    <span className="text sm push-right">Description:</span>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField name="description" inputRef={register({ required: true})}  variant='outlined' size="small" multiline maxRows={4}
                      />
                  </Grid>
                </Grid>
              </div>
              
          </div>
        )
      case "addCustomer":
        return(
          <div>
              {modalHeader("New Customer")}
              <div className="modalBody" >
                <div>
                  <div container className='center2 ruby'>
                    <span style={{width:'150px'}} className="text sm align-right space-right2">Name:<span className="red">*</span></span>
                    <TextField name="name" placeholder="Name"  error={errors.name}
                    inputRef={register({ required: true})} variant='outlined'  size="small" style={{width:'300px'}}   />
                    {errors.name &&  <p className="error">Name is required</p>} 
                  </div>
                </div>

                <div>
                  <div container className='center2 ruby space-top'>
                      <span  style={{width:'150px'}} className="text sm align-right space-right2">Outstanding Balance</span>
                      <TextField name="balance" placeholder="Outstanding Balance" inputRef={register({ required: false})}  variant='outlined' type="number" size="small" style={{width:'300px'}}
                        />
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Email:</span>
                      <TextField name="email" placeholder="Email" variant='outlined' inputRef={register}  size="small" style={{width:'300px'}}/>
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Phone:</span>
                      <TextField name="phone" placeholder="Phone" variant='outlined' inputRef={register} size="small" style={{width:'300px'}}/>
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Address:</span>
                      <div>
                        <ButtonGroup className="block">
                          <TextField name="no" variant='outlined' placeholder="No" inputRef={register} size="small" style={{width:'50px'}}/> 
                          <TextField name="street" variant='outlined' inputRef={register}  placeholder="Street Name" style={{width:'150px'}}size="small"/>
                          <TextField name="city" variant='outlined' inputRef={register} placeholder="City"  style={{width:'100px'}}  size="small"/>
                        </ButtonGroup>
                        <ButtonGroup className="block">
                          {SelectDropDown("state","Select state","150px")}
                          {SelectDropDown("lga","Select local Gov","150px")}
                        </ButtonGroup>
                      </div>
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Description:</span>
                      <TextField name="description" placeholder="Description" variant='outlined' inputRef={register} size="small" style={{width:'300px'}} multiline maxRows={4}/>
                  </div>
                </div>

                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Customer Discount:</span>
                      <TextField name="discount" placeholder="Discount" variant='outlined' inputRef={register} size="small" style={{width:'300px'}} />
                  </div>
                </div>
              </div>
          </div>
        )
      default:
        return null
    }
  }

  function SelectDropDown(type,placeholder,width='unset'){
    return (
            <TextField
              placeholder={placeholder}
              variant="outlined"
              onClick={(e)=> openPopup(type,e.currentTarget)}
              
              inputRef={register}
              value={selection[type]}
              aria-describedby="2"
              style={{width:width}}
              size="small"
              className="click text"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" onClick={(e)=>openPopup(type,e.currentTarget)}>
                    <ExpandMore className="click"/>
                  </InputAdornment>
                ),
              }}
            />
    )
  }

  function SelectDropDownItem(title,d, action){
    return (
          <div>
            <div className="text bold center padding-y">{title}</div>
            <hr className="hr" />
            <TextField
                  placeholder={title}
                  variant="outlined"
                  className="padding sm text"
                  onKeyUp={(e)=>setSearchValue(e.target.value)} 
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
            <div className="padding-x">
              {d[0].d2==null ?
              d.filter(x=>x.name.toLowerCase().includes(searchValue?.toLowerCase())).map((data)=>{
                return (
                  <div>
                  <span className="text sm hover" onClick={()=>{setSelection({...selection,[action]:data.name});closePopup()}}>{data.name}</span>
                  </div>
                )
              })
              :
              d.map((data,index)=>{
                return (
                  <div>
                    {data.d2?.filter(x=>x.name.toLowerCase().includes(searchValue?.toLowerCase())).map((data2)=>{
                      return(
                        <div>
                          {index==0 &&  <div className="text sm bold">{data.name}</div>}
                        <div className="text sm hover" onClick={()=>{setSelection({...selection,[action]:data2.name});closePopup()}} style={{marginLeft:'10px'}} >{data2.name}</div>
                        </div>
                      )
                    })}
                  </div>

                )
              })}
          </div>
        </div>
    )
  }

  function modalHeader(head){
    return (
      <div>
        <div className="modalHeader">
          <div className="push-left-right">
            <span className="text lg bold">{head}</span>
            <Close className="click" onClick={()=>closeModal()} />
          </div>
        </div>
        <hr className="hr"/>
      </div>
    )
  }
         
}
