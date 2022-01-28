import React, { useEffect, useState } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField,Button, Grid,IconButton,InputAdornment,Input,InputLabel, ButtonGroup,Popover,Modal,Paper,Checkbox,FormControlLabel,Select,MenuItem,FormControl,Drawer} from '@material-ui/core';
import {Autocomplete,Pagination} from '@material-ui/lab';
import {Close,CreateOutlined, DeleteForeverOutlined, SearchOutlined,
  ExpandMore,Edit,  Delete,Search,CalendarToday,MoreVert,KeyboardBackspace,AddCircleOutline,SendOutlined,FiberManualRecord, Cancel, CancelOutlined} from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/sucessful.json';
import animationData2 from 'modules/animations/mail.json';
import { useHistory } from 'react-router';
import { ReactComponent as OnBoarded } from 'lib/assets/icons/Onboarded.svg';
import { ReactComponent as Checkmark } from 'lib/assets/icons/check-circle.svg';
import { ReactComponent as Warning } from 'lib/assets/icons/warning-circle.svg';
import { ReactComponent as Info } from 'lib/assets/icons/info-circle.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {moneyFormat} from 'lib/helpers/formatCurrency';
import Moment from 'react-moment';
import moment from 'moment';

import '../index.css';
import Backdrop from '@material-ui/core/Backdrop';
import NaijaStates from 'naija-state-local-government';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment)

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

