import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { StepConnector } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useState } from 'react';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  connectorHorizontal: {
    position: 'relative',
    width: '228%',
    right: '83px',
    borderTopWidth: 3,
    borderRadius: 20,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  horizontal: {
    padding: '15px 4px',
    width: '33rem',
  },
  labelContainer: {
    position: 'relative',
    bottom: '13px',
    fontStyle: 'italic',
    left: '32px',
  },
  payslips: {
    fontStyle: 'italic',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Enter Payroll', 'Run Payroll', 'Send Payslips'];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#283861',
    },
  },
  line: {
    borderColor: '#C4C4C4',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export default function HorizontalLabelPositionBelowStepper({ style, number }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { pathname } = useLocation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        style={style}
        activeStep={
          pathname.substring(26) == 'enter'
            ? 0
            : pathname.substring(26) == 'run'
            ? 1
            : 2
        }
        connector={
          <QontoConnector
            classes={{
              line: classes.connectorHorizontal,
            }}
          />
        }
        classes={{ root: classes.horizontal }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                labelContainer:
                  label == 'Send Payslips'
                    ? classes.payslips
                    : classes.labelContainer,
              }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div> */}
    </div>
  );
}
