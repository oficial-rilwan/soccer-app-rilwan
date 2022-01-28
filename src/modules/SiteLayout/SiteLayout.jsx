import { lazy } from 'react';
import styled from 'styled-components';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import Layout, { Root, getContent } from '@mui-treasury/layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideBar from './SideBar/SideBar';
import DashBoard from 'modules/Dashboard/Dashboard';
import { Suspense } from 'react';
import { LoaderComponent } from 'lib/components/Loaders/Loaders';

//Tax Screens
const Taxpayer = lazy(() => import('modules/Tax/taxpayer'));
const TaxCalender = lazy(() => import('modules/Tax/taxCalender'));


//Accounting Screens
const Customer = lazy(() => import('modules/Accounting/customer'));
const Invoice = lazy(() => import('modules/Invoice'));
const Inflow = lazy(() => import('modules/Accounting/inflow'));
const Outflow = lazy(() => import('modules/Accounting/outflow'));
const Quotation = lazy(() => import('modules/Accounting/quotation'));
const Transactions = lazy(() => import('modules/Accounting/transactions'));
const ReconciliationImport = lazy(() =>
  import('modules/Accounting/transactions/Reconciliation/import'),
);

const ReconciliationView = lazy(() =>
  import('modules/Accounting/transactions/Reconciliation/ReconciliationView'),
);
const OutFlowForm = lazy(() =>
  import('modules/Accounting/outflow/outflowForm'),
);

const Reconciliation = lazy(() =>
  import('modules/Accounting/transactions/Reconciliation'),
);

const Employees = lazy(() =>
  import('modules/HumanResources/Employees/Employees'),
);
const AddEmployees = lazy(() =>
  import('modules/HumanResources/Employees/AddEmployees/AddEmployee'),
);
const ImportEmployees = lazy(() =>
  import('modules/HumanResources/Employees/ImportEmployees'),
);
const ViewEmployee = lazy(() =>
  import('modules/HumanResources/Employees/ViewEmployee/ViewEmployee'),
);

const LeaveManagement = lazy(() =>
  import('modules/HumanResources/LeaveManagement/LeaveManagement'),
);
const EditEmployee = lazy(() =>
  import('modules/HumanResources/Employees/EditEmployees/EditEmployee'),
);
const Promotion = lazy(() =>
  import('modules/HumanResources/Promotion/Promotion'),
);

const ViewPromotion = lazy(() =>
  import('modules/HumanResources/Promotion/components/ViewPromotion'),
);
const Memo = lazy(() => import('modules/HumanResources/InternalMemo/Memo'));
const AddMemo = lazy(() =>
  import('modules/HumanResources/InternalMemo/AddMemo/AddMemo'),
);
const ViewMemo = lazy(() =>
  import('modules/HumanResources/InternalMemo/ViewMemo/ViewMemo'),
);
const Payslip = lazy(() => import('modules/HumanResources/Payslip/Payslip'));
const ViewPayslip = lazy(() =>
  import('modules/HumanResources/Payslip/components/ViewPayslip'),
);
const PayslipOverview = lazy(() =>
  import('modules/HumanResources/Payslip/components/PayslipOverview'),
);
const Suspension = lazy(() =>
  import('modules/HumanResources/Suspension/Suspension'),
);
const TransferManagement = lazy(() =>
  import('modules/HumanResources/TransferManagement/TransferManagement'),
);
const ViewTransfer = lazy(() =>
  import('modules/HumanResources/TransferManagement/components/ViewTransfer'),
);
const PerformanceManagement = lazy(() =>
  import('modules/HumanResources/PerformanceManagement/PerformanceManagement'),
);

const PerformanceSurvey = lazy(() =>
  import('modules/HumanResources/PerformanceManagement/Survey'),
);

const Dashboard = lazy(() => import('modules/Dashboard/Dashboard'));

const TerminationManagement = lazy(() =>
  import('modules/HumanResources/TerminationManagement/Termination'),
);

const QueryManagement = lazy(() =>
  import('modules/HumanResources/QueryManagement/QueryManagement'),
);

const PayrollManagement = lazy(() =>
  import('modules/HumanResources/PayrollManagement/PayrollManagement'),
);

const ViewPayroll = lazy(() =>
  import('modules/HumanResources/PayrollManagement/components/ViewPayroll'),
);