export default function TaxCalender() {
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

  const [showPopup, setShowPopup] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [showDrawer, setShowDrawer] = useState(null);
  const [searchValue, setSearchValue] =useState('');
  const [selection, setSelection] =useState({});

  const classes = useStyles();
  const [pageType, setPageType] = useState(1);
  const { register, handleSubmit, errors } = useForm();

  const [addMore,setAddMore]=useState(1)

  const [items,setItems]=useState([])

  const [_calender,set_calender]=useState([
    {
      name:'PAYE Remittance',
      date:"2021/12/22",
      type:1
    },
    {
      name:'PAYE Payments',
      date:"2021/12/23",
      type:1
    },
    {
      name:'CGT Payments',
      date:"2021/12/24",
      type:1
    },
    {
      name:'PAYE Payments',
      date:"2021/11/12",
      type:2
    },
    {
      name:'VAT Payments',
      date:"2021/10/12",
      type:3
    },
  ])
  
  const [events, setEvents]=useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "PAYE Remittance"
    },
    {
      start: "2021/12/12",
      end: "2021/12/12",
      title: "VAT Payments"
    },
  ])
  

  useEffect(() => {
   setUpEvents()
  }, []);
  
  const setUpEvents = ()=>{
    setEvents([])
    _calender.map((data,index)=>{
      setEvents(events=>[...events, {start:data.date,end:data.date,title:data.name}])
    })
  }

  const refresh = (filter='')=>{
    
  }




  // constant definition for openning and closing the popups and modals of the application
  const openPopup = (type, e,n)=>{
    setShowPopup({type:type,data:e,n:n})
  }
  const closePopup = ()=>{
    setShowPopup(null)
    setSearchValue('')
  }

  const openDrawer = (type, e,n)=>{
    setShowDrawer({type:type,data:e,n:n})
  }
  const closeDrawer = ()=>{
    setShowDrawer(null)
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
    setPageType(d)
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
      case 1: return CalenderPage()
     
    }
  }

  

  //Startup page
  function CalenderPage(){
    return (
      <div>

          <div className="text lg bold space-top ">Tax Calender</div>

          <Grid container spacing={2} className="space-top">
            <Grid item md={9}>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "100vh" }}
              />
            </Grid>
            <Grid item md={3}>
              <div className="padding" style={{background: '#404040',boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',borderRadius: '5px'}}>
                <div className="text white">Upcoming Tax Payment</div>
                {_calender.filter(x=>x.type==1).map((data,index)=>{
                  return (
                    <div>
                      <div className="push-left-right space-top">
                        <div style={{marginLeft:'15px'}}>
                          <div className="text white list sm">{data.name}</div>
                          <div className="text white sm light">{moment(data.date).format("DD-MM-YYYY")}</div>
                        </div>
                        <div>
                          <span className="click white sm block ruby" style={{background:'#00DC7D',borderRadius:'2.5px',padding:'5px',height:'30px'}}>Pay Now</span>
                        </div>
                      </div>
                    </div>
                  )
                })}

              <div className="text white space-top">Pending Tax Payment</div>
                {_calender.filter(x=>x.type==2).map((data,index)=>{
                  return (
                    <div>
                     <div className="push-left-right space-top">
                        <div style={{marginLeft:'15px'}}>
                          <div className="text white list sm">{data.name}</div>
                          <div className="text white sm light">{moment(data.date).format("DD-MM-YYYY")}</div>
                        </div>
                        <div>
                          <span className="click white sm block ruby" style={{background:'#00DC7D',borderRadius:'2.5px',padding:'5px',height:'30px'}}>Pay Now</span>
                        </div>
                      </div>
                    </div>
                  )
                })}

              <div className="text white space-top">Outstanding Tax Payment</div>
                {_calender.filter(x=>x.type==3).map((data,index)=>{
                  return (
                    <div>
                      <div className="push-left-right space-top">
                        <div style={{marginLeft:'15px'}}>
                          <div className="text white list sm">{data.name}</div>
                          <div className="text white sm light">{moment(data.date).format("DD-MM-YYYY")}</div>
                        </div>
                        <div>
                          <span className="click white sm block ruby" style={{background:'#00DC7D',borderRadius:'2.5px',padding:'5px',height:'30px'}}>Pay Now</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="text white">{}</div>
              </div>
            </Grid>
          </Grid>
          
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

        <Drawer
            anchor={'right'}
            open={showDrawer!=null ? true: false}
            onClose={()=>closeDrawer()}
          >
           {showDrawerData(showDrawer)}
          </Drawer>

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


  function showDrawerData(data){
    let d=[]
    switch (data?.type){
      case "getPin":
        const onSubmit =(d)=>{
          const _d={
            date:selection.date,
            searchCriteria:d.searchCriteria,
            value:d.value,
          }
          console.log("DATA",_d)
          dispatch('post','endpoint','getPin',_d);
          closeDrawer();
        }
        return (
          <div className="padding2">
            <div className="push-right space-top2">
              <CancelOutlined className="click" onClick={()=>closeDrawer()}/>
            </div>
            <div className="">
              <span className='text lg bold'>{data?.data.name}</span>
            </div>
            <div className="text light">Input relevant data and click on submit to validate</div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text light space-top">Date of Incorporation or Date of Birth</div>
            <div style={{position:'relative'}} className="mRight">
                            <div className=""  style={{position:'absolute',zIndex:'10', right:'10px',paddingTop:'6px'}}>
                            <CalendarToday variant="outlined" />
                            </div>
                            <DatePicker
                              placeholderText="Select Date"
                              className="datepicker text padding1 click"
                              onChange={ date => setSelection({...selection,date:date})}
                              selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                              dateFormat="dd/MM/yyyy"
                              selected={selection.date}    
                            />
                    </div>

            <div className="text light space-top">Select Search Criteria</div>
            <select placeholder="BVN, NIN, CAC, TIN" 
              className="select mRight" name="searchCriteria" ref={register} >
              <option value="BVN">Bank Verification Number (BVN)</option>
              <option value="NIN">National Identification Number (NIN)</option>
              <option value="CAC">CAC Registration Number</option>
              <option value="TIN">Tax Identification Number (TIN)</option>
              <option value="phone">Registered Phone Number</option>
            </select>

            <div className="text light space-top center flex">Enter Values <Info className="click space-left2" onClick={(e)=>openPopup('TINInfo',e.currentTarget)}/></div>
            <TextField size="small" style={{paddingRight:'10px'}} name="value"  inputRef={register} defaultValue={data?.data.number}  fullWidth variant="outlined" type="number"/>

            <div className="push-right space-top">
              <Button variant="contained" color="primary" type="submit">Proceed</Button>
            </div>
            </form>
            </div>
        )
     
        case "validateTin":
          const onSubmit2 =(d)=>{
            const _d={
              searchCriteria:d.searchCriteria,
              value:d.value,
            }
            console.log("DATA",_d)
            dispatch('post','endpoint','validateTin',_d);
            closeDrawer();
          }
          return (
            <div className="padding2">
              <div className="push-right space-top2">
                <CancelOutlined className="click" onClick={()=>closeDrawer()}/>
              </div>
              <div className="">
                <span className='text lg bold'>{data?.data.name+' Validation'}</span>
              </div>
              <div className="text light">Input relevant data and click on submit to validate</div>
  
              <form onSubmit={handleSubmit(onSubmit2)}>
            
              <div className="text light space-top">Select Search Criteria</div>
              <select placeholder="BVN, NIN, CAC, TIN" 
                className="select mRight" name="searchCriteria" ref={register} >
                <option value="BVN">Bank Verification Number (BVN)</option>
                <option value="NIN">National Identification Number (NIN)</option>
                <option value="CAC">CAC Registration Number</option>
                <option value="TIN">Tax Identification Number (TIN)</option>
                <option value="phone">Registered Phone Number</option>
              </select>
  
              <div className="text light space-top center flex">Enter Values <Info className="click space-left2" onClick={(e)=>openPopup('TINInfo',e.currentTarget)}/></div>
              <TextField size="small" style={{paddingRight:'10px'}} name="value"  inputRef={register} defaultValue={data?.data.number}  fullWidth variant="outlined" type="number"/>
  
              <div className="push-right space-top">
                <Button variant="contained" color="primary" type="submit">Validate</Button>
              </div>
              </form>
              </div>
          )
       
      default:
        return null
      
    }
  }

  function showPopupData(data){
    let d=[]
    switch (data?.type){
      case "pending":
        return (
          <div>
            <div className="pendingValidation" onClick={()=>closePopup()}>Pending Validation</div>
          </div>
        )
      case "validated":
        return (
          <div>
            <div className="validated" onClick={()=>closePopup()}>Validated</div>
          </div>
        )
      case "TINInfo":
        return (
          <div className="TINInfo" style={{maxWidth:'300px'}}>
            <div className="white text sm space-bottom">Please note for CAC Reg. No. the full number should be typed out, example; BN0093772829, RC8900283, IT487892982</div>
            <div className="shift-right">
             <Button onClick={()=>closePopup()}
             variant="contained" color="primary"style={{borderRadius:'40px'}}>Close</Button>
            </div>
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
