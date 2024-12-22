export const dummyDashboardData = [
    {
        code: 200,
        message: "Data A",
        total_patients: 150,
        total_deseases: 20,
        total_doctors: 5,
        total_income: 3000000,
        total_visit: 25,
        total_video_call: 10,
        total_urgent_care: 150,
        this_month_income: 400000,
        previous_month_income: 350000,
        total_booking_count: 30,
        total_earnings_last_year: [
            { month: "Nov 2023", earning: 250000 },
            { month: "Dec 2023", earning: 350000 },
            { month: "Jan 2024", earning: 400000 },
        ],
        complaint_count: 2,
        under_review_count: 4,
    },

];


export const patients = [
    {
        _id: "64eb106a7cdd0c089b6b22b9",
        user_id: "64eb106a7cdd0c089b6b22b7",
        first_name: "okay",
        last_name: "what",
        dob: "2023-08-01",
        profile_image: "",
        gender: "",
        phone_number: "",
        location: { type: "Point", coordinates: [0, 0] },
        japan_email: "",
        status: false,
        email: "qasu@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c0",
        user_id: "64eb106a7cdd0c089b6b22b8",
        first_name: "John",
        last_name: "Doe",
        dob: "1995-05-20",
        profile_image: "",
        gender: "male",
        phone_number: "1234567890",
        location: { type: "Point", coordinates: [35.6895, 139.6917] },
        japan_email: "",
        status: true,
        email: "john.doe@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c1",
        user_id: "64eb106a7cdd0c089b6b22b9",
        first_name: "Alice",
        last_name: "Smith",
        dob: "2000-12-12",
        profile_image: "",
        gender: "female",
        phone_number: "0987654321",
        location: { type: "Point", coordinates: [51.5074, -0.1278] },
        japan_email: "",
        status: false,
        email: "alice.smith@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c2",
        user_id: "64eb106a7cdd0c089b6b22b0",
        first_name: "Bob",
        last_name: "Johnson",
        dob: "1988-03-15",
        profile_image: "",
        gender: "male",
        phone_number: "1122334455",
        location: { type: "Point", coordinates: [40.7128, -74.006] },
        japan_email: "",
        status: true,
        email: "bob.johnson@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c3",
        user_id: "64eb106a7cdd0c089b6b22b1",
        first_name: "Emma",
        last_name: "Brown",
        dob: "1992-07-07",
        profile_image: "",
        gender: "female",
        phone_number: "5566778899",
        location: { type: "Point", coordinates: [48.8566, 2.3522] },
        japan_email: "",
        status: false,
        email: "emma.brown@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c4",
        user_id: "64eb106a7cdd0c089b6b22b2",
        first_name: "Liam",
        last_name: "Wilson",
        dob: "1985-09-30",
        profile_image: "",
        gender: "male",
        phone_number: "2233445566",
        location: { type: "Point", coordinates: [34.0522, -118.2437] },
        japan_email: "",
        status: true,
        email: "liam.wilson@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c5",
        user_id: "64eb106a7cdd0c089b6b22b3",
        first_name: "Sophia",
        last_name: "Taylor",
        dob: "1997-04-25",
        profile_image: "",
        gender: "female",
        phone_number: "7788990011",
        location: { type: "Point", coordinates: [52.5200, 13.4050] },
        japan_email: "",
        status: false,
        email: "sophia.taylor@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c6",
        user_id: "64eb106a7cdd0c089b6b22b4",
        first_name: "James",
        last_name: "Davis",
        dob: "1978-11-18",
        profile_image: "",
        gender: "male",
        phone_number: "6677889900",
        location: { type: "Point", coordinates: [37.7749, -122.4194] },
        japan_email: "",
        status: true,
        email: "james.davis@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c7",
        user_id: "64eb106a7cdd0c089b6b22b5",
        first_name: "Mia",
        last_name: "Moore",
        dob: "2003-06-10",
        profile_image: "",
        gender: "female",
        phone_number: "4455667788",
        location: { type: "Point", coordinates: [55.7558, 37.6173] },
        japan_email: "",
        status: false,
        email: "mia.moore@gmail.com",
        role: "patient"
    },
    {
        _id: "64eb106a7cdd0c089b6b22c8",
        user_id: "64eb106a7cdd0c089b6b22b6",
        first_name: "Oliver",
        last_name: "White",
        dob: "1983-02-05",
        profile_image: "",
        gender: "male",
        phone_number: "3322110099",
        location: { type: "Point", coordinates: [41.9028, 12.4964] },
        japan_email: "",
        status: true,
        email: "oliver.white@gmail.com",
        role: "patient"
    }
];

