import React, { useEffect, useState } from "react";
import Input from "../components/atoms/Input";
import Select from "../components/atoms/Select";
import Table from "../components/items/Table";
import Checkbox from "../components/atoms/CheckBox";
import TextEditor from "../components/atoms/TextEditor";
import topics from "../data/topics";
import { useDispatch } from "react-redux";
import { showInfoPopup } from "../redux/actions";
import Button from "../components/atoms/Button";
import { FaEdit } from "react-icons/fa";
import {
  TbArrowLeftRhombus,
  TbArrowRightRhombus,
  TbCheck,
  TbSend,
} from "react-icons/tb";
function Home() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    picking: { value: "auto", label: "Auto" },
  });
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState(1);

  const pickingOptions = [
    { value: "auto", label: "Auto" },
    { value: "manual", label: "Manual" },
  ];

  const handleChange = async (element, dataP) => {
    const newData = { ...data, [`${element}`]: dataP };
    setData(newData);
    if (errors[element]) {
      errors[element] = false;
    }
  };

  const handleSubmit = () => {
    const errors = validateFormStage2();
    if (Object.keys(errors).length === 0) {
      saveJsonToFile(data);
      // Logic to publish and send invite
      sendInvite(data);
      dispatch(showInfoPopup("success", "Form submitted successfully"));
    } else {
      setErrors(errors);
      if (Object.keys(errors)?.length === 1) {
        dispatch(showInfoPopup("error", Object.values(errors)[0]));
      } else if (Object.keys(errors)?.length > 1) {
        dispatch(
          showInfoPopup("error", "Please fill required fields with valid data")
        );
      }
    }
    // Example function for sending the invite
  };
  const handleSaveAndClose = () => {
    const errors = validateFormStage2();
    if (Object.keys(errors).length === 0) {
      saveJsonToFile(data);
      // Logic to close the window or redirect the user
      window.close();
    } else {
      setErrors(errors);
      if (Object.keys(errors)?.length === 1) {
        dispatch(showInfoPopup("error", Object.values(errors)[0]));
      } else if (Object.keys(errors)?.length > 1) {
        dispatch(
          showInfoPopup("error", "Please fill required fields with valid data")
        );
      }
    }
    // Closes the current tab/window
    // or
    // window.location.href = '/somewhere'; // Redirects to another page
  };

  const sendInvite = (data) => {
    // Implement API call or other invite-sending logic
    console.log("Invite sent for:", data);
  };
  function saveJsonToFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formData.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const handleNextStage = () => {
    const errors = validateFormStage1();
    if (Object.keys(errors).length === 0) {
      setStage(2);
    } else {
      setErrors(errors);

      if (Object.keys(errors)?.length === 1) {
        dispatch(showInfoPopup("error", Object.values(errors)[0]));
      } else if (Object.keys(errors)?.length > 1) {
        dispatch(
          showInfoPopup("error", "Please fill required fields with valid data")
        );
      }
    }
  };

  function validateFormStage1() {
    const errors = {};

    // Step 1: Basic Details
    if (!data?.name || data.name.trim() === "") {
      errors.name = "Name is mandatory.";
    }

    if (!data?.duration || isNaN(data.duration) || data.duration <= 0) {
      errors.duration = "Duration must be a positive number.";
    }

    if (!data?.picking) {
      errors.picking = "Question Picking must be selected.";
    }
    if (data?.picking?.value === "manual" && data?.table?.length === 0) {
      errors.table = "You must add at least one question .";
    }
    // Step 2: Advanced Settings
    console.log(errors);
    return errors;
  }

  function validateFormStage2() {
    const errors = {};

    // Validate Negative Marking (0-100, default 0 if blank)
    if (!data.negativeMarking || data.negativeMarking <= 0) {
      errors.negativeMarking = "Marks for Easy Questions are required.";
    } else if (data.negativeMarking < 0 || data.negativeMarking > 100) {
      errors.negativeMarking = "Negative Marking must be between 0 and 100.";
    }

    // Validate Marks for Easy Questions (Mandatory)
    if (!data.easyMarks || data.easyMarks <= 0) {
      errors.easyMarks = "Marks for Easy Questions are required.";
    }

    // Validate Marks for Medium Questions (Mandatory)
    if (!data.mediumMarks || data.mediumMarks <= 0) {
      errors.mediumMarks = "Marks for Medium Questions are required.";
    }

    // Validate Marks for Hard Questions (Mandatory)
    if (!data.hardMarks || data.hardMarks <= 0) {
      errors.hardMarks = "Marks for Hard Questions are required.";
    }

    // Validate Minimum Passing Score (0-100)
    if (!data.minPassingScore) {
      errors.minPassingScore = "Minimum Passing Score is required.";
    } else if (data.minPassingScore < 0 || data.minPassingScore > 100) {
      errors.minPassingScore =
        "Minimum Passing Score must be between 0 and 100.";
    }

    // Validate Registration Form (if selected, ensure additional configuration)
    if (data.registrationForm) {
      if (!data.registrationFormOption) {
        errors.registrationFormOption =
          "Time Interval is required when Capture Image is selected.";
      } else if (data.registrationFormOption <= 0) {
        errors.registrationFormOption =
          "Time Interval must be greater than 0 seconds.";
      }
    }

    // Validate Capture Image During Exam (if selected, validate time interval)
    if (data.captureImage) {
      if (!data.timeInterval) {
        errors.timeInterval =
          "Time Interval is required when Capture Image is selected.";
      } else if (data.timeInterval <= 0) {
        errors.timeInterval = "Time Interval must be greater than 0 seconds.";
      }
    }

    // Validate Instructions (Mandatory)
    if (!data.instructions) {
      errors.instructions = "Instructions are required.";
    }
    console.log(errors);
    return errors;
  }

  return (
    <div className="flex justify-center items-center high-screen">
      {stage === 1 && (
        <div className="flex  w-10/12 md:11/12 justify-center items-center xl:flex-col relative">
          <div className="w-fit h-fit flex items-center relative bottom-8 flex-col border border-green-default rounded-top p-5 xl:mt-20 ">
            <div className="flex  flex-col  items-center relative ">
              <div className="dm-serif-display-regular flex justify-center text-center text-green-default absolute top-n-5 border-green-default border-b w-9/12 ">
                <div className="right-1 w-fit text-8xl relative h-16">*</div>
              </div>
              <h1 className="text-5xl w-full text-center mb-4 font-bold text-green-default dm-serif-display-regular  ">
                Add New Exam
              </h1>

              <>
                <div className="border-y border-green-default py-4 flex flex-col gap-2">
                  <Input
                    focusedIconName="add"
                    label={"Exam Name"}
                    defaultIconName="cal"
                    onChange={(e) => {
                      handleChange("name", e);
                    }}
                    value={data?.name}
                    error={errors?.name}
                    className={"min-w-80 md:min-w-72"}
                  />
                  <Input
                    type="number"
                    label={
                      <div>
                        Exam Duration{" "}
                        <span className="text-green-default-2 font-regular">
                          {" "}
                          minutes{" "}
                        </span>
                      </div>
                    }
                    focusedIconName="add"
                    defaultIconName="cal"
                    onChange={(e) => {
                      handleChange("duration", e);
                    }}
                    value={data?.duration}
                    error={errors?.duration}
                    className={"min-w-80 md:min-w-72"}
                  />
                  <Select
                    options={pickingOptions}
                    label={"Question Picking"}
                    onChange={(e) => {
                      handleChange("picking", e);
                    }}
                    value={data?.picking}
                  />
                </div>

                <Button
                  icon={<TbArrowRightRhombus className="w-10 h-10 stroke-1" />}
                  text="Next"
                  onClick={() => handleNextStage()}
                  className="mt-5 w-full justify-end"
                />
              </>
            </div>
          </div>
          {
            <Table
              topics={topics}
              onChange={(e) => {
                handleChange("table", e);
              }}
              value={data?.table}
              error={errors?.table}
              picking={data?.picking}
            />
          }
        </div>
      )}

      {stage === 2 && (
        <div className=" flex flex-col  justify-content border-green-default p-6 border rounded-xl xl:mt-24 xl:mb-10 md:w-11/12">
          <div className="flex w-full gap-10 xl:gap-3 border-b border-green-default pb-5 lg:flex-col ">
            <div className="flex flex-col min-w-96 md:min-w-72 gap-1 ">
              {" "}
              <Input
                type="number"
                label="Negative Marking (%)"
                placeholder="Enter percentage"
                value={data.negativeMarking}
                onChange={(value) => handleChange("negativeMarking", value)}
                error={errors?.negativeMarking}
              />
              <Input
                type="number"
                label="Marks for Easy Questions"
                placeholder="Enter marks"
                value={data.easyMarks}
                onChange={(value) => handleChange("easyMarks", value)}
                error={errors?.easyMarks}
              />
              <Input
                type="number"
                label="Marks for Medium Questions"
                placeholder="Enter marks"
                value={data.mediumMarks}
                onChange={(value) => handleChange("mediumMarks", value)}
                error={errors?.mediumMarks}
              />
              <Input
                type="number"
                label="Marks for Hard Questions"
                placeholder="Enter marks"
                value={data.hardMarks}
                onChange={(value) => handleChange("hardMarks", value)}
                error={errors?.hardMarks}
              />
              <Input
                type="number"
                label="Minimum Passing Score (%)"
                placeholder="Enter percentage"
                value={data.minPassingScore}
                onChange={(value) => handleChange("minPassingScore", value)}
                error={errors?.minPassingScore}
              />
            </div>
            <div className="flex flex-col min-w-96 md:min-w-72 gap-2 pt-8 xl:pt-0">
              <Checkbox
                label="Registration Form"
                checked={data.registrationForm}
                onChange={(checked) =>
                  handleChange("registrationForm", checked)
                }
                error={errors?.registrationForm}
              />

              {data.registrationForm && (
                <Input
                  type="text"
                  label="Registration Form Option"
                  placeholder="Enter interval"
                  value={data.registrationFormOption}
                  onChange={(value) =>
                    handleChange("registrationFormOption", value)
                  }
                  error={errors?.registrationFormOption}
                />
              )}

              <Checkbox
                label="Capture Image During Exam"
                checked={data.captureImage}
                onChange={(checked) => handleChange("captureImage", checked)}
                error={errors?.captureImage}
              />

              {data.captureImage && (
                <Input
                  type="number"
                  label="Time Interval (seconds)"
                  placeholder="Enter interval"
                  value={data.timeInterval}
                  onChange={(value) => handleChange("timeInterval", value)}
                  error={errors?.timeInterval}
                />
              )}

              <TextEditor
                label={"Instructions"}
                value={data.instructions}
                className={"w-full h-20"}
                onChange={(value) => handleChange("instructions", value)}
                error={errors?.instructions}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5 md:flex-col">
            <Button
              icon={<TbArrowLeftRhombus className="w-10 h-10 stroke-1" />}
              text="Prev"
              onClick={() => setStage(1)}
              className="  justify-start"
            />
            <Button
              icon={<TbSend className="w-6 h-6 stroke-1" />}
              text="Publish & Send Invite"
              onClick={() => handleSubmit()}
              className=" flex-1 justify-start md:!h-12 md:flex-none"
            />
            <Button
              icon={<TbCheck className="w-7 h-7 stroke-1" />}
              text="Save and Close"
              onClick={() => handleSaveAndClose()}
              className="  justify-start md:!h-12"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
