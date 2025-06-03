import { createBrowserRouter } from "react-router-dom";
import Main from "../../OutlateAll/Main/Main";
import Home from "../../Home/Home";
import Login from "../../AuthoncationAll/Login/Login";
import SingUp from "../../AuthoncationAll/SingUp/SingUp";
import Dashboard from "../../DashbordAll/Dashbord/Dashboard";
// import AdminRoute from "../../../Hook/AdminRoute";
import DashboardItems from "../../DashbordAll/DashbordRouteUserDataAll/DashborsItemUser/DashboardItemsUser";
import AddParcel from "../../DashbordAll/DashbordRouteUserDataAll/AddParcel/AddParcel";
import StandardDelivery from "../../DashbordAll/DashbordRouteUserDataAll/AddParcel/StandardDelivery/StandardDelivery";
import StandardSucessInvoice from "../../DashbordAll/DashbordRouteUserDataAll/AddParcel/StandardSucessInvoice/StandardSucessInvoice";
import DashboardItemAdmin from "../../DashbordAll/AdminePanel/DashboardItemAdmin/DashboardItemAdmin";
import AdminSearchUserId from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminSearchUserId";
import AdminSearchStandardParcelUser from "../../DashbordAll/AdminePanel/AdminSearchStandardParcelUser/AdminSearchStandardParcelUser";
import AdminDataEntryUserApproved from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminDataEntryUserApproved/AdminDataEntryUserApproved";
import AdminEntryParcelOrApproved from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminEntryParcelOrApproved/AdminEntryParcelOrApproved";
import AdminConsignmentPendingInvoice from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminConsignmentData/AdminConsignmentPendingData/AdminConsignmentPendingInvoice/AdminConsignmentPendingInvoice";
import AdminConsignmentPendingInvoiceUpdate from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminConsignmentData/AdminConsignmentPendingData/AdminConsignmentPendingInvoiceUpdate/AdminConsignmentPendingInvoiceUpdate";
import AllMarchentConsignment from "../../DashbordAll/DashbordRouteUserDataAll/AllMarchentConsignment/AllMarchentConsignment";
import UserPendingConsignmentInvoice from "../../DashbordAll/DashbordRouteUserDataAll/AllMarchentConsignment/UserPendingConsignment/UserPendingConsignmentInvoice/UserPendingConsignmentInvoice";
import UserPendingConsignmentInvoiceUpdate from "../../DashbordAll/DashbordRouteUserDataAll/AllMarchentConsignment/UserPendingConsignment/UserPendingConsignmentInvoiceUpdate/UserPendingConsignmentInvoiceUpdate";
import CurrentBalanceDetails from "../../DashbordAll/AdminePanel/AdminSearchUserId/CurrentBalanceDetails/CurrentBalanceDetails";
import ApprovedParcelRoute from "../../DashbordAll/AdminePanel/ApprovedParcelRoute/ApprovedParcelRoute";
import AdminAmountUpdateParcel from "../../DashbordAll/AdminePanel/AdminAmountUpdateParcel/AdminAmountUpdateParcel";
import UserAmountChange from "../../DashbordAll/DashbordRouteUserDataAll/UserAmountChange/UserAmountChange";
import AdminSearchAmountChangeUserDataAllFindEmail from "../../DashbordAll/AdminePanel/AdminAmountUpdateParcel/AdminSearchAmountChangeUserDataAllFindEmail/AdminSearchAmountChangeUserDataAllFindEmail";
import UserCancelParcelAll from "../../DashbordAll/DashbordRouteUserDataAll/UserCancelParcelAll/UserCancelParcelAll";
import AdminNewMerchants from "../../DashbordAll/AdminePanel/AdminNewMerchants/AdminNewMerchants";
import AdminCoveragesDistricts from "../../DashbordAll/AdminePanel/AdminCoverages/AdminCoveragesDistricts/AdminCoveragesDistricts";
import AdminCoveragesPoliceStations from "../../DashbordAll/AdminePanel/AdminCoverages/AdminCoveragesPoliceStations/AdminCoveragesPoliceStations";
import AdminViewPaymentRequestAll from "../../DashbordAll/AdminePanel/AdminViewPaymentRequestAll/AdminViewPaymentRequestAll";
import AdminPaymentRequestDetailsAll from "../../DashbordAll/AdminePanel/AdminSearchUserId/AdminPaymentRequesrWork/AdminPaymentRequestDetailsAll/AdminPaymentRequestDetailsAll";
import UserBankDetailsAdd from "../../DashbordAll/DashbordRouteUserDataAll/UserBankDetailsAdd/UserBankDetailsAdd";
import UserPaymentList from "../../DashbordAll/DashbordRouteUserDataAll/UserPaymentList/UserPaymentList";
import UserMyPickupParcel from "../../DashbordAll/DashbordRouteUserDataAll/UserMyPickupParcel/UserMyPickupParcel";
import AdminMyHub from "../../DashbordAll/AdminePanel/AdminMyHub/AdminMyHub";
import PrivateRoute from "../../AuthoncationAll/PrivateRoute/PrivateRoute";
import AdminSearchUserNumber from "../../DashbordAll/AdminePanel/AdminSearchUserNumber/AdminSearchUserNumber";
import UserTemporeryInvoiceAllStandardData from "../../DashbordAll/DashbordRouteUserDataAll/UserTemporeryInvoiceAllStandardData/UserTemporeryInvoiceAllStandardData";
import AdminTempororyParcelInvoice from "../../DashbordAll/AdminePanel/AdminTempororyParcelInvoice/AdminTempororyParcelInvoice";
import UserAdmin from "../../DashbordAll/Dashbord/UserAdmin/UserAdmin";
import UserPaymentRequestUnikDataAll from "../../DashbordAll/DashbordRouteUserDataAll/UserPaymentList/UserPaymentListPaidData/userPaymentRequestDetailsAll/UserPaymentRequestUnikDataAll";
import PickNDropDelivery from "../../DashbordAll/DashbordRouteUserDataAll/AddParcel/PickNDropDelivery/PickNDropDelivery";
import ExpressDelivery from "../../DashbordAll/DashbordRouteUserDataAll/AddParcel/ExpressDelivery/ExpressDelivery";
import API from "../../DashbordAll/DashbordRouteUserDataAll/API/API";
import PaymentRequest from "../../DashbordAll/DashbordRouteUserDataAll/PaymentRequest/PaymentRequest";


