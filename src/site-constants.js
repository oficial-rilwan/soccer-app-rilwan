import * as Yup from 'yup';

const profileFormData = {
  schema: () =>
    Yup.object({
      logo: Yup.object().test('type', 'We only support jpeg', (value) => {
        return !['image/jpeg', 'image/png', 'image/jpg'].includes(
          value && value[0].type,
        );
      }),
      businessName: Yup.string()
        .min(3, 'Business name must be at least 3 characters')
        .required('Business name is required'),
      state: Yup.string().required('State is required'),
      lga: Yup.string().required('LGA is required'),
      number: Yup.string().required('Required'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      businessSector: Yup.string().required('Business sector is required'),
      businessStartDate: Yup.date().required('Business date is required'),
      country: Yup.string().required('Country is required'),
      phone: Yup.string()
        .trim()
        .matches(/^[0-9]*$/, 'Invalid format')
        .required('Telephone is needed'),
      registrationNumber: Yup.string().when('businessType', {
        is: (value) => value !== 'Sole Proprietorship/ Unregistered Business',
        then: Yup.string().required('Registration number is required'),
        otherwise: Yup.string(),
      }),
      dateOfIncorporation: Yup.date().when('businessType', {
        is: (value) => value !== 'Sole Proprietorship/ Unregistered Business',
        then: Yup.date().required('Date of incorporation is required'),
        otherwise: Yup.string(),
      }),
      businessType: Yup.string().required('Business type is required'),
    }),
};

const completeProfileData = {
  schema: Yup.object({
    otp: Yup.string()
      .trim()
      .matches(/^[0-9]*$/, 'Invalid OTP format')
      .required('OTP is required for verification'),
  }),
};

const createAccount = {
  schema: Yup.object({
    firstName: Yup.string()
      .trim()
      .matches(/^[a-zA-z]*$/, 'Numbers are not allowed')
      .required('First name is required'),
    lastName: Yup.string()
      .trim()
      .matches(/^[a-zA-z]*$/, 'Digits not allowed')
      .required('Last name is required'),
    email: Yup.string()
      .trim()
      .email('Email address is invalid')
      .required('Email address is required'),
    password: Yup.string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .trim()
      .required('You have to confirm your password'),
  }),
};

const signIn = {
  schema: Yup.object({
    email: Yup.string()
      .trim()
      .email('Email must be valid')
      .required('Email address is required'),
    password: Yup.string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
};
const findEmail = {
  schema: Yup.object({
    email: Yup.string()
      .trim()
      .email('Email must be valid')
      .required('Email address is required'),
  }),
};

const addEmployee = {
  schema: Yup.object({
    image: Yup.string().test('type', 'We only support jpeg', (value) => {
      return !['image/jpeg', 'image/png', 'image/jpg'].includes(
        value && value[0].type,
      );
    }),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().required('Phone number is required'),
    middleName: Yup.string('Middle name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    department: Yup.string().required('Department is required'),
    designation: Yup.string().required('Designation is required'),
    employmentType: Yup.string().required('Employment type is required'),
    NIN: Yup.string(),
    TIN: Yup.string(),
    no: Yup.string().required('Required'),
    street: Yup.string().required('Field is required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('State is required'),
    lga: Yup.string().required('LGA is required'),
    email: Yup.string().email().required('Email is required'),
    employeeManager: Yup.string(),
    dateOfHire: Yup.date().required('Date of hire is required'),
    dateOfBirth: Yup.date().required('D.O.B is required'),
    workLocation: Yup.string().required('Work location is required'),
    vacationPolicy: Yup.string().required('Vacation policy is required'),
    // deductions: Yup.string().required(),
    bankName: Yup.string(),
    accountNo: Yup.string(),
    accountName: Yup.string(),
    // status: Yup.string().required(),
    inviteButton: Yup.boolean(),
    nextOfKin: Yup.string(),
    nextOfKinPhone: Yup.string(),
    nextOfKinRelationship: Yup.string(),
    annualSalary: Yup.number().typeError('Amount must be a number'),
  }),
};

const singleInventoryFrom = {
  schema: Yup.object({
    type: Yup.string(),
    name: Yup.string().required(),
    description: Yup.string(),
    vatExempted: Yup.string().required('Vat exempted is required'),
    sku: Yup.string(),
    code: Yup.string().required(),
    unit: Yup.string().required(),
    costPricing: Yup.object({
      price: Yup.number()
        .typeError('Price must be a number')
        .required('Price is required'),
      accountId: Yup.string(),
      vatRate: Yup.number().typeError('Amount must be a number'),
      vatInclusive: Yup.boolean().when('costPricing.vatInclusive', {
        is: (value) => value == undefined,
        then: Yup.boolean().default(true),
      }),
    }),
    sellingPricing: Yup.object({
      price: Yup.number('this must be a number')
        .typeError('Price must be a number')
        .required('Price is required'),
      accountId: Yup.string(),
      vatRate: Yup.number().typeError('Amount must be a number'),
      vatInclusive: Yup.boolean().default(true),
    }),
    totalStockQuantity: Yup.number()
      .typeError('Amount must be a number')

      .typeError('Amount must be a number')
      .required('Inventory at Hand is required'),
    asOfDate: Yup.date().required('As of Date is required'),
    accountId: Yup.string().required('Inventory Asset Account is required'),
    lowStockCount: Yup.number()
      .typeError('Amount must be a number')
      .required('Low stock alert is required'),
  }),
};

const variableInventoryFrom = {
  schema: Yup.object({
    type: Yup.string(),
    name: Yup.string().required(),
    description: Yup.string(),
    vatExempted: Yup.string().required('Vat exempted is required'),
    sku: Yup.string().required(),
    code: Yup.string().required(),
    unit: Yup.string().required(),
    accountId: Yup.string().required(),
    costPricing: Yup.object({
      price: Yup.number()
        .typeError('Amount must be a number')
        .required('Cost Price is required'),
      accountId: Yup.string().required('Account id  is required'),
      vatInclusive: Yup.boolean().default(false),
    }),
    sellingPricing: Yup.object({
      price: Yup.number()
        .typeError('Amount must be a number')
        .required('Selling price is required'),
      accountId: Yup.string().required('Account id  is required'),
      vatInclusive: Yup.boolean().default(false),
    }),
    totalStockQuantity: Yup.number()
      .typeError('Amount must be a number')
      .required('Inventory at Hand is required'),
    lowStockCount: Yup.number()
      .typeError('Amount must be a number')
      .required('Low stock alert is required'),
    variant: Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number()
        .typeError('Amount must be a number')
        .required('Price  is required'),
      code: Yup.string().required('Code is required'),
      unit: Yup.string().required(),
      unitCount: Yup.number()
        .typeError('Amount must be a number')
        .required('UnitCount is required'),
    }),
  }),
};
const serviceInventoryFrom = {
  schema: Yup.object({
    type: Yup.string(),
    name: Yup.string().required(),
    description: Yup.string(),
    vatExempted: Yup.string(),
    price: Yup.number()
      .typeError('Amount must be a number')
      .required('Cost price is required'),
    accountId: Yup.string(),
    vatInclusive: Yup.boolean(),
  }),
};

const adjustQuanityForm = {
  schema: Yup.object({
    productId: Yup.string(),
    stockId: Yup.string(),
    quantity: Yup.number().typeError('Amount must be a number').required(),
    reason: Yup.string().required(),
  }),
};

export {
  profileFormData,
  completeProfileData,
  createAccount,
  signIn,
  addEmployee,
  findEmail,
  singleInventoryFrom,
  variableInventoryFrom,
  serviceInventoryFrom,
  adjustQuanityForm,
};
