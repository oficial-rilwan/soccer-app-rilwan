import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  date: {
    backgroundColor: '#fff',
  },
  formHelper: {
    margin: 0,
  },
  font: {
    backgroundColor: '#fff',
    fontSize: '.8rem',
  },
  notchedOutline: {
    borderColor: '#F5F6F8',
  },
  fontItalic: {
    fontStyle: 'italic',
  },
  notchedOutline_2: {
    borderColor: '#000',
  },
  inputAdornedEnd: {
    borderRight: '2px solid #8D8D8D',
    padding: 14,
  },
  date_2: {
    backgroundColor: '#fff',
    width: 175,
    height: 46,
    fontStyle: 'italic',
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  borderedNotched: {
    borderColor: '#E7E8E8',
  },
  notchedInputEnd: {
    borderRight: '2px solid #8d8d8d29',
    padding: 14,
  },
  specials: {
    backgroundColor: '#FCFFFF',
    fontSize: '.8rem',
    width: '11rem',
    border: '1px solid #DFDFDF',
  },
}));

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#1F53D7',
        color: '#fff',
      },
    },
  },
});

export const BirthDateInput = ({
  value,
  handleDateChange,
  maxDate,
  ...props
}) => {
  const classes = useStyles();
  // const day = new Date(value).toLocaleDateString().substr(0, 2);
  // const month = new Date(value).toLocaleDateString().substr(3, 2);
  // const year = new Date(value).toLocaleDateString().substr(6, 4);
  const currentYear = new Date().getUTCFullYear();

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          size="small"
          variant="inline"
          inputVariant="outlined"
          InputProps={{
            classes: {
              root: classes.date,
            },
          }}
          FormHelperTextProps={{
            classes: {
              contained: classes.formHelper,
            },
          }}
          placeholder="dd/mm/yyyy"
          format="dd/MM/yyyy"
          maxDate={maxDate && `${currentYear - 18}-12-31`}
          value={value ? value : null}
          onChange={handleDateChange}
          {...props}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export const HireDateInput = ({
  value,
  font,
  fontItalic,
  handleDateChange,
  specials,
  ...props
}) => {
  const classes = useStyles();
  // const day = new Date(value).toLocaleDateString().substr(0, 2);
  // const month = new Date(value).toLocaleDateString().substr(3, 2);
  // const year = new Date(value).toLocaleDateString().substr(6, 4);
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            size="small"
            variant="inline"
            inputVariant="outlined"
            InputProps={{
              classes: {
                root: font
                  ? classes.font
                  : fontItalic
                  ? classes.fontItalic
                  : specials
                  ? classes.specials
                  : classes.date,
                notchedOutline: classes.notchedOutline,
              },
            }}
            placeholder="dd/mm/yyyy"
            format="dd/MM/yyyy"
            FormHelperTextProps={{
              classes: {
                contained: classes.formHelper,
              },
            }}
            onChange={handleDateChange}
            value={value ? value : null}
            {...props}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export const MaterialDatePicker = ({
  value,
  fontItalic,
  handleDateChange,
  notched,
  year,
  month,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            size="small"
            variant="inline"
            inputVariant="outlined"
            InputProps={{
              classes: {
                root: classes.date_2,
                notchedOutline: notched
                  ? classes.borderedNotched
                  : classes.notchedOutline_2,
                inputAdornedEnd: notched
                  ? classes.notchedInputEnd
                  : classes.inputAdornedEnd,
              },
            }}
            FormHelperTextProps={{
              classes: {
                contained: classes.formHelper,
              },
            }}
            placeholder="dd/mm/yyyy"
            format={'dd/MM/yyyy'}
            value={value ? value : null}
            onChange={handleDateChange}
            {...props}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export const MonthPicker = ({
  value,
  fontItalic,
  handleDateChange,
  notched,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            size="small"
            variant="inline"
            inputVariant="outlined"
            InputProps={{
              classes: {
                root: classes.date_2,
                notchedOutline: notched
                  ? classes.borderedNotched
                  : classes.notchedOutline_2,
                inputAdornedEnd: notched
                  ? classes.notchedInputEnd
                  : classes.inputAdornedEnd,
              },
            }}
            placeholder="dd/mm/yyyy"
            format={'dd/MM/yyyy'}
            value={value ? value : null}
            onChange={handleDateChange}
            {...props}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};
