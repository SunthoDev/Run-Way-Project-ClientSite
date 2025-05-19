


// ----------------------------------------------------------------------------------

// Send the result as a response

const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());

const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/data?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
    const data = await response.json();
    // Process the data from the backend
};




// ====================================


app.get("/AdminPaymentRequestAllDataFind", async (req, res) => {
    let sdate = req.query.startDate
    let edate = req.query.endDate

    const startDateObj = new Date(sdate);
    const endDateObj = new Date(edate);


    const result = await collection.find({
        OrderDate : {
            $gte: startDateObj,
            $lt: endDateObj
        }
    }).toArray();

    res.send(result)

})






























// https://www.npmjs.com/package/barcodejs






























































// const result = await collection.find({
//     yourDateField: {
//       $gte: startDate,
//       $lt: endDate
//     }
//   }).toArray();
// const startDate = new Date();
//   const endDate = new Date();
//   endDate.setMonth(endDate.getMonth() + 1);

//   // Perform the query
//   const result = await collection.find({
//     yourDateField: {
//       $gte: startDate,
//       $lt: endDate
//     }
//   }).toArray();

//   // Send the result as a response
//   res.json(result);
// Programming-Hero Instructors9:34 PM
// const [startDate, setStartDate] = useState(new Date());
// const [endDate, setEndDate] = useState(new Date());

// const fetchData = async () => {
//   const response = await fetch(`http://localhost:3000/data?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//   const data = await response.json();
//   // Process the data from the backend
// };
// // Convert startDate and endDate to Date objects
//   const startDateObj = new Date(startDate);
//   const endDateObj = new Date(endDate);

//   const result = await collection.find({
//     yourDateField: {
//       $gte: startDateObj,
//       $lt: endDateObj
//     }
//   }).