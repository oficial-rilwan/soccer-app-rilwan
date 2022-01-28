import React, { useEffect, useState } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import { TextField,Button, Grid,IconButton,InputAdornment,Input,InputLabel, ButtonGroup,Popover,Modal,Paper} from '@material-ui/core';
import {Autocomplete,Pagination} from '@material-ui/lab';
import {Close,CreateOutlined, DeleteForeverOutlined, SearchOutlined,
  ExpandMore,Edit,  Delete,Search,CalendarToday,CloudUpload} from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/sucessful.json';
import { useHistory } from 'react-router';
import { ReactComponent as Bank } from '../../../lib/assets/icons/BankColored.svg';
import { ReactComponent as AddIcon } from '../../../lib/assets/icons/AddColored.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {moneyFormat} from '../../../lib/helpers/formatCurrency';
import './index.css';
import Backdrop from '@material-ui/core/Backdrop';
import NaijaStates from 'naija-state-local-government';
import { useForm } from "react-hook-form";

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


export default function Inflow() {
  const [path, , pathname] = useRouter();
  const history = useHistory();


const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
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
  const { register, handleSubmit, errors } = useForm();


  useEffect(() => {
    dispatch('get','/api/v1/accounting/transaction?transactionType=inflow','')
  }, []);

  const SearchT = (e) => {
    const s = e.target?.value;
    setSearchTerm(s);
  };


  const openPopup = (type, e)=>{
    setShowPopup({type:type,data:e})
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

  return (
    <div className="body">
       <Header path={path} url={'/dashboard/inflow'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
        <div className="push-left-right box">
          <div className="ruby">
            <CloudUpload  color="primary"  />
            <span className="text space-left">Import transactions securely to automate your bookkeeping and reports.</span>
          </div>
          <Button variant="outlined" color="primary"><span className="text nocase blue">Connect your bank</span></Button>
        </div>

        <div className="space-top">
          <span className="text bold">Account</span>
          <div className="push-left-right">
            <div>
            <TextField
                placeholder="All accounts"
                variant="outlined"
                onChange={SearchT}
                onClick={(e)=> openPopup("account",e.currentTarget)}
                disabled
                aria-describedby="2"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" onClick={(e)=>openPopup("account",e.currentTarget)}>
                      <ExpandMore className='click'/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button variant="contained" color="primary" onClick={()=>openModal("addInflow")}>Add Inflow</Button>
          </div>
        </div>

        <div className="space-top box">
          <Grid container>
            <Grid item xs={1}>
              <div className="text bold">Filter:</div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid xs={1}></Grid>
            <Grid item xs={4} sm={4}  md={4} lg={3}>
              <div>Customer:</div>  
                <TextField
                  placeholder="Search Customer"
                  variant="outlined"
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
            </Grid>
            <Grid item xs={4} sm={3} md={3} lg={2}>
              <div>From:</div>  
              
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
            </Grid>
            <Grid item xs={4} sm={3} md={3} lg={2}>
              <div>To:</div>  
              
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
            </Grid>

          </Grid>
         
        </div>

        <div>
          {customerTable()}
        </div>
        </div>
        {showDropdown()}
    </div>
  );

  function showdata(a,b){
    return (
      <div className="push-left-right" style={{padding:'5px 10px'}}>
        <span className="text">{a}</span>
        <span className="text">{b}</span>
      </div>
    )
  }
  
  function customerTable(){
    const ROWS_PER_PAGE=10
    const customers =  [ 
      {id:1, name:"Customer Names",description:"A little description ",date:"11/02/2022",paymentType:'Bank Transfer',amount:"292929292"},
      {id:2, name:"Customer Names Of the cenruetey",description:"A little description ",date:"11/02/2022",paymentType:'Bank Transfer',amount:"122993338"},
      {id:3, name:"Customer Names",description:"A little description about some things",date:"11/02/2022",paymentType:'Bank Transfer',amount:"9292933"},
      {id:4, name:"Customer Names",description:"A little description ",date:"11/02/2022",paymentType:'Bank Transfer',amount:"39399393"},
    ]

    const handleChange = (event, value) => {
      setPage(value);
    };
    const filtered=customers.filter(x=>
      x.name.toLowerCase().includes(searchValue?.toLowerCase())
      )
    return (
        <div>
          <div className="box2" style={{marginTop:'40px',marginBottom:"20px"}}>
          <Grid container spacing={1} className="center2 space-top2">
            <Grid item xs={2}><span className="text bold">Customer</span></Grid>
            <Grid item xs={3}><span className="text bold">Description</span></Grid>
            <Grid item xs={2}><span className="text bold">Date</span></Grid>
            <Grid item xs={2}><span className="text bold">Payment Type</span></Grid>
            <Grid item xs={2}><span className="text bold">Amount</span></Grid>
            <Grid item xs={1}><span className="text bold">Action</span></Grid>
          </Grid>

           {filtered
           .slice((page- 1) * ROWS_PER_PAGE,(page- 1) * ROWS_PER_PAGE + ROWS_PER_PAGE).map((data,index)=>{
            return(
          <div>
           <hr className="hr"/>
          <Grid container spacing={1} className="center2">
              <Grid item xs={2}><span className="text truncate">{data.name}</span></Grid>
              <Grid item xs={3}><span className="text truncate">{data.description}</span></Grid>
              <Grid item xs={2}><span className="text">{data.date}</span></Grid>
              <Grid item xs={2}><span className="text">{data.paymentType}</span></Grid>
              <Grid item xs={2}><span className="text">{moneyFormat(data.amount)}</span></Grid>
              <Grid item xs={1}>
                <span className="ruby">
                <IconButton size="small" onClick={() => openModal("deleteInflow",data,true)}>
                  <DeleteForeverOutlined  style={{ color: '#EB5757' }} />
                </IconButton>
                <IconButton   size="small"onClick={() => openModal("addInflow",data)}>
                  <Edit />
                </IconButton>
                </span>
              </Grid>
          </Grid>
          </div>
          )
        })}
        </div>
          <Pagination count={Math.ceil(filtered.length / ROWS_PER_PAGE)} page={page} className="push-right space-top2"
          onChange={handleChange} variant="outlined" shape="rounded" color="primary"/>
        </div>
    )
  }

  function dispatch(method,url,data,type){
    if(method=='post'){
        authClient.post(url, data).then((res) => {
          console.log("DDDD",res)
          console.log("DDtypeDD",type)
        switch (type){ 
          case "addInflow":;
          case "addCustomer":
            openModal('success',null,true)
            break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=='put'){
      authClient.put(url+ data).then((res) => {
      switch (url){ 
        case "addInflow":
          break;
      }
    })
    .catch((e) => console.log(e));
    }
    else
    if(method=="get"){
      authClient.get(url + data).then((res) => {
        switch (url){ 
          case "getCustomers":
            break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=="delete"){
      authClient.delete(url + data).then((res) => {
        switch (url){ 
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
          case "deleteInflow":
            dispatch('delete','api/v1/accounting/transaction?transactionId=',showModal.data?.id)
            break;
          case "addInflow":
            if(showModal.data!=null) dispatch('put','/api/v1/accounting/transaction?transactionId=',showModal.data?.id)
            else dispatch('post','/api/v1/accounting/transaction',showModal.data)
            
            break;
          case "addCustomer":
             data= {
              name:e.name,
              openingBalance:e.balance,
              email:e.email,
              phone:e.phone,
              customerDiscount:e.discount,
              address: `${e.no} ${selection.street} ${e.city} ${selection.state} ${selection.lga}`,
            }
            console.log("DATA2",data)
            dispatch('post','/api/v1/accounting/customer/create',data,'addCustomer')
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
            dispatch('post','/api/v1/accounting/accounts',data,'addAccount')
            break;
      }
    }
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
      case "success":
        return(
          <div>
            <div className="modalHeader">
              <div className="push-left-right">
                <span className="text bold">Complete</span>
                <Close className="click" onClick={()=>closeModal()} />
              </div>
            </div>
          <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <span className="blue bold center2" style={{fontSize:'22px'}}>Successful</span>
          </div>
        )
      case "deleteInflow":
        return(
          <div>
            <div className="modalDeleteHeader">
              <div className="push-left-right">
                <span className="text white">Delete Inflow</span>
                <Close className="click" onClick={()=>closeModal()} style={{ color:"white"}}/>
              </div>
            </div>
            <div className="modalBody padding">
                <div className="text center padding">
                  <span className="text">Are you sure you want to delete this transaction?</span>
                </div>
            </div>
            <div className="modalFooter padding">
                <div className="push-right">
                  <Button  variant="contained" color="secondary">Delete</Button>
                  <div className="space-left2 cancel" onClick={()=>closeModal()}>Cancel</div>
                </div>
            </div>
          </div>
        )
      case "addInflow":
        const edit=data?.data
        if(edit!=null){

        }
        return (
            <div>
              {modalHeader(edit==null ?"Add Inflow":"Edit Inflow")}
              <div className="modalBody">
                  <Grid container spacing={2} className='center2'>
                    <Grid item xs={5}>
                      <span className="text sm push-right">Date:<span className="red">*</span></span>
                    </Grid>
                    <Grid item xs={7}>
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
                            />
                    </div>
                    </Grid>
                    </Grid>
                    <Grid  container spacing={2} className='center2 space-top2'>

                      <Grid item xs={5}>
                          <span className="text sm push-right">Customer:</span>
                      </Grid>
                      <Grid item xs={7}>
                        {SelectDropDown("customer","Select customer")}
                      </Grid>
                  </Grid>
                  <Grid container spacing={2} className='center2 space-top2'>
                    <Grid item xs={5} >
                      <span className="text sm push-right">Amount Received:<span className="red">*</span></span>
                    </Grid>
                    <Grid item xs={7}>
                    <TextField placeholder="000,000.00" variant="outlined"
                            onChange={SearchT} size="small" name="weight" ref={register({ required: true})} 
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <div className="sign">₦</div>
                                </InputAdornment>
                              ),
                            }}
                          />
                    {errors.weight &&  <p className="error">Weight is required</p>}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className='center2 space-top2'>
                    <Grid item xs={5} >
                      <span className="text sm push-right">Received Account:</span>
                    </Grid>
                    <Grid item xs={7}>
                      {SelectDropDown("account2","Select account")}
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className='center2 space-top2'>
                    <Grid item xs={5} >
                      <span className="text sm push-right">Category Account:</span>
                    </Grid>
                    <Grid item xs={7}>
                      {SelectDropDown("accountCategory","Select category")}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className='center2 space-top2'>
                    <Grid item xs={5} >
                      <span className="text sm push-right">Payment Type:</span>
                    </Grid>
                    <Grid item xs={7}>
                      {SelectDropDown("paymentType","Select payment type")}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className='center2 space-top2'>
                    <Grid item xs={5} >
                      <span className="text sm push-right">Description:</span>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField variant='outlined' multiline maxRows={4}
                        />
                    </Grid>
                  </Grid>
              </div>
            </div>)
      case "editInflow":
        return(
          <div>
              {modalHeader("Edit Inflow")}
              <div className="modalbody">

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
        const options=["A","b","c"]
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
