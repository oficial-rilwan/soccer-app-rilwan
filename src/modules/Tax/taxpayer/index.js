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

export default function TaxPayer() {
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
  

  const [taxinfo, setTaxInfo] = useState(
    {customer:{name:'Cube',address:'114, Park view Estate, surulere, Lagos',web:'www.cube.com',phone:'01-223456'},
    taxAuthority:[
      {name:"JTB-TIN",number:'567890098',status:1},
      {name:"FIRS-TIN",number:'098745623',status:2},
      {name:"FCT-TIN",number:'-',status:3}],
    taxOffice:[
      {name:'FCT-IRS Asokoro Tax Station',address:'No 70, Yakubu Gowon Crescent, Asokoro, Abuja'},
      {name:'FIRS Asokoro Tax Station:',address:'No 70, Yakubu Gowon Crescent, Asokoro, Abuja'},
    ]}
  )

  useEffect(() => {
   
  }, []);

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
      case 1: return TaxPayerInfoPage()
      case 2: return TaxInfoPage()
     
    }
  }

  //Startup page for tax payer page
  function TaxPayerInfoPage(){
    return (
      <div>
        <div className="text lg bold space-top">Tax Payer’s Information</div>

      
        <div className="push-right space-top2">
          <Button variant="contained" color="primary" onClick={()=>goTo(2)}>Validate TIN</Button>
        </div>

        <div className="box2 padding space-top">
          <Grid container spacing={3} className="padding">
            
            <Grid item md={4} style={{borderRight:'solid 1px #DFDFDF'}}>
              <div className="flex">
                <div className="circle space-right2">
                  <span className='text white'>{taxinfo.customer.name.substring(0, 1).toUpperCase()}</span>
                </div>
                <div>
                  <div className="text md bold">{taxinfo.customer?.name}</div>
                  <div className="text">{taxinfo.customer?.address}</div>
                  <div className="text">{taxinfo.customer?.web}</div>
                  <div className="text">{taxinfo.customer?.phone}</div>
                </div>

              </div>
            </Grid>

            <Grid item md={4} style={{borderRight:'solid 1px #DFDFDF'}}>
                <Grid container spacing={2} >
                  <Grid item md={5}>
                    <div className="text md bold shift-right" >Tax Authority</div>
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item md={5}>
                    <div className="text md bold space-bottom2">TIN Number</div>
                  </Grid>
                </Grid>
                  {taxinfo.taxAuthority.map((data,index)=>{
                    return (
                      <Grid container spacing={2} >
                         <Grid item md={5}>
                          <div className="text shift-right" >{data.name}:</div>
                         </Grid>
                         <Grid item md={1}></Grid>
                         <Grid item md={5}>
                          <div className="ruby">
                            <div className="text space-right2">{data.number}</div>
                            {data.status==1 ?
                              <div className="ruby" style={{textAlign:'left'}}><Warning width='20' className="click" onClick={(e)=>openPopup('pending',e.currentTarget)}/></div>
                            : 
                            (data.status==2 ?
                              <div className="ruby" style={{textAlign:'left'}}><Checkmark width='20' className="click" onClick={(e)=>openPopup('validated',e.currentTarget)}/></div>
                            :
                              <span className="text"></span>
                            )}
                          </div>
                         </Grid>
                      </Grid>
                        )
                      })}
            </Grid>

            <Grid item md={4}>
                <div>
                  <div className="text md bold space-bottom2 center flex">Tax Offices: <Info className="click space-left2"/></div>
                  {taxinfo.taxOffice.map((data,index)=>{
                    return (
                      <div className="space-bottom">
                        <div className="text bold">{data.name}:</div>
                        <div className="text">{data.address}</div>
                      </div>
                    )
                  })}
                 
                </div>
            </Grid>

          </Grid>
        </div>
      
      </div>

    )
  }

  function TaxInfoPage(){
    return (
      <div>
        <div className="text lg bold space-top">Tax Information</div>
        <div className="click space-top space-bottom"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px',display:'table'}}>
          <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
        </div>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <span className="text md">Tax Identification Numbers</span>
          </Grid>
          <Grid item lg={9}>
            <div className="box2">
              <div className="center"  style={{margin:'5px 20px'}}>
                  {taxinfo.taxAuthority.map((data,index)=>{
                    return (
                      <Grid container spacing={3} className="space-top2 center2">
                        <Grid item md={2}>
                          <div className="text shift-right mLeft" style={{width:'100px'}}>{data.name}</div>
                        </Grid>
                        <Grid item md={6}>
                            <TextField name="name" defaultValue={data.number} className="mRight space-right"  fullWidth variant='outlined'  size="small"   />
                        </Grid>
                        <Grid item md={4}>
                            {data.status==1 ?
                            <Button className="block" variant="contained" color="primary" onClick={()=>openDrawer('validateTin',data)}>Validate</Button>
                            : 
                            (data.status==2 ?
                              <div  style={{alignItems:'center',display:'flex',}}><Checkmark width='20'/><span className="space-left2 green">{data.name+" Validated"}</span></div>
                            :
                            <Button className="block" variant="outlined" color="primary" onClick={()=>openDrawer('getPin',data)}>Get TIN</Button>
                            )}
                          </Grid>
                        </Grid>
                        )
                      })}   
              </div>
              <hr className='hr'  style={{margin:'20px 0px'}}/>
              <div className="box" style={{margin:'5px 20px',padding:'30px'}}>
                <div className="text bold lg">Guide on how to Get & Validate Your TIN</div>
                <div className="text italic">Follow the instructions below to get your  TIN</div>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <div className="text space-bottom2 bold space-top">For Individuals & Organizations</div>
                      <div style={{margin:'10px 0px 10px 20px'}}>
                      <div className="block list text space-bottom2">Click the <span className="blue">“Get TIN or Validate”</span> Button close to the TIN field above.</div>
                      <div className="text list space-bottom2">Select your Date of Birth/ Incorporation.</div>
                      <div className="text list space-bottom2">Select your preferred search criteria (TIN, NIN, CAC Registration No.(RC,BN,IT) BVN or Phone number).</div>
                      <div className="text list space-bottom2">Provide the appropriate value based on the criteria.</div>
                      <div className="text list space-bottom2">Click the Proceed button.</div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                      <OnBoarded style={{width:'100%'}}/>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>

      
      
      
      </div>

    )
  }

  function getCustomerAddress(e){
    return `${e?.number} ${e?.street} ${e?.city} ${e?.lga} ${e?.state!=null ? e.state:""} ${e?.country}`
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