let route = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
      children: [
         {
            path: "/",
            element: <Home></Home>
         },
         {
            path: "/login",
            element: <Login></Login>
         },
         {
            path: "/singUp",
            element: <SingUp></SingUp>
         },
      ]
   },

   // Dashboard User Panel
   // ===============================

   {
      path: "dashboard",
      element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
      children: [

         {
            path: "dashboard",
            element: <DashboardItems></DashboardItems>
         },
         {
            path: "addParcel",
            element: <AddParcel></AddParcel>
         },
         {
            path: "StandardDelivery",
            element: <StandardDelivery></StandardDelivery>
         },
         {
            path: "PickNDropDelivery",
            element: <PickNDropDelivery></PickNDropDelivery>
         },
         {
            path: "ExpressDelivery",
            element: <ExpressDelivery></ExpressDelivery>
         },
         {
            path: "StandardDelivery/StandardSucessInvoice",
            element: <StandardSucessInvoice></StandardSucessInvoice>
         },
         {
            path: "AllMarchentConsignment",
            element: <AllMarchentConsignment></AllMarchentConsignment>
         },

         {

            path: "UserPendingConsignmentInvoice/:id",
            element: <UserPendingConsignmentInvoice></UserPendingConsignmentInvoice>,
            loader: ({ params }) => fetch(`http://localhost:5000/UserConsignmentPendingInvoice/${params.id}`)

         },
         {

            path: "UserConsignmentPendingInvoiceUpdate/:id",
            element: <UserPendingConsignmentInvoiceUpdate></UserPendingConsignmentInvoiceUpdate>,
            loader: ({ params }) => fetch(`http://localhost:5000/UserConsignmentPendingInvoiceUpdate/${params.id}`)

         },
         {
            path: "UserAmountChange",
            element: <UserAmountChange></UserAmountChange>
         },
         {
            path: "UserAllCancelParcel",
            element: <UserCancelParcelAll></UserCancelParcelAll>
         },
         {
            path: "UserAddBankDetails/:id",
            element: <UserBankDetailsAdd></UserBankDetailsAdd>,
            loader: ({ params }) => fetch(`http://localhost:5000/UserBankDetailsAddGetUserData/${params.id}`)
         },

         // --Kal dhaka lagva  2 ta route
         {
            path: "UserAllPaymentRequestData",
            element: <UserPaymentList></UserPaymentList>
         },
         // =============
         {
            path: "UserPaymentRequestDetailsAll/:id",
            element: <UserPaymentRequestUnikDataAll></UserPaymentRequestUnikDataAll>,
            loader: ({ params }) => fetch(`http://localhost:5000/UserPaymentDetailUnikDataFind/${params.id}`)

         },
         // ==================
         {
            path: "UserAllPickupRequestData",
            element: <UserMyPickupParcel></UserMyPickupParcel>
         },
         {
            path: "API",
            element: <API></API>
         },
         {
            path: "PaymentRequest",
            element: <PaymentRequest></PaymentRequest>
         },
         {
            path: "UserTemporeryInvoiceAllStandardData/:id",
            element: <UserTemporeryInvoiceAllStandardData></UserTemporeryInvoiceAllStandardData>,
            loader: ({ params }) => fetch(`http://localhost:5000/StandardDeliveryDataTemporory?StandardParcelId=${params.id}`)
         },










         // =============================================================================
         // admin route  
         // =============================================================================
         // http://localhost:5000/
         // http://localhost:5000/

         {
            path: "AdminDashboard",
            element: <DashboardItemAdmin></DashboardItemAdmin>
         },
         {
            path: "User",
            element: <UserAdmin></UserAdmin>

         },
         {

            path: "AdminDashboard/AdminSearchUserId/:id",
            element: <AdminSearchUserId></AdminSearchUserId>,
            loader: ({ params }) => fetch(`http://localhost:5000/adminSearchUserId?userId=${params.id}`)

         },
         {
            path: "AdminDashboard/AdminSearchUserNumber/:number",
            element: <AdminSearchUserNumber></AdminSearchUserNumber>,
            loader: ({ params }) => fetch(`http://localhost:5000/adminSearchUserNumber?userNumber=${params.number}`)

         },

         {
            path: "AdminDashboard/AdminSearchStandardParcelId/:id",
            element: <AdminSearchStandardParcelUser></AdminSearchStandardParcelUser>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminSearchStandardParcelId?StandardParcelId=${params.id}`)

         },
         {

            path: "AdminDashboard/AdminCurrentBalanceDetails/:email",
            element: <CurrentBalanceDetails></CurrentBalanceDetails>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminCurrentBalanceAllData?email=${params.email}`)

         },
         // =========================






         // ===============TODO
         {
            path: "AdminDashboard/AdminSearchUserIdDataEntry",
            element: <AdminDataEntryUserApproved></AdminDataEntryUserApproved>
            // loader: ({ params }) => fetch(`http://localhost:5000/xxxxxxxxx?email=${params.email}`)
         },

         {
            path: "AdminDashboard/AdminEntryParcelOrApproved",
            element: <AdminEntryParcelOrApproved></AdminEntryParcelOrApproved>
            // loader: ({ params }) => fetch(`http://localhost:5000/AdminDataEntryStandardDeliveryData?email=${params.email}`)
         },
         // ===============TODO







         // =========================
         {
            path: "AdminDashboard/AdminConsignmentPendingInvoice/:id",
            element: <AdminConsignmentPendingInvoice></AdminConsignmentPendingInvoice>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminSearchConsignmentInvoice/${params.id}`)

         },
         {
            path: "AdminDashboard/AdminConsignmentPendingInvoiceUpdate/:id",
            element: <AdminConsignmentPendingInvoiceUpdate></AdminConsignmentPendingInvoiceUpdate>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminConsignmentPendingInvoiceUpdate/${params.id}`)

         },
         {
            path: "AdminDashboard/ApprovedParcelRoute",
            element: <ApprovedParcelRoute></ApprovedParcelRoute>

         },
         {
            path: "AdminDashboard/AdminAmountUpdateParcel",
            element: <AdminAmountUpdateParcel></AdminAmountUpdateParcel>

         },
         {
            path: "AdminDashboard/AdminAmountChangeUserDataFind/:email",
            element: <AdminSearchAmountChangeUserDataAllFindEmail></AdminSearchAmountChangeUserDataAllFindEmail>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminAmountChangeUserDataFindEmailGet?email=${params.email}`)

         },
         {
            path: "AdminDashboard/NewMerchants",
            element: <AdminNewMerchants></AdminNewMerchants>

         },
         {
            path: "AdminDashboard/AdminCoveragesDistricts",
            element: <AdminCoveragesDistricts></AdminCoveragesDistricts>

         },
         {
            path: "AdminDashboard/AdminCoveragesPoliceStations",
            element: <AdminCoveragesPoliceStations></AdminCoveragesPoliceStations>

         },
         {
            path: "AdminDashboard/AdminViewPaymentRequestAll",
            element: <AdminViewPaymentRequestAll></AdminViewPaymentRequestAll>

         },
         {
            path: "AdminDashboard/AdminPaymentRequestDetailsAll/:id",
            element: <AdminPaymentRequestDetailsAll></AdminPaymentRequestDetailsAll>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminPaymentDetailsUnikeDatFind/${params.id}`)

         },
         {
            path: "AdminDashboard/AdminMyHubRequestAll",
            element: <AdminMyHub></AdminMyHub>

         },
         {
            path: "AdminDashboard/UserTemporeryInvoiceAllStandardData/:id",
            element: <AdminTempororyParcelInvoice></AdminTempororyParcelInvoice>,
            loader: ({ params }) => fetch(`http://localhost:5000/AdminStandardDeliveryDataTemporory?StandardParcelId=${params.id}`)
         },








      ]
   },

   {
      path: "*",
      element: <Error></Error>
   }

])

export default route