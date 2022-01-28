import { makeStyles } from '@material-ui/core/styles';
import {
  TypographyH5,
  TypographyBold,
} from 'modules/components/Typography/Typography';
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  noCard: {
    borderRadius: '50%',
    backgroundColor: 'rgb(236, 236, 255)',
    display: 'flex',
    width: '30px',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: '1rem',
  },
  questionWrapper: {
    padding: '2rem 1rem',
    margin: '1rem 0',
    width: '100%',
    borderRadius: '5px',
    backgroundColor: '#fff',
    border: '0.5px solid #000000',
    display: 'flex',
    gap: '0 15px',
  },
  fieldTypeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '.3rem 0 0',
    [theme.breakpoints.down('360')]: {
      flexDirection: 'column',
    },
  },
  mandatoryText: {
    fontSize: 14,
    color: '#878181',
    margin: '0 0 0 14px',
    [theme.breakpoints.down('360')]: {
      margin: 0,
    },
  },
  idText: {
    fontSize: 15,
    textAlign: 'center',
  },
  fieldType: {
    fontSize: 14,
    color: '#878181',
    textTransform: 'capitalize',
  },
  vertIcon: {
    marginLeft: 'auto',
  },
}));

export default function QuestionCard({ data, handleClick, idText }) {
  const classes = useStyles();
  return (
    <>
      <section className={classes.questionWrapper}>
        <div className={classes.noCard}>
          <TypographyH5 className={classes.idText}>{idText}</TypographyH5>
        </div>
        <div style={{ marginLeft: '15px' }}>
          <TypographyBold>{data?.question}</TypographyBold>
          <div className={classes.fieldTypeWrapper}>
            <TypographyH5 className={classes.fieldType}>
              {data?.fieldType}
            </TypographyH5>
            <TypographyH5 className={classes.mandatoryText}>
              {data?.mandatory ? 'Mandatory' : ''}
            </TypographyH5>
          </div>
        </div>
        <div className={classes.vertIcon}>
          <MoreVert style={{ cursor: 'pointer' }} onClick={handleClick(data)} />
        </div>
      </section>
    </>
  );
}
