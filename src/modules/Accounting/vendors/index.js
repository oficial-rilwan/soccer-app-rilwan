import React, { useEffect, useState, useRef } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import { TextField,Button, Grid,IconButton,InputAdornment,Input,InputLabel, ButtonGroup,Popover,Modal,Paper,Checkbox,FormControlLabel,Select,MenuItem,FormControl} from '@material-ui/core';
import {Autocomplete,Pagination} from '@material-ui/lab';
import {Close,CreateOutlined, DeleteForeverOutlined, SearchOutlined,
  ExpandMore,Edit,  Delete,Search,CalendarToday,MoreVert,KeyboardBackspace,AddCircleOutline,SendOutlined,FiberManualRecord, FontDownload} from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/sucessful.json';
import animationData2 from 'modules/animations/mail.json';
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


export default function Vendor() {
  const [path, , pathname] = useRouter();
  const history = useHistory();

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
  const [vendors,setVendors]=useState([])
  const [ivendors,setIVendors]=useState(null)
  const [file,setFile]=useState('')
  const fileInput = useRef();

  useEffect(() => {
    dispatch('get','/api/v1/accounting/vendors','getVendors','')
  }, []);

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
      case 1: return VendorPage()
      case 3: return ImportVendorPage()
    }
  }

  //Startup page for invoice
  function VendorPage(){

    const ROWS_PER_PAGE=10

    

    const filter=vendors.data
    
    const handleChange = (event, value) => {
      setPage(value);
    };
    const filtered=filter?.filter(x=>
      x.name.toLowerCase().includes(searchValue?.toLowerCase())
      )

    const openCreateBill =()=>{
      history.push({pathname:'/dashboard/outflow',data:2})
    }

    return (
      <div>
        <Header path={path} url={'/dashboard/vendors'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
          <div className="space-top">
          <div className="push-left-right center2">
            <TextField
              placeholder="Search Vendor"
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
            <div className="ruby center2">
              <Button variant="contained" color="primary" className="space-right2"onClick={()=> goTo(3)}>Import</Button>
              <Button variant="outlined"  color="primary" onClick={(e)=>openModal('addVendor')}>Add Vendor </Button>    
            </div>
          </div>

          

           
        <div className="space-top">
          <div className="box2" style={{marginTop:'10px',marginBottom:"20px"}}>
          <Grid container spacing={1} className="center2 space-top2">
            <Grid item xs={3}><span className="text bold">Name</span></Grid>
            <Grid item xs={3}><span className="text bold">Phone Number</span></Grid>
            <Grid item xs={4}><span className="text bold">Outstanding Balance</span></Grid>
            <Grid item xs={2}><span className="text bold">Action</span></Grid>
          </Grid>

           {filtered!=null && filtered.slice((page- 1) * ROWS_PER_PAGE,(page- 1) * ROWS_PER_PAGE + ROWS_PER_PAGE).map((data,index)=>{
            return(
          <div>
           <hr className="hr"/>
          <Grid container spacing={1} className="center2">
              <Grid item xs={3}><span className="text truncate blue click" onClick={()=>goTo(2)}>{data.name}</span></Grid>
              <Grid item xs={3}><span className="text truncate">{data.phone}</span></Grid>
              <Grid item xs={4}><span className="text">{moneyFormat(data.openingBalance)}</span></Grid>
              <Grid item xs={2}>
                <span className="ruby">
                  <span className="text blue click space-right2" onClick={()=>openCreateBill()}>Create a bill</span>
                  <MoreVert className="click" onClick={(e)=>openPopup('view',e.currentTarget)}/>
                </span>
              </Grid>
          </Grid>
          </div>
          )
        })}
        </div>
        </div>
      </div>
     
        </div>
          <div className="push-left-right">
            <div></div>
         
          <Pagination count={Math.ceil(filtered?.length / ROWS_PER_PAGE)} page={page} className="push-right space-top2"
          onChange={handleChange} variant="outlined" shape="rounded" color="primary"/>
          </div>
      </div>

    )
  }

  function ImportVendorPage(){
    // const icustomers=[
    //   {id:1,name:'Mary',email:'mary@fresible.com',phone:'08833898'},
    //   {id:2,name:'Paul',email:'mary@fresible.com',phone:'08833898'},
    //   {id:3,name:'Emmanule',email:'mary@fresible.com',phone:'08833898'},
    //   {id:4,name:'Mary',email:'mary@fresible.com',phone:'08833898'}
    // ]
    const download =()=>{
      const win = window.open('https://jureb-backend.herokuapp.com/api/v1/accounting/vendor/download-template', '_blank');
      if (win != null) {
        win.focus();
      }
    }

    const handleInputChange = (e) => {
      let { files } = e.target;
      let userData = new FormData();
      setFile(files[0]?.name);
      files && userData.append('file', files[0]);

      dispatch('post','/api/v1/accounting/vendors/read-file','uploadVendor',userData)
    };

    const handleImport = () => {
       ivendors!=null && dispatch('post','/api/v1/accounting/vendors/import','importVendor',ivendors)
    };
  

    
    return (
      <div>
        <Header path={path} url={'/dashboard/vendors'} pathname={pathname} />
        <div style={{marginTop:'20px'}}>
        <div className="space-top">
          <div className="push-left-right">

            <div className="click"style={{background:'#EEF5FC', padding:'7px', borderRadius:'20px'}}>
              <KeyboardBackspace className="center block" onClick={()=>goTo(1)}/>
            </div>
          </div>
        </div>

        <Grid container  className=" space-top" >
            <Grid item xs={1} className="space-right">
              <div className="center" style={{marginTop:'60px',width:'40px'}}>
                <div className="text md bold circle">1</div>
                <hr className="hr vertical"/>

                <div className="text md bold circle">2</div>
                <hr className="hr vertical"/>

                <div className="text md bold circle">3</div>
              
              </div>
            </Grid>

            <Grid item xs={10}>
              <div className="box2" style={{height:'143px', marginBottom:'100px',padding:'20px'}}>
                <div className="text lg bold" style={{lineHeight:'25px'}}>Download Template</div>
                <div className="text space-bottom">Download the template locally to your device and populate the required fields</div>
                <div className="push-right">
                  <Button variant="contained" color="primary" onClick={()=>download()}>Download</Button>
                </div>
              </div>

              <input type="file" style={{ display: 'none' }} ref={fileInput}  onChange={handleInputChange}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              <div className="box2" style={{height:'143px', marginBottom:'100px',padding:'20px'}}>
                <div className="text lg bold" style={{lineHeight:'25px'}}>Upload Template</div>
                <div className="text space-bottom">Upload the populated template that was downloaded</div>
                <div className="push-left-right">

                  <span className="text sm"> {file==""? "No file selected": file+' selected'} </span>
                  <Button variant="contained" color="primary" onClick={() => fileInput.current.click()}>Upload</Button>
                </div>
              </div>

              {ivendors!=null ?
              <div className="box2" style={{marginBottom:'20px',padding:'0px'}}>
                <Grid container className="center2" style={{background:'#EEF5FC'}}>
                  <Grid xs={5}><span className="ruby bold text"><Checkbox color="primary"/>Vendor Name</span></Grid>
                  <Grid xs={5} ><span className="bold text ">Email</span></Grid>
                  <Grid xs={2}><span className="bold text space-right2">Phone Number</span></Grid>
                </Grid>

                {ivendors.map((data,index)=>{
                  return (
                    <div>
                      
                      <Grid container  className="center2" spacing={1} style={{paddingTop:'1px'}}>
                          <Grid item xs={5}><span className="text ruby"><Checkbox color="primary"/>{data.name}</span></Grid>
                          <Grid item xs={5}><span className="text">{data.email}</span></Grid>
                          <Grid item xs={2}><span className="text">{data.phone}</span></Grid>
                         
                      </Grid>
                      <hr className="hr"/>
                    </div>
                  )
                })}
                 <div className="push-left-right padding">
                   <span></span>
                
                   <Button variant="contained" onClick={()=>handleImport()} color="primary" className="padding">Add Vendors</Button>
                  </div>
              </div>

              :
              <div className="box2 center center2" style={{height:'143px', marginBottom:'100px',padding:'20px'}}>
                <div className="text light lg space-bottom">No vendor has been imported</div>
              </div>
              }


            </Grid>

        </Grid>
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
      {id:1,name:"Banana Milk Shake",code:'101',quantity:100,price:'2022029',isTaxed:true,amount:'378378370',date:'19/11/2020',status:1},
      {id:2,name:"Banana Milk Shake",code:'102',quantity:100,price:'2022029',isTaxed:true,amount:'378378370',date:'19/11/2020',status:2},
      {id:3,name:"Banana Milk Shake",code:'103',quantity:100,price:'2022029',isTaxed:true,amount:'378378370',date:'19/11/2020',status:2},
    ]
    return (
      <div className="box2" style={{marginTop:'40px',marginBottom:"20px"}}>
          
            <Grid container spacing={1}>
              <Grid item xs={4}><span style={{background:'#FCFFFF'}} className="text bold space-left2">Invoice Number</span></Grid>
              <Grid item xs={4}><span  style={{background:'#FCFFFF'}} className="text bold">Date</span></Grid>
              <Grid item xs={3}><span style={{background:'#FCFFFF'}} className="text bold">Amount</span></Grid>
              <Grid item xs={1}><span style={{background:'#FCFFFF'}} className="text bold">Status</span></Grid>
            </Grid>
          
          {items.map((data,index)=>{
            return(
              <div style={{marginTop:'5px',marginBottom:'3px'}}>
              <hr className="hr"/>
              <Grid container spacing={1} className="center2" style={{marginTop:'5px'}}>
                  <Grid item xs={4}>
                    <span className="ruby space-right2 space-left2">
                      <span className="text blue">{data.name+" - "}</span>
                      <span className="text">{data.code}</span>
                    </span>
                  </Grid>
                  <Grid item xs={4}><span className="text">{data.date}</span></Grid>
                  <Grid item xs={3}><span className="text">{moneyFormat(data.amount)}</span></Grid>
                  <Grid item xs={1}><span className="text">{getStatus(data.status)}</span></Grid>
                </Grid>
              </div>
          )
        })}
        </div>)
  }

  


  function getStatus(type){
    switch (type){
      case 1: return <span className="text bold" style={{color:'#27AE60'}}>Paid</span>
      case 2: return <span className="text bold" style={{color:'#F2994A'}}>Partial</span>
      case 3: return <span className="text bold" style={{color:'#EB5757'}}>Unpaid</span>
      case 4: return <span className="text bold" style={{color:'#F2C94C'}}>Draft</span>
      default: return <span className="text bold" style={{color:'#F2C94C'}}>Draft</span>
    }
  }

  function getposition(type){
   const sub = (base, exponent) => {
      return <span>
                <span style={{alignItems: 'flex-end'}}>
                    <span style={{fontSize: 20}}>{base}</span>
                </span>
                <span style={{alignItems: 'flex-start'}}>
                    <span style={{fontSize: 10}}>{exponent}</span>
                </span>
            </span>
        }
    switch (type){
      case 1: return <span className="text bold" style={{color:'#fff'}}>{sub(1,'st')}</span>
      case 2: return <span className="text bold" style={{color:'#4400B2'}}>{sub(2,'nd')}</span>
      case 3: return <span className="text bold" style={{color:'#00DC7D'}}>{sub(3,'rd')}</span>
      case 4: return <span className="text bold" style={{color:'#F2994A'}}>{sub(4,'th')}</span>
      default: return <span className="text bold" style={{color:'#200E32'}}>{sub(5,'th')}</span>
    }
  }

  //APIs definition
  function dispatch(method,url,type,data){
    if(method=='post'){
        authClient.post(url, data).then((res) => {
          console.log("DDDD",res)
          console.log("DDtypeDD",type)
        switch (type){ 
          case "addInvoice":
          case "addCustomer":
          case "addVendor":
            openModal('success',{title:'Complete',message:'Successful'},true)
            break;
          case "addInvoice":
            openModal('success',{title:'Send Invoice',message:'Invoice Sent'},true)
            break;
          case "uploadVendor":
            setIVendors(res.data?.data);
            openModal('success',{title:'Complete',message:'Successful'},true)
            console.log(ivendors)
            break;
          case "importVendor":
            openModal('success',{title:'Complete',message:'Successful'},true)
            goTo(1)
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
        console.log('get',res.data)
        switch (type){ 
          case "getCustomers":
            setCustomers(res.data)
            break;
          case "getVendors":
            setVendors(res.data)
            break;
        }
      })
      .catch((e) => console.log(e));
    }
    else
    if(method=="delete"){
      authClient.delete(url + data).then((res) => {
        switch (type){ 
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
            dispatch('delete','api/v1/accounting/transaction?transactionId=',"deleteInflow",showModal.data?.id)
            break;
          case "addInflow":
            if(showModal.data!=null) dispatch('put','/api/v1/accounting/transaction?transactionId=',"addInflow",showModal.data?.id)
            else dispatch('post','/api/v1/accounting/transaction',"addInflow",showModal.data)
            
            break;
          case "addVendor":
             data= {
              name:e.name,
              openingBalance:e.balance,
              email:e.email,
              phone:e.phone,
              accountNumber:e.accountNumber,
              bankName: selection.bank,
              accountName:e.accountName,
              address:{number:e.no, 
                street:e.street,
                city:e.city,
                lga:selection.lga,
                state:selection.state,
               country:'Nigeria'
             },
            }
            console.log("addVendor",data)
            console.log("addVendor",selection)
            dispatch('post','/api/v1/accounting/vendors','addVendor',data)
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
        return (
          <div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Edit</div>
            <div className="text sm hover ipad" onClick={()=>openModal('edit')}>Create Bill</div>
            <div className="text sm red hover padding-x" onClick={()=>openModal('edit')}>Delete</div>
          </div>
        )
      case "saveAndSend":
        return (
          <div>
            <div className="text sm hover" onClick={()=>openModal('sendInvoice',null,true)}>Save and Send</div>
            <div className="text sm hover" onClick={()=>openModal('edit')}>Save as Draft</div> <div className="text sm red hover" onClick={()=>openModal('edit')}>Delete</div>
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
    
      case "addItem":
         d=[
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
          {id:1,name:'Banna Milk Shake',code:101,price:'89988383'},
        ]
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
                        <div className="text sm">{moneyFormat(data.price)}</div>
                      </div>
                    <Button variant="contained" color="primary" onClick={()=>{closePopup()}}>Select</Button>
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
        case "bank":
          d=[
            {id:1,name:"First Bank"},
            {id:2,name:"Zenith Bank"},
            {id:3,name:"GT Bank"},
          ]
          return (
            <div>
              {SelectDropDownItem("Bank Name",d,"bank")}
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
                      label="VAT Included"
                    />
                  </div>
                  <div>
                     <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" defaultChecked={true} />}
                      label="Attach Invoice as PDF"
                    />
                  </div>
                    <div className="space-bottom ruby">
                      <Button  variant="contained" color="primary" className="space-right2">Send Invoice</Button>
                      <Button  variant="outlined" color="primary" className="space-right2">Preview</Button>
                      <Button  variant="outlined" color="primary" className="space-right2" onClick={()=>closeModal()}>Cancel</Button>
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
                              onChange={ date => setFromDate(date) }
                              selectsStart showMonthDropdown showYearDropdown dropdownMode="select"
                              dateFormat="dd/MM/yyyy"
                              selected={fromDate}    
                            />
                    </div>
                  </div>
                </div>


                <div>
                  <div className="space-top2 ruby">
                      <span className="text mLeft2">Payment Type:</span>
                      <TextField name="name" className="mRight" fullWidth inputRef={register({ required: true})} variant='outlined'  size="small"   />
                  <div>
                </div>
                </div>
                <div>
                <div className="space-top2 ruby">
                  <span className="text mLeft2">Amount Paid:</span>
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="weight" ref={register({ required: true})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                </div>
               </div>
               <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Witholding Tax:</span>
                  
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="weight" ref={register({ required: true})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Total:</span>
                  <TextField placeholder="000,000.00" className="mRight" fullWidth variant="outlined"  size="small" name="weight" ref={register({ required: true})} 
                            InputProps={{  startAdornment: (  <InputAdornment position="start"> <div className="sign">₦</div> </InputAdornment> ),}}
                              />
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Payment Method:</span>
                    <select className="select mRight">
                      <option value="grapefruit">Cash</option>
                      <option value="grapefruit">Bank Transfer</option>
                      <option value="grapefruit">Bank Draft</option>
                      <option value="grapefruit">Card</option>
                    </select>
                  </div>
                </div>

                <div>
                <div className="space-top2 ruby">
                    <span className="text mLeft2">Payment Account:</span>
                    <select className="select mRight">
                      <option value="grapefruit">Cash</option>
                      <option value="grapefruit">Bank Transfer</option>
                      <option value="grapefruit">Bank Draft</option>
                      <option value="grapefruit">Card</option>
                    </select>
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
                      value="start"
                      control={<Checkbox color="primary" defaultChecked={true} />}
                      label="VAT Included"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" defaultChecked={true} />}
                      label="Attach Invoice as PDF"
                    />
                    </div>
                    <div className="space-bottom">
                      <Button  variant="contained" color="primary" className="space-right2">Save</Button>
                      <Button  variant="outlined" color="primary" className="space-right2" onClick={()=>setModalInvoice({data:true})}>Preview</Button>
                      <Button  variant="outlined" color="primary" onClick={()=>closeModal()}>Cancel</Button>
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
     
      case "confirmAction":
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
                  <Button variant="contained" color="primary" className="space-left2" onClick={()=>{openModal('success',{title:'Complete',message:'Successful'},false); goTo(1);setStage(1)}}>Yes. Continue</Button>
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
      case "addVendor":
        return(
          <div>
              {modalHeader("New Vendor")}
              <div className="modalBody">
                <div>
                  <div container className='center2 ruby'>
                    <span style={{width:'150px'}} className="text sm align-right space-right2">Vendor Name:<span className="red">*</span></span>
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
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Phone Number:</span>
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
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Account No:</span>
                      <TextField name="accountNumber" placeholder="Phone" variant='outlined' inputRef={register} size="small" style={{width:'300px'}}/>
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Bank Name:</span>
                      {SelectDropDown("bank","Bank Name","300px")}
                  </div>
                </div>
                <div>
                  <div container className='center2 ruby space-top'>
                      <span style={{width:'150px'}} className="text sm align-right space-right2">Account Name:</span>
                      <TextField name="accountName" placeholder="Phone" variant='outlined' inputRef={register} size="small" style={{width:'300px'}}/>
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
            <div className="text bold center space-top2">{title}</div>
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