const RunPayroll = lazy(() =>
  import('modules/HumanResources/PayrollManagement/components/RunPayroll'),
);

const ViewPerformance = lazy(() =>
  import('modules/HumanResources/PerformanceManagement/ViewPerformance'),
);

const CreatePayroll = lazy(() =>
  import('modules/HumanResources/PayrollManagement/components/CreatePayroll'),
);

const EditPayroll = lazy(() =>
  import('modules/HumanResources/PayrollManagement/components/EditPayroll'),
);

const Vendors = lazy(() => import('modules/Accounting/vendors/index'));

const ChartOfAccounts = lazy(() =>
  import('modules/Accounting/chartOfaccounts'),
);

const Budget = lazy(() => import('modules/Accounting/budget/index'));
const AddBudget = lazy(() => import('modules/Accounting/budget/AddBudget'));
const BudgetReport = lazy(() =>
  import('modules/Accounting/budget/BudgetReport'),
);
const AddCategory = lazy(() => import('modules/Accounting/budget/AddCategory'));

const EditBudget = lazy(() => import('modules/Accounting/budget/EditBudget'));

const BudgetFiscalYear = lazy(() =>
  import('modules/Accounting/budget/BudgetFiscalYear'),
);

const ViewReport = lazy(() => import('modules/Accounting/budget/ViewReport'));

const Inventory = lazy(() => import('modules/Accounting/inventory/index'));

const AddInventory = lazy(() =>
  import('modules/Accounting/inventory/addInventory/SingleInventory'),
);

const FixedAssets = lazy(() => import('modules/Accounting/fixedAssets/index'));
const NewFixedAsset = lazy(() =>
  import('modules/Accounting/fixedAssets/NewAsset'),
);

const Content = getContent(styled);

const scheme = Layout();

