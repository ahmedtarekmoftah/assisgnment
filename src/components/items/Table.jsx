import React, { useEffect, useState } from "react";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import { TbPlus, TbCheck } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { showInfoPopup } from "../../redux/actions";

const Table = ({ topics, onChange, value, error, picking }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(value ? value : []);
  const [show, setShow] = useState(false);

  const [newRow, setNewRow] = useState({
    topic: "",
    easy: 0,
    medium: 0,
    hard: 0,
    totalQuestions: 0,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, name, setRow) => {
    setRow((prevRow) => {
      const updatedRow = { ...prevRow, [`${name}`]: parseInt(e) || 0 };
      return {
        ...updatedRow,
        totalQuestions: updatedRow.easy + updatedRow.medium + updatedRow.hard,
      };
    });
    if (errors[name]) {
      errors[name] = false;
    }
  };

  const handleSelectChange = (e, setRow) => {
    setRow((prevRow) => ({ ...prevRow, topic: e }));
    if (errors["topic"]) {
      errors["topic"] = false;
    }
  };

  const handleAddRow = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (newRow.topic && newRow.totalQuestions > 0) {
        setData([...data, newRow]);
        setNewRow({
          topic: "",
          easy: 0,
          medium: 0,
          hard: 0,
          totalQuestions: 0,
        });
      }
    } else {
      console.log(errors);
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

  const handleRemoveRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEditRow = (index) => {
    setEditingIndex(index);
    setEditingRow({ ...data[index] });
  };

  const handleSaveEdit = () => {
    if (
      !(
        editingRow.easy === 0 &&
        editingRow.medium === 0 &&
        editingRow.hard === 0
      )
    ) {
      const updatedData = [...data];
      updatedData[editingIndex] = editingRow;
      setData(updatedData);
    }

    setEditingIndex(null);
    setEditingRow(null);
  };
  useEffect(() => {
    onChange(data);
  }, [data]);
  function validateForm() {
    const errors = {};

    // Step 1: Basic Details
    if (!newRow?.topic) {
      errors.topic = "Topic is mandatory.";
    }

    if (!newRow?.easy) {
      errors.easy = "Easy questions number is mandatory.";
    }
    if (!newRow?.medium) {
      errors.medium = "Medium questions number is mandatory.";
    }
    if (!newRow?.hard) {
      errors.hard = "Hard questions number is mandatory.";
    }

    // Step 2: Advanced Settings
    console.log(errors);
    return errors;
  }
  useEffect(() => {
    if (picking.value === "manual") {
      document.querySelector(".table").style.display = "block";

      setTimeout(() => {
        document.querySelector(".table").style.width = "100%";
        document.querySelector(".table").style.padding = "1rem";
        document.querySelector(".table").style.marginLeft = "2rem";
      }, 100);
      setTimeout(() => {
        document.querySelector(".table").style.border = "1px solid #A7C957";
      }, 200);
      setTimeout(() => {
        setShow(true);
      }, 600);
    } else {
      setShow(false);
      document.querySelector(".table").style.width = "0px";
      document.querySelector(".table").style.padding = "0px";

      setTimeout(() => {
        document.querySelector(".table").style.border = "none";
        document.querySelector(".table").style.margin = "0px";
      }, 400);
      setTimeout(() => {
        document.querySelector(".table").style.display = "none";
      }, 700);
    }
  }, [picking]);
  return (
    <div
      className={`w-0 table border rounded-xl border-green-default transition duration-300 ml-2 xl:!ml-0 xl:!mt-10 xl:!mb-20 ${
        error && "!border-red-400"
      } relative bottom-8 px-4`}
    >
      {/* Table Header */}
      {show && (
        <>
          <div className=" table-row flex  text-white font-semibold py-4 rounded-t-lg  border-green-default border-b ">
            <div className="w-4/12 text-green-default text-center">Topic</div>
            <div className="w-4/12 flex justify-around">
              <div className=" text-center text-green-default">Easy</div>
              <div className=" text-center text-green-default">Medium</div>
              <div className=" text-center text-green-default">Hard</div>
            </div>
            <div className="w-2/12 text-center text-green-default">
              Total Questions
            </div>
            <div className="w-2/12 text-center text-green-default">Actions</div>
          </div>

          {/* Input Row */}
          <div className="flex bg-white  py-4 table-row">
            <div className="w-4/12 flex justify-center">
              <Select
                options={topics}
                onChange={(e) => handleSelectChange(e, setNewRow)}
                className={"w-full"}
                value={newRow.topic}
                searchable={true}
                error={errors.topic}
              />
            </div>
            <div className="w-4/12 flex justify-around">
              <div className=" text-center">
                <Input
                  type="number"
                  value={newRow.easy}
                  onChange={(e) => handleInputChange(e, "easy", setNewRow)}
                  className="max-w-10 text-center "
                  error={errors.easy}
                />
              </div>
              <div className=" text-center">
                <Input
                  type="number"
                  value={newRow.medium}
                  onChange={(e) => handleInputChange(e, "medium", setNewRow)}
                  className="max-w-10 text-center "
                  error={errors.medium}
                />
              </div>
              <div className=" text-center">
                <Input
                  type="number"
                  value={newRow.hard}
                  onChange={(e) => handleInputChange(e, "hard", setNewRow)}
                  className="max-w-10 text-center"
                  error={errors.hard}
                />
              </div>
            </div>

            <div className="w-2/12 text-center flex items-center justify-center font-semibold text-green-default">
              {newRow.totalQuestions}
            </div>
            <div className="w-2/12 text-center flex justify-center">
              <button onClick={handleAddRow}>
                <TbPlus className="w-7 h-7 text-green-default transition duration-300 " />
              </button>
            </div>
          </div>

          {/* Table Body */}
          {data.map((item, index) => (
            <div key={index} className={`flex py-4  border-b table-row`}>
              {editingIndex === index ? (
                <>
                  <div className="w-4/12 flex justify-center ">
                    <Select
                      options={topics}
                      onChange={(e) => handleSelectChange(e, setEditingRow)}
                      className={"w-full "}
                      value={editingRow.topic}
                    />
                  </div>
                  <div className="w-4/12 flex justify-around">
                    <div className=" text-center">
                      <Input
                        type="number"
                        value={editingRow.easy}
                        onChange={(e) =>
                          handleInputChange(e, "easy", setEditingRow)
                        }
                        className="max-w-10 text-center"
                      />
                    </div>
                    <div className=" text-center">
                      <Input
                        type="number"
                        value={editingRow.medium}
                        onChange={(e) =>
                          handleInputChange(e, "medium", setEditingRow)
                        }
                        className="max-w-10 text-center"
                      />
                    </div>
                    <div className=" text-center">
                      <Input
                        type="number"
                        value={editingRow.hard}
                        onChange={(e) =>
                          handleInputChange(e, "hard", setEditingRow)
                        }
                        className="max-w-10 text-center"
                      />
                    </div>
                  </div>
                  <div className="w-2/12 text-center flex items-center justify-center font-semibold text-green-default">
                    {editingRow.easy + editingRow.medium + editingRow.hard}
                  </div>
                  <div className="w-2/12 text-center flex justify-center items-center">
                    <button onClick={handleSaveEdit} className="">
                      <TbCheck className="w-7 h-7 text-green-default transition duration-300 " />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-4/12 text-green-default text-center">
                    {item?.topic.label}
                  </div>
                  <div className="w-4/12 flex justify-around">
                    <div className=" text-center text-green-default">
                      {item?.easy}
                    </div>
                    <div className=" text-center text-green-default">
                      {item?.medium}
                    </div>
                    <div className=" text-center text-green-default">
                      {item?.hard}
                    </div>
                  </div>
                  <div className="w-2/12 text-center font-semibold text-green-default">
                    {item?.totalQuestions}
                  </div>
                  <div className="w-2/12 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-500 hover:text-red-600 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEditRow(index)}
                      className="text-blue-500 hover:text-green-default transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Table;
