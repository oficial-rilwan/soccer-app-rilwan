import { TypographyBold } from 'modules/components/Typography/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { TypographyH5 } from 'modules/components/Typography/Typography';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontFamily: 'Rubik',
    fontSize: 14,
  },
}));

export default function ChartHeader({
  heading,
  subHeading,
  buttonActions,
  radio,
  link,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <div
        style={{
          padding: '1rem 1.5rem 0',
          justifyContent: 'space-between',
          display: 'flex',
          flexWrap: 'wrap',
          overflowX: 'auto',
          width: '100%',
        }}>
        <div>
          <TypographyBold variant="h5" style={{ fontSize: 20 }}>
            {heading}
          </TypographyBold>
          {subHeading && (
            <TypographyH5 component="p" style={{ fontSize: 15 }}>
              {subHeading}
            </TypographyH5>
          )}
          {radio && (
            <div style={{ display: 'flex', margin: '.8rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#336666',
                    borderRadius: '50%',
                    height: 10,
                    width: 10,
                  }}
                />
                <TypographyH5 style={{ margin: '0 .7rem', fontSize: 14 }}>
                  Inflow
                </TypographyH5>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#F2994A',
                    borderRadius: '50%',
                    height: 10,
                    width: 10,
                  }}
                />
                <TypographyH5 style={{ margin: '0 .7rem', fontSize: 14 }}>
                  Outflow
                </TypographyH5>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: matchesMd && 'none' }}>
          {buttonActions?.map(({ label }, i) => (
            <Button
              variant="contained"
              size="small"
              disableElevation
              key={i}
              style={{
                textTransform: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Rubik',
                fontSize: 13,
                fontWeight: '400',
              }}
              endIcon={<KeyboardArrowDown />}>
              {label}
            </Button>
          ))}
          {link && (
            <Button
              variant="contained"
              size="small"
              disableElevation
              style={{
                textTransform: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Rubik',
                fontSize: 13,
                fontWeight: '500',
                color: '#1F53D7',
              }}>
              View Report
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

ChartHeader.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string.isRequired,
  radio: PropTypes.array,
  buttonActions: PropTypes.array,
  defaultValue: PropTypes.string,
};