export const historyArray = [
    {
        "_id": "67178dac74d2eebf7832fb46",
        "booking_type": "urgent",
        "personal_info": {
            "user_id": {
                "_id": "67178b7574d2eebf7832eb7c",
                "first_name": "Deen",
                "last_name": "Castronovo",
                "email": "djc688@protonmail.com",
                "profile_image": "",
                "dob": "1964-08-17"
            },
            "gender": "male",
            "phone_number": "",
            "japan_email": "Ritz Carlton Tokyo",
            "location": {
                "coordinates": [
                    null,
                    null
                ],
                "type": "Point"
            }
        },
        "category_id": {
            "_id": "649aacc0367be4661789be6b",
            "category_name": "Other condition not listed"
        },
        "payment_status": true,
        "payment": 16500,
        "updatedAt": "2024-10-22T12:22:35.954Z",
        "createdAt": "2024-10-22T11:34:04.538Z"
    },
    {
        "_id": "67178dac74d2eebf7832fb47",
        "booking_type": "urgent",
        "personal_info": {
            "user_id": {
                "_id": "67178b7574d2eebf7832eb7d",
                "first_name": "Alice",
                "last_name": "Johnson",
                "email": "alice@example.com",
                "profile_image": "",
                "dob": "1990-05-10"
            },
            "gender": "female",
            "phone_number": "",
            "japan_email": "Hilton Tokyo",
            "location": {
                "coordinates": [
                    null,
                    null
                ],
                "type": "Point"
            }
        },
        "category_id": {
            "_id": "649aacc0367be4661789be6c",
            "category_name": "Other condition not listed"
        },
        "payment_status": true,
        "payment": 17500,
        "updatedAt": "2024-10-22T12:22:35.954Z",
        "createdAt": "2024-10-22T11:34:04.538Z"
    },
    {
        "_id": "67178dac74d2eebf7832fb48",
        "booking_type": "urgent",
        "personal_info": {
            "user_id": {
                "_id": "67178b7574d2eebf7832eb7e",
                "first_name": "Bob",
                "last_name": "Smith",
                "email": "bob@example.com",
                "profile_image": "",
                "dob": "1985-12-25"
            },
            "gender": "male",
            "phone_number": "",
            "japan_email": "Shangri-La Tokyo",
            "location": {
                "coordinates": [
                    null,
                    null
                ],
                "type": "Point"
            }
        },
        "category_id": {
            "_id": "649aacc0367be4661789be6d",
            "category_name": "Other condition not listed"
        },
        "payment_status": true,
        "payment": 18000,
        "updatedAt": "2024-10-22T12:22:35.954Z",
        "createdAt": "2024-10-22T11:34:04.538Z"
    },
    {
        "_id": "67178dac74d2eebf7832fb49",
        "booking_type": "urgent",
        "personal_info": {
            "user_id": {
                "_id": "67178b7574d2eebf7832eb7f",
                "first_name": "Eve",
                "last_name": "Taylor",
                "email": "eve@example.com",
                "profile_image": "",
                "dob": "1978-03-15"
            },
            "gender": "female",
            "phone_number": "",
            "japan_email": "Mandarin Oriental Tokyo",
            "location": {
                "coordinates": [
                    null,
                    null
                ],
                "type": "Point"
            }
        },
        "category_id": {
            "_id": "649aacc0367be4661789be6e",
            "category_name": "Other condition not listed"
        },
        "payment_status": true,
        "payment": 19000,
        "updatedAt": "2024-10-22T12:22:35.954Z",
        "createdAt": "2024-10-22T11:34:04.538Z"
    },
    {
        "_id": "67178dac74d2eebf7832fb50",
        "booking_type": "urgent",
        "personal_info": {
            "user_id": {
                "_id": "67178b7574d2eebf7832eb80",
                "first_name": "Charlie",
                "last_name": "Brown",
                "email": "charlie@example.com",
                "profile_image": "",
                "dob": "1992-07-07"
            },
            "gender": "male",
            "phone_number": "",
            "japan_email": "The Peninsula Tokyo",
            "location": {
                "coordinates": [
                    null,
                    null
                ],
                "type": "Point"
            }
        },
        "category_id": {
            "_id": "649aacc0367be4661789be6f",
            "category_name": "Other condition not listed"
        },
        "payment_status": true,
        "payment": 20000,
        "updatedAt": "2024-10-22T12:22:35.954Z",
        "createdAt": "2024-10-22T11:34:04.538Z"
    }
];


export const bookings = [
    {
        id: "BKG12345",
        customerName: "Deen Castronovo",
        schedule: "Oct 22, 2024",
        vehicleType: "SUV",
        paymentStatus: "Completed",
        bookingStatus: "upcoming",
    },
    {
        id: "BKG12346",
        customerName: "John Doe",
        schedule: "Oct 20, 2024",
        vehicleType: "Sedan",
        paymentStatus: "Pending",
        bookingStatus: "missed",
    },
    {
        id: "BKG12347",
        customerName: "Alice Smith",
        schedule: "Oct 21, 2024",
        vehicleType: "Limousine",
        paymentStatus: "Completed",
        bookingStatus: "under_review",
    },
    {
        id: "BKG12348",
        customerName: "Tom Jones",
        schedule: "Oct 23, 2024",
        vehicleType: "SUV",
        paymentStatus: "Failed",
        bookingStatus: "upcoming",
    },
    {
        id: "BKG12349",
        customerName: "Sara Lee",
        schedule: "Oct 24, 2024",
        vehicleType: "Van",
        paymentStatus: "Completed",
        bookingStatus: "completed",
    },
]






