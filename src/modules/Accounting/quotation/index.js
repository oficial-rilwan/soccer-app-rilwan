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
import { ReactComponent as Bank } from '../../../lib/assets/icons/BankColored.svg';
import { ReactComponent as AddIcon } from '../../../lib/assets/icons/AddColored.svg';
import { ReactComponent as Person } from '../../../lib/assets/icons/person_add.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {moneyFormat} from '../../../lib/helpers/formatCurrency';
import Moment from 'react-moment';

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


export default function Quotation() {
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
  const [modalQuotation, setModalQuotation] = useState(null);
  const [pageType, setPageType] = useState(1);
  const { register, handleSubmit, errors } = useForm();

  const [stage,setStage]=useState(1)
  const [quotationStage,setQuotationStage]=useState(1)
  const [newQuotationStage,setNewQuotationStage]=useState(1)
  const [addMore,setAddMore]=useState(1)

  const [customers,setCustomers]=useState([])
  const [customer,setCustomer]=useState({})
  const [quotations,setQuotations]=useState([])
  const [_quotation,set_quotation]=useState({})
  const [items,setItems]=useState([])
  const [quotationItems,setQuotationItems]=useState([])
  const [tempQuotation,setTempQuotation]=useState({})
  const [discount,setDiscount]=useState(0)
  const [discountType,setDiscountType]=useState("PERCENTAGE")
  


  useEffect(() => {
    if(location.data!=null) setPageType(2)
    dispatch('get','/api/v1/accounting/customers','getCustomers')
    dispatch('get','/api/v1/accounting/quotations','getQuotations','?populateKeys=customer')
    dispatch('get','/api/v1/accounting/products','getItems')
  }, []);

  useEffect(() => {
    const subTotal= quotationItems.reduce((a,v) =>  a = a + v.amount,0)
    const subTotal2=quotationItems.reduce((a,v) =>  a = a + v.amount2,0)
    const total=subTotal - (discountType!="PERCENTAGE" ? discount : (discount*0.01*subTotal2))
    setTempQuotation({...tempQuotation,subTotal:subTotal2, vatTotal: subTotal-subTotal2, total:total,items:quotationItems})
    console.log(tempQuotation)
  }, [quotationItems,discount,discountType]);


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
    if(d==2)setNewQuotationStage(1)
    setPageType(d)
  }

  const updateQuotationItem=(value, object, type)=>{
    switch(type){
      case 1:
        setQuotationItems(
          quotationItems.map(item => 
              item.id === object.id 
              ? {...item, quantity : value, amount: object.vatIncluded ? (value*object.price) +((value*object.price)*0.075) : value*object.price, amount2:value*object.price} 
              : item 
          ))
        break
      case 2:
        setQuotationItems(
          quotationItems.map(item => 
              item.id === object.id 
              ? {...item, vatIncluded : value, amount: value ? object.amount +(object.amount*0.075) : object.quantity*object.price,amount2:object.quantity*object.price} 
              : item 
      ))
        break
      case 3:
        setDiscountType(value)
        setTempQuotation({...tempQuotation,discount:{amount:discount,type:value}})
        break;
      case 4:
        setDiscount(value)
        setTempQuotation({...tempQuotation,discount:{amount:value,type:discountType}})
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
      case 1: return QuotationPage()
      case 2: return AddQuotationPage()
      case 3: return ViewQuotationPage()
    }
  }

  //Startup page for quotation
  function QuotationPage(){
    return (
      <div>
        <Header path={path} url={'/dashboard/quotation'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
        <div className="space-top">
          <div className="push-left-right">
            <div>
            <TextField
                  placeholder="Search Quote"
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
              <Button variant="contained" color="primary" onClick={()=> goTo(2)}>Add a Quote</Button>
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
                  <TextField
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
                  />
              </div>
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

          </Grid>
         
        </div>
          {quotationTable()}
        </div>
       
      </div>

    )
  }

  function getCustomerAddress(e){
    return `${e.number} ${e.street} ${e.city} ${e.lga} ${e.state!=null ? e.state:""} ${e.country}`
  }

  function AddQuotationPage(){
    const handleInputChange = (e) => {
     //   item[e.target.name] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }
  
    return (
      <div>
        <Header path={path} url={'/dashboard/quotation'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
       

        <div className="space-top">
          <div className="push-left-right">
            <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
              <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
            </div>
          </div>
          <div className="text space-top">Quote No</div>
          <TextField type="number" onChange={(e)=>setTempQuotation({...tempQuotation,number:e.target.value})} variant='outlined' size="small" fullWidth  style={{width:'200px'}}
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">Quote</div> </InputAdornment> ),}}
                              />
      </div>

      <hr className="hr"/>

     

        
        <div>
          <div style={{padding:'20px 0px'}}>
            <Grid container>
            {newQuotationStage==1 ?
            <Grid item xs={5}>
              <div className="box2 click" style={{padding:'40px'}} onClick={(e)=>openPopup('addCustomer',e.currentTarget,2)}>
                <div className="center">
                  <Person/>
                  <div className="text blue">Choose Customer</div>
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
              <div className="ruby space-top2">
                <div className="text space-right2">Date:</div>
                <div style={{position:'relative',width:'200px'}} className="mRight">
                  <div style={{position:'absolute', right:'10px',paddingTop:'6px'}}>
                  <CalendarToday variant="outlined" />
                  </div>
                  <DatePicker
                    placeholderText="Select Date"
                    className="datepicker text padding1 click"
                    onChange={ date => setTempQuotation({...tempQuotation,date:date})}
                    selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    selected={tempQuotation.date}    
                    startDate={tempQuotation.date}
                    endDate={tempQuotation.toExpireAt}
                    maxDate={tempQuotation.toExpireAt}
                  />
                </div>
              </div>
            </div>
              <div className="ruby space-top2">
                <div className="text space-right2">Expires on:</div>
                <div style={{position:'relative',width:'200px'}}  className="mRight">
                  <div style={{position:'absolute', right:'10px',paddingTop:'6px'}}>
                  <CalendarToday variant="outlined" />
                  </div>
                  <DatePicker
                    placeholderText="Select Date"
                    className="datepicker text padding1 click"
                    onChange={ date => setTempQuotation({...tempQuotation,toExpireAt:date}) }
                    selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    selected={tempQuotation.toExpireAt}    
                    startDate={tempQuotation.date}
                    endDate={tempQuotation.toExpireAt}
                    minDate={tempQuotation.date}
                  />
                </div>
              </div>
              <div className="ruby  space-top2">
                <div className="text space-right2">Reference:</div>
                <TextField  onChange={(e)=>setTempQuotation({...tempQuotation,reference:e.target.value})}variant='outlined' size="small"  fullWidth style={{width:'200px'}}/>
              </div>
            </div>
            </Grid>
          </Grid>
          </div>
          <div className="box2">
            {itemTable()}
          </div>

        </div>
        </div>
      </div>

    )
  }

  function ViewQuotationPage(){
   
    return (
      <div>
        
        <div style={{marginTop:'20px'}}>
      
        <div>
        <span className="text bold lg">Quotation #{_quotation.number}</span>
        <div className="space-top">
          <div className="push-left-right">
            <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
            <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
            </div>
          </div>
        
          <div style={{margin:'20px 50px'}}>
            <div className="push-left-right space-top space-bottom2" >
              <div className="ruby">
                <Button variant="outlined" color="primary" className="space-right2">Edit</Button>
                <Button variant="outlined" color="primary" className="space-right2" onClick={()=>openModal('convertToInvoice',_quotation,false)} >Convert to Invoice</Button>
              </div>
              <div>
                <Button className="space-left2" variant="outlined" color="primary" onClick={(e)=>openPopup('more',e.currentTarget)}>More</Button>
                <Button className="space-left2" variant="contained" color="primary" onClick={(e)=>openPopup('sendQuotation',e.currentTarget)}>Record Payment</Button>
              </div>
            </div>
            {invoice()}
          </div>
        </div>
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

    console.log("SSSSS",_quotation)
   
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
              <div className="text2 bold " style={{fontSize:'40px'}}>Quote</div>
              <div className="text2 bold" style={{fontSize:'22px'}}>Fresible</div>
              <div className="text2">Nigeria</div>

              <div style={{marginTop:'50px'}}>
                <div className="text2 space-bottom2">Quotation No: #{_quotation.number}</div>
                <div className="text2 space-bottom2">Quote Date: <Moment format={'DD/MM/YYYY'} date={_quotation?.issueDate} /></div>
                <div className="text2 space-bottom2">Expires On:<Moment format={'DD/MM/YYYY'} date={_quotation?.dueDate} /></div>
                <div className="text2 bold space-bottom2">Grand Total: {moneyFormat(_quotation.total)}</div>
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
        {_quotation.items?.map((data,index)=>{
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
        {[{name:'Sub Total',value:_quotation.subTotal},
          {name:'Discount',value: _quotation.discount?.amount},
          {name:'VAT',value:_quotation.vatTotal},
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
          <Grid item xs={3} className="push-right"><span className="text3">{moneyFormat(_quotation.total)}</span></Grid>
        </Grid>
{/* 
        <Grid container>
          <Grid item xs={3}>
            <div className="text bold md">Bank Details:</div>
            <div className="text sm">{_quotation.bankDetails +"- 0034578984 Cube Inc."}</div>
            <div className="text md bold space-top">Terms/Notes:</div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
          <div className="space-top2" style={{width:'70%',padding:'20px',background:'#F9F9F9'}}>
            <span className="text italic sm light">{_quotation.note}</span>
          </div>
          </Grid>
        </Grid> */}
      </div>

      <div style={{background:'#336666',padding:'40px 20px'}}>
        <div className="white shift-right">
          <span className="text2 white bold">Grand Total:</span>
          <hr className="space-y hr2"/>
          <div className="text3 space-top white space-bottom2" style={{fontSize:'45px',lineHeight:'30px'}}>{moneyFormat(_quotation.total)}</div>
          <div className="text2 sm white">Total payment due in  <Moment date={_quotation.dueDate}  toNow ago/>.</div>
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
            <Grid container spacing={1} className="padding-y">
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold space-left">Item</span></Grid>
              <Grid item xs={2}><span  style={{background:'#FCFFFF'}} className="text bold">Quantity</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold">Price per unit</span></Grid>
              <Grid item xs={2}><span style={{background:'#FCFFFF'}} className="text bold space-left2">Tax</span></Grid>
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold">Amount</span></Grid>
            </Grid>
          
          {quotationItems.map((data,index)=>{
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
                  <Grid item xs={2}><TextField size="small" variant='outlined' onChange={(e)=>updateQuotationItem(e.target.value,data,1)} defaultValue={data.quantity}/> </Grid>
                  <Grid item xs={2}><span className="text">{moneyFormat(data.price)}</span></Grid>
                  <Grid item xs={2}> 
                  <FormControlLabel
                      value="VAT(7.5%)"
                      control={<Checkbox onChange={(e)=>updateQuotationItem( e.target.checked,data,2)} color="primary" defaultChecked={data.vatIncluded} />}
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
          
          
          <div style={{padding:'20px'}}>
            <Grid container style={{marginTop:'15px'}}>
              <Grid item xs={5}>
                <div>
                 
                </div>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={4} className="push-right">
                <div className="shift-right box">
                  <div className="push-left-right space-top center2">
                    <span className="text">Subtotal:</span>
                    <span className="text push-right bold">{moneyFormat(tempQuotation.subTotal)}</span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text ruby">
                      Discount:
                      <select className="select" style={{marginLeft:'5px'}} onChange={(e)=>updateQuotationItem(e.target.value,null,3) }>
                        <option value="PERCENTAGE">%</option>
                        <option value="FIXED">₦</option>
                      </select>
                    </span>
                    <span className="text push-right bold"><TextField size="small" onChange={(e)=>updateQuotationItem(e.target.value,null,4)} style={{width:'80px',fontSize:'12px',background:'#ffffff'}} variant="outlined"/></span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text">VAT(7.5%):</span>
                    <span className="text push-right bold">{moneyFormat(tempQuotation.vatTotal)}</span>
                  </div>
                  <div className="push-left-right space-top center2">
                    <span className="text">Total:</span>
                    <span className="text push-right bold">{moneyFormat(tempQuotation.total)}</span>
                  </div>
                  
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="center">
            <Button variant="contained" color="primary" onClick={()=> dispatch('post','/api/v1/accounting/quotations',"createQuotation",tempQuotation)}>Save</Button>
          </div>
         
        </div>)
  }

   


  function quotationTable(){
    const ROWS_PER_PAGE=10
    // const quotations =  [ 
    //   {id:1,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:1},
    //   {id:2,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:2},
    //   {id:3,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:3},
    //   {id:4,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:4},
    //   {id:5,code:"00043", name:"Dolby Inc",date:"11/02/2022",total:'2939339398',amount:"292929292",status:5},
    // ]

    const handleChange = (event, value) => {
      setPage(value);
    };
    const filtered=quotations.data?.filter(x=>
    (x.number+"").toLowerCase().includes(searchValue?.toLowerCase())
      )
   
    return (
        <div>
        <div className="box2" style={{marginTop:'40px',marginBottom:"20px"}}>
          <Grid container spacing={1} className="center2 space-top2">
            <Grid item xs={4}><span className="text bold">Customer</span></Grid>
            <Grid item xs={2}><span className="text bold">Date</span></Grid>
            <Grid item xs={2}><span className="text bold">Number</span></Grid>
            <Grid item xs={3}><span className="text bold">Amount</span></Grid>
            <Grid item xs={1}><span className="text bold">Action</span></Grid>
          </Grid>

           {filtered?.slice((page- 1) * ROWS_PER_PAGE,(page- 1) * ROWS_PER_PAGE + ROWS_PER_PAGE).map((data,index)=>{
           

            return(
          <div>
           <hr className="hr"/>
          <Grid container spacing={1} className="center2">
              <Grid item xs={4}> <span className="text truncate">{data.customer?.name}</span> </Grid>
              <Grid item xs={2}><span className="text truncate"><Moment format={'DD/MM/YY'} date={data.date}/></span></Grid>
              <Grid item xs={2}><span className="text">#{data.number}</span></Grid>
              <Grid item xs={3}><span className="text">{moneyFormat(data.total)}</span></Grid>
              <Grid item xs={1}>
                <span className="ruby">
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
  function dispatch(method,url,type,data=''){
    if(method=='post'){
        authClient.post(url, data).then((res) => {
        switch (type){ 
          case "addCustomer":
          case "createQuotation":
            openModal('success',{title:'Complete',message:'Successful'},true)
            break;
          case "sendQuotation":
            openModal('success',{title:'Send Quotation',message:'Quotation Sent'},true)
            break;
          case "sendByMail":
            openModal('success',{title:'Send Quotation',message:'Quotation Sent',animation:defaultOption2},true)
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
          case "getQuotations":
            setQuotations(res.data)
            break;
          case "getItems":
              setItems(res.data?.data)
              break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=="delete"){
      authClient.delete(url + data).then((res) => {
        switch (type){ 
          case "deleteQuotation":
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
          case "deleteQuotation":
            dispatch('delete','api/v1/accounting/quotations/delete?id=',"deleteQuotation",showModal.data?.id)
            break;
          case "sendQuotation":
            dispatch('post','/api/v1/accounting/quotations',"createQuotation",showModal.data)
            data= {
              from:e.from,
              to:e.to,
              sendCopyToSelf:e.sendCopyToSelf,
              attachQuotationAsPDF:e.attachQuotationAsPDF,
            }
            dispatch('post','/api/v1/accounting/quotations/send','sendQuotation',data)
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
            console.log("DATA2",data)
            dispatch('post','/api/v1/accounting/accounts','addAccount',data)
            break;
          case "sendByMail":
            data= {
              id:e.id,
            }
            dispatch('post','/api/v1/accounting/quotations/send-email','sendByMail',data)
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
      </div>
    )
  }

  function showPopupData(data){
    let d=[]
    switch (data?.type){
      case "view":
        const view =(d)=>{
          setQuotationStage(getStatusId(d.status));
          goTo(3)
          set_quotation(d)
          closePopup()
        }
        return (
          <div>
            <div className="text sm hover ipad" onClick={()=>view(data.n)}>View</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Edit</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Duplicate</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Print</div>
            <hr className="hr"/>
            <div className="text sm hover ipad" onClick={()=>openModal('convertToInvoice',data.n,false)}>Convert to Invoice</div>
            <hr className="hr"/>
            <div className="text sm hover ipad" onClick={()=>openModal('sendByMail',data.n,false)}>Send by Mail</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Export as PDF</div>
            <hr className="hr"/>
            <div className="text sm red hover padding-x" onClick={()=>openModal('deleteQuotation',data.n,false)}>Delete</div>
          </div>
        )
      case "saveAndSend":
        return (
          <div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Save and Send</div>
            <div className="text sm hover" onClick={()=> dispatch('post','/api/v1/accounting/quotations',"createQuotation",tempQuotation) }>Save as Draft</div> <div className="text sm red hover" onClick={()=>openModal('edit')}>Delete</div>
          </div>
        )
      case "sendQuotation":
        return (
          <div>
            <div className="text sm hover" onClick={()=>openModal('sendByMail',null,true)}>Send by Mail</div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Print</div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Export as PDF</div>
          </div>
        ) 
      case "more":
        return (
          <div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Duplicate</div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Print</div>
            <div className="text sm hover" onClick={()=>openModal('sendQuotation',null,true)}>Export as PDF</div>
            <hr className="hr"/>
            <div className="text sm hover red" onClick={()=>openModal('sendQuotation',null,true)}>Delete</div>
          </div>
        ) 
      case "yesno":
        return (
          <div>
            <div className="text sm hover">Yes</div>
            <div className="text sm hover">No</div> 
          </div>
        )
     
        case "addCustomer":
        const performAction=(d)=>{
            setCustomer(d)
            setTempQuotation({...tempQuotation,customerId:d.id})
          if(data.n==1){
            goTo(4)
            setNewQuotationStage(1)
          }else if(data.n==2){
            setNewQuotationStage(2)
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
          setQuotationItems(quotationItems => [...quotationItems, item]);
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
      case "sendQuotation":
        return (
          <div >
          {modalHeader("Send Quotation")}
              <div className="modalBody">
              <div>
                <div className="ruby">
                    <span className="text mLeft">From:</span>
                    <TextField name="name" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">To:</span>
                    <TextField name="name" fullWidth className="mRight" inputRef={register({ required: true})} variant='outlined'  size="small"/>
                </div>
              </div>

              <div>
                <div className="space-top ruby">
                    <span className="text mLeft">Subject:</span>
                    <span className="text mRight">Quotation #00074 from Fresible</span>
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
                      label="VAT Included"
                    />
                  </div>
                  <div>
                     <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" defaultChecked={true} />}
                      label="Attach Quotation as PDF"
                    />
                  </div>
                    <div className="space-bottom ruby">
                      <Button  variant="contained" color="primary" className="space-right2">Send Quotation</Button>
                      <Button  variant="outlined" color="primary" className="space-right2">Preview</Button>
                      <Button  variant="outlined" color="primary" className="space-right2" onClick={()=>closeModal()}>Cancel</Button>
                    </div>
              </div>
              </div>
          </div>
        )
        case "sendByMail":
          return (
            <div >
            {modalHeader("Send Estimate")}
                <div className="modalBody">
                
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
                </div>
                </div>

                <div className=" center" style={{justifyContent:'center',display:'flex'}}>
                  <Button color="primary" variant="contained" type="submit" >
                    Send
                  </Button>
                  <div className="space-left2 cancel" onClick={()=>closeModal()}>
                    Cancel
                  </div>
                </div>
            </div>
          )
      case "sendQuotationReceipt":
        return (
          <div >
          {modalHeader("Send Quotation")}
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
                    <span className="text mRight">Quotation #00074 from Fresible</span>
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
   
      case "deleteQuotation":
        const deleteQuotation=()=>{
          console.log(showModal.data?.id)
          dispatch('delete','api/v1/accounting/quotations/delete?id=',"deleteQuotation",showModal.data?.id)
        }
        return(
          <div>
            <div className="modalDeleteHeader">
              <div className="push-left-right">
                <span className="text white lg bold">Delete Quotation</span>
                <Close className="click" onClick={()=>closeModal()} style={{ color:"white"}}/>
              </div>
            </div>
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">Are you sure you want to delete this quotation? </div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button  variant="contained" color="secondary" onClick={()=>deleteQuotation()}>Delete Quotation</Button>
                  <Button variant="outlined" className="space-left2" onClick={()=>closeModal()}>Cancel</Button>
                </div>
            </div>
          </div>
        )
        
      case "duplicateQuotation":
        const duplicateQuotation=()=>{
          console.log(showModal.data?.id)
          dispatch('post','api/v1/accounting/quotations/duplicate?id=',"duplicateQuotation",showModal.data?.id)
        }
        return(
          <div>
            <div className="modalHeader">
              <div className="push-left-right">
                <span className="text white lg bold">Duplicate Quotation</span>
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
                  <Button  variant="contained" color="secondary" onClick={()=>duplicateQuotation()}>Duplicate Quotation</Button>
                  <Button variant="outlined" className="space-left2" onClick={()=>closeModal()}>Cancel</Button>
                </div>
            </div>
          </div>
        )
     
      case "convertToInvoice":
        const confirm= ()=>{
          const d={
            id:data.data?.id,
          }
          dispatch('post','/api/v1/accounting/quotations/to-invoice','convertToInvoice',d)
        }
        return(
          <div>
            {modalHeader("Confirm Action")}
            <div className="modalBody padding">
                <div className="text center padding">
                  <div className="text">Do you want to convert this quote to an invoice?</div>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                <Button variant="contained" color="primary" className="space-right2" onClick={()=>confirm()}>Convert</Button>
                  <Button color="secondary" onClick={()=>closeModal()}>Cancel</Button>
                 
                </div>
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
