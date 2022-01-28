import { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  BlobProvider,
} from '@react-pdf/renderer';
import Moment from 'react-moment';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authClient } from 'modules/authentication/requestClient';
import CompanyLogo from '../../../../lib/assets/images/companyLogo.png';
import memoActions from 'redux/actions/memoActions';

const { fetchMemoData } = memoActions;
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    background: '#ffffff',
    border: '2px solid #aeaeae',
    borderRadius: '7px',
    flexDirection: 'column',
    margin: 'auto',
    padding: '2.5rem',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '1rem',
    marginRight: '0rem',
    right: 0,
  },
  top: {
    display: 'flex',
  },
  address: {
    margin: '1.4rem 0',
  },
  body: {
    padding: '.5rem 0',
    color: '#3b3b3b',
  },
  bottom: {
    marginTop: '2.5rem',
  },
  signature: {
    margin: '1.5rem 0',
    width: '270px',
    height: '80px',
    border: '.5px solid #808080',
    borderRadius: '5px',
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  table: {
    minWidth: 650,
  },
  downloadBtn: {
    height: '50px',
  },
  up: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function ViewMemo({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, memoData } = useSelector((state) => state?.memoData);
  const profile = useSelector(
    (state) => state?.loginStats?.user?.profile,
  );
  const user = useSelector((state) => state?.loginStats?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const [err, setErr] = useState('');
  const [memo, setMemo] = useState('');
  const [ready, setReady] = useState(false);
  const [isPrint, showPrint] = useState(false);

  useEffect(() => {
    authClient
      .get(`/api/v1/memo/fetch?memoId=${match?.params?.id}`)
      .then(({ data }) => setMemo(data?.data))
      .catch((e) => console.error(e));
  }, [match.params.id]);

  useEffect(() => {
    dispatch(fetchMemoData(match.params.id, setErr));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 3000);
  }, []);

  const printDoc = async () => {
    const blob = await pdf(
      <MemoDocument
        isLoading={isLoading}
        memoData={memoData}
        profile={profile}
        user={user}
      />,
    ).toBlob();
    print(URL.createObjectURL(blob));
  };

  console.log(profile);

  return (
    <>
      <HeaderComp url={`/dashboard/memo/view/${match?.params?.id}`} />
      <div className={classes.up}>
        <ReturnBtn style={{ width: '100%' }} />
        <BlobProvider
          document={
            <MemoDocument
              isLoading={isLoading}
              memoData={memoData}
              profile={profile}
              user={user}
            />
          }>
          {({ url, loading, error }) => {
            return loading ? (
              'Generating document'
            ) : (
              <PrimaryButton className={classes.downloadBtn}>
                <a
                  style={{
                    width: 'inherit',
                    textDecoration: 'none',
                    color: '#ffffff',
                  }}
                  href={url}
                  download={`memo.pdf`}>
                  Download
                </a>
              </PrimaryButton>
            );
          }}
        </BlobProvider>
      </div>
      <section className={classes.tableWrapper}>
        <TableContainer>
          <Paper className={classes.container}>
            <div className={classes.logo}>
              <img
                src={profile.logoUrl || CompanyLogo}
                className={'logo'}
                alt="logo"
                style={{ width: '80px' }}
              />
            </div>
            <div className={classes.top}>
              <Typography variant="h3" style={{ marginBottom: '1.5rem' }}>
                MEMO
              </Typography>
            </div>
            <div className={classes.address}>
              <Typography varaint="h6">
                To:{' '}
                {memoData?.recipients?.department.charAt(0).toUpperCase() +
                  memoData?.recipients?.department.slice(1)}
                <br />
                From: {memoData?.issuerName}
                <br />
                Date: <Moment format={'DD/MM/YYYY'} date={memoData?.date} />
                <br />
                Subject: {memoData?.title}
              </Typography>
            </div>
            <div className={classes.body}>
              <Typography
                variant="h6"
                style={{ color: '#4F4F4F', fontSize: '18px', fontWeight: 400 }}>
                Good day all,
                <br />
                {memoData?.body}
                <br />
                Regards
              </Typography>
            </div>
            <div className={classes.bottom}>
              <Typography
                variant="h6"
                style={{ fontWeight: '400', fontSize: '18px' }}>
                {profile?.firstName || user?.firstName || googleUser?.firstName}{' '}
                {profile?.lastName || user?.lastName || googleUser?.lastName}
              </Typography>
            </div>
            <div className={classes.signature} />
            <Typography
              variant={'h6'}
              style={{ fontWeight: '400', fontSize: '18px' }}>
              {user?.role}
            </Typography>
          </Paper>
        </TableContainer>
      </section>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  container: {
    display: 'flex',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    background: '#ffffff',
    border: '2px solid #aeaeae',
    borderRadius: '7px',
    flexDirection: 'column',
    margin: 'auto',
    padding: '2.5rem',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '1rem',
    marginRight: '0rem',
    right: 0,
  },
  body: {
    padding: '.5rem 0',
    color: '#3b3b3b',
  },
  bottom: {
    marginTop: '2.5rem',
  },
  signature: {
    margin: '1.5rem 0',
    width: '270px',
    height: '80px',
    border: '.5px solid #808080',
    borderRadius: '5px',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

//generate Memo pdf document

const MemoDocument = ({ isLoading, memoData, profile, user }) => {
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={profile?.meta?.secure_url}
            className={'logo'}
            alt="logo"
            style={{ width: '80px' }}
          />
        </View>

        <View style={{ display: 'flex' }}>
          <Text
            style={{
              marginBottom: '1.5rem',
              fontSize: '30px',
              fontWeight: 'bold',
            }}>
            MEMO
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1.4rem 0',
          }}>
          <Text>
            To:{' '}
            {memoData?.recipients?.department.charAt(0).toUpperCase() +
              memoData?.recipients?.department.slice(1)}
          </Text>
          <Text>From: {memoData?.issuerName}</Text>
          <Text>
            Date: <Moment format={'DD/MM/YYYY'} date={memoData?.date} />
          </Text>
          <Text>Subject: {memoData?.title}</Text>
        </View>

        <View style={styles.body}>
          <Text style={{ color: '#4F4F4F', fontSize: '18px', fontWeight: 400 }}>
            Good day all,
            <br />
            {memoData?.body}
            <br />
            Regards
          </Text>
        </View>

        <View style={styles.bottom}>
          {/* <Typography
            variant="h6"
            style={{ fontWeight: '400', fontSize: '18px' }}>
            {profile?.firstName || user?.firstName || googleUser?.firstName}{' '}
            {profile?.lastName || user?.lastName || googleUser?.lastName}
          </Typography> */}
        </View>
        <View style={styles.signature}></View>

        <View>
          <Text style={{ fontWeight: '400', fontSize: '18px' }}>
            {user?.role}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
