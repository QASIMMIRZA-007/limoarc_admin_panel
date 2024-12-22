import { Input } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/apis";
import Swal from "sweetalert2";
import { setLoader } from "../../Redux/Actions/GeneralActions";
import { NativeSelect } from "@material-ui/core";


const access_token =
  "pk.eyJ1IjoiaW5hYW0xIiwiYSI6ImNramtmNmljYzJhMWMycnFwM28zOHE4ZzIifQ.pBIP97q3Us332iKImTP9aQ";

export const EditForm = ({ item, modalToggle, getAllpatient }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.adminToken);
  const [data, setData] = useState({ ...item });
  // const [gender, setGender] = useState("")

  const genderHandler = () => {
    setData({ ...data, gender: e.target.value });
    console.log("conGender", gender);
  };

  const editFilePatient = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    modalToggle();

    try {
      const res = await ApiCall({
        route: `patient/update_patient_by_admin/${item?.user_id}`,
        token: token,
        verb: "put",
        params: {
          first_name: data?.first_name,
          last_name: data?.last_name,
          phone_number: data?.phone_number,
          gender: data?.gender,
          image:data?.image
        },
      });
      if (res?.status === 200) {
        Swal.fire({
          title: "Patient is Updated",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        getAllpatient();
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error");
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString());
    }
  };

  return (
    <section>
      <div className="w-[100%] h-[500px] flex justify-center items-center">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
            });
          }}
        >
          <h3 className="text-[#0D0D0D] text-center pb-[10px]">Edit patient information</h3>
          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex">
            <div className="md:w-[380px] w-[100%] ">
              

              <Input
                placeholder="First Name"
                id="first_name"
                defaultValue={data?.first_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Last Name"
                id="last_name"
                defaultValue={data?.last_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Contact No"
                id="phone_number"
                defaultValue={data?.phone_number}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <NativeSelect
                id="gender"
                defaultValue={data?.gender}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                onChange={(e) => genderHandler}
              >

                <option value="male">Male</option>
                <option value="female">Female</option>

                {/* <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem> */}
              </NativeSelect>

            
              <Input
                placeholder="Email"
                id="email"
                disabled
                defaultValue={data?.email}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />

              <div className="float-right">
                <button
                  type="submit"
                  onClick={(e) => {
                    editFilePatient(e);
                    // dispatch(setLoader(true));
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Update & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