scheme.configureHeader((builder) => {
  builder
    .registerConfig('xs', {
      position: 'sticky',
    })
    .registerConfig('md', {
      position: 'relative', // won't stick to top when scroll down
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create('unique_id', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      anchor: 'left',
      width: 'auto', // 'auto' is only valid for temporary variant
    })
    .registerPermanentConfig('md', {
      width: '261px', // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: 64,
    });
});

export default function SiteLayout() {
  let { path, url } = useRouteMatch();

  const routes = [
    // Dashboard route
    {
      title: 'Dashboard management',
      path: `${path}`,
      component: Dashboard,
      exact: true,
    },
    // Invoice route
    {
      title: 'Invoice management',
      path: `${path}/Invoice`,
      component: Invoice,
      exact: true,
    },
   
    // Customers route
    {
      title: 'Customer management',
      path: `${path}/customers`,
      component: Customer,
      exact: true,
    },
  
    {
      title: 'Inflow management',
      path: `${path}/inflow`,
      component: Inflow,
      exact: true,
    },
    {
      title: 'Outflow management',
      path: `${path}/outflow`,
      component: Outflow,
      exact: true,
    },
    {
      title: 'Outflow management',
      path: `${path}/outflow/form`,
      component: OutFlowForm,
      exact: true,
    },
    {
      title: 'Quotation management',
      path: `${path}/quotation`,
      component: Quotation,
      exact: true,
    },
    {
      title: 'transactions management',
      path: `${path}/transactions`,
      component: Transactions,
      exact: true,
    },
    {
      title: 'transactions management',
      path: `${path}/transactions/reconciliation`,
      component: Reconciliation,
    },
    {
      title: 'Reconciliation management',
      path: `${path}/reconciliation/import`,
      component: ReconciliationImport,
    },
    {
      title: 'Reconciliation management',
      path: `${path}/reconciliation/transactions`,
      component: ReconciliationView,
    },
    // Vendors route
    {
      title: 'Vendors Management',
      path: `${path}/vendors`,
      component: Vendors,
      exact: true,
    },
    {
      title: 'Vendors Management',
      path: `${path}/charts-of-accounts`,
      component: ChartOfAccounts,
      exact: true,
    },
    // Budget route
    {
      title: 'Budget Management',
      path: `${path}/budget`,
      component: Budget,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/add`,
      component: AddBudget,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/report`,
      component: BudgetReport,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/view_report`,
      component: ViewReport,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/fiscal-year`,
      component: BudgetFiscalYear,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/edit/:id`,
      component: EditBudget,
      exact: true,
    },
    {
      title: 'Budget Management',
      path: `${path}/budget/category/add`,
      component: AddCategory,
      exact: true,
    },
    // Inventory route
    {
      title: 'Inventory management',
      path: `${path}/product-and-services`,
      component: Inventory,
    },
    {
      title: 'Inventory management',
      path: `${path}/inventory/add`,
      component: AddInventory,
    },
    // Employees route
    {
      title: 'Employees',
      path: `${path}/employees`,
      component: Employees,
      exact: true,
    },
    {
      title: 'Add Employees',
      path: `${path}/employees/add`,
      component: AddEmployees,
    },
    {
      title: 'Import Employees',
      path: `${path}/employees/import`,
      component: ImportEmployees,
    },
    {
      title: 'View Employee',
      path: `${path}/employees/view`,
      component: ViewEmployee,
    },
    {
      title: 'Edit Employee',
      path: `${path}/employees/edit`,
      component: EditEmployee,
    },
    {
      title: 'Leave Management',
      path: `${path}/leave`,
      component: LeaveManagement,
    },
    {
      title: 'Promotion Management',
      path: `${path}/promotions`,
      component: Promotion,
      exact: true,
    },
    {
      title: 'View Promotions',
      path: `${path}/promotions/view/:id`,
      component: ViewPromotion,
    },
    {
      title: 'Payslip Management',
      path: `${path}/payslip`,
      component: Payslip,
      exact: true,
    },
    {
      title: 'View Payslip Management',
      path: `${path}/payslip/view/:id`,
      component: ViewPayslip,
    },
    {
      title: 'Payslip Overview',
      path: `${path}/payslip/preview/:id`,
      component: PayslipOverview,
    },
    {
      title: 'Suspension Management',
      path: `${path}/suspension`,
      component: Suspension,
    },
    {
      title: 'Transfer Management',
      path: `${path}/transfer`,
      component: TransferManagement,
      exact: true,
    },
    {
      title: 'View Transfer Management',
      path: `${path}/transfer/view/:id`,
      component: ViewTransfer,
    },
    {
      title: 'Performance Management',
      path: `${path}/performance-evaluation`,
      component: PerformanceManagement,
      exact: true,
    },
    {
      title: 'Performance Management',
      path: `${path}/performance-evaluation/survey`,
      component: PerformanceSurvey,
    },
    {
      title: 'View Performance',
      path: `${path}/performance-evaluation/view/:id`,
      component: ViewPerformance,
    },
    {
      title: 'Termination Management',
      path: `${path}/termination`,
      component: TerminationManagement,
    },
    {
      title: 'Query Management',
      path: `${path}/query`,
      component: QueryManagement,
    },
    {
      title: 'Payroll Management',
      path: `${path}/payroll`,
      component: PayrollManagement,
      exact: true,
    },
    {
      title: 'Payroll Management',
      path: `${path}/payroll/view/:id`,
      component: ViewPayroll,
    },
    {
      title: 'Payroll Management',
      path: `${path}/payroll/create`,
      component: CreatePayroll,
    },
    {
      title: 'Payroll Management',
      path: `${path}/payroll/edit`,
      component: EditPayroll,
    },
    {
      title: 'Memo',
      path: `${path}/memo`,
      component: Memo,
      exact: true,
    },
    {
      title: 'Add Memo',
      path: `${path}/memo/add`,
      component: AddMemo,
      exact: true,
    },
    {
      title: 'View Memo',
      path: `${path}/memo/view/:id`,
      component: ViewMemo,
      exact: true,
    },
    {
      title: 'Fixed Assets',
      path: `${path}/fixed-assets`,
      component: FixedAssets,
    },

     // Tax route
    {
      title: 'Tax Payers Info',
      path: `${path}/tax_info`,
      component: Taxpayer,
    }, 
    {
      title: 'Tax Calendar',
      path: `${path}/tax-calendar`,
      component: TaxCalender,
    },
  ];

  return (
    <Root scheme={scheme}>
      {({ setOpen }) => (
        <>
          <CssBaseline />
          <SideBar path={path} url={url} setOpen={setOpen} />
          <Content
            style={{
              background: '#fff',
              padding: '0rem 1rem',
            }}>
            <Suspense fallback={<LoaderComponent />}>
              <Switch>
                {routes.map((route, i) => (
                  <Route key={i} {...route} />
                ))}
              </Switch>
            </Suspense>
          </Content>
        </>
      )}
    </Root>
  );
}
