import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { ErrorOutline, Close, HelpOutline } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { FormControlLabel, makeStyles, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  boxHeader: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
  },
  box: {
    background: '#FCFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: '3px',
    padding: '1rem 2rem',
    marginBottom: '2rem',
  },
  text: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: '1rem 8rem  1rem 0rem',
    fontSize: '1.1rem',
  },
}));

export default function ValuationMethods() {
  const classess = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <ReturnBtn />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Help</p>
          <HelpOutline style={{ marginLeft: '.5rem' }} />
        </div>
      </div>
      <Alert
        icon={<ErrorOutline color="primary" fontSize="inherit" />}
        severity="info"
        style={{ flexWrap: 'wrap', color: 'blue' }}
        action={<Close />}>
        Valuation Method can only be changed at the begining of every financial
        year
      </Alert>
      <h2 className={classess.headerText}>Inventory Valuation Method</h2>

      <div className={classess.box}>
        <h3 className={classess.boxHeader}>First In - First Out (FIFO)</h3>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem 2rem',
            }}>
            <div
              style={{
                display: 'flex',
                padding: '1rem 2rem',
              }}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
                color="primary"
              />
            </div>
            <p className={classess.text}>
              First In, First Out, commonly known as FIFO, is an
              asset-management and valuation method in which assets produced or
              acquired first are sold, used, or disposed of first. For tax
              purposes, FIFO assumes that assets with the oldest costs are
              included in the income statement's cost of goods sold (COGS). The
              remaining inventory assets are matched to the assets that are most
              recently purchased or produced.
            </p>
          </div>{' '}
        </div>
      </div>

      <div className={classess.box}>
        <h3 className={classess.boxHeader}>Weighted Average</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem 2rem',
          }}>
          <div
            style={{
              display: 'flex',
              padding: '1rem 2rem',
            }}>
            <Radio
              color="primary"
              checked={selectedValue === 'b'}
              onChange={handleChange}
              value="b"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
          </div>
          <p className={classess.text}>
            Weighted average cost method is the cost of goods available for sale
            is divided by the number of units available for sale and is commonly
            used when inventory items are so melded or identical to each other
            that it is impossible to assign specific costs to single units.
          </p>
        </div>
      </div>
    </div>
  );
}
