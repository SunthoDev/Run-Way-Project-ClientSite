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
import AdminCreateHub from "../../DashbordAll/AdminePanel/AdminCreateHub/AdminCreateHub";
import Dispatch from "../../DashbordAll/AdminePanel/Dispatch/Dispatch";
import AddBalancePayRequest from "../../DashbordAll/DashbordRouteUserDataAll/AddBalancePayRequest/AddBalancePayRequest";
import BalanceRequestAllUser from "../../DashbordAll/AdminePanel/BalanceRequestAllUser/BalanceRequestAllUser";
import DeliveryMonitoring from "../../DashbordAll/AdminePanel/DeliveryMonitoring/DeliveryMonitoring";
import ReturnParcelMonitoring from "../../DashbordAll/AdminePanel/ReturnParcelMonitoring/ReturnParcelMonitoring";
import AllReportEverything from "../../DashbordAll/AdminePanel/AllReportEverything/AllReportEverything";
import CreateRider from "../../DashbordAll/AdminePanel/CreateRider/CreateRider";
import AssignParcel from "../../DashbordAll/AdminePanel/AssignParcel/AssignParcel";
import SearchAllReport from "../../DashbordAll/AdminePanel/AllReportEverything/SearchAllReport/SearchAllReport";
import RiderDashboard from "../../DashbordAll/RiderPanelAllWorkHere/RiderDashboard/RiderDashboard";
import MyParcelRider from "../../DashbordAll/RiderPanelAllWorkHere/MyParcelRider/MyParcelRider";
import HubInformation from "../../DashbordAll/AdminePanel/HubInformation/HubInformation";
import ParcelInfoOfRider from "../../DashbordAll/RiderPanelAllWorkHere/ParcelInfoOfRider/ParcelInfoOfRider";
import RiderCODAmountRequest from "../../DashbordAll/AdminePanel/RiderCODAmountRequest/RiderCODAmountRequest";
import ParcelDeliveryHistory from "../../DashbordAll/RiderPanelAllWorkHere/ParcelDeliveryHistory/ParcelDeliveryHistory";
import ParcelDataUpdate from "../../DashbordAll/DashbordRouteUserDataAll/UserTemporeryInvoiceAllStandardData/ParcelDataUpdate/ParcelDataUpdate";
import ParcelTrackingDataShow from "../../DashbordAll/DashbordRouteUserDataAll/ParcelTrackingDataShow/ParcelTrackingDataShow";


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
         {
            path: "/ParcelTrackingDataShow/:id",
            element: <ParcelTrackingDataShow></ParcelTrackingDataShow>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/StandardDeliveryDataTemporory?StandardParcelId=${params.id}`)
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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/UserConsignmentPendingInvoice/${params.id}`)

         },
         {

            path: "UserConsignmentPendingInvoiceUpdate/:id",
            element: <UserPendingConsignmentInvoiceUpdate></UserPendingConsignmentInvoiceUpdate>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/UserConsignmentPendingInvoiceUpdate/${params.id}`)

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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/UserBankDetailsAddGetUserData/${params.id}`)
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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/UserPaymentDetailUnikDataFind/${params.id}`)

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
            path: "AddBalancePayRequest",
            element: <AddBalancePayRequest></AddBalancePayRequest>
         },
         {
            path: "UserTemporeryInvoiceAllStandardData/:id",
            element: <UserTemporeryInvoiceAllStandardData></UserTemporeryInvoiceAllStandardData>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/StandardDeliveryDataTemporory?StandardParcelId=${params.id}`)
         },
         {
            path: "ParcelDataUpdate/:IdParcel",
            element: <ParcelDataUpdate></ParcelDataUpdate>
         },
         







         // =============================================================================
         // admin route  
         // =============================================================================
         // https://server.trustereocourier.com.bd/
         // https://server.trustereocourier.com.bd/

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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/adminSearchUserId?userId=${params.id}`)
         },
         {
            path: "AdminDashboard/AdminSearchUserNumber/:number",
            element: <AdminSearchUserNumber></AdminSearchUserNumber>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/adminSearchUserNumber?userNumber=${params.number}`)
         },
         {
            path: "AdminDashboard/AdminSearchStandardParcelId/:id",
            element: <AdminSearchStandardParcelUser></AdminSearchStandardParcelUser>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminSearchStandardParcelId?StandardParcelId=${params.id}`)
         },
         {
            path: "AdminDashboard/AdminCurrentBalanceDetails/:email",
            element: <CurrentBalanceDetails></CurrentBalanceDetails>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminCurrentBalanceAllData?email=${params.email}`)
         },
         // =========================

         // ===============TODO
         {
            path: "AdminDashboard/AdminSearchUserIdDataEntry",
            element: <AdminDataEntryUserApproved></AdminDataEntryUserApproved>
            // loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/xxxxxxxxx?email=${params.email}`)
         },

         {
            path: "AdminDashboard/AdminEntryParcelOrApproved",
            element: <AdminEntryParcelOrApproved></AdminEntryParcelOrApproved>
            // loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminDataEntryStandardDeliveryData?email=${params.email}`)
         },
         // ===============TODO

         // =========================
         {
            path: "AdminDashboard/AdminConsignmentPendingInvoice/:id",
            element: <AdminConsignmentPendingInvoice></AdminConsignmentPendingInvoice>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminSearchConsignmentInvoice/${params.id}`)

         },
         {
            path: "AdminDashboard/AdminConsignmentPendingInvoiceUpdate/:id",
            element: <AdminConsignmentPendingInvoiceUpdate></AdminConsignmentPendingInvoiceUpdate>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminConsignmentPendingInvoiceUpdate/${params.id}`)

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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminAmountChangeUserDataFindEmailGet?email=${params.email}`)
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
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminPaymentDetailsUnikeDatFind/${params.id}`)
         },
         {
            path: "AdminDashboard/UserTemporeryInvoiceAllStandardData/:id",
            element: <AdminTempororyParcelInvoice></AdminTempororyParcelInvoice>,
            loader: ({ params }) => fetch(`https://server.trustereocourier.com.bd/AdminStandardDeliveryDataTemporory?StandardParcelId=${params.id}`)
         },
         {
            path: "AdminDashboard/AdminCreateHub",
            element: <AdminCreateHub></AdminCreateHub>
         },
         {
            path: "AdminDashboard/AdminMyHubRequestAll",
            element: <AdminMyHub></AdminMyHub>
         },
         {
            path: "AdminDashboard/Dispatch",
            element: <Dispatch></Dispatch>
         },
         {
            path: "AdminDashboard/BalanceRequestAllUser",
            element: <BalanceRequestAllUser></BalanceRequestAllUser>
         },
         {
            path: "AdminDashboard/DeliveryMonitoring",
            element: <DeliveryMonitoring></DeliveryMonitoring>
         },
         {
            path: "AdminDashboard/ReturnParcelMonitoring",
            element: <ReturnParcelMonitoring></ReturnParcelMonitoring>
         },
         {
            path: "AdminDashboard/AllReportEverything",
            element: <AllReportEverything></AllReportEverything>
         },
         {
            path: "AdminDashboard/SearchAllReport",
            element: <SearchAllReport></SearchAllReport>
         },
         {
            path: "AdminDashboard/CreateRider",
            element: <CreateRider></CreateRider>
         },
         {
            path: "AdminDashboard/AssignParcel",
            element: <AssignParcel></AssignParcel>
         },
         {
            path: "AdminDashboard/HubInformation",
            element: <HubInformation></HubInformation>
         },
         {
            path: "AdminDashboard/RiderCODAmountRequest",
            element: <RiderCODAmountRequest></RiderCODAmountRequest>
         },
      ]
   },

   // ==================================================================================================
   // Rider Panel All Work Here!!
   // ========================================================
   {
      path: "dashboard",
      element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
      children: [
         {
            path: "RiderDashboard",
            element: <PrivateRoute> <RiderDashboard></RiderDashboard> </PrivateRoute>
         },
         {
            path: "MyParcelRider",
            element: <PrivateRoute> <MyParcelRider></MyParcelRider> </PrivateRoute>
         },
         {
            path: "ParcelInfoOfRider",
            element: <PrivateRoute> <ParcelInfoOfRider></ParcelInfoOfRider> </PrivateRoute>
         },
         {
            path: "ParcelDeliveryHistory",
            element: <PrivateRoute> <ParcelDeliveryHistory></ParcelDeliveryHistory> </PrivateRoute>
         },

      ]
   },

   {
      path: "*",
      element: <Error></Error>
   }

])

export default route