import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  imageHolder: {
    borderRadius: 3,
    background: '#251F47',
    border: '0.5px solid #DFDFDF',
    width: '3rem',
    height: '3rem',
  },
  image: {
    width: '3rem',
    borderRadius: '50%',
    height: '3rem',
  },
}));

export default function EmployeesContainer() {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const { user } = useSelector((state) => state?.auth);
  const userRecord = useSelector((state) => state?.loginStats?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/fetch?page=1&limit=4&createdBy=${
          user?.subAdminId || userRecord?.userId || googleUser?.userId
        }`,
      )
      .then(({ data }) => setValues(data?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {values.length > 0 ? (
        values?.map(
          ({ firstName, lastName, designation, employmentStatus, meta }, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '1rem 0',
                width: '100%',
                overflowX: 'auto',
              }}>
              <div style={{ minWidth: 187 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {meta ? (
                    <Avatar
                      src={meta?.url}
                      alt="employee_image"
                      className={classes.image}
                    />
                  ) : (
                    <div className={classes.imageHolder} />
                  )}
                  <div style={{ marginLeft: '.5rem' }}>
                    <TypographyBold
                      variant="h5"
                      style={{ color: '#282828', fontSize: 15 }}>
                      {firstName} {lastName}
                    </TypographyBold>
                    <TypographyH5 component="p" style={{ fontSize: 14 }}>
                      {designation}
                    </TypographyH5>
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 38 }}>
                <TypographyBold style={{ fontSize: 14 }}>
                  {employmentStatus}
                </TypographyBold>
              </div>
            </div>
          ),
        )
      ) : (
        <TypographyH5>Employees not found</TypographyH5>
      )}
    </>
  );
}
